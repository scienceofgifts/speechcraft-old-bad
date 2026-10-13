import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  Info,
  Radio,
  ArrowRight,
  FileText,
  Activity,
  Smile,
} from 'lucide-react';
import { referenceSpeaker } from '../services/ttsService';

interface PronunciationGuideViewProps {
  onBackToLab: () => void;
}

export const PronunciationGuideView: React.FC<PronunciationGuideViewProps> = ({ onBackToLab }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'ipa' | 'mechanics'>('system');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Filter state for IPA chart
  const [ipaFilter, setIpaFilter] = useState<'all' | 'consonants' | 'vowels' | 'diphthongs'>('all');

  const playSoundSample = (text: string, id: string) => {
    if (playingId === id) {
      referenceSpeaker.stop();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    referenceSpeaker.play(
      text,
      1.0,
      () => setPlayingId(id),
      () => setPlayingId(null),
      id
    );
  };

  const ipaSymbols = [
    // Vowels
    { symbol: '/i/', type: 'vowels', name: 'High Front Tense Vowel', example: 'eat, meet, key, machine', audioText: 'eat, meet, key' },
    { symbol: '/ɪ/', type: 'vowels', name: 'High Front Lax Vowel', example: 'sit, bit, busy, myth', audioText: 'sit, bit, busy' },
    { symbol: '/eɪ/', type: 'diphthongs', name: 'Mid Front Diphthong', example: 'ate, say, weight, break', audioText: 'ate, say, weight' },
    { symbol: '/ɛ/', type: 'vowels', name: 'Mid Front Lax Vowel', example: 'bed, head, said, friend', audioText: 'bed, head, said' },
    { symbol: '/æ/', type: 'vowels', name: 'Low Front Vowel (American A)', example: 'cat, bat, hand, laugh', audioText: 'cat, bat, hand' },
    { symbol: '/ɑ/', type: 'vowels', name: 'Low Back Vowel (Father/Cot)', example: 'father, cot, spa, honest', audioText: 'father, cot, spa' },
    { symbol: '/ɔ/', type: 'vowels', name: 'Low-Mid Back Vowel', example: 'caught, talk, bought, law', audioText: 'caught, talk, bought' },
    { symbol: '/oʊ/', type: 'diphthongs', name: 'Mid Back Diphthong', example: 'boat, go, slow, home', audioText: 'boat, go, home' },
    { symbol: '/ʊ/', type: 'vowels', name: 'High Back Lax Vowel', example: 'put, book, could, pull', audioText: 'put, book, could' },
    { symbol: '/u/', type: 'vowels', name: 'High Back Tense Vowel', example: 'boot, food, true, group', audioText: 'boot, food, true' },
    { symbol: '/ʌ/', type: 'vowels', name: 'Mid-Central Lax Vowel', example: 'cup, but, love, blood', audioText: 'cup, but, love' },
    { symbol: '/ə/', type: 'vowels', name: 'Schwa (Unstressed Neutral)', example: 'about, sofa, banana, supply', audioText: 'about, sofa, banana' },
    { symbol: '/ɝ/', type: 'vowels', name: 'R-Colored Vowel (Stressed)', example: 'bird, fern, hurt, term', audioText: 'bird, fern, hurt' },
    { symbol: '/ɚ/', type: 'vowels', name: 'R-Colored Schwa (Unstressed)', example: 'teacher, butter, doctor, murmur', audioText: 'teacher, butter, doctor' },
    // Diphthongs
    { symbol: '/aɪ/', type: 'diphthongs', name: 'Low Front to High Front Diphthong', example: 'ice, my, high, night', audioText: 'ice, my, high' },
    { symbol: '/aʊ/', type: 'diphthongs', name: 'Low to High Back Diphthong', example: 'out, cow, house, town', audioText: 'out, cow, house' },
    { symbol: '/ɔɪ/', type: 'diphthongs', name: 'Back to Front Diphthong', example: 'oil, boy, coin, voice', audioText: 'oil, boy, coin' },
    // Consonants
    { symbol: '/p/', type: 'consonants', name: 'Voiceless Bilabial Stop', example: 'pat, happy, stop, cap', audioText: 'pat, happy, stop' },
    { symbol: '/b/', type: 'consonants', name: 'Voiced Bilabial Stop', example: 'bat, rabbit, rob, tube', audioText: 'bat, rabbit, rob' },
    { symbol: '/t/', type: 'consonants', name: 'Voiceless Alveolar Stop / Flap', example: 'top, butter, cat, water', audioText: 'top, butter, cat' },
    { symbol: '/d/', type: 'consonants', name: 'Voiced Alveolar Stop', example: 'dog, ladder, red, bed', audioText: 'dog, ladder, red' },
    { symbol: '/k/', type: 'consonants', name: 'Voiceless Velar Stop', example: 'cat, key, back, queen', audioText: 'cat, key, back' },
    { symbol: '/g/', type: 'consonants', name: 'Voiced Velar Stop', example: 'go, bigger, dog, ghost', audioText: 'go, bigger, dog' },
    { symbol: '/f/', type: 'consonants', name: 'Voiceless Labiodental Fricative', example: 'fan, coffee, rough, phone', audioText: 'fan, coffee, rough' },
    { symbol: '/v/', type: 'consonants', name: 'Voiced Labiodental Fricative', example: 'van, river, save, of', audioText: 'van, river, save' },
    { symbol: '/θ/', type: 'consonants', name: 'Voiceless Dental Fricative (TH)', example: 'think, bath, mouth, three', audioText: 'think, bath, mouth' },
    { symbol: '/ð/', type: 'consonants', name: 'Voiced Dental Fricative (TH)', example: 'this, mother, breathe, smooth', audioText: 'this, mother, breathe' },
    { symbol: '/s/', type: 'consonants', name: 'Voiceless Alveolar Sibilant', example: 'sit, city, pass, nice', audioText: 'sit, city, pass' },
    { symbol: '/z/', type: 'consonants', name: 'Voiced Alveolar Sibilant', example: 'zoo, busy, buzz, rise', audioText: 'zoo, busy, buzz' },
    { symbol: '/ʃ/', type: 'consonants', name: 'Voiceless Post-Alveolar Fricative', example: 'shoe, nation, sure, push', audioText: 'shoe, nation, sure' },
    { symbol: '/ʒ/', type: 'consonants', name: 'Voiced Post-Alveolar Fricative', example: 'measure, vision, genre, beige', audioText: 'measure, vision, beige' },
    { symbol: '/h/', type: 'consonants', name: 'Voiceless Glottal Fricative', example: 'hat, ahead, who, whole', audioText: 'hat, ahead, whole' },
    { symbol: '/tʃ/', type: 'consonants', name: 'Voiceless Affricate', example: 'chair, nature, catch, church', audioText: 'chair, nature, catch' },
    { symbol: '/dʒ/', type: 'consonants', name: 'Voiced Affricate', example: 'jump, giant, edge, bridge', audioText: 'jump, giant, edge' },
    { symbol: '/m/', type: 'consonants', name: 'Bilabial Nasal', example: 'man, summer, jam, time', audioText: 'man, summer, jam' },
    { symbol: '/n/', type: 'consonants', name: 'Alveolar Nasal', example: 'no, funny, win, sun', audioText: 'no, funny, win' },
    { symbol: '/ŋ/', type: 'consonants', name: 'Velar Nasal (NG)', example: 'sing, finger, banker, long', audioText: 'sing, finger, long' },
    { symbol: '/r/', type: 'consonants', name: 'American Alveolar / Postalveolar Approximant', example: 'red, carrot, car, try', audioText: 'red, carrot, car' },
    { symbol: '/l/', type: 'consonants', name: 'Alveolar Lateral Approximant (Light/Dark)', example: 'love, ball, milk, call', audioText: 'love, ball, milk' },
    { symbol: '/j/', type: 'consonants', name: 'Palatal Approximant', example: 'yes, onion, cute, view', audioText: 'yes, onion, cute' },
    { symbol: '/w/', type: 'consonants', name: 'Labial-Velar Approximant', example: 'we, away, quick, swim', audioText: 'we, away, quick' },
  ];

  const filteredIpa = ipaSymbols.filter((item) => {
    if (ipaFilter === 'all') return true;
    return item.type === ipaFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Top Bar / Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLab}
          className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Return to Pronunciation Lab Drills</span>
        </button>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'system'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. The Sound System
          </button>
          <button
            onClick={() => setActiveTab('ipa')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'ipa'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. IPA Sound Chart
          </button>
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'mechanics'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Mechanics & Stress
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/40 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Reference Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Understanding American Pronunciation
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Spoken American English is an intricate acoustic system where written spelling is often an unreliable guide. Before diving into individual sound drills, master how English phonemes, syllables, word stress, and intonation contour map together in General American speech.
          </p>
        </div>
      </div>

      {/* TAB 1: THE SOUND SYSTEM */}
      {activeTab === 'system' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Core Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-100">Letters vs. Sounds</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                English has 26 letters in its alphabet but over 44 distinct sounds (phonemes). The same letter (like <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">o</code> in <span className="italic">hot</span>, <span className="italic">to</span>, <span className="italic">women</span>, and <span className="italic">gone</span>) can represent completely different sounds.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-100">Phonemes & Meaning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A phoneme is the smallest unit of sound that changes meaning. Swapping an American rhotic <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">/r/</code> for a tap or trill instantly alters <span className="italic">right</span> into another word or unnatural pronunciation.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-100">Syllable Architecture</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every English syllable requires a vowel nucleus. American English relies heavily on consonant clusters at the beginnings (<span className="italic">string</span>) and ends (<span className="italic">texts</span>) of syllables without adding parasitic vowels.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-100">Word Stress (Lexical)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Polysyllabic words have one primary stressed syllable that is louder, longer, and higher in pitch. Unstressed syllables undergo vowel reduction (often turning into schwa <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">/ə/</code>).
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                05
              </div>
              <h3 className="text-lg font-bold text-slate-100">Sentence Stress & Rhythm</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                English is a stress-timed language. Content words (nouns, verbs, adjectives) carry strong beats, while grammar words (articles, prepositions, pronouns) are compressed and reduced in between.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                06
              </div>
              <h3 className="text-lg font-bold text-slate-100">Intonation Contours</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Pitch direction communicates intent. Falling pitch signals finality or statements (<span className="italic">“That’s correct.”</span>), while rising pitch signals questions or continuation (<span className="italic">“Are you finished?”</span>).
              </p>
            </div>
          </div>

          {/* Deep Dive Section: Why Spelling Lies */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Why English Spelling Misleads Non-Native Speakers</h3>
                <p className="text-sm text-slate-400">Understanding historical orthographic shifts and loanwords.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 text-sm leading-relaxed">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="font-semibold text-teal-300 text-base">The "ough" Phenomenon</div>
                <p>
                  The letter sequence <code className="text-teal-200 bg-slate-800 px-1.5 py-0.5 rounded font-mono">ough</code> is pronounced in at least 9 different ways depending on context:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
                  <li>• though /ðoʊ/ (rhymes with go)</li>
                  <li>• through /θruː/ (rhymes with blue)</li>
                  <li>• rough /rʌf/ (rhymes with cuff)</li>
                  <li>• cough /kɔːf/ (rhymes with off)</li>
                  <li>• plough /plaʊ/ (rhymes with cow)</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="font-semibold text-teal-300 text-base">Silent Letters & Assimilation</div>
                <p>
                  Silent letters (<span className="italic">kn</span>ife, <span className="italic">wr</span>ite, dou<span className="italic">bt</span>) are relics of older Germanic or Romance pronunciations. In natural American speech, sounds also assimilate across word boundaries (e.g., <span className="italic">“did you”</span> becomes <span className="italic">“did-joo”</span> /dɪdʒu/).
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('ipa')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300"
                  >
                    <span>Explore the IPA Chart to see true phonemes</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IPA SOUND CHART */}
      {activeTab === 'ipa' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Interactive American IPA Sound Chart</h3>
              <p className="text-sm text-slate-400 mt-1">
                Click any IPA symbol to hear native American audio pronunciation and review sample words.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setIpaFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  ipaFilter === 'all'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All (44)
              </button>
              <button
                onClick={() => setIpaFilter('consonants')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  ipaFilter === 'consonants'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Consonants
              </button>
              <button
                onClick={() => setIpaFilter('vowels')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  ipaFilter === 'vowels'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Vowels
              </button>
              <button
                onClick={() => setIpaFilter('diphthongs')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  ipaFilter === 'diphthongs'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Diphthongs
              </button>
            </div>
          </div>

          {/* IPA Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredIpa.map((item) => {
              const sampleId = `ipa-${item.symbol}`;
              const isPlaying = playingId === sampleId;

              return (
                <div
                  key={item.symbol}
                  className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-2xl font-black text-teal-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800/80 shadow-inner group-hover:scale-105 transition-transform">
                        {item.symbol}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400">
                        {item.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Examples: <span className="text-slate-200 font-medium">{item.example}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">Click to listen</span>
                    <button
                      onClick={() => playSoundSample(item.audioText, sampleId)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isPlaying
                          ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
                          : 'bg-slate-800 hover:bg-teal-500/20 text-slate-200 hover:text-teal-300 border border-slate-700/60'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                      <span>{isPlaying ? 'Playing...' : 'Audio'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MECHANICS & STRESS */}
      {activeTab === 'mechanics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Biomechanics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                👅
              </div>
              <h3 className="text-lg font-bold text-slate-100">Tongue Placement</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                American English relies heavily on tongue tip elevation (alveolar ridge for /t, d, n, s, z, l/) and retroflexion or bunched retraction for the rhotic <code className="text-teal-300 font-mono">/r/</code>. Tongue root tension determines vowel tenseness.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                👄
              </div>
              <h3 className="text-lg font-bold text-slate-100">Lip & Jaw Posture</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Unlike British Received Pronunciation or French, American English utilizes relaxed, slightly rounded lips for back vowels and moderate vertical jaw opening for low vowels like <code className="text-teal-300 font-mono">/æ/</code> and <code className="text-teal-300 font-mono">/ɑ/</code>.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-100">Vocal Cords & Airflow</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Contrast voiced sounds (<code className="text-teal-300 font-mono">/v/, /z/, /ð/</code>) which vibrate vocal folds with voiceless counterparts (<code className="text-teal-300 font-mono">/f/, /s/, /θ/</code>) driven purely by continuous breath pressure.
              </p>
            </div>
          </div>

          {/* Connected Speech Rules */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Key Rules of Connected American Speech</h3>
                <p className="text-sm text-slate-400">How native speakers link words together for effortless pacing.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="font-bold text-teal-300 text-base">1. Consonant-to-Vowel Linking</div>
                <p className="text-slate-300">
                  When a word ends in a consonant and the next begins with a vowel, the consonant is attached to the beginning of the second word.
                </p>
                <div className="font-mono text-xs text-teal-400 bg-slate-900 p-3 rounded-xl">
                  "Hold on" → <span className="text-slate-200">Hol-don</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="font-bold text-teal-300 text-base">2. Flap T /d/ & /t/ Intervocalic Reduction</div>
                <p className="text-slate-300">
                  When <span className="font-mono">/t/</span> or <span className="font-mono">/d/</span> appears between two vowels where the first syllable is stressed, Americans pronounce it as a quick alveolar tap.
                </p>
                <div className="font-mono text-xs text-teal-400 bg-slate-900 p-3 rounded-xl">
                  "Water", "Better", "Metal" → <span className="text-slate-200">Wa-ter [ɾ]</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="font-bold text-teal-300 text-base">3. Elision (Dropping Unstressed Sounds)</div>
                <p className="text-slate-300">
                  Fast American speech drops certain plosives like <span className="font-mono">/t/</span> or <span className="font-mono">/d/</span> when sandwiched between consonants.
                </p>
                <div className="font-mono text-xs text-teal-400 bg-slate-900 p-3 rounded-xl">
                  "Next door" → <span className="text-slate-200">Nex-door</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="font-bold text-teal-300 text-base">4. Assimilation (Sound Fusion)</div>
                <p className="text-slate-300">
                  When certain sounds meet across word boundaries, they fuse into a brand new sound (e.g., <span className="font-mono">/s/ + /j/</span> becomes <span className="font-mono">/ʃ/</span>).
                </p>
                <div className="font-mono text-xs text-teal-400 bg-slate-900 p-3 rounded-xl">
                  "Bless you" → <span className="text-slate-200">Bless-yoo [blɛʃu]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to return */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onBackToLab}
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-teal-500/20 transition-all"
        >
          <span>Ready to Practice Drills? Open Pronunciation Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
