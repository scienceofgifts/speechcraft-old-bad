export interface VocabularyAtelierItem {
  id: string;
  category: 'Appearance & Style' | 'Personality & Character' | 'Voice & Manner' | 'Charm & Presence';
  word: string;
  ipa: string;
  definition: string;
  connotation: string;
  register: 'Casual' | 'Conversational' | 'Polished' | 'Literary' | 'Sensual' | 'Playful';
  collocations: string[];
  examples: string[];
  complimentUsage: string;
  naturalnessNotes: string;
  synonymDistinctions: string;
  commonMisuse: string;
  alternative: string;
}

export interface SubtletyTechnique {
  id: string;
  title: string;
  concept: string;
  directExample: string;
  understatedExample: string;
  analysis: string;
  whenToUse: string;
}

export interface ConstructionPattern {
  id: string;
  name: string;
  structure: string;
  example: string;
  techniqueExplanation: string;
  appropriateContexts: string;
  commonMistakes: string;
}

export interface RepertoireItem {
  id: string;
  subject: string;
  intention: string;
  intensityLevel: number; // 1 to 7
  expression: string;
  tone: string;
  context: string;
  naturalnessTip: string;
}

export const VOCABULARY_ATELIER_ITEMS: VocabularyAtelierItem[] = [
  {
    id: 'vocab-1',
    category: 'Appearance & Style',
    word: 'Striking',
    ipa: '/ˈstraɪ.kɪŋ/',
    definition: 'Attracting attention by reason of being unusual, extreme, or very sharply contrasting.',
    connotation: 'Bold, memorable, and visually arresting without feeling overly formal.',
    register: 'Conversational',
    collocations: ['striking appearance', 'striking eyes', 'striking contrast'],
    examples: [
      'You have striking eyes that completely command attention in any room.',
      'That emerald jacket is striking on you; it completely lights up your smile.',
      'There is something wonderfully striking about the way you carry yourself.'
    ],
    complimentUsage: 'Use when someone wears a bold color, has distinct features, or stands out in a uniquely positive way.',
    naturalnessNotes: 'Sounds confident, direct, and observant in modern American English.',
    synonymDistinctions: 'Unlike "beautiful" (which is general) or "pretty" (which is soft), "striking" implies visual impact and memorable presence.',
    commonMisuse: 'Using it to describe ordinary clothes or subtle features.',
    alternative: 'Remarkable'
  },
  {
    id: 'vocab-2',
    category: 'Appearance & Style',
    word: 'Alluring',
    ipa: '/əˈlʊr.ɪŋ/',
    definition: 'Powerfully and mysteriously attractive or fascinating.',
    connotation: 'Sensual, magnetic, and subtly intriguing.',
    register: 'Sensual',
    collocations: ['alluring smile', 'alluring presence', 'alluring mystery'],
    examples: [
      'You have an alluring way of keeping people guessing.',
      'There is something effortlessly alluring about the way you tell a story.',
      'That quiet confidence of yours is remarkably alluring.'
    ],
    complimentUsage: 'Best used in intimate or romantic settings where you want to highlight subtle magnetism.',
    naturalnessNotes: 'Carries romantic weight; use with appropriate familiarity.',
    synonymDistinctions: 'More subtle than "sexy" and more mysterious than "attractive".',
    commonMisuse: 'Using it casually in professional or casual acquaintance settings.',
    alternative: 'Captivating'
  },
  {
    id: 'vocab-3',
    category: 'Appearance & Style',
    word: 'Radiant',
    ipa: '/ˈreɪ.di.ənt/',
    definition: 'Shining brightly; emanating great joy, health, or good spirits.',
    connotation: 'Warm, luminous, glowing, and infectiously positive.',
    register: 'Polished',
    collocations: ['radiant smile', 'radiant energy', 'radiant glow'],
    examples: [
      'You look positively radiant tonight. Whatever you are doing, keep doing it.',
      'Your radiant energy walks into the room before you even do.',
      'That smile of yours is entirely radiant.'
    ],
    complimentUsage: 'Perfect for greeting someone on a date or praising their glowing mood.',
    naturalnessNotes: 'Exceptionally natural and warm in American English.',
    synonymDistinctions: 'Focuses on inner light and mood rather than strictly physical features.',
    commonMisuse: 'Applying it when someone looks tired or formal.',
    alternative: 'Glowing'
  },
  {
    id: 'vocab-4',
    category: 'Personality & Character',
    word: 'Perceptive',
    ipa: '/pərˈsep.tɪv/',
    definition: 'Having or showing a sensitive and keen insight; noticing details others miss.',
    connotation: 'Intellectual, attentive, and deeply observant.',
    register: 'Polished',
    collocations: ['perceptive observation', 'perceptive mind', 'highly perceptive'],
    examples: [
      'You are remarkably perceptive; you always notice the little details.',
      'I love how perceptive you are about people\'s motivations.',
      'That was a remarkably perceptive comment.'
    ],
    complimentUsage: 'An exceptional compliment for someone\'s emotional intelligence and sharpness.',
    naturalnessNotes: 'Deeply flattering because it praises someone\'s mind and attention.',
    synonymDistinctions: 'Focuses on noticing and understanding, whereas "smart" focuses on processing speed.',
    commonMisuse: 'Confusing it with being overly judgmental.',
    alternative: 'Observant'
  },
  {
    id: 'vocab-5',
    category: 'Personality & Character',
    word: 'Discerning',
    ipa: '/dɪˈsɜːr.nɪŋ/',
    definition: 'Having or showing good judgment and refined taste.',
    connotation: 'Sophisticated, selective, and tasteful.',
    register: 'Polished',
    collocations: ['discerning taste', 'discerning eye', 'discerning reader'],
    examples: [
      'You have remarkably discerning taste in film and music.',
      'I appreciate how discerning you are when choosing your projects.',
      'With your discerning eye, I knew you would spot the best spot in this gallery.'
    ],
    complimentUsage: 'Great for praising someone\'s curation of art, food, wine, or style.',
    naturalnessNotes: 'Elevates ordinary praise into sophisticated appreciation.',
    synonymDistinctions: 'Implies high standards and refined taste.',
    commonMisuse: 'Sounding snobbish or pretentious.',
    alternative: 'Tasteful'
  },
  {
    id: 'vocab-6',
    category: 'Voice & Manner',
    word: 'Captivating',
    ipa: '/ˈkæp.tɪ.veɪ.tɪŋ/',
    definition: 'Capable of attracting and holding interest; charming.',
    connotation: 'Hypnotic, engaging, and utterly absorbing.',
    register: 'Conversational',
    collocations: ['captivating voice', 'captivating storyteller', 'captivating presence'],
    examples: [
      'You have a captivating way of speaking that makes time stop.',
      'Listening to you talk about your passions is utterly captivating.',
      'There is something captivating about your laughter.'
    ],
    complimentUsage: 'Use to praise someone\'s storytelling, voice, or stage presence.',
    naturalnessNotes: 'Expressive and warm without feeling overly dramatic.',
    synonymDistinctions: 'Stronger than "interesting"; implies holding one\'s full attention.',
    commonMisuse: 'Applying it to boring or monotonous speech.',
    alternative: 'Engaging'
  },
  {
    id: 'vocab-7',
    category: 'Charm & Presence',
    word: 'Disarming',
    ipa: '/dɪsˈɑːr.mɪŋ/',
    definition: 'Allaying suspicion or hostility; charmingly approachable.',
    connotation: 'Open, disarming, sweet, and instantly comforting.',
    register: 'Conversational',
    collocations: ['disarming smile', 'disarming honesty', 'disarming charm'],
    examples: [
      'You have a wonderfully disarming smile that puts people immediately at ease.',
      'I love your disarming honesty; you never play games.',
      'There is something delightfully disarming about your wit.'
    ],
    complimentUsage: 'Great for praising someone\'s authenticity and ability to make others comfortable.',
    naturalnessNotes: 'Extremely sophisticated compliment for social grace.',
    synonymDistinctions: 'Means charm that breaks down defenses.',
    commonMisuse: 'Using it to mean physically disarmed.',
    alternative: 'Endearing'
  }
];

