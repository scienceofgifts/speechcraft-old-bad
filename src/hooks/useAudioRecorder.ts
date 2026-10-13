import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioRecordingResult {
  blob: Blob;
  base64: string;
  blobUrl: string;
  durationSeconds: number;
  mimeType: string;
}

export type RecorderState = 'inactive' | 'recording' | 'paused';

export function useAudioRecorder() {
  const [recorderState, setRecorderState] = useState<RecorderState>('inactive');
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioLevel, setAudioLevel] = useState<number>(0); // 0 to 100 for VU meter
  const [lastRecording, setLastRecording] = useState<AudioRecordingResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const durationTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Clean up all resources
  const cleanupStream = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (durationTimerRef.current) {
      window.clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  useEffect(() => {
    return () => {
      cleanupStream();
      if (lastRecording?.blobUrl) {
        URL.revokeObjectURL(lastRecording.blobUrl);
      }
    };
  }, [cleanupStream, lastRecording]);

  const updateAudioMeter = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate RMS amplitude
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    // Map to 0-100 range with soft smoothing
    const level = Math.min(100, Math.round((average / 128) * 100));
    setAudioLevel(level);

    animationFrameRef.current = requestAnimationFrame(updateAudioMeter);
  }, []);

  const startRecording = useCallback(async () => {
    setErrorMessage(null);
    chunksRef.current = [];

    // Revoke previous url if any
    if (lastRecording?.blobUrl) {
      URL.revokeObjectURL(lastRecording.blobUrl);
    }
    setLastRecording(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support audio recording. Please use modern Chrome, Firefox, or Safari.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Audio analysis for live visualizer
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;
        updateAudioMeter();
      } catch (audioCtxErr) {
        console.warn('AudioContext visualization initialization failed:', audioCtxErr);
      }

      // Check supported MIME type
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else {
          mimeType = ''; // Let browser default
        }
      }

      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(250); // Slice every 250ms
      startTimeRef.current = Date.now();
      setRecorderState('recording');
      setRecordingDuration(0);

      durationTimerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      cleanupStream();
      setRecorderState('inactive');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser bar.');
      } else if (err.name === 'NotFoundError') {
        setErrorMessage('No microphone input device found. Please connect a microphone.');
      } else {
        setErrorMessage(err.message || 'Failed to start microphone recording.');
      }
    }
  }, [cleanupStream, lastRecording, updateAudioMeter]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setRecorderState('paused');
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setRecorderState('recording');
      durationTimerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
  }, []);

  const stopRecording = useCallback((): Promise<AudioRecordingResult> => {
    return new Promise((resolve, reject) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        cleanupStream();
        setRecorderState('inactive');
        reject(new Error('No active recording'));
        return;
      }

      mediaRecorder.onstop = async () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        const blobUrl = URL.createObjectURL(audioBlob);
        const durationSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

        // Convert Blob to Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = (reader.result as string) || '';
          const result: AudioRecordingResult = {
            blob: audioBlob,
            base64: base64Data,
            blobUrl,
            durationSeconds: durationSec,
            mimeType,
          };
          setLastRecording(result);
          cleanupStream();
          setRecorderState('inactive');
          resolve(result);
        };
        reader.onerror = () => {
          cleanupStream();
          setRecorderState('inactive');
          reject(new Error('Failed to process recorded audio data'));
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.stop();
    });
  }, [cleanupStream]);

  const clearRecording = useCallback(() => {
    if (lastRecording?.blobUrl) {
      URL.revokeObjectURL(lastRecording.blobUrl);
    }
    setLastRecording(null);
    setRecordingDuration(0);
    setErrorMessage(null);
  }, [lastRecording]);

  return {
    recorderState,
    recordingDuration,
    audioLevel,
    lastRecording,
    errorMessage,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    clearRecording,
  };
}
