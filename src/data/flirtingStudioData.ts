export interface FlirtingLesson {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  phrase: string;
  meaning: string;
  context: string;
  tone: 'Playful' | 'Warm' | 'Teasing' | 'Direct' | 'Romantic' | 'Suggestive' | 'Bold' | 'Seductive' | 'Cheeky' | 'Dry';
  intimacyLevel: 'Casual / Acquaintance' | 'Dating / Mutual Interest' | 'Established Partner / Intimate';
  exampleDialogue: { speaker: string; text: string }[];
  possibleResponses: string[];
  commonMistakes: string;
  alternativePhrasings: { style: string; phrasing: string }[];
  speakingChallenge: string;
}

export interface FlirtingRoleplayScenario {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Seductive Masterclass';
  flirtationLevel: 'Subtle & Playful' | 'Confident & Flirty' | 'Romantic & Seductive' | 'Bold & Direct';
  contextDescription: string;
  initialCoachMessage: string;
  learnerRole: string;
  keyPhrases: string[];
}

export const FLIRTING_CATEGORIES = [
  { id: 'banter', label: 'Playful Banter & Teasing', description: 'Light teasing, mock challenges, dry humor, and witty observations.' },
  { id: 'confident', label: 'Confident Flirting', description: 'Direct openings, bold approaches, and expressing interest without hesitation.' },
  { id: 'compliments', label: 'Compliments & Attraction', description: 'Specific, non-cliché praise about style, wit, humor, and presence.' },
  { id: 'tension', label: 'Romantic Tension & Subtext', description: 'Double meanings, suggestive ambiguity, and building anticipation.' },
  { id: 'chemistry', label: 'Witty Comebacks & Chemistry', description: 'Fast-paced exchanges, playful reframing, and matching energy.' },
  { id: 'dating', label: 'Dating & Romantic Conversation', description: 'Moving past small talk, asking someone out, and texting momentum.' },
  { id: 'seductive', label: 'Seductive Communication', description: 'Sensual pacing, vocal warmth, and expressing desire with elegance.' },
  { id: 'roleplay', label: 'Advanced Improvisation', description: 'Real-time multi-turn scenarios to practice spontaneous charm.' },
  { id: 'adult', label: '🔥 Edgy & Adult Studio', description: 'Provocative banter, sexual innuendo, vulgar expressions, seductive communication, and mature roleplay.' },
];

