import { VoiceDeliveryDrill } from '../types/speech';

export const VOICE_DELIVERY_DRILLS: VoiceDeliveryDrill[] = [
  // 1. Warm-ups & Vocal Health
  {
    id: 'warmup-lip-trills',
    title: 'Gentle Lip Trills & Relaxed Vocal Onset',
    category: 'warmup',
    instructions:
      'Place your fingers lightly on your cheeks. Blow gentle air through loose lips to create a motorboat sound ("brrrr"). Glide smoothly from a comfortable mid-pitch upward slightly, then glide back down. Keep throat open and relaxed.',
    precaution:
      'Never push or strain your voice. If you feel any tickle or tension in the throat, pause, swallow, and reduce breath pressure.',
    targetPhrase: 'Brrrrrr... (Smooth upward glide, then downward glide)',
    suggestedDurationSeconds: 120,
  },
  {
    id: 'warmup-humming-resonance',
    title: 'Nasal Resonance & Humming Buzz',
    category: 'warmup',
    instructions:
      'Keep your teeth slightly apart behind closed lips. Make a gentle "Mmmm" sound like tasting delicious food. Feel the gentle vibration on your lips and in your nasal bridge. Then open into an easy "Mmm-ah".',
    precaution:
      'Do not press vocal cords hard. The sound should feel effortless and forward.',
    targetPhrase: 'Mmmmmm... Mmm-ahhh... Good morning, great to be here.',
    suggestedDurationSeconds: 120,
  },
  {
    id: 'warmup-diaphragmatic-breath',
    title: 'Diaphragmatic Breath Support & Exhalation',
    category: 'warmup',
    instructions:
      'Place one hand on your abdomen. Inhale slowly through your nose for 4 seconds, feeling your stomach expand outward (not your chest rising). Exhale smoothly on a soft "Shhhh" sound for 6 seconds.',
    precaution:
      'Avoid shoulder tension. Breathe low and deep.',
    targetPhrase: 'Inhale deep... [4s]... Exhale steady on Shhhhh... [6s]',
    suggestedDurationSeconds: 150,
  },

  // 2. Clarity & Articulation
  {
    id: 'articulation-agility',
    title: 'Consonant Precision & Articulatory Agility',
    category: 'articulation',
    instructions:
      'Exercise the tongue tip and palate without unnecessary facial tension. Speak the syllables with crisp, light contacts rather than heavy pressure. Maintain an even, unhurried tempo.',
    precaution:
      'Do not clamp your jaw shut; keep teeth and lips nimble.',
    targetPhrase: 'Ta-da, ta-da, pa-ta-ka, pa-ta-ka. Crisp, clear, clean consonants.',
    suggestedDurationSeconds: 180,
  },
  {
    id: 'articulation-crisp-endings',
    title: 'Final Consonant Articulation',
    category: 'articulation',
    instructions:
      'Many non-native speakers drop final consonants (-t, -d, -s, -n). Pronounce each word fully without rushing the end of sentences.',
    precaution:
      'Pronounce every final consonant cleanly without over-enunciating like a robot.',
    targetPhrase: 'Exact results depend on strict attention to distinct phonetic details.',
    suggestedDurationSeconds: 180,
  },

  // 3. Pacing & Speed Control
    {
    id: 'pacing-controlled-tempo',
    title: 'Balanced Conversational Pacing (130-150 WPM)',
    category: 'pacing',
    instructions:
      'Many speakers accelerate when nervous. Practice a calm, steady rhythm where every syllable has room to breathe. Do not rush through connecting words.',
    precaution:
      'Keep your breath flowing steadily without jerky bursts of speed.',
    targetPhrase: 'Taking your time does not mean speaking slowly. It means maintaining a comfortable, confident rhythm.',
    suggestedDurationSeconds: 180,
  },

  // 4. Pausing & Thought Groups
  {
    id: 'pacing-thought-pauses',
    title: 'Thought Group Pausing & Rhythm Control',
    category: 'pacing',
    instructions:
      'Practice speaking in distinct "thought groups". Instead of continuous rushing, insert a deliberate 1-to-2 second silent breath pause after key clauses. Notice how silence projects authority and gives listeners time to absorb your point.',
    precaution:
      'Never fill pauses with "um" or "ah"—embrace the silent breath.',
    targetPhrase:
      'Great communicators do not speak faster. [pause] They speak in deliberate thought groups [pause] and allow silence to punctuate their message.',
    suggestedDurationSeconds: 180,
  },

  // 5. Vocal Variety & Pitch Modulation
  {
    id: 'inflection-pitch-variation',
    title: 'Natural American Melodic Contours',
    category: 'inflection',
    instructions:
      'General American English relies on "step downs" at the end of statements and "step ups" on stressed focus words. Practice elevating pitch slightly on the key operative word, then gliding down at the final period.',
    precaution:
      'Avoid singing or exaggerating pitch leaps unnaturally.',
    targetPhrase:
      'This is not just another update. This is the foundation of our entire roadmap.',
    suggestedDurationSeconds: 180,
  },

  // 6. Emphasis & Meaning
  {
    id: 'emphasis-contrastive-focus',
    title: 'Contrastive Stress & Meaning Shifts',
    category: 'emphasis' as any,
    instructions:
      'Shift vocal emphasis to different words in the same sentence to completely alter the implied meaning and contrast.',
    precaution:
      'Use pitch rise and volume support on the focused word.',
    targetPhrase: 'WE didn’t say they stole the data. (Someone else said it, or we implied it differently).',
    suggestedDurationSeconds: 180,
  },

  // 7. Confident Delivery
  {
    id: 'confident-executive-presence',
    title: 'Grounded Authority & Executive Presence',
    category: 'confident' as any,
    instructions:
      'Project confidence by lowering pitch slightly into your natural chest resonance, eliminating vocal fry at sentence ends, and finishing with a firm downward cadence.',
    precaution:
      'Do not artificially force a low gravelly voice; connect to your breath support.',
    targetPhrase: 'We have reviewed the metrics, evaluated the risks, and our recommendation is clear.',
    suggestedDurationSeconds: 180,
  },

  // 8. Delivery Styles / Personas
  {
    id: 'multi-style-delivery',
    title: 'Style Studio: 4 Delivery Personas',
    category: 'style',
    instructions:
      'Record the exact same target sentence across 4 distinct vocal styles. Listen to how pitch range, pacing, and vocal energy change the listener perception.',
    precaution:
      'Transition smoothly between personas while keeping your voice relaxed.',
    targetPhrase:
      'We need to reconsider our strategy before moving forward with the launch.',
    suggestedDurationSeconds: 240,
    styles: [
      {
        name: 'Conversational',
        description: 'Warm, relaxed, friendly colleague delivery.',
        tip: 'Natural tempo, relaxed jaw, easy conversational smile in the tone.',
      },
      {
        name: 'Thoughtful',
        description: 'Reflective, analytical, deliberate pacing.',
        tip: 'Slower tempo, measured pauses between clauses, moderate low-mid pitch.',
      },
      {
        name: 'Confident',
        description: 'Decisive executive presence, grounded authority.',
        tip: 'Steady chest resonance, crisp consonant stops, downward final cadence.',
      },
      {
        name: 'Expressive',
        description: 'Engaging keynote or storytelling energy.',
        tip: 'Expanded dynamic pitch range, energetic emphasis on operative words.',
      },
    ],
  },
];