export const SUBTLETY_TECHNIQUES: SubtletyTechnique[] = [
  {
    id: 'sub-1',
    title: 'The Understated Observation',
    concept: 'Replacing loud declarations with quiet, confident observations.',
    directExample: 'You are the most gorgeous person in this entire city.',
    understatedExample: 'You have a rather distracting smile.',
    analysis: 'Understatement creates intrigue by leaving room for the listener\'s imagination. It sounds confident rather than eager.',
    whenToUse: 'On dates, in lounges, or during one-on-one conversations where you want to build chemistry gently.'
  },
  {
    id: 'sub-2',
    title: 'Behavioral Appreciation',
    concept: 'Complimenting an action, habit, or expression rather than static features.',
    directExample: 'I like your face.',
    understatedExample: 'I like how your whole expression changes when you talk about something you love.',
    analysis: 'Focusing on animations and habits shows you are paying close attention to who they are, not just what they look like.',
    whenToUse: 'When discussing passions, hobbies, or watching someone light up with enthusiasm.'
  },
  {
    id: 'sub-3',
    title: 'The Witty Deflection',
    concept: 'Framing admiration as a delightful inconvenience.',
    directExample: 'I am really attracted to you.',
    understatedExample: 'I was going to make a clever point, but you\'ve made that surprisingly difficult.',
    analysis: 'Blends humor with attraction, signaling interest while keeping the mood light and playful.',
    whenToUse: 'During witty banter or unexpected flirtatious eye contact.'
  }
];