export const FLIRTING_LESSONS: FlirtingLesson[] = [
  // --- Original 10 Stable Lessons ---
  {
    id: 'banter-1',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'The Playful Challenge',
    phrase: 'Are you always this competitive over coffee, or is it just my lucky day?',
    meaning: 'A lighthearted, witty challenge that reframes a routine interaction into a playful competition.',
    context: 'Use when someone jokingly argues about a minor topic in a casual setting.',
    tone: 'Teasing',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'Partner', text: 'If you think oat milk in dark roast is acceptable, we are officially enemies.' },
      { speaker: 'You', text: 'Are you always this competitive over coffee, or is it just my lucky day?' },
      { speaker: 'Partner', text: '(Laughs) Only when I know I am right.' }
    ],
    possibleResponses: ['Challenge accepted. Prove it.', 'You might want to lower your expectations.'],
    commonMistakes: 'Sounding genuinely adversarial rather than keeping a warm, smiling demeanor.',
    alternativePhrasings: [
      { style: 'Bolder', phrasing: 'I had no idea your coffee standards were so intense. Should I be intimidated?' },
      { style: 'Casual', phrasing: 'That is a bold coffee take. I respect the passion.' }
    ],
    speakingChallenge: 'Say the phrase with a relaxed smile and natural comedic timing.'
  },
  {
    id: 'banter-2',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'Feigned Shock',
    phrase: 'I am deeply wounded. I thought we had a special connection over spreadsheet formatting.',
    meaning: 'Using extreme sarcasm about a mundane topic to create humorous contrast and playful irony.',
    context: 'When a colleague or casual acquaintance makes a joking remark about work or trivial tasks.',
    tone: 'Playful',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'Partner', text: 'I am deleting your row from the shared sheet.' },
      { speaker: 'You', text: 'I am deeply wounded. I thought we had a special connection over spreadsheet formatting.' },
      { speaker: 'Partner', text: 'Our honeymoon was fun while it lasted.' }
    ],
    possibleResponses: ['Cold-hearted. Absolutely ruthless.', 'I demand compensation in espresso.'],
    commonMistakes: 'Over-explaining the joke or breaking character too quickly.',
    alternativePhrasings: [
      { style: 'Dry Humor', phrasing: 'And here I thought our bond was unbreakable.' }
    ],
    speakingChallenge: 'Deliver with deadpan delivery followed by a knowing smile.'
  },
  {
    id: 'banter-3',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'The Preemptive Excuse',
    phrase: 'I would love to agree with you, but then we would both be wrong.',
    meaning: 'A classic witty retort that playfully turns an opinion back onto the speaker.',
    context: 'During friendly debates on movies, food, or music.',
    tone: 'Teasing',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'That movie is objectively a cinematic masterpiece.' },
      { speaker: 'You', text: 'I would love to agree with you, but then we would both be wrong.' },
      { speaker: 'Partner', text: 'Oh, you are dangerous.' }
    ],
    possibleResponses: ['You have no idea.', 'I prefer the term "tasteful".'],
    commonMistakes: 'Delivering it with arrogance instead of playful charm.',
    alternativePhrasings: [
      { style: 'Playful', phrasing: 'That is a bold claim to make without backup.' }
    ],
    speakingChallenge: 'Say it with a confident, relaxed vocal inflection.'
  },
  {
    id: 'confident-1',
    categoryId: 'confident',
    categoryName: 'Confident Flirting',
    title: 'The Direct Intention',
    phrase: 'I noticed you across the room and decided I would regret it all evening if I did not come say hello.',
    meaning: 'A confident, direct statement of attraction that shows initiative and charm.',
    context: 'At a social gathering or lounge when making first contact.',
    tone: 'Direct',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'You', text: 'I noticed you across the room and decided I would regret it all evening if I did not come say hello.' },
      { speaker: 'Partner', text: 'Well, I am glad you took the risk. I am Alex.' },
      { speaker: 'You', text: 'Nice to meet you, Alex. I am Sam.' }
    ],
    possibleResponses: ['That is quite an entrance. Come join us.', 'Well, you saved yourself some regret then.'],
    commonMistakes: 'Reciting it like a memorized script with flat intonation.',
    alternativePhrasings: [
      { style: 'Relaxed', phrasing: 'Hi, I just wanted to introduce myself. I felt like I would kick myself later if I did not.' }
    ],
    speakingChallenge: 'Deliver with steady eye contact and natural warmth.'
  },
  {
    id: 'confident-2',
    categoryId: 'confident',
    categoryName: 'Confident Flirting',
    title: 'The Intentional Assumption',
    phrase: 'You look like trouble, and I am far too curious to ignore it.',
    meaning: 'A bold opening line that frames the person as intriguing and adventurous.',
    context: 'Approaching someone with high confidence in a lively social atmosphere.',
    tone: 'Bold',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'What makes you say that?' },
      { speaker: 'You', text: 'You look like trouble, and I am far too curious to ignore it.' },
      { speaker: 'Partner', text: '(Smiles) You might be right about that.' }
    ],
    possibleResponses: ['Prove me wrong.', 'I live to surprise people.'],
    commonMistakes: 'Sounding overly rehearsed or aggressive.',
    alternativePhrasings: [
      { style: 'Sleek', phrasing: 'I have a feeling you are harder to figure out than you look.' }
    ],
    speakingChallenge: 'Speak slowly with a warm, mischievous cadence.'
  },
  {
    id: 'compliments-1',
    categoryId: 'compliments',
    categoryName: 'Compliments & Attraction',
    title: 'Specific Energy Compliment',
    phrase: 'I love your taste in music. It is rare to meet someone who actually appreciates deep-cut jazz.',
    meaning: 'Complimenting a specific aesthetic or intellectual preference rather than generic appearance.',
    context: 'When discussing hobbies, music, or art during a conversation.',
    tone: 'Warm',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'This album is from 1974.' },
      { speaker: 'You', text: 'I love your taste in music. It is rare to meet someone who actually appreciates deep-cut jazz.' },
      { speaker: 'Partner', text: 'Right? You actually know this track?' }
    ],
    possibleResponses: ['Know it? I have worn out three vinyl copies.'],
    commonMistakes: 'Giving generic physical compliments too early.',
    alternativePhrasings: [
      { style: 'Playful', phrasing: 'Consider me impressed. Most people blank out when this song comes on.' }
    ],
    speakingChallenge: 'Say it with genuine curiosity and warmth.'
  },
  {
    id: 'tension-1',
    categoryId: 'tension',
    categoryName: 'Romantic Tension & Subtext',
    title: 'The Playful Pivot',
    phrase: 'We are supposed to be talking about project deadlines, but you are making that remarkably difficult.',
    meaning: 'Introducing romantic subtext into a professional or neutral setting.',
    context: 'When working late or discussing mundane topics with mutual chemistry.',
    tone: 'Suggestive',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'So for slide four, market expansion.' },
      { speaker: 'You', text: 'We are supposed to be talking about project deadlines, but you are making that remarkably difficult.' },
      { speaker: 'Partner', text: '(Smiles) Am I now?' }
    ],
    possibleResponses: ['Your absolute disregard for boring PowerPoints.', 'Let us call it professional hazard.'],
    commonMistakes: 'Forcing tension where professional boundaries must be maintained.',
    alternativePhrasings: [
      { style: 'Subtle', phrasing: 'I am finding it hard to concentrate on spreadsheets tonight.' }
    ],
    speakingChallenge: 'Lower your vocal pitch slightly and add a warm smile.'
  },
  {
    id: 'chemistry-1',
    categoryId: 'chemistry',
    categoryName: 'Witty Comebacks & Chemistry',
    title: 'The Fast Reframe',
    phrase: 'I take full credit for that brilliant idea, even if you said it first.',
    meaning: 'Playfully claiming credit for a mutual thought with cheeky confidence.',
    context: 'When you both arrive at the same conclusion or joke simultaneously.',
    tone: 'Playful',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'We should definitely order dessert first.' },
      { speaker: 'You', text: 'I take full credit for that brilliant idea, even if you said it first.' },
      { speaker: 'Partner', text: 'You are impossible.' }
    ],
    possibleResponses: ['I am a visionary.', 'Great minds think alike, but my mind thought it louder.'],
    commonMistakes: 'Being overly competitive rather than charming.',
    alternativePhrasings: [
      { style: 'Cheeky', phrasing: 'Great minds, obviously. Though mostly mine.' }
    ],
    speakingChallenge: 'Deliver with a quick smile and crisp articulation.'
  },
  {
    id: 'dating-1',
    categoryId: 'dating',
    categoryName: 'Dating & Romantic Conversation',
    title: 'The Natural Invite',
    phrase: 'I know a fantastic little jazz lounge downtown. We should grab a drink there next week.',
    meaning: 'A clear, confident invitation that specifies a venue and time frame without pressure.',
    context: 'Transitioning from a great casual conversation to setting up a date.',
    tone: 'Direct',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'I love live music.' },
      { speaker: 'You', text: 'I know a fantastic little jazz lounge downtown. We should grab a drink there next week.' },
      { speaker: 'Partner', text: 'That sounds amazing. I am free Thursday.' }
    ],
    possibleResponses: ['Thursday it is. It is a date.', 'Even better. Let us do it.'],
    commonMistakes: 'Being vague ("We should hang out sometime") instead of specific.',
    alternativePhrasings: [
      { style: 'Casual', phrasing: 'Let us continue this over cocktails. Are you free this week?' }
    ],
    speakingChallenge: 'Speak with calm confidence and an inviting tone.'
  },
  {
    id: 'seductive-1',
    categoryId: 'seductive',
    categoryName: 'Seductive Communication',
    title: 'Anticipation & Presence',
    phrase: 'I have been thinking about seeing you all day, and honestly, walking through that door right now is the highlight.',
    meaning: 'Communicating deep anticipation, genuine affection, and sensual desire.',
    context: 'Greeting your partner at the start of a date after being apart all day.',
    tone: 'Romantic',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: 'Sorry I was late, traffic was a nightmare.' },
      { speaker: 'You', text: 'I have been thinking about seeing you all day, and honestly, walking through that door right now is the highlight.' },
      { speaker: 'Partner', text: 'Come here. I missed you too.' }
    ],
    possibleResponses: ['Let us skip dinner and go straight to dessert.', 'You are terrible for my productivity.'],
    commonMistakes: 'Sounding robotic or recitation-like.',
    alternativePhrasings: [
      { style: 'Sensual', phrasing: 'The moment you walked in, everything else in this room faded into the background.' }
    ],
    speakingChallenge: 'Use a warm, resonant, slow cadence to convey deep emotional presence.'
  },

  // --- Expanded Lessons (Additional rich entries across all categories) ---
  {
    id: 'banter-4',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'The Mock Outrage',
    phrase: 'Did you seriously just judge my playlist? I thought we were friends.',
    meaning: 'Feigning dramatic betrayal over a trivial disagreement for comedic effect.',
    context: 'When someone expresses mild surprise at your music, food, or movie choices.',
    tone: 'Playful',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'Partner', text: 'You actually listen to 90s boy bands?' },
      { speaker: 'You', text: 'Did you seriously just judge my playlist? I thought we were friends.' },
      { speaker: 'Partner', text: 'My apologies. Proceed with your guilty pleasures.' }
    ],
    possibleResponses: ['Too late. Trust has been broken.', 'You are missing out on pure culture.'],
    commonMistakes: 'Sounding genuinely offended rather than theatrical.',
    alternativePhrasings: [{ style: 'Cheeky', phrasing: 'Ouch. That cuts deep.' }],
    speakingChallenge: 'Deliver with mock theatrical hand-to-chest posture.'
  },
  {
    id: 'banter-5',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'The Reverse Compliment',
    phrase: 'You are almost as funny as you think you are.',
    meaning: 'A cheeky backhanded compliment designed to keep someone humble while showing affection.',
    context: 'When someone makes a clever joke and looks for approval.',
    tone: 'Teasing',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'Nailed that joke, admit it.' },
      { speaker: 'You', text: 'You are almost as funny as you think you are.' },
      { speaker: 'Partner', text: 'High praise coming from you.' }
    ],
    possibleResponses: ['Do not let it go to your head.', 'I have my moments.'],
    commonMistakes: 'Crossing into genuine harshness.',
    alternativePhrasings: [{ style: 'Playful', phrasing: 'Not bad. Give yourself a pat on the back.' }],
    speakingChallenge: 'Say it with a broad grin so the affection is unmistakable.'
  },
  {
    id: 'banter-6',
    categoryId: 'banter',
    categoryName: 'Playful Banter & Teasing',
    title: 'The Exaggerated Claim',
    phrase: 'I am professionally certified in ignoring unsolicited advice.',
    meaning: 'Playfully deflecting friendly advice with humorous exaggeration.',
    context: 'When someone playfully tells you how to do something simple.',
    tone: 'Cheeky',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'Partner', text: 'You are holding that spatula completely wrong.' },
      { speaker: 'You', text: 'I am professionally certified in ignoring unsolicited advice.' },
      { speaker: 'Partner', text: 'Noted. Good luck with the pancakes.' }
    ],
    possibleResponses: ['Watch and learn, amateur chef.', 'I like living on the edge.'],
    commonMistakes: 'Sounding defensive.',
    alternativePhrasings: [{ style: 'Dry', phrasing: 'I prefer learning through catastrophic trial and error.' }],
    speakingChallenge: 'Deliver with a confident, mischievous smirk.'
  },
  {
    id: 'confident-3',
    categoryId: 'confident',
    categoryName: 'Confident Flirting',
    title: 'The Forward Assumption',
    phrase: 'I am planning on taking you out for drinks later. You do not have a choice in the matter.',
    meaning: 'Taking confident, playful leadership of a dating plan without being overbearing.',
    context: 'When confirming chemistry and setting up a definite plan.',
    tone: 'Bold',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'Is that so?' },
      { speaker: 'You', text: 'I am planning on taking you out for drinks later. You do not have a choice in the matter.' },
      { speaker: 'Partner', text: 'Well, when you put it that way, how can I refuse?' }
    ],
    possibleResponses: ['That is what I like to hear.', 'Good choice. Wear something nice.'],
    commonMistakes: 'Sounding demanding rather than delightfully confident.',
    alternativePhrasings: [{ style: 'Direct', phrasing: 'Clear your schedule for Thursday night. We are getting cocktails.' }],
    speakingChallenge: 'Deliver with calm, assertive warmth.'
  },
  {
    id: 'confident-4',
    categoryId: 'confident',
    categoryName: 'Confident Flirting',
    title: 'The Open Admission',
    phrase: 'I am completely distracted right now, and it is entirely your fault.',
    meaning: 'A bold, flattering confession that signals strong attraction.',
    context: 'When someone catches you staring or interrupts your thoughts.',
    tone: 'Direct',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'Are you listening to anything I just said?' },
      { speaker: 'You', text: 'I am completely distracted right now, and it is entirely your fault.' },
      { speaker: 'Partner', text: 'Oh? And what caused that?' }
    ],
    possibleResponses: ['You talking with your hands.', 'Let us just say focus is overrated.'],
    commonMistakes: 'Sounding nervous or apologetic.',
    alternativePhrasings: [{ style: 'Smooth', phrasing: 'Forgive me. You just made my train of thought derail completely.' }],
    speakingChallenge: 'Say it with slow, deliberate eye contact.'
  },
  {
    id: 'compliments-2',
    categoryId: 'compliments',
    categoryName: 'Compliments & Attraction',
    title: 'The Wit Appreciation',
    phrase: 'I love how quickly your mind works. Keeping up with you is half the fun.',
    meaning: 'Complimenting someone\'s quick wit and conversational agility.',
    context: 'After a fast-paced exchange of jokes or observations.',
    tone: 'Warm',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'You walked right into that setup.' },
      { speaker: 'You', text: 'I love how quickly your mind works. Keeping up with you is half the fun.' },
      { speaker: 'Partner', text: 'Thank you. I try to keep you on your toes.' }
    ],
    possibleResponses: ['Mission accomplished.', 'Challenge accepted for round two.'],
    commonMistakes: 'Sounding patronizing.',
    alternativePhrasings: [{ style: 'Sincere', phrasing: 'You always manage to surprise me with your comebacks.' }],
    speakingChallenge: 'Say it with genuine admiration and steady eye contact.'
  },
  {
    id: 'compliments-3',
    categoryId: 'compliments',
    categoryName: 'Compliments & Attraction',
    title: 'Style & Presence',
    phrase: 'That jacket is incredible on you. You make effortless look like an art form.',
    meaning: 'Complimenting someone\'s personal style and overall poise.',
    context: 'When meeting up for a date or social event.',
    tone: 'Warm',
    intimacyLevel: 'Casual / Acquaintance',
    exampleDialogue: [
      { speaker: 'Partner', text: 'Thank you, I just grabbed it on my way out.' },
      { speaker: 'You', text: 'That jacket is incredible on you. You make effortless look like an art form.' },
      { speaker: 'Partner', text: 'Well, thank you! You clean up pretty well yourself.' }
    ],
    possibleResponses: ['I try my best.', 'I had high standards to live up to tonight.'],
    commonMistakes: 'Focusing solely on physical anatomy rather than style and energy.',
    alternativePhrasings: [{ style: 'Charming', phrasing: 'You have fantastic style. It suits you.' }],
    speakingChallenge: 'Deliver with a warm smile and appreciative tone.'
  },
  {
    id: 'tension-2',
    categoryId: 'tension',
    categoryName: 'Romantic Tension & Subtext',
    title: 'The Lingering Glance',
    phrase: 'You keep looking at me like that, and we are never going to make it to dinner.',
    meaning: 'Directly calling out mutual eye contact and physical attraction to heighten anticipation.',
    context: 'During quiet moments across a table or in a car before an outing.',
    tone: 'Suggestive',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: '(Smiles quietly across the booth)' },
      { speaker: 'You', text: 'You keep looking at me like that, and we are never going to make it to dinner.' },
      { speaker: 'Partner', text: 'Who said dinner was the priority?' }
    ],
    possibleResponses: ['Point taken. Let us skip ahead.', 'Dangerous words.'],
    commonMistakes: 'Breaking tension with nervous laughter too quickly.',
    alternativePhrasings: [{ style: 'Bold', phrasing: 'Your eyes are saying things your mouth has not caught up with yet.' }],
    speakingChallenge: 'Speak in a low, steady tone with deliberate pacing.'
  },
  {
    id: 'tension-3',
    categoryId: 'tension',
    categoryName: 'Romantic Tension & Subtext',
    title: 'The Double Entendre',
    phrase: 'Be careful. You might actually enjoy getting your way too much.',
    meaning: 'Using playful ambiguity with a suggestive undercurrent.',
    context: 'When negotiating a minor decision with romantic chemistry.',
    tone: 'Suggestive',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'I usually get what I want.' },
      { speaker: 'You', text: 'Be careful. You might actually enjoy getting your way too much.' },
      { speaker: 'Partner', text: 'Is that a threat or a promise?' }
    ],
    possibleResponses: ['Interpret it however you like.', 'Let us call it an educated prediction.'],
    commonMistakes: 'Being overly explicit and killing the mystery.',
    alternativePhrasings: [{ style: 'Subtle', phrasing: 'Careful what you wish for. You just might get it.' }],
    speakingChallenge: 'Deliver with a slow, knowing smile.'
  },
  {
    id: 'chemistry-2',
    categoryId: 'chemistry',
    categoryName: 'Witty Comebacks & Chemistry',
    title: 'The Smooth Escalation',
    phrase: 'If you keep making me laugh like this, people are going to start thinking we actually like each other.',
    meaning: 'Acknowledging strong chemistry through ironic understatement.',
    context: 'Sharing continuous laughter in a public setting.',
    tone: 'Playful',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'Partner', text: 'We are quite the comedy duo.' },
      { speaker: 'You', text: 'If you keep making me laugh like this, people are going to start thinking we actually like each other.' },
      { speaker: 'Partner', text: 'Let us give them something to talk about then.' }
    ],
    possibleResponses: ['Bold strategy.', 'I can live with that rumor.'],
    commonMistakes: 'Sounding defensive or anxious.',
    alternativePhrasings: [{ style: 'Cheeky', phrasing: 'Careful. Word gets around when two people click this easily.' }],
    speakingChallenge: 'Deliver with a sly smile and relaxed posture.'
  },
  {
    id: 'dating-2',
    categoryId: 'dating',
    categoryName: 'Dating & Romantic Conversation',
    title: 'The Post-Date Text',
    phrase: 'I had an incredible time tonight. Especially when you laughed at my terrible jokes.',
    meaning: 'A warm, confident follow-up text expressing appreciation for a great date.',
    context: 'Sending a text message shortly after getting home from a first date.',
    tone: 'Warm',
    intimacyLevel: 'Dating / Mutual Interest',
    exampleDialogue: [
      { speaker: 'You', text: 'I had an incredible time tonight. Especially when you laughed at my terrible jokes.' },
      { speaker: 'Partner', text: 'Me too! Your jokes are bad, but your company makes up for it.' },
      { speaker: 'You', text: 'That is high praise. Let us do round two next week.' }
    ],
    possibleResponses: ['Count me in.', 'Name the time and place.'],
    commonMistakes: 'Waiting too long or sending overly eager paragraphs.',
    alternativePhrasings: [{ style: 'Direct', phrasing: 'Home safe. I am already looking forward to seeing you again.' }],
    speakingChallenge: 'Imagine typing this with a smile and a sense of effortless ease.'
  },
  {
    id: 'seductive-2',
    categoryId: 'seductive',
    categoryName: 'Seductive Communication',
    title: 'The Quiet Close',
    phrase: 'Come closer. I want to tell you something without the rest of the room hearing.',
    meaning: 'Creating physical and emotional intimacy through whispered proximity.',
    context: 'In a bustling room or restaurant when you want to draw your partner into your private world.',
    tone: 'Seductive',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'You', text: 'Come closer. I want to tell you something without the rest of the room hearing.' },
      { speaker: 'Partner', text: '(Leans in close) What is it?' },
      { speaker: 'You', text: 'You are the only person in this entire building I care about right now.' }
    ],
    possibleResponses: ['Smooth talker.', 'You are impossible to resist.'],
    commonMistakes: 'Speaking too loudly or sounding theatrical.',
    alternativePhrasings: [{ style: 'Intimate', phrasing: 'Lean in for a second. I need to whisper something.' }],
    speakingChallenge: 'Use a soft, warm whisper with controlled breath support.'
  }
];

