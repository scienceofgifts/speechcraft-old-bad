export interface TongueTwisterExercise {
  id: string;
  phrase: string;
  category:
    | 'Consonant Contrasts'
    | 'Consonant Clusters'
    | 'Vowels & Diphthongs'
    | 'American Speech Patterns'
    | 'Articulation & Precision';
  primaryTarget: string;
  secondaryTargets: string[];
  phoneticIpa: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  challengingWordsOrSequences: string[];
  phoneticChallenge: string;
  articulationGuidance: string;
  commonMistakes: string;
  recommendedSpeed: string;
  completionCriterion: string;
  relatedLessonIds: string[];
}

export const TONGUE_TWISTERS_CATALOGUE: TongueTwisterExercise[] = [
  // --- Consonant Contrasts ---
  {
    id: 'tt-r-l-1',
    phrase: 'Truly rural learners really love reading brilliant literary literature.',
    category: 'Consonant Contrasts',
    primaryTarget: '/r/ versus /l/',
    secondaryTargets: ['Liquid consonants', 'Vocalic R'],
    phoneticIpa: '/ˈtruli ˈrʊrəl ˈlɝnɚz ˈrili lʌv ˈridɪŋ ˈbrɪljənt ˈlɪtərɛri ˈlɪtərətʃɚ/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Truly rural', 'really love', 'brilliant literary'],
    phoneticChallenge:
      'Alternating rapidly between the bunched or retroflex rhotic /r/ (where tongue sides touch molars without tapping the palate) and the lateral approximant /l/ (where the tongue tip taps the alveolar ridge while air escapes around the sides).',
    articulationGuidance:
      'For /r/, pull the tongue body back with arched tension and rounded lips. Instantly flatten the tip against the alveolar ridge for /l/ while dropping tongue sides. Do not let /r/ sound like /w/ or /l/ sound like /r/.',
    commonMistakes:
      'Substituting /w/ for /r/ ("wuly") or letting /l/ pick up an R-coloring when adjacent.',
    recommendedSpeed: 'Start slow at 70 WPM, focusing on clean tongue switches before accelerating.',
    completionCriterion: 'Speak clearly 3 times at 110+ WPM with distinct /r/ and /l/ acoustic boundaries.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-r-pos-2',
    phrase: 'A really rare red rabbit ran round and round the rugged rock.',
    category: 'Consonant Contrasts',
    primaryTarget: '/r/ in different word positions',
    secondaryTargets: ['Initial R', 'Medial R', 'Voiced fricative transitions'],
    phoneticIpa: '/ə ˈrili rɛr rɛd ˈræbɪt ræn raʊnd ənd raʊnd ðə ˈrʌgɪd rɑk/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['really rare red', 'round and round', 'rugged rock'],
    phoneticChallenge:
      'Maintaining consistent rhotic lip protrusion and tongue bunching across initial /r/ in multiple consecutive stressed words without weakening into a neutral vowel.',
    articulationGuidance:
      'Protrude lips slightly for "really rare red" and keep the tongue elevated. Ensure the retroflex position does not drop during the transition to "rabbit ran".',
    commonMistakes:
      'Dropping lip rounding on "rare" and tapping the tongue tip on "rugged".',
    recommendedSpeed: 'Begin at 80 WPM, ensuring every R is fully resonated.',
    completionCriterion: 'Zero dropped R sounds across 3 clean repetitions.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-th-1',
    phrase: 'Thirty-three thousand thinkers thought they thrilled the throne.',
    category: 'Consonant Contrasts',
    primaryTarget: '/θ/ and /ð/ ("th" sounds)',
    secondaryTargets: ['Dental Fricatives', 'Voiceless vs Voiced TH'],
    phoneticIpa: '/ˈθɝti θri ˈθaʊzənd ˈθɪŋkɚz θɔt ðeɪ θrɪld ðə θroʊn/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Thirty-three thousand', 'thought they', 'thrilled the'],
    phoneticChallenge:
      'Sustaining interdental friction for /θ/ while transitioning smoothly into plosives and alveolar stops without pulling the tongue back prematurely inside the teeth.',
    articulationGuidance:
      'Rest tongue tip lightly against the cutting edge of upper teeth. Blow continuous air for /θ/ in "thirty" and activate vocal cords for /ð/ in "they" and "the".',
    commonMistakes:
      'Substituting /s/ ("sirty") or /t/ ("tirty") for /θ/, or /d/ for /ð/.',
    recommendedSpeed: 'Start at 60 WPM with exaggerated interdental contact.',
    completionCriterion: 'Clean fricative airflow without dental clicks or stop substitutions.',
    relatedLessonIds: ['th-sounds'],
  },
  {
    id: 'tt-s-sh-1',
    phrase: 'She sells seashells by the seashore and surely she succeeds.',
    category: 'Consonant Contrasts',
    primaryTarget: '/s/ and /ʃ/ ("s" and "sh")',
    secondaryTargets: ['Alveolar vs Post-alveolar Fricatives'],
    phoneticIpa: '/ʃi sɛlz ˈsiˌʃɛlz baɪ ðə ˈsiˌʃɔr ənd ˈʃʊrli ʃi səkˈsidz/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['She sells seashells', 'seashore and surely'],
    phoneticChallenge:
      'Rapid switching between the sharp, grooved alveolar fricative /s/ (tongue tip behind lower teeth or alveolum) and the broad, domed post-alveolar fricative /ʃ/ (tongue blade raised toward the hard palate with rounded lips).',
    articulationGuidance:
      'For /s/, keep lips spread and direct air through a narrow tongue groove. For /ʃ/, pucker lips slightly and broaden the tongue channel against the palate.',
    commonMistakes:
      'Blending /s/ and /ʃ/ into a slushy middle sound ("she sells seashhells").',
    recommendedSpeed: '90 WPM, focusing on sharp acoustic contrast between /s/ and /ʃ/.',
    completionCriterion: 'Distinct acoustic differentiation on all "s" and "sh" pairs.',
    relatedLessonIds: ['th-sounds'],
  },
  {
    id: 'tt-v-w-1',
    phrase: 'Victor will visit the western valley whenever winter winds blow.',
    category: 'Consonant Contrasts',
    primaryTarget: '/v/ and /w/',
    secondaryTargets: ['Labiodental vs Bilabial glides'],
    phoneticIpa: '/ˈvɪktɚ wɪl ˈvɪzɪt ðə ˈwɛstɚn ˈvæli wɛnˈɛvɚ ˈwɪntɚ wɪndz bloʊ/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Victor will visit', 'western valley whenever', 'winter winds'],
    phoneticChallenge:
      'Alternating between upper-teeth-on-lower-lip friction for /v/ and rounded lip-gliding for /w/ without conflating the two labial postures.',
    articulationGuidance:
      'Touch wet inner lip with top teeth for /v/. Form a tight circular opening with relaxed lips for /w/. Never touch teeth to lips on /w/.',
    commonMistakes:
      'Pronouncing /w/ as /v/ ("vinter vinds") or vice versa.',
    recommendedSpeed: '85 WPM.',
    completionCriterion: '100% labiodental accuracy on /v/ and bilabial accuracy on /w/.',
    relatedLessonIds: ['v-vs-w'],
  },
  {
    id: 'tt-b-v-1',
    phrase: 'Vibrant Bob bought valuable books before boarding the big bus.',
    category: 'Consonant Contrasts',
    primaryTarget: '/b/ and /v/',
    secondaryTargets: ['Bilabial stop vs Labiodental fricative'],
    phoneticIpa: '/ˈvaɪbrənt bɑb bɑt ˈvæljuəbəl bʊks bɪˈfɔr ˈbɔrdɪŋ ðə bɪg bʌs/',
    difficulty: 'Beginner',
    challengingWordsOrSequences: ['Vibrant Bob', 'valuable books', 'big bus'],
    phoneticChallenge:
      'Transitioning from continuous lip-friction /v/ to complete bilabial closure and release for /b/.',
    articulationGuidance:
      'Press both lips firmly together for /b/, releasing air with a pop. Rest upper teeth on lower lip for /v/.',
    commonMistakes:
      'Fricative leakage on /b/ or bilabial stop closure on /v/.',
    recommendedSpeed: '80 WPM.',
    completionCriterion: 'Clean stop release for /b/ and continuous friction for /v/.',
    relatedLessonIds: ['v-vs-w'],
  },
  {
    id: 'tt-ch-sh-1',
    phrase: 'Which Czech chief checks the church chairs each chilly chance?',
    category: 'Consonant Contrasts',
    primaryTarget: '/tʃ/ and /ʃ/ ("ch" and "sh")',
    secondaryTargets: ['Affricate vs Fricative'],
    phoneticIpa: '/wɪtʃ tʃɛk tʃif tʃɛks ðə tʃɝtʃ tʃɛrz itʃ ˈtʃɪli tʃæns/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Which Czech chief', 'church chairs', 'chilly chance'],
    phoneticChallenge:
      'Mastering the complete stop closure + fricative release of affricate /tʃ/ versus continuous turbulent airflow of fricative /ʃ/.',
    articulationGuidance:
      'Press tongue firmly against alveolar ridge before releasing into friction for /tʃ/. Maintain continuous turbulent air without initial stop closure for /ʃ/.',
    commonMistakes:
      'Dropping the initial /t/ stop portion of /tʃ/, making it sound like /ʃ/.',
    recommendedSpeed: '75 WPM.',
    completionCriterion: 'Crisp affricate release on all /tʃ/ occurrences.',
    relatedLessonIds: ['th-sounds'],
  },

  // --- Consonant Clusters ---
  {
    id: 'tt-cluster-str-1',
    phrase: 'Strong street strings straighten sturdy structural structures.',
    category: 'Consonant Clusters',
    primaryTarget: 'Initial clusters (/str/, /spr/, /skr/)',
    secondaryTargets: ['Complex onset clusters'],
    phoneticIpa: '/strɔŋ strit strɪŋz ˈstreɪtən ˈstɝdi ˈstrʌktʃərəl ˈstrʌktʃɚz/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Strong street', 'strings straighten', 'sturdy structural'],
    phoneticChallenge:
      'Executing a three-consonant initial cluster /str/ without inserting an intrusive schwa vowel between /s/, /t/, and /r/.',
    articulationGuidance:
      'Blend /s/, /t/, and /r/ into a seamless onset stream. Keep tongue tip alveolar for /s/ and /t/, instantly transitioning to bunched R without breaking airflow.',
    commonMistakes:
      'Inserting an intrusive vowel ("s-tuh-rong") or weakening the /t/.',
    recommendedSpeed: '65 WPM initially, scaling to 100 WPM.',
    completionCriterion: 'Clean 3-consonant cluster without schwa insertion.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-cluster-spr-2',
    phrase: 'Spring spray spreads swift sprouts across the spacious square.',
    category: 'Consonant Clusters',
    primaryTarget: '/spr/ and /skr/ initial clusters',
    secondaryTargets: ['Bilabial and velar plosive clusters'],
    phoneticIpa: '/sprɪŋ spreɪ sprɛdz swɪft spraʊts əˈkrɔs ðə ˈspeɪʃəs skwɛr/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Spring spray spreads', 'spacious square'],
    phoneticChallenge:
      'Maintaining clear bilabial stop /p/ release within /spr/ cluster followed by liquid /r/ without voicing reduction.',
    articulationGuidance:
      'Form /s/ friction, close lips for /p/, and glide into bunched /r/. Keep airflow continuous.',
    commonMistakes:
      'Omitting /p/ or turning /spr/ into /s-b/ or /s-w/.',
    recommendedSpeed: '80 WPM.',
    completionCriterion: 'Clear /spr/ onset across all words.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-cluster-final-3',
    phrase: 'The strict scripts asked artists past sixth street desks.',
    category: 'Consonant Clusters',
    primaryTarget: 'Final consonant clusters',
    secondaryTargets: ['Multi-consonant codas (/kts/, /sts/, /kst/)'],
    phoneticIpa: '/ðə strɪkt skrɪpts æskt ˈɑrtɪsts pæst sɪkθ strit dɛsks/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['strict scripts', 'artists past', 'sixth street desks'],
    phoneticChallenge:
      'Articulating complex word-final consonant clusters (such as /kts/, /sts/, /kθs/) clearly without deleting final phonemes.',
    articulationGuidance:
      'Articulate each coda stop and fricative sequentially with crisp tongue movements. Do not clip the final /s/ or /t/.',
    commonMistakes:
      'Dropping final /t/ or /k/ in clusters ("scrips" instead of "scripts").',
    recommendedSpeed: '70 WPM.',
    completionCriterion: 'All coda consonants articulated audibly.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-cluster-boundary-4',
    phrase: 'Best texts cost five fast cents past last tests.',
    category: 'Consonant Clusters',
    primaryTarget: 'Consonant sequences across word boundaries',
    secondaryTargets: ['Connected speech blending'],
    phoneticIpa: '/bɛst tɛksts kɔst faɪv fæst sɛnts pæst læst tɛsts/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Best texts', 'fast cents', 'past last tests'],
    phoneticChallenge:
      'Navigating identical or similar consonant collisions across word boundaries without stuttering or dropping sounds.',
    articulationGuidance:
      'Link final and initial consonants smoothly. Maintain steady breath support through word transitions.',
    commonMistakes:
      'Pausing awkwardly between words or swallowing final clusters.',
    recommendedSpeed: '75 WPM.',
    completionCriterion: 'Smooth word boundary transitions without hesitation.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-cluster-smooth-5',
    phrase: 'Six sticky skeleton keys unlock crisp crisp boxes.',
    category: 'Consonant Clusters',
    primaryTarget: 'Difficult combinations without schwa insertion',
    secondaryTargets: ['Intervocalic clusters'],
    phoneticIpa: '/sɪks ˈstɪki ˈskɛlətən kiz ʌnˈlɑk krɪsp krɪsp ˈbɑksɪz/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Six sticky skeleton', 'unlock crisp'],
    phoneticChallenge:
      'Preventing epenthesis (inserting extra vowels) between complex stop-fricative sequences.',
    articulationGuidance:
      'Keep mouth relaxed and move directly from alveolar /ks/ to alveolar /st/ without vocalic padding.',
    commonMistakes:
      'Saying "sih-ticks" instead of "sticks".',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Zero vowel insertion between clustered consonants.',
    relatedLessonIds: ['rhotic-r'],
  },

  // --- Vowels & Diphthongs ---
  {
    id: 'tt-vowel-i-ee-1',
    phrase: 'Will Pete still feel sick when swift ships slip?',
    category: 'Vowels & Diphthongs',
    primaryTarget: '/ɪ/ versus /iː/',
    secondaryTargets: ['Lax /ɪ/ vs Tense /iː/ contrast'],
    phoneticIpa: '/wɪl pit stɪl fil sɪk wɛn swɪft ʃɪps slɪp/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Will Pete', 'still feel', 'sick when', 'ships slip'],
    phoneticChallenge:
      'Rapidly contrasting lax short /ɪ/ (low tongue, relaxed jaw) with tense long /iː/ (high front tongue, smile lips).',
    articulationGuidance:
      'Feel jaw drop slightly for /ɪ/ ("will", "sick") and tighten high front arch for /iː/ ("Pete", "feel").',
    commonMistakes:
      'Neutralizing the vowel distinction, making /ɪ/ sound like /iː/.',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Clear acoustic distinction between lax and tense vowels in minimal pairs.',
    relatedLessonIds: ['short-i-vs-long-ee'],
  },
  {
    id: 'tt-vowel-e-ae-2',
    phrase: 'That fat black cat sat back and scratched the red rag.',
    category: 'Vowels & Diphthongs',
    primaryTarget: '/ɛ/ versus /æ/',
    secondaryTargets: ['Front vowel contrasts'],
    phoneticIpa: '/ðæt fæt blæk kæt sæt bæk ənd skrætʃt ðə rɛd ræg/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['That fat black cat', 'sat back', 'red rag'],
    phoneticChallenge:
      'Distinguishing mid-front /ɛ/ ("red") from low-front /æ/ ("cat", "fat", "black") where the jaw must drop significantly lower for /æ/.',
    articulationGuidance:
      'For /æ/, drop your jaw wide and spread lips horizontally. For /ɛ/, raise the jaw halfway with relaxed lips.',
    commonMistakes:
      'Raising /æ/ towards /ɛ/ ("cat" sounding like "ket").',
    recommendedSpeed: '80 WPM.',
    completionCriterion: 'Accurate wide jaw drop for /æ/ vs mid-height for /ɛ/.',
    relatedLessonIds: ['short-i-vs-long-ee'],
  },
  {
    id: 'tt-vowel-u-oo-3',
    phrase: 'Good blue ooze cools foolish youthful groups.',
    category: 'Vowels & Diphthongs',
    primaryTarget: '/ʊ/ versus /uː/',
    secondaryTargets: ['Lax back /ʊ/ vs Tense back /uː/'],
    phoneticIpa: '/gʊd blu uz kulz ˈfulɪʃ ˈjuθfəl grups/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Good blue ooze', 'cools foolish', 'youthful groups'],
    phoneticChallenge:
      'Contrasting lax /ʊ/ ("good", rounded lips relaxed) with tense /uː/ ("blue", "ooze", protruded tight lip rounding).',
    articulationGuidance:
      'For /ʊ/, lips are loosely rounded. For /uː/, lips push forward into a tight tube with tongue raised high in the back.',
    commonMistakes:
      'Over-rounding /ʊ/ or under-rounding /uː/.',
    recommendedSpeed: '80 WPM.',
    completionCriterion: 'Consistent lip rounding differentiation.',
    relatedLessonIds: ['short-i-vs-long-ee'],
  },
  {
    id: 'tt-vowel-ah-uh-4',
    phrase: 'Calm cop cuts tough nuts under bright summer suns.',
    category: 'Vowels & Diphthongs',
    primaryTarget: '/ɑ/ versus /ʌ/',
    secondaryTargets: ['Low back open vs Mid central unrounded'],
    phoneticIpa: '/kɑm kɑp kʌts tʌf nʌts ˈʌndɚ braɪt ˈsʌmɚ sʌnz/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Calm cop cuts', 'tough nuts', 'summer suns'],
    phoneticChallenge:
      'Distinguishing open back unrounded /ɑ/ ("calm", "cop") from mid-central unrounded /ʌ/ ("cuts", "tough", "suns").',
    articulationGuidance:
      'For /ɑ/, drop jaw low with flat tongue. For /ʌ/, keep jaw in neutral central position with relaxed tongue body.',
    commonMistakes:
      'Merging /ɑ/ and /ʌ/ into a single low-central vowel.',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Accurate open-back vs central vowel tongue positioning.',
    relatedLessonIds: ['short-i-vs-long-ee'],
  },
  {
    id: 'tt-vowel-diphthong-5',
    phrase: 'Bright brown owls prowl around noisy town squares.',
    category: 'Vowels & Diphthongs',
    primaryTarget: 'Common American English diphthongs (/aʊ/, /ɔɪ/, /aɪ/)',
    secondaryTargets: ['Dynamic vowel glides'],
    phoneticIpa: '/braɪt braʊn aʊlz praʊl əˈraʊnd ˈnɔɪzi taʊn skwɛrz/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Bright brown', 'owls prowl', 'noisy town'],
    phoneticChallenge:
      'Gliding smoothly from an open starting vowel position to a high target position without halting or clipping the diphthong.',
    articulationGuidance:
      'Ensure the glide covers the full trajectory (e.g. /a/ to /ʊ/ for /aʊ/). Do not cut the glide short.',
    commonMistakes:
      'Monophthongizing diphthongs (pronouncing "town" as "taan").',
    recommendedSpeed: '75 WPM.',
    completionCriterion: 'Full dynamic vowel glides on all diphthong targets.',
    relatedLessonIds: ['short-i-vs-long-ee'],
  },

  // --- American English Speech Patterns ---
  {
    id: 'tt-speech-flapt-1',
    phrase: 'Betty bought a better bottle of bitter bottled water.',
    category: 'American Speech Patterns',
    primaryTarget: 'Flap T in suitable word contexts',
    secondaryTargets: ['Intervocalic alveolar flapping (/ɾ/)', 'Schwa reduction'],
    phoneticIpa: '/ˈbɛti bɑt ə ˈbɛtɚ ˈbɑtəl ʌv ˈbɪtɚ ˈbɑtəld ˈwɑtɚ/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Betty bought a better', 'bottle of bitter', 'bottled water'],
    phoneticChallenge:
      'Pronouncing intervocalic /t/ and /d/ as a quick alveolar flap /ɾ/ (sounding like a rapid tap of the tongue against the ridge) rather than a crisp aspirated stop.',
    articulationGuidance:
      'Allow your tongue tip to flick rapidly and lightly against the roof of the mouth between vowels. Do not hit it hard like a British /t/.',
    commonMistakes:
      'Pronouncing "better" with a heavy British or foreign aspirated /t/ ("bet-tuh").',
    recommendedSpeed: '90 WPM, emphasizing natural American flapping.',
    completionCriterion: 'Natural flap T /ɾ/ production across all intervocalic contexts.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-speech-schwa-2',
    phrase: 'A clever mother zebra sofa banana tomato protocol.',
    category: 'American Speech Patterns',
    primaryTarget: 'Reduced vowels and schwa (/ə/ and /ɚ/)',
    secondaryTargets: ['Unstressed syllable reduction'],
    phoneticIpa: '/ə ˈklɛvɚ ˈmʌðɚ ˈzibrə ˈsoʊfə bəˈnænə təˈmɑtoʊ ˈproʊtəˌkɑl/',
    difficulty: 'Beginner',
    challengingWordsOrSequences: ['clever mother', 'banana tomato', 'protocol'],
    phoneticChallenge:
      'Weakening unstressed vowels to the neutral schwa /ə/ or r-colored schwa /ɚ/ instead of over-pronouncing spelling vowels.',
    articulationGuidance:
      'Relax jaw completely on unstressed syllables. Keep vowels short and obscure rather than fully articulated.',
    commonMistakes:
      'Pronouncing the "a" in "banana" as a full /æ/ instead of a schwa /bə-ˈnæn-ə/.',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Proper schwa reduction on all unstressed syllables.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-speech-stress-3',
    phrase: 'PHOTograph, phoTOgrapher, photoGRAPHic rhythm.',
    category: 'American Speech Patterns',
    primaryTarget: 'Word stress shifts and multisyllabic words',
    secondaryTargets: ['Stress timing', 'Vowel reduction shifts'],
    phoneticIpa: '/ˈfoʊtəˌgræf fəˈtɑgrəfɚ ˌfoʊtəˈgræfɪk ˈrɪðəm/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['PHOTograph', 'phoTOgrapher', 'photoGRAPHic'],
    phoneticChallenge:
      'Shifting primary word stress accurately across derivative forms while reducing unstressed vowels in adjacent syllables.',
    articulationGuidance:
      'Increase pitch, volume, and duration on the primary stressed syllable. Reduce surrounding syllables to schwa or short lax vowels.',
    commonMistakes:
      'Placing equal stress on every syllable (machine-gun rhythm).',
    recommendedSpeed: '75 WPM.',
    completionCriterion: 'Clear stress shift identification and vowel reduction.',
    relatedLessonIds: ['th-sounds'],
  },
  {
    id: 'tt-speech-linking-4',
    phrase: 'Turn off all of our ovens and open every iced eye.',
    category: 'American Speech Patterns',
    primaryTarget: 'Linking and transitions between words',
    secondaryTargets: ['Catenation', 'Consonant-to-vowel linking'],
    phoneticIpa: '/tɝn ɔf ɔl ʌv aʊr ˈʌvənz ənd ˈoʊpən ˈɛvri aɪst aɪ/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Turn off all', 'of our ovens', 'open every iced eye'],
    phoneticChallenge:
      'Attaching final consonants of one word directly to the initial vowel of the next word without pausing or glottal stops.',
    articulationGuidance:
      'Slide word endings into the next word as if they form a single compound expression ("Turnoffallovrouvens").',
    commonMistakes:
      'Inserting hard glottal stops between words ("Turn [pause] off").',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Smooth word-to-word linking without glottal breaks.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-speech-rhythm-5',
    phrase: 'Big black bugs bleed blue black blood on brown bricks.',
    category: 'American Speech Patterns',
    primaryTarget: 'Rhythm and intelligibility at increasing speeds',
    secondaryTargets: ['Stress-timed English rhythm'],
    phoneticIpa: '/bɪg blæk bʌgz blid blu blæk blʌd ɑn braʊn brɪks/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Big black bugs', 'bleed blue black', 'brown bricks'],
    phoneticChallenge:
      'Maintaining steady stress-timed pacing where stressed beats occur at regular time intervals regardless of intervening syllables.',
    articulationGuidance:
      'Tap your foot on major stressed words ("Big", "bugs", "bleed", "blood", "bricks") while skimming lightly over unstressed elements.',
    commonMistakes:
      'Rushing and stumbling over consonant clusters at high speed.',
    recommendedSpeed: 'Progress from 70 to 120 WPM.',
    completionCriterion: 'Maintained clarity and rhythm at 110 WPM.',
    relatedLessonIds: ['rhotic-r'],
  },

  // --- Articulation & Precision ---
  {
    id: 'tt-art-place-1',
    phrase: 'Pad kid poured curd pulled cod carved curved wood.',
    category: 'Articulation & Precision',
    primaryTarget: 'Repeated changes in place of articulation',
    secondaryTargets: ['Bilabial to alveolar to velar rapid shifts'],
    phoneticIpa: '/pæd kɪd pɔrd kɝd pʊld kɑd kɑrvd kɝvd wʊd/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Pad kid poured', 'curd pulled cod', 'carved curved wood'],
    phoneticChallenge:
      'Rapidly jumping between bilabial stops (/p/, /b/), alveolar stops/liquids (/d/, /l/), and velar stops (/k/, /g/) without anticipation errors.',
    articulationGuidance:
      'Visualize your tongue jumping instantly between front lips, alveolar gum ridge, and soft palate back.',
    commonMistakes:
      'Anticipating upcoming consonant places of articulation prematurely.',
    recommendedSpeed: '70 WPM.',
    completionCriterion: 'Clean articulation shifts across all 3 articulatory zones.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-art-alt-2',
    phrase: 'Unique New York, unique New York, you know you need unique New York.',
    category: 'Articulation & Precision',
    primaryTarget: 'Alternating lip and tongue movements',
    secondaryTargets: ['Palatal glide /j/ + nasal /n/ + velar /k/'],
    phoneticIpa: '/juˈnik nu jɔrk juˈnik nu jɔrk ju noʊ ju nid juˈnik nu jɔrk/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Unique New York', 'you know you need'],
    phoneticChallenge:
      'Navigating the notoriously difficult palatal glide sequence /jui/ followed by alveolar nasal /n/ and velar stop /k/.',
    articulationGuidance:
      'Exaggerate the glide in "unique" (/ju-nik/) and keep the nasal /n/ crisp before landing the final /k/.',
    commonMistakes:
      'Slurring "New York" into "New Yawk" or stumbling on "unique".',
    recommendedSpeed: '75 WPM.',
    completionCriterion: 'Successfully spoken 4 times consecutively without tongue slips.',
    relatedLessonIds: ['th-sounds'],
  },
  {
    id: 'tt-art-phrase-3',
    phrase: 'The sixth sick sheikh’s sixth sheep’s sick.',
    category: 'Articulation & Precision',
    primaryTarget: 'Longer phrases that test clarity under speed',
    secondaryTargets: ['Sibilant fricatives + interdental fricative codas'],
    phoneticIpa: '/ðə sɪks sɪk ʃiks sɪkθ ʃips sɪk/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['sixth sick sheikh’s', 'sixth sheep’s sick'],
    phoneticChallenge:
      'The ultimate test of sibilant precision: combining /s/, /ɪ/, /k/, /θ/, /ʃ/, /p/, /z/ in rapid succession.',
    articulationGuidance:
      'Break into two chunks: "The sixth sick sheikh\'s" / "sixth sheep\'s sick". Master each chunk slowly before linking.',
    commonMistakes:
      'Collapsing the words into an unintelligible sibilant hiss.',
    recommendedSpeed: '60 WPM starting, building to 90 WPM.',
    completionCriterion: 'Every word distinctly intelligible at 90 WPM.',
    relatedLessonIds: ['th-sounds'],
  },
  {
    id: 'tt-art-fluid-4',
    phrase: 'Rubber baby buggy bumpers bounce back briskly.',
    category: 'Articulation & Precision',
    primaryTarget: 'Phrase-level articulation without sacrificing intelligibility',
    secondaryTargets: ['Bilabial plosives + vocalic R + nasal stops'],
    phoneticIpa: '/ˈrʌbɚ ˈbeɪbi ˈbʌgi ˈbʌmpɚz baʊns bæk ˈbrɪskli/',
    difficulty: 'Intermediate',
    challengingWordsOrSequences: ['Rubber baby buggy', 'bumpers bounce back'],
    phoneticChallenge:
      'Maintaining crisp bilabial closure on repeated /b/ and /p/ stops while balancing vocalic R coloring.',
    articulationGuidance:
      'Keep your jaw stable and rely on active lip closing for each "b" sound.',
    commonMistakes:
      'Mumbling the middle syllables ("buggy bumpers").',
    recommendedSpeed: '85 WPM.',
    completionCriterion: 'Crisp bilabial stops and R resonance across 3 repetitions.',
    relatedLessonIds: ['rhotic-r'],
  },
  {
    id: 'tt-art-master-5',
    phrase: 'Peter Piper picked a peck of pickled peppers; a peck of pickled peppers Peter Piper picked.',
    category: 'Articulation & Precision',
    primaryTarget: 'Classic master articulation challenge',
    secondaryTargets: ['Plosive release /p/, /k/, /t/ + intervocalic flap /r/'],
    phoneticIpa: '/ˈpitɚ ˈpaɪpɚ pɪkt ə pɛk ʌv ˈpɪkəld ˈpɛpɚz; ə pɛk ʌv ˈpɪkəld ˈpɛpɚz ˈpitɚ ˈpaɪpɚ pɪkt/',
    difficulty: 'Advanced',
    challengingWordsOrSequences: ['Peter Piper picked', 'peck of pickled peppers'],
    phoneticChallenge:
      'Sustaining high-pressure voiceless bilabial plosive /p/ bursts and velar /k/ stops across a complete two-clause sentence.',
    articulationGuidance:
      'Do not rush. Focus on crisp, aspirated /p/ release on "Peter Piper" and "peck".',
    commonMistakes:
      'De-aspirating initial /p/ or swallowing the final consonants.',
    recommendedSpeed: '80 WPM.',
    completionCriterion: 'Full sentence articulated with crisp plosive bursts without stumbling.',
    relatedLessonIds: ['th-sounds'],
  },
];
