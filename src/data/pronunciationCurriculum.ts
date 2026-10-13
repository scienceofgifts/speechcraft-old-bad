import { PronunciationLesson } from '../types/speech';

export const PRONUNCIATION_LESSONS: PronunciationLesson[] = [
  {
    id: 'rhotic-r',
    title: 'The American Rhotic R & Vocalic R',
    targetSound: 'American /r/, /ɚ/, /ɝ/',
    category: 'Consonants & Colored Vowels',
    phoneticIpa: '/ɹ/, /ɚ/, /ɝ/',
    explanation:
      'General American English is strongly rhotic: the /r/ sound is pronounced in all positions, including before consonants and at the end of words. The tongue never taps or rolls against the roof of the mouth; instead, it retroflexes or bunches back.',
    mouthMechanics: {
      tongue:
        'Option A (Bunched): Pull the tongue body backward and upward toward the soft palate with sides touching the upper back molars. Option B (Retroflex): Curl the tip slightly upward and back without touching the roof.',
      lips: 'Slightly rounded and protruded, especially at the start of words.',
      jawAndVocalCords: 'Moderate jaw opening. Vocal cords vibrate continuously (voiced).',
    },
    commonMistakes:
      'Dropping the R at the end of syllables ("ca" instead of "car"), tapping the tongue tip like a Spanish/Italian R, or substituting a /w/ sound.',
    referenceAudioText: 'The early bird searches for water across the world.',
    words: [
      { word: 'Red', phonetic: '/rɛd/', context: 'Initial consonant' },
      { word: 'Bird', phonetic: '/bɝd/', context: 'Stressed vocalic R' },
      { word: 'Water', phonetic: '/ˈwɑtɚ/', context: 'Unstressed vocalic R ending' },
      { word: 'Hard', phonetic: '/hɑrd/', context: 'Post-vocalic R' },
      { word: 'World', phonetic: '/wɝld/', context: 'R-colored liquid blend' },
    ],
    minimalPairs: [
      { pairA: 'Car', pairB: 'Cat', difference: 'Strong vocalic R coloring vs flat vowel + stop' },
      { pairA: 'Bird', pairB: 'Bed', difference: 'R-colored central vowel /ɝ/ vs short front /ɛ/' },
      { pairA: 'Right', pairB: 'White', difference: 'Liquid /r/ with tongue tension vs bilabial glide /w/' },
    ],
    sentences: [
      'The red car turned right near the river.',
      'Our team worked harder than ever before.',
      'Water naturally gathers in the deepest corners.',
    ],
    tongueTwister:
      'A really rare red rabbit ran round and round the rugged rock.',
  },
  {
    id: 'th-sounds',
    title: 'Voiceless and Voiced TH',
    targetSound: 'Dental Fricatives /θ/ and /ð/',
    category: 'Consonants',
    phoneticIpa: '/θ/, /ð/',
    explanation:
      'The American "TH" sounds require gentle tongue-to-tooth contact allowing continuous airflow. /θ/ is voiceless (no vocal cord vibration, as in "think"), while /ð/ is voiced (cords vibrate, as in "this", "brother").',
    mouthMechanics: {
      tongue: 'Place the tip of your tongue lightly between the upper and lower front teeth (interdental) or just behind the edge of the upper teeth.',
      lips: 'Neutral and relaxed, keeping teeth visible.',
      jawAndVocalCords: 'Relaxed jaw. For /θ/, blow air softly. For /ð/, add your vocal voice (feel the throat buzz).',
    },
    commonMistakes:
      'Substituting /s/ or /t/ for voiceless TH ("sink" or "tink" for "think"), or substituting /d/ or /z/ for voiced TH ("dis" for "this").',
    referenceAudioText: 'They thought that their father would breathe easily.',
    words: [
      { word: 'Think', phonetic: '/θɪŋk/', context: 'Voiceless initial' },
      { word: 'This', phonetic: '/ðɪs/', context: 'Voiced grammatical word' },
      { word: 'Brother', phonetic: '/ˈbrʌðɚ/', context: 'Voiced medial' },
      { word: 'Breathe', phonetic: '/brið/', context: 'Voiced final verb' },
      { word: 'Breath', phonetic: '/brɛθ/', context: 'Voiceless final noun' },
    ],
    minimalPairs: [
      { pairA: 'Think', pairB: 'Sink', difference: 'Interdental fricative /θ/ vs alveolar /s/' },
      { pairA: 'Though', pairB: 'Dough', difference: 'Voiced dental /ð/ vs alveolar stop /d/' },
      { pairA: 'Three', pairB: 'Tree', difference: 'Fricative airflow /θ/ vs crisp alveolar stop /t/' },
    ],
    sentences: [
      'I think this Thursday is the best time for both of us.',
      'They walked through the thick forest together.',
      'Neither brother thought anything of the weather.',
    ],
    tongueTwister:
      'Thirty-three thousand thinkers thought they thrilled the throne.',
  },
  {
    id: 'v-vs-w',
    title: 'The /v/ Versus /w/ Distinction',
    targetSound: 'Labiodental /v/ vs Bilabial /w/',
    category: 'Consonants',
    phoneticIpa: '/v/, /w/',
    explanation:
      'Many learners unintentionally swap /v/ and /w/. In American English, /v/ is produced with the top teeth touching the bottom lip, while /w/ is produced with rounded lips without any teeth contact.',
    mouthMechanics: {
      tongue: 'Neutral for /v/; raised at the back (velar) for /w/.',
      lips: 'For /v/: Top teeth rest gently on the wet inner edge of the lower lip. For /w/: Lips form a tight, round "O" shape and glide open.',
      jawAndVocalCords: 'Both sounds are voiced; you should feel vocal vibrations in your throat.',
    },
    commonMistakes:
      'Using teeth for /w/ ("very well" sounding like "wery well" or "very vell").',
    referenceAudioText: 'Victor will visit the western valley very soon.',
    words: [
      { word: 'Very', phonetic: '/ˈvɛri/', context: 'Labiodental fricative' },
      { word: 'Well', phonetic: '/wɛl/', context: 'Bilabial glide' },
      { word: 'Voice', phonetic: '/vɔɪs/', context: 'Voiced labiodental' },
      { word: 'Water', phonetic: '/ˈwɑtɚ/', context: 'Rounded bilabial glide' },
      { word: 'Vivid', phonetic: '/ˈvɪvɪd/', context: 'Double /v/ clarity' },
    ],
    minimalPairs: [
      { pairA: 'Vine', pairB: 'Wine', difference: 'Teeth on bottom lip /v/ vs rounded lips /w/' },
      { pairA: 'Vest', pairB: 'West', difference: 'Fricative friction /v/ vs smooth glide /w/' },
      { pairA: 'Vet', pairB: 'Wet', difference: 'Bite lower lip /v/ vs round trumpet lips /w/' },
    ],
    sentences: [
      'We viewed the vast wildlife from the west window.',
      'Victor works very well with everyone in Washington.',
      'Whenever we visit the vineyard, we drink fresh water.',
    ],
    tongueTwister:
      'William voted for very warm wool vests in winter.',
  },
  {
    id: 'short-i-vs-long-ee',
    title: 'Vowel Contrasts: Short /ɪ/ vs Long /iː/',
    targetSound: 'Relaxed /ɪ/ (sit) vs Tense /iː/ (seat)',
    category: 'Vowels',
    phoneticIpa: '/ɪ/, /iː/',
    explanation:
      'A fundamental vowel contrast in English. /iː/ is tense, with the tongue high and the lips spreading into a slight smile. /ɪ/ is lax (relaxed), lower in the mouth, and slightly shorter in duration.',
    mouthMechanics: {
      tongue: 'For /iː/: High front, muscles tense. For /ɪ/: Drop tongue slightly, relax the entire mouth.',
      lips: 'For /iː/: Slight smile. For /ɪ/: Relaxed, neutral lips.',
      jawAndVocalCords: 'Slightly more jaw opening for /ɪ/. Both are fully voiced.',
    },
    commonMistakes:
      'Substituting tense /iː/ for /ɪ/, turning "ship" into "sheep" or "live" into "leave".',
    referenceAudioText: 'Please sit in this seat and listen to the music.',
    words: [
      { word: 'Sit', phonetic: '/sɪt/', context: 'Relaxed lax vowel' },
      { word: 'Seat', phonetic: '/siːt/', context: 'Tense high vowel' },
      { word: 'Live', phonetic: '/lɪv/', context: 'Lax vowel verb' },
      { word: 'Leave', phonetic: '/liːv/', context: 'Tense vowel verb' },
      { word: 'Minute', phonetic: '/ˈmɪnɪt/', context: 'Double short /ɪ/' },
    ],
    minimalPairs: [
      { pairA: 'Ship', pairB: 'Sheep', difference: 'Lax relaxed /ɪ/ vs tense smiling /iː/' },
      { pairA: 'Fill', pairB: 'Feel', difference: 'Relaxed short /ɪ/ vs drawn-out /iː/' },
      { pairA: 'Hit', pairB: 'Heat', difference: 'Quick drop jaw /ɪ/ vs tight tongue /iː/' },
    ],
    sentences: [
      'Will you live here or leave tomorrow morning?',
      'She slipped on the slick deck but did not sleep.',
      'This little building is bigger than we think.',
    ],
    tongueTwister:
      'Six slick slim slim-seated sheep sleep side by side.',
  },
  {
    id: 'ae-vowel',
    title: 'The American /æ/ (Cat) vs /ɛ/ (Bed)',
    targetSound: 'Open Front Unrounded Vowel /æ/',
    category: 'Vowels',
    phoneticIpa: '/æ/, /ɛ/',
    explanation:
      'The American /æ/ sound is wide, open, and forward. It is one of the most distinctive markers of General American English. Many learners pronounce it too high, confusing "bad" with "bed" or "man" with "men".',
    mouthMechanics: {
      tongue: 'Press tongue tip against back of lower front teeth; flatten the front and mid-tongue.',
      lips: 'Wide open horizontally and vertically.',
      jawAndVocalCords: 'Drop jaw significantly lower than for /ɛ/.',
    },
    commonMistakes:
      'Not dropping the jaw enough, making "cat" sound like "ket" or "packet" like "pecket".',
    referenceAudioText: 'The man had a black bag in his hand.',
    words: [
      { word: 'Cat', phonetic: '/kæt/', context: 'Open jaw monosyllable' },
      { word: 'Action', phonetic: '/ˈækʃən/', context: 'Stressed initial' },
      { word: 'Happen', phonetic: '/ˈhæpən/', context: 'Stressed syllable' },
      { word: 'Fact', phonetic: '/fækt/', context: 'Stop cluster ending' },
      { word: 'Strategy', phonetic: '/ˈstrætədʒi/', context: 'Professional vocabulary' },
    ],
    minimalPairs: [
      { pairA: 'Man', pairB: 'Men', difference: 'Low open jaw /æ/ vs mid-open /ɛ/' },
      { pairA: 'Bad', pairB: 'Bed', difference: 'Wide dropped jaw /æ/ vs relaxed /ɛ/' },
      { pairA: 'Pan', pairB: 'Pen', difference: 'Longer open /æ/ vs short mid /ɛ/' },
    ],
    sentences: [
      'That man has a practical plan for the business.',
      'We actually examined every single aspect of the data.',
      'Can you catch the black cat before it runs back?',
    ],
    tongueTwister:
      'Fat cats act happy and laugh at bad black hats.',
  },
  {
    id: 'diphthongs',
    title: 'American Diphthongs (/aʊ/, /aɪ/, /ɔɪ/, /eɪ/, /oʊ/)',
    targetSound: 'Dynamic Gliding Vowels',
    category: 'Vowels & Diphthongs',
    phoneticIpa: '/aʊ/, /aɪ/, /ɔɪ/, /eɪ/, /oʊ/',
    explanation:
      'American diphthongs are gliding vowels where the mouth transitions smoothly from one vowel position to another within the same syllable, creating a rich, dynamic resonance.',
    mouthMechanics: {
      tongue: 'Starts in an open or mid position and glides toward high front /ɪ/ or high back /ʊ/.',
      lips: 'Morph from open/neutral into rounded or spread configurations.',
      jawAndVocalCords: 'Active jaw movement reflecting the glide. Fully voiced.',
    },
    commonMistakes:
      'Monophthongizing diphthongs (pronouncing "house" as a pure "hahs" or "time" as "tahm").',
    referenceAudioText: 'Now is the time to find out about our loud voice.',
    words: [
      { word: 'House', phonetic: '/haʊs/', context: '/aʊ/ diphthong' },
      { word: 'Time', phonetic: '/taɪm/', context: '/aɪ/ diphthong' },
      { word: 'Voice', phonetic: '/vɔɪs/', context: '/ɔɪ/ diphthong' },
      { word: 'Late', phonetic: '/leɪt/', context: '/eɪ/ diphthong' },
      { word: 'Road', phonetic: '/roʊd/', context: '/oʊ/ diphthong' },
    ],
    minimalPairs: [
      { pairA: 'Cow', pairB: 'Co', difference: 'Gliding diphthong /aʊ/ vs pure monophthong /oʊ/' },
      { pairA: 'Ride', pairB: 'Road', difference: 'Glide to front /aɪ/ vs glide to back /oʊ/' },
    ],
    sentences: [
      'How loud is the sound outside our house right now?',
      'Take your time to find the right road downtown.',
      'Loyal friends always enjoy a good voice lesson.',
    ],
    tongueTwister:
      'Proud brown cows plow down towns without slowing down.',
  },
  {
    id: 'flap-t',
    title: 'The American Flap T [ɾ]',
    targetSound: 'Intervocalic Alveolar Tap [ɾ]',
    category: 'Connected Speech & Allophones',
    phoneticIpa: '[ɾ]',
    explanation:
      'In General American English, when a /t/ or /d/ occurs between two vowels and before an unstressed syllable, it is pronounced as a quick "flap" or "tap" of the tongue against the alveolar ridge, sounding almost like a quick /d/.',
    mouthMechanics: {
      tongue: 'Quickly tap the tip of the tongue against the tooth ridge behind the top teeth, without stopping the airflow or releasing a puff of air.',
      lips: 'Neutral and relaxed.',
      jawAndVocalCords: 'Continuous voicing throughout the tap.',
    },
    commonMistakes:
      'Over-pronouncing a sharp, aspirated British-style [tʰ] in words like "water" or "butter", or dropping it entirely as a glottal stop.',
    referenceAudioText: 'A little bit of butter makes the batter better.',
    words: [
      { word: 'Water', phonetic: '/ˈwɑ.ɾɚ/', context: 'Between vowel and vocalic r' },
      { word: 'City', phonetic: '/ˈsɪ.ɾi/', context: 'Between vowel and final vowel' },
      { word: 'Better', phonetic: '/ˈbɛ.ɾɚ/', context: 'Frequent comparative' },
      { word: 'Matter', phonetic: '/ˈmæ.ɾɚ/', context: 'Everyday noun/verb' },
      { word: 'Meeting', phonetic: '/ˈmi.ɾɪŋ/', context: 'Professional context' },
    ],
    minimalPairs: [
      { pairA: 'Latter (flap)', pairB: 'Ladder (flap)', difference: 'In American English, both sound virtually identical!' },
      { pairA: 'Writing', pairB: 'Riding', difference: 'Vowel before flap in riding is slightly longer' },
    ],
    sentences: [
      'Could you get me a bottle of cold water in the city?',
      'It does not matter if we start a little later.',
      'Her meeting was scheduled at four-thirty.',
    ],
    tongueTwister:
      'Betty Botter bought some butter, but she said the butter’s bitter.',
  },
  {
    id: 'glottal-t',
    title: 'Unreleased & Glottal T ([t̚], [ʔ])',
    targetSound: 'Glottal Stop & Held T',
    category: 'Allophones & American T Patterns',
    phoneticIpa: '[t̚], [ʔ]',
    explanation:
      'At the end of words or before another consonant (e.g., "cat", "department store"), Americans often stop airflow in the throat (glottal stop /ʔ/) or hold the tongue against the roof of the mouth without releasing a puff of air (unreleased /t̚/).',
    mouthMechanics: {
      tongue: 'Hold tongue against alveolar ridge without releasing for unreleased T.',
      lips: 'Neutral and relaxed.',
      jawAndVocalCords: 'Brief closure of vocal cords in throat for glottal stop.',
    },
    commonMistakes:
      'Releasing every final T with an exaggerated pop ("cat!" with heavy aspiration).',
    referenceAudioText: 'Put that cat right back on the mat.',
    words: [
      { word: 'Cat', phonetic: '/kæt̚/', context: 'Unreleased final stop' },
      { word: 'Department', phonetic: '/dɪˈpɑrt.mənʔ/', context: 'Glottalized medial t' },
      { word: 'Button', phonetic: '/ˈbʌ.tn̩/', context: 'Nasally released t' },
      { word: 'Network', phonetic: '/ˈnɛt.wɝk/', context: 'Consonant cluster t' },
      { word: 'That car', phonetic: '/ðæt car/', context: 'Phrase boundary hold' },
    ],
    minimalPairs: [
      { pairA: 'Cat (held)', pairB: 'Cat (popped)', difference: 'American unreleased stop vs textbook aspirated stop' },
    ],
    sentences: [
      'That department store is right across the street.',
      'Put the hot jacket back in the closet.',
      'Get out of the apartment right now.',
    ],
    tongueTwister:
      'That fat cat sat quietly at the department counter.',
  },
  {
    id: 'dark-l',
    title: 'The Dark L and Clear L ([ɫ], [l])',
    targetSound: 'Velarized Lateral Approximant [ɫ]',
    category: 'Consonants',
    phoneticIpa: '[ɫ], [l]',
    explanation:
      'American English features two distinct L sounds: "Clear L" before vowels (light tip contact) and "Dark L" at the ends of syllables or before consonants, where the back of the tongue pulls up toward the soft palate giving a deep, resonant quality.',
    mouthMechanics: {
      tongue: 'Tip touches gum ridge behind teeth, while back of tongue rises toward soft palate for dark L.',
      lips: 'Slightly open or rounded for dark L.',
      jawAndVocalCords: 'Voiced continuous resonance.',
    },
    commonMistakes:
      'Treating all L sounds as light front L, making words like "milk" or "ball" sound thin.',
    referenceAudioText: 'Bill fell off the ball while building a wall.',
    words: [
      { word: 'Light', phonetic: '/laɪt/', context: 'Clear initial L' },
      { word: 'Ball', phonetic: '/bɑɫ/', context: 'Dark final L' },
      { word: 'Milk', phonetic: '/mɪɫk/', context: 'Dark L before consonant' },
      { word: 'School', phonetic: '/skuɫ/', context: 'Dark final vowel-L' },
      { word: 'Feel', phonetic: '/fiɫ/', context: 'Resonant final L' },
    ],
    minimalPairs: [
      { pairA: 'Ball', pairB: 'Ba', difference: 'Resonant velarized dark L vs open vowel' },
      { pairA: 'Full', pairB: 'Foo', difference: 'Dark L ending vs vowel termination' },
    ],
    sentences: [
      'Jill felt cold while walking home from school.',
      'Please fill the glass with cold milk.',
      'All people should feel welcome in our building.',
    ],
    tongueTwister:
      'Little Lily left lovely letters all along the hall wall.',
  },
  {
    id: 'consonant-clusters',
    title: 'Consonant Clusters & Final Endings',
    targetSound: 'Complex Blends (-sts, -pts, -sks)',
    category: 'Consonants',
    phoneticIpa: '/sts/, /pts/, /sks/',
    explanation:
      'American English frequently packs multiple consonants at the ends of words (e.g., "tests", "texts", "asks"). Speakers must articulate each consonant cleanly without inserting extraneous vowel sounds.',
    mouthMechanics: {
      tongue: 'Rapid precise transitions from stop to fricative to alveolar sibilant.',
      lips: 'Neutral mouth shape with tight crisp final articulation.',
      jawAndVocalCords: 'Maintained breath support through the cluster tail.',
    },
    commonMistakes:
      'Adding an extra vowel ("tes-e-ts" instead of "tests") or dropping final sounds ("test" instead of "tests").',
    referenceAudioText: 'She tests complex scripts and asks tough questions.',
    words: [
      { word: 'Tests', phonetic: '/tɛsts/', context: '-sts cluster' },
      { word: 'Asks', phonetic: '/æsks/', context: '-sks cluster' },
      { word: 'Attempts', phonetic: '/əˈtɛmpts/', context: '-pts cluster' },
      { word: 'Months', phonetic: '/mʌnθs/', context: '-nths cluster' },
      { word: 'Facts', phonetic: '/fækts/', context: '-kts cluster' },
    ],
    minimalPairs: [
      { pairA: 'Test', pairB: 'Tests', difference: 'Single stop vs plural cluster /sts/' },
      { pairA: 'Ask', pairB: 'Asks', difference: 'Final fricative vs cluster /sks/' },
    ],
    sentences: [
      'He successfully completes complex tasks in three months.',
      'She always asks tough questions during science tests.',
      'All four attempts provided exact facts.',
    ],
    tongueTwister:
      'Six sticky skeleton sisters successfully solved complex tests.',
  },
  {
    id: 'schwa-and-reduction',
    title: 'The Schwa /ə/ & Rhythm Reduction',
    targetSound: 'Neutral Central Vowel /ə/',
    category: 'Prosody & Rhythm',
    phoneticIpa: '/ə/',
    explanation:
      'English is a stress-timed language. Unstressed vowels are reduced to the quick, effortless neutral sound: the Schwa /ə/. Pronouncing every syllable with full vowel clarity sounds robotic and unnatural.',
    mouthMechanics: {
      tongue: 'Completely relaxed in the center of the mouth.',
      lips: 'Completely relaxed, barely open.',
      jawAndVocalCords: 'Minimum muscle effort. Very short duration and low pitch.',
    },
    commonMistakes:
      'Spelling pronunciation: pronouncing the letter "a", "o", or "e" with full vowel weight in unstressed syllables.',
    referenceAudioText: 'The photographer took a photograph about a minute ago.',
    words: [
      { word: 'About', phonetic: '/əˈbaʊt/', context: 'Unstressed first syllable' },
      { word: 'Banana', phonetic: '/bəˈnænə/', context: 'Two schwas sandwiching /æ/' },
      { word: 'Problem', phonetic: '/ˈprɑbləm/', context: 'Second syllable reduction' },
      { word: 'Connect', phonetic: '/kəˈnɛkt/', context: 'Pre-stress reduction' },
      { word: 'Focus', phonetic: '/ˈfoʊkəs/', context: 'Final unstressed syllable' },
    ],
    minimalPairs: [
      { pairA: 'Photograph', pairB: 'Photography', difference: 'PHO-to-graph vs pho-TOG-ra-phy (stress shift causes vowel to reduce)' },
    ],
    sentences: [
      'I can go to the store to get a cup of coffee.',
      'He wanted to consider all of the possible options.',
      'It was a surprise to discover the answer so quickly.',
    ],
    tongueTwister:
      'A famous doctor forgot another doctor’s official appointment.',
  },
  {
    id: 'word-stress',
    title: 'Word Stress & Syllable Prominence',
    targetSound: 'Primary & Secondary Stress Patterns',
    category: 'Prosody & Stress',
    phoneticIpa: '/ˈstɹɛs/',
    explanation:
      'In American English words with multiple syllables, one syllable receives primary stress (louder, higher pitch, longer duration), while unstressed syllables are reduced. Shifting the stress often changes the noun/verb part of speech.',
    mouthMechanics: {
      tongue: 'Relaxed neutral position while voicing stressed syllables.',
      lips: 'Slightly more open on stressed syllables.',
      jawAndVocalCords: 'Push extra diaphragmatic air pressure and raise pitch noticeably higher on the stressed syllable.',
    },
    commonMistakes:
      'Giving equal volume and flat intonation to every syllable in a multi-syllable word.',
    referenceAudioText: 'Please record your progress on this important project.',
    words: [
      { word: 'PRO-ject (noun)', phonetic: '/ˈprɑ.dʒɛkt/', context: 'First syllable stress' },
      { word: 'pro-JECT (verb)', phonetic: '/prəˈdʒɛkt/', context: 'Second syllable stress' },
      { word: 'CON-duct (noun)', phonetic: '/ˈkɑn.dʌkt/', context: 'Noun stress' },
      { word: 'con-DUCT (verb)', phonetic: '/kənˈdʌkt/', context: 'Verb stress' },
      { word: 'RE-cord', phonetic: '/ˈrɛk.ɚd/', context: 'Noun stress' },
    ],
    minimalPairs: [
      { pairA: 'RE-cord (noun)', pairB: 're-CORD (verb)', difference: 'First vs second syllable stress shift' },
      { pairA: 'PRE-sent (noun)', pairB: 'pre-SENT (verb)', difference: 'Noun prominence vs verb prominence' },
    ],
    sentences: [
      'They will present the new project report at noon.',
      'Please conduct yourself with professional decorum.',
      'We recorded a significant increase in productivity.',
    ],
    tongueTwister:
      'Dynamic directors produce professional projects perfectly.',
  },
  {
    id: 'sentence-stress',
    title: 'Sentence Stress & Content Word Focus',
    targetSound: 'Information Prominence & Rhythm',
    category: 'Prosody & Rhythm',
    phoneticIpa: '[fəʊ.kəs]',
    explanation:
      'In American sentences, content words (nouns, main verbs, adjectives, adverbs) carry heavy stress, while structure words (pronouns, prepositions, articles, conjunctions) are compressed and weakened.',
    mouthMechanics: {
      tongue: 'Flexible and quick during reduced structure words.',
      lips: 'Relaxed for grammar words, expressive for stressed content words.',
      jawAndVocalCords: 'Energy surges on key information words; energy dips smoothly across grammar words.',
    },
    commonMistakes:
      'Stressing every word equally (machine-gun style speech).',
    referenceAudioText: 'I bought a NEW computer yesterday afternoon.',
    words: [
      { word: 'HE did it.', phonetic: '/hi dɪd ɪt/', context: 'Pronoun focus' },
      { word: 'He DID it!', phonetic: '/hi dɪd ɪt/', context: 'Auxiliary verb emphasis' },
      { word: 'Red car', phonetic: '/rɛd kɑr/', context: 'Adjective + Noun stress' },
    ],
    minimalPairs: [
      { pairA: 'I want a RED pen.', pairB: 'I WANT a red pen.', difference: 'Focus on color vs focus on desire' },
    ],
    sentences: [
      'She traveled to Boston to attend the national conference.',
      'IMPORTANT decisions require CAREFUL analysis.',
      'We need MORE coffee before the meeting starts.',
    ],
    tongueTwister:
      'Big bright bold birds build beautiful brown barns.',
  },
  {
    id: 'connected-speech',
    title: 'Connected Speech, Linking & Catenation',
    targetSound: 'Consonant-to-Vowel Linking & Word Blends',
    category: 'Fluency & Flow',
    phoneticIpa: '[lɪŋ.kɪŋ]',
    explanation:
      'Native American speakers do not pause between every word. When one word ends in a consonant and the next begins with a vowel, the consonant glides directly onto the next vowel ("hold on" sounds like "hol-don").',
    mouthMechanics: {
      tongue: 'Smooth, unbroken transitions across word boundaries.',
      lips: 'Fluid movement without releasing air stops prematurely.',
      jawAndVocalCords: 'Continuous breath support across thought groups.',
    },
    commonMistakes:
      'Inserting glottal stops between every single word, creating staccato or choppy delivery.',
    referenceAudioText: 'Turn it off and check it out before you leave.',
    words: [
      { word: 'Hold on', phonetic: '/hoʊl-dɑn/', context: 'Consonant + Vowel linking' },
      { word: 'Pick it up', phonetic: '/pɪ-kɪ-tʌp/', context: 'Multi-word catenation' },
      { word: 'Could you', phonetic: '/ˈkʊdʒ.uː/', context: 'Palatalization blend' },
      { word: 'Far away', phonetic: '/fɑr-əˈweɪ/', context: 'Linking R' },
    ],
    minimalPairs: [
      { pairA: 'Turn it off', pairB: 'Turn (pause) it (pause) off', difference: 'Connected smooth catenation vs choppy unnatural pauses' },
    ],
    sentences: [
      'Turn it on, check it out, and let us know what you think.',
      'I worked on it all afternoon without any trouble.',
      'Did you see if an apple fell off of the tree?',
    ],
    tongueTwister:
      'Pick it up and put it on, pack it in and turn it off.',
  },
  {
    id: 'intonation',
    title: 'Intonation, Pitch & Tone Patterns',
    targetSound: 'Declarative Pitch Drops & Interrogative Rises',
    category: 'Prosody & Intonation',
    phoneticIpa: '[ɪn.təˈneɪ.ʃən]',
    explanation:
      'American intonation conveys emotional attitude and grammatical intent. Statements end with a downward pitch glide (falling intonation), while yes/no questions and unfinished clauses use rising pitch.',
    mouthMechanics: {
      tongue: 'Relaxed articulation supporting vocal pitch modulation.',
      lips: 'Neutral and expressive.',
      jawAndVocalCords: 'Smoothly modulate pitch up for questions/suspense and down for statements/conclusion.',
    },
    commonMistakes:
      'Using a rising inflection at the end of definitive statements (upspeak), making assertive declarations sound uncertain.',
    referenceAudioText: 'Where did you leave your car keys this morning?',
    words: [
      { word: 'Statement ↘', phonetic: '/fɑːlɪŋ/', context: 'Pitch drops at period' },
      { word: 'Question ↗', phonetic: '/raɪzɪŋ/', context: 'Pitch rises at question mark' },
      { word: 'List ↗, ↗, ↘', phonetic: '/mʌl.tɪ.pəl/', context: 'Continuity rises then final fall' },
    ],
    minimalPairs: [
      { pairA: 'Really? (question ↗)', pairB: 'Really. (statement ↘)', difference: 'Rising curiosity vs falling certainty' },
    ],
    sentences: [
      'She finished the quarterly report ahead of schedule.',
      'Are you planning to attend the conference in Chicago?',
      'Please bring pens, paper, notebooks, and folders.',
    ],
    tongueTwister:
      'Why would wise Wendy wonder where wonderful winter went?',
  },
];