export const FLIRTING_SCENARIOS: FlirtingRoleplayScenario[] = [
  // --- Original 4 Scenarios ---
  {
    id: 'scen-1',
    title: 'Playful Banter at a Coffee Shop',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'You accidentally bumped into someone at a cozy cafe counter, spilling a few sugar packets. They made a witty joke about your clumsiness.',
    initialCoachMessage: 'Hey! Careful with the sugar supply, that is a city violation. What is your excuse for knocking over half the counter?',
    learnerRole: 'Charming Customer',
    keyPhrases: ['Are you always this observant?', 'I plead guilty, but in my defense...', 'Consider it a calculated distraction.']
  },
  {
    id: 'scen-2',
    title: 'Confident Lounge Greeting',
    category: 'Confident Flirting',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You lock eyes with someone across a lively lounge bar. You decide to walk over and introduce yourself with confident warmth.',
    initialCoachMessage: 'Hi there! You look like someone who is either having the best night in the room or planning an elaborate escape.',
    learnerRole: 'Confident Visitor',
    keyPhrases: ['A bit of both actually.', 'I noticed you across the room...', 'I figured I would introduce myself before the night ended.']
  },
  {
    id: 'scen-3',
    title: 'Romantic Dinner Chemistry',
    category: 'Seductive Communication',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'You are on a wonderful second date with someone you feel deep mutual chemistry with. The conversation shifts from food to anticipation.',
    initialCoachMessage: 'I have to admit, I was nervous about tonight. But talking to you feels like time just disappears.',
    learnerRole: 'Romantic Partner',
    keyPhrases: ['I feel exactly the same way.', 'Time definitely moves differently around you.', 'What else are you hoping for tonight?']
  },
  {
    id: 'scen-4',
    title: 'Witty Text Message Back-and-Forth',
    category: 'Witty Comebacks & Chemistry',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You are messaging back and forth with someone you met recently. They sent a cheeky text challenging your cooking skills.',
    initialCoachMessage: 'I hear you claim to make the best pasta in the city. Sounds like a bold claim that requires live taste-testing.',
    learnerRole: 'Confident Chef',
    keyPhrases: ['Are you doubting my culinary genius?', 'Come over and taste-test for yourself.', 'Prepare to be thoroughly impressed.']
  },

  // --- Expanded Scenarios (30 total distinct scenarios) ---
  {
    id: 'scen-5',
    title: 'Bookstore Meet-Cute & Banter',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'You both reached for the last copy of a bestselling novel on philosophy. You make a witty remark about who needs it more.',
    initialCoachMessage: 'I saw that book first. Are you always in the habit of stealing literature from strangers?',
    learnerRole: 'Witty Bibliophile',
    keyPhrases: ['First come, first served does not apply to good taste.', 'I am willing to negotiate custody of this book over coffee.']
  },
  {
    id: 'scen-6',
    title: 'Art Gallery Opening Chat',
    category: 'Compliments & Attraction',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Standing in front of a confusing abstract painting at an art gallery, you turn to the person next to you and share a cheeky observation.',
    initialCoachMessage: 'To me, this painting either represents deep existential despair or someone spilled red wine on a canvas. What is your verdict?',
    learnerRole: 'Art Critic',
    keyPhrases: ['Definitely wine spill, but priced at two million dollars.', 'I prefer your interpretation much more than the artist statement.']
  },
  {
    id: 'scen-7',
    title: 'Rooftop Party Icebreaker',
    category: 'Confident Flirting',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'At a crowded rooftop party, you find yourself next to someone admiring the city skyline.',
    initialCoachMessage: 'The city looks great from up here, but everyone inside is shouting over house music. You looking for an escape too?',
    learnerRole: 'Rooftop Explorer',
    keyPhrases: ['Escape sounds like an excellent plan.', 'Lead the way. Where are we heading?']
  },
  {
    id: 'scen-8',
    title: 'Late Night Texting Momentum',
    category: 'Dating & Romantic Conversation',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'It is past midnight and you are messaging back and forth, drifting into more personal and late-night topics.',
    initialCoachMessage: 'I should probably go to sleep, but talking to you is making that impossible.',
    learnerRole: 'Charming Night Owl',
    keyPhrases: ['Who needs sleep anyway?', 'Blame it on good conversation.', 'Tell me what else is keeping you awake.']
  },
  {
    id: 'scen-9',
    title: 'Gym Water Fountain Banter',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'You both reach for the water fountain between heavy sets. A lighthearted challenge about workout routines ensues.',
    initialCoachMessage: 'If you keep lifting that heavy, you are going to make the rest of us look bad.',
    learnerRole: 'Fitness Enthusiast',
    keyPhrases: ['Consider it motivational inspiration.', 'Just trying to keep pace with your energy.']
  },
  {
    id: 'scen-10',
    title: 'Elevator Small Talk to Spark',
    category: 'Confident Flirting',
    difficulty: 'Beginner',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You share an elevator ride with an attractive person in your office building heading to the lobby.',
    initialCoachMessage: 'Going down? Or are you planning to stay trapped in this metal box for another ten floors?',
    learnerRole: 'Office Professional',
    keyPhrases: ['Only if the company gets significantly more interesting.', 'Lobby sounds good, but coffee sounds better.']
  },
  {
    id: 'scen-11',
    title: 'Subway Glance & Smile',
    category: 'Confident Flirting',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You catch someone smiling at your reading material on the subway and start a spontaneous conversation.',
    initialCoachMessage: 'I could not help noticing you laughing at my book. Is my taste in literature that amusing?',
    learnerRole: 'Commuter',
    keyPhrases: ['Amusing in the best possible way.', 'Care to guess the plot twist?']
  },
  {
    id: 'scen-12',
    title: 'Farmers Market Produce Debate',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'You both examine the same heirloom tomatoes at a weekend farmers market.',
    initialCoachMessage: 'If you are squeezing those tomatoes to test ripeness, you look like a seasoned professional.',
    learnerRole: 'Market Shopper',
    keyPhrases: ['It is a delicate scientific process.', 'Are you questioning my tomato credentials?']
  },
  {
    id: 'scen-13',
    title: 'Airport Gate Flight Delay',
    category: 'Dating & Romantic Conversation',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Your flight is delayed by three hours. You strike up a conversation with your gate neighbor.',
    initialCoachMessage: 'At this rate, we are going to be permanent residents of Gate 42. You traveling for business or pleasure?',
    learnerRole: 'Delayed Traveler',
    keyPhrases: ['Pleasure, before the airline decided otherwise.', 'Looks like we have plenty of time to get acquainted.']
  },
  {
    id: 'scen-14',
    title: 'Dog Park Puppy Interruption',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'An energetic dog bounds over and steals your tennis ball, leading straight to a conversation with its owner.',
    initialCoachMessage: 'I am so sorry! Buster usually has impeccable manners unless he smells someone interesting.',
    learnerRole: 'Dog Lover',
    keyPhrases: ['I take that as a massive compliment from Buster.', 'Clearly he has better taste than most people I meet.']
  },
  {
    id: 'scen-15',
    title: 'Vinyl Record Store Browsing',
    category: 'Compliments & Attraction',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You spot someone digging through the vintage rock section at a local record store.',
    initialCoachMessage: 'If you are holding that particular record, we probably have either a lot in common or a fierce musical disagreement.',
    learnerRole: 'Music Collector',
    keyPhrases: ['Only one way to find out. What is your verdict on 70s synth-pop?', 'Challenge my musical integrity. I dare you.']
  },
  {
    id: 'scen-16',
    title: 'Cooking Class Partner Dynamic',
    category: 'Witty Comebacks & Chemistry',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'You are paired up at a recreational cooking class to make handmade pasta from scratch.',
    initialCoachMessage: 'If our pasta dough turns into a disaster, I am entirely blaming your kneading technique.',
    learnerRole: 'Amateur Chef',
    keyPhrases: ['Blame the student, classic move.', 'Watch and learn how master chefs operate.']
  },
  {
    id: 'scen-17',
    title: 'Museum Audio Tour Encounter',
    category: 'Romantic Tension & Subtext',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Standing quietly in front of a dramatic Renaissance sculpture in a quiet museum gallery.',
    initialCoachMessage: 'Quiet galleries make it very easy to hear everything someone is thinking. What is going through your mind right now?',
    learnerRole: 'Museum Visitor',
    keyPhrases: ['Mostly wondering how long we can linger here.', 'Thinking art is far more interesting when shared.']
  },
  {
    id: 'scen-18',
    title: 'Hotel Lobby Bar Afterparty',
    category: 'Seductive Communication',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Sipping craft cocktails at a dim hotel lobby bar late at night after a professional conference.',
    initialCoachMessage: 'Conferences are exhausting, but finding someone worth talking to at the end of the day makes it worthwhile.',
    learnerRole: 'Conference Guest',
    keyPhrases: ['I agree entirely. Shall we ditch the badge and talk about something real?', 'You made sitting in hotel chairs worthwhile.']
  },
  {
    id: 'scen-19',
    title: 'Board Game Cafe Competitiveness',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'Playing a competitive strategy board game over craft beers at a local cafe.',
    initialCoachMessage: 'I hope you are not expecting mercy just because we are on a date. I play to win.',
    learnerRole: 'Board Gamer',
    keyPhrases: ['Mercy is for the weak. Do your worst.', 'Prepare to witness tactical brilliance.']
  },
  {
    id: 'scen-20',
    title: 'Brunch Line Morning Banter',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'Waiting in a notoriously long Sunday brunch line outside a popular neighborhood restaurant.',
    initialCoachMessage: 'If this line takes another twenty minutes, I am going to hold you personally responsible for my caffeine withdrawal.',
    learnerRole: 'Brunch Enthusiast',
    keyPhrases: ['Fair enough. I accept full liability for your mood.', 'Let us call it a test of our patience.']
  },
  {
    id: 'scen-21',
    title: 'Charity Gala Silent Auction',
    category: 'Confident Flirting',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Bidding against each other for the same luxury item at a charity silent auction.',
    initialCoachMessage: 'Are you seriously outbidding me on that weekend getaway package? That is ruthless.',
    learnerRole: 'Gala Attendee',
    keyPhrases: ['All is fair in love and silent auctions.', 'Consider it an expensive invitation to join me.']
  },
  {
    id: 'scen-22',
    title: 'Late Night Diner Booth',
    category: 'Dating & Romantic Conversation',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Sharing a late-night plate of fries in a retro diner booth after a concert.',
    initialCoachMessage: 'There is something magical about eating diner food at 2 AM with someone who is just as awake as you are.',
    learnerRole: 'Late Night Diner',
    keyPhrases: ['It is definitely a different wavelength of conversation.', 'Some of the best memories happen after midnight.']
  },
  {
    id: 'scen-23',
    title: 'Park Bench People Watching',
    category: 'Witty Comebacks & Chemistry',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Sitting on a park bench inventing absurd fictional backstories for passersby.',
    initialCoachMessage: 'I bet that dog walker over there is actually an undercover international spy on vacation.',
    learnerRole: 'Storyteller',
    keyPhrases: ['100%. Notice the tactical treat pouch.', 'What do you think my backstory is right now?']
  },
  {
    id: 'scen-24',
    title: 'Karaoke Bar Duet Challenge',
    category: 'Confident Flirting',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Spotting someone across a buzzing karaoke bar and challenging them to a duet.',
    initialCoachMessage: 'You look brave enough to survive a terrible duet with me. Are you ready for greatness?',
    learnerRole: 'Karaoke Star',
    keyPhrases: ['Only if we murder the high notes together.', 'Prepare to witness questionable vocal range.']
  },
  {
    id: 'scen-25',
    title: 'Sunset Beach Walk',
    category: 'Seductive Communication',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Walking along the shoreline at dusk as the sun sets over the ocean.',
    initialCoachMessage: 'The sunset is gorgeous, but I have to admit my attention keeps wandering back to you.',
    learnerRole: 'Beach Walker',
    keyPhrases: ['Sunsets are nice, but good company wins every time.', 'Walk a bit closer and tell me what you are thinking.']
  },
  {
    id: 'scen-26',
    title: 'Elevated Cocktail Bar Seating',
    category: 'Romantic Tension & Subtext',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Sitting side-by-side at a high-end cocktail bar watching the mixologist craft drinks.',
    initialCoachMessage: 'Side-by-side seating is much more dangerous than sitting across from each other. Do you agree?',
    learnerRole: 'Cocktail Enthusiast',
    keyPhrases: ['Much harder to hide when you are distracted.', 'Let us call it a strategic advantage.']
  },
  {
    id: 'scen-27',
    title: 'Museum Late Night Event',
    category: 'Compliments & Attraction',
    difficulty: 'Intermediate',
    flirtationLevel: 'Confident & Flirty',
    contextDescription: 'Attending a museum after-hours event with live ambient music and art exhibits.',
    initialCoachMessage: 'Museums at night feel entirely different. Almost like we are sneaking into somewhere exclusive.',
    learnerRole: 'Night Museum Visitor',
    keyPhrases: ['Let us pretend we locked ourselves in on purpose.', 'Good thing we have plenty of exhibits to explore together.']
  },
  {
    id: 'scen-28',
    title: 'Book Club Aftermath Debate',
    category: 'Playful Banter & Teasing',
    difficulty: 'Beginner',
    flirtationLevel: 'Subtle & Playful',
    contextDescription: 'Debating the ending of a controversial book over drinks with someone from the reading group.',
    initialCoachMessage: 'If you honestly think the protagonist made the right choice in chapter ten, we need to reevaluate our friendship.',
    learnerRole: 'Book Club Critic',
    keyPhrases: ['Defend the protagonist\'s honor if you dare.', 'I stand by my literary assessment 100%.']
  },
  {
    id: 'scen-29',
    title: 'Train Station Platform Farewell',
    category: 'Seductive Communication',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Waiting on a train platform before one of you departs for a weekend trip.',
    initialCoachMessage: 'Three days without seeing you is going to feel entirely too long.',
    learnerRole: 'Traveler',
    keyPhrases: ['Then make sure the countdown starts right now.', 'Absence makes the heart grow considerably fonder.']
  },
  {
    id: 'scen-30',
    title: 'Cozy Fireplace Lounge Evening',
    category: 'Seductive Communication',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Relaxing by a glowing indoor fireplace on a chilly winter evening with blankets and wine.',
    initialCoachMessage: 'Between this fireplace and having you here, I don\'t think I am ever leaving this couch.',
    learnerRole: 'Couch Partner',
    keyPhrases: ['Consider yourself permanently stationed right here.', 'The rest of the world can wait until tomorrow.']
  }
];