export const CONSTRUCTION_PATTERNS: ConstructionPattern[] = [
  {
    id: 'pat-1',
    name: 'Pattern A: Specific Observation + Appreciation',
    structure: 'I like how you [specific behavior]. It makes you seem [quality].',
    example: 'I like how you can disagree with someone without making them feel stupid. It is a rare quality.',
    techniqueExplanation: 'Ties an admirable social behavior directly to a core character trait.',
    appropriateContexts: 'Professional networking, casual dates, and getting-to-know-you conversations.',
    commonMistakes: 'Choosing trivial or mundane behaviors.'
  },
  {
    id: 'pat-2',
    name: 'Pattern B: Unexpected Comparison',
    structure: 'You have the kind of [quality] that makes [unexpected observation].',
    example: 'You have the kind of laugh that makes everyone else seem a little too serious.',
    techniqueExplanation: 'Elevates a normal human trait into a unique superpower.',
    appropriateContexts: 'Romantic evenings, playful texting, and deep conversations.',
    commonMistakes: 'Exaggerating so wildly that it sounds sarcastic.'
  },
  {
    id: 'pat-3',
    name: 'Pattern C: Understatement',
    structure: 'You are rather [adjective], aren\'t you?',
    example: 'You are rather good at making an ordinary conversation interesting.',
    techniqueExplanation: 'Uses British-style understatement ("rather") in American English to create delightful irony.',
    appropriateContexts: 'Banter, teasing, and confident flirting.',
    commonMistakes: 'Delivering it with a flat or judgmental tone.'
  }
];

export const COMPLIMENT_REPERTOIRE: RepertoireItem[] = [
  {
    id: 'rep-1',
    subject: 'Appearance & Style',
    intention: 'Casual appreciation',
    intensityLevel: 2,
    expression: 'That color looks fantastic on you. It really brings out your eyes.',
    tone: 'Warm',
    context: 'Casual greeting or meeting up for coffee.',
    naturalnessTip: 'Keep your delivery breezy and natural.'
  },
  {
    id: 'rep-2',
    subject: 'Wit & Humor',
    intention: 'Playful and teasing',
    intensityLevel: 3,
    expression: 'Where do you come up with this stuff? You are dangerously witty.',
    tone: 'Playful',
    context: 'After a sharp comeback or funny observation.',
    naturalnessTip: 'Smile widely and deliver with playful mock shock.'
  },
  {
    id: 'rep-3',
    subject: 'Chemistry & Attraction',
    intention: 'Subtly flirtatious',
    intensityLevel: 4,
    expression: 'I have a feeling you are going to be entirely too much fun.',
    tone: 'Suggestive',
    context: 'Early date when chemistry is clearly clicking.',
    naturalnessTip: 'Lower your pitch slightly and hold eye contact.'
  },
  {
    id: 'rep-4',
    subject: 'Confidence & Presence',
    intention: 'Confident and direct',
    intensityLevel: 5,
    expression: 'I love how unapologetically yourself you are. It is refreshing.',
    tone: 'Direct',
    context: 'Deep conversation where opinions are being shared.',
    naturalnessTip: 'Speak with steady, unhurried cadence.'
  }
];
