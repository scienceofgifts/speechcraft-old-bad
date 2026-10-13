import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isRecording: boolean;
  audioLevel: number; // 0 to 100
  barCount?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isRecording,
  audioLevel,
  barCount = 28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const spacing = 3;
      const totalSpacing = spacing * (barCount - 1);
      const barWidth = Math.max(2, (width - totalSpacing) / barCount);

      const normalizedLevel = Math.max(0.08, audioLevel / 100);

      for (let i = 0; i < barCount; i++) {
        // Natural curved falloff from center with subtle sinusoidal wave variation
        const distFromCenter = Math.abs(i - barCount / 2) / (barCount / 2);
        const wave = isRecording
          ? Math.sin(Date.now() / 150 + i * 0.4) * 0.25 + 0.75
          : 0.15;

        const dynamicHeight = isRecording
          ? Math.min(height, Math.max(4, height * normalizedLevel * (1 - distFromCenter * 0.4) * wave))
          : 4;

        const x = i * (barWidth + spacing);
        const y = (height - dynamicHeight) / 2;

        // Color based on height / amplitude: Teal into electric cyan and soft amber
        const gradient = ctx.createLinearGradient(0, y, 0, y + dynamicHeight);
        if (isRecording) {
          if (audioLevel > 70) {
            gradient.addColorStop(0, '#F59E0B'); // Warm amber for high input
            gradient.addColorStop(1, '#0D9488');
          } else {
            gradient.addColorStop(0, '#2DD4BF'); // Mint / cyan
            gradient.addColorStop(1, '#0284C7'); // Sky blue
          }
        } else {
          gradient.addColorStop(0, '#334155');
          gradient.addColorStop(1, '#1E293B');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, dynamicHeight, 2);
        ctx.fill();
      }

      if (isRecording) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRecording, audioLevel, barCount]);

  return (
    <div className="w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={320}
        height={48}
        className="w-full max-w-sm h-12 rounded-lg"
      />
    </div>
  );
};