export const EDGY_ADULT_SCENARIOS: FlirtingRoleplayScenario[] = [
  {
    id: 'scen-adult-1',
    title: 'Late Night Penthouse Afterparty',
    category: '🔥 Edgy & Adult Studio',
    difficulty: 'Advanced',
    flirtationLevel: 'Bold & Direct',
    contextDescription: 'Alone in a dim penthouse overlooking the city skyline at 2 AM, sharing whiskey and intense eye contact.',
    initialCoachMessage: 'We could keep playing it safe with polite conversation, or we could admit what we have both been thinking since the moment we met.',
    learnerRole: 'Confidant',
    keyPhrases: ['Let us drop the polite act entirely.', 'I stopped playing safe hours ago.']
  },
  {
    id: 'scen-adult-2',
    title: 'Private Hotel Suite Rendezvous',
    category: '🔥 Edgy & Adult Studio',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Locking the door behind you in a private hotel suite after a charged evening out.',
    initialCoachMessage: 'Finally. No interruptions, no crowds, and you right here within arm\'s reach.',
    learnerRole: 'Partner',
    keyPhrases: ['What took you so long?', 'Close the distance between us right now.']
  },
  {
    id: 'scen-adult-3',
    title: 'Kitchen Counter Midnight Drink',
    category: '🔥 Edgy & Adult Studio',
    difficulty: 'Intermediate',
    flirtationLevel: 'Bold & Direct',
    contextDescription: 'Sharing a glass of wine leaned against the kitchen counter in the dim glow of the refrigerator light.',
    initialCoachMessage: 'You are looking dangerously distracting standing in my kitchen at 3 AM.',
    learnerRole: 'Night Visitor',
    keyPhrases: ['Blame the wine or blame the company.', 'Consider yourself thoroughly distracted.']
  },
  {
    id: 'scen-adult-4',
    title: 'Steamy Backstage Dressing Room',
    category: '🔥 Edgy & Adult Studio',
    difficulty: 'Advanced',
    flirtationLevel: 'Romantic & Seductive',
    contextDescription: 'Stepping into a quiet backstage dressing room after an intense performance or event.',
    initialCoachMessage: 'Lock the door. I don\'t want anyone else walking in on us right now.',
    learnerRole: 'Guest',
    keyPhrases: ['Door is locked. Now what were you saying?', 'You were electric on stage tonight. Now show me offstage.']
  }
];

export const EDGY_ADULT_LESSONS: FlirtingLesson[] = [
  {
    id: 'adult-les-1',
    categoryId: 'adult',
    categoryName: '🔥 Edgy & Adult Studio',
    title: 'The Unfiltered Admission',
    phrase: 'Let us stop pretending we are just hanging out as friends when we both know how much tension is in this room.',
    meaning: 'A bold, direct call-out of underlying sexual and romantic tension between consenting adults.',
    context: 'When mutual chemistry has reached a boiling point and polite small talk is no longer fooling anyone.',
    tone: 'Bold',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: 'We should probably get some sleep soon.' },
      { speaker: 'You', text: 'Let us stop pretending we are just hanging out as friends when we both know how much tension is in this room.' },
      { speaker: 'Partner', text: '(Smiles slowly) Took you long enough to say it.' }
    ],
    possibleResponses: ['I am full of surprises.', 'Then let us do something about it.'],
    commonMistakes: 'Hesitating or softening the statement so much that the boldness is lost.',
    alternativePhrasings: [{ style: 'Direct', phrasing: 'Cut the small talk. You want this as badly as I do.' }],
    speakingChallenge: 'Deliver with unwavering eye contact and a low, deliberate vocal tone.'
  },
  {
    id: 'adult-les-2',
    categoryId: 'adult',
    categoryName: '🔥 Edgy & Adult Studio',
    title: 'The Provocative Double Entendre',
    phrase: 'You have a habit of keeping me up all night—though usually for entirely different reasons.',
    meaning: 'Using playful double entendres to insinuate intimacy and late-night passion.',
    context: 'When discussing sleep deprivation or late hours with a romantic partner.',
    tone: 'Suggestive',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: 'I am so exhausted today because I stayed up until 3 AM.' },
      { speaker: 'You', text: 'You have a habit of keeping me up all night—though usually for entirely different reasons.' },
      { speaker: 'Partner', text: '(Laughs softly) Oh really? Whose fault is that?' }
    ],
    possibleResponses: ['Mine, gladly.', 'Let us set a new personal record tonight.'],
    commonMistakes: 'Being too crude without maintaining playful charm.',
    alternativePhrasings: [{ style: 'Seductive', phrasing: 'Blame the company. Sleep is overrated anyway.' }],
    speakingChallenge: 'Say it with a slow, mischievous smile and relaxed cadence.'
  },
  {
    id: 'adult-les-3',
    categoryId: 'adult',
    categoryName: '🔥 Edgy & Adult Studio',
    title: 'Expressive Adult Banter & Vulgarity',
    phrase: 'Stop being such a fucking tease and tell me what you are actually thinking.',
    meaning: 'Using authentic, unfiltered adult language and casual profanity to express intense attraction and playful frustration.',
    context: 'In high-chemistry banter among close consenting partners where polite filters are dropped.',
    tone: 'Bold',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: 'I might come over later, or I might stay home.' },
      { speaker: 'You', text: 'Stop being such a fucking tease and tell me what you are actually thinking.' },
      { speaker: 'Partner', text: 'Keys are in my hand. I am on my way.' }
    ],
    possibleResponses: ['Hurry up. I am running out of patience.', 'Better be. Do not keep me waiting.'],
    commonMistakes: 'Sounding genuinely angry rather than playfully demanding.',
    alternativePhrasings: [{ style: 'Raw', phrasing: 'Quit playing games and get over here already.' }],
    speakingChallenge: 'Deliver with confident, intense vocal energy and zero hesitation.'
  },
  {
    id: 'adult-les-4',
    categoryId: 'adult',
    categoryName: '🔥 Edgy & Adult Studio',
    title: 'The Seductive Ultimatums',
    phrase: 'You have exactly ten seconds to close the distance between us before I come over there and do it myself.',
    meaning: 'A playful, high-stakes demand that creates immediate physical and romantic urgency.',
    context: 'When sitting across the room from each other in a private setting.',
    tone: 'Seductive',
    intimacyLevel: 'Established Partner / Intimate',
    exampleDialogue: [
      { speaker: 'Partner', text: 'You look comfortable over on that couch.' },
      { speaker: 'You', text: 'You have exactly ten seconds to close the distance between us before I come over there and do it myself.' },
      { speaker: 'Partner', text: 'Challenge accepted.' }
    ],
    possibleResponses: ['Clock is ticking.', 'You missed your window. My turn.'],
    commonMistakes: 'Rushing the delivery without pausing for dramatic effect.',
    alternativePhrasings: [{ style: 'Bold', phrasing: 'Get over here right now or suffer the consequences.' }],
    speakingChallenge: 'Lower your pitch and speak with deliberate, measured pacing.'
  }
];
