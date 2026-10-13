import { ConversationScenario } from '../types/speech';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  // 1. Everyday interactions and small talk
  {
    id: 'everyday-casual',
    title: 'Coffee Shop & Colleague Catch-Up',
    tag: 'Casual Dialogue',
    category: 'Everyday',
    difficulty: 'Beginner',
    learnerRole: 'Colleague on a break',
    coachRole: 'Friendly coworker (Alex)',
    goal: 'Build rapport, share weekend activities smoothly, and use natural conversational fillers correctly.',
    contextDescription:
      'Warm, spontaneous chat with a colleague during a coffee break about recent weekends, hobbies, or balancing work and life.',
    initialCoachMessage:
      "Hey! Good to catch up. How has your week been treating you so far? Anything interesting going on outside of work?",
    suggestedResponses: [
      'It’s been pretty busy, but I finally had time to check out a new trail over the weekend.',
      'Things have been productive! I’ve been trying to carve out twenty minutes every morning for speech practice.',
      'Can’t complain! Getting through a big project deadline, but looking forward to unwinding.',
    ],
    keyPhrases: [
      'It’s been pretty busy, but...',
      'To be honest with you...',
      'How about yourself?',
    ],
  },
  {
    id: 'grocery-market-chat',
    title: 'Farmers Market & Food Chat',
    tag: 'Daily Errands',
    category: 'Everyday',
    difficulty: 'Beginner',
    learnerRole: 'Friendly shopper',
    coachRole: 'Local vendor or fellow shopper',
    goal: 'Engage in friendly, casual small talk about local produce and cooking tips.',
    contextDescription:
      'Chatting with someone at a bustling farmers market about fresh vegetables, seasonal recipes, and cooking tips.',
    initialCoachMessage:
      "Excuse me, do you happen to know what these heirloom tomatoes taste like? I'm trying to decide between these and the vine-ripened ones.",
    suggestedResponses: [
      'Oh, those heirloom ones are usually much sweeter and less acidic, perfect for a caprese salad.',
      'I haven’t tried this specific batch yet, but the vendor told me they were picked just this morning!',
    ],
    keyPhrases: [
      'Do you happen to know...',
      'If I recall correctly...',
      'I’d highly recommend...',
    ],
  },

  // 2. Making friends and building relationships
  {
    id: 'community-event-meetup',
    title: 'Community Tech Meetup Intro',
    tag: 'Building Rapport',
    category: 'Making Friends',
    difficulty: 'Intermediate',
    learnerRole: 'New meetup attendee',
    coachRole: 'Welcoming community member',
    goal: 'Introduce yourself comfortably, express shared interests, and initiate an authentic connection.',
    contextDescription:
      'Meeting someone new at a local professional or hobby meetup and striking up a welcoming conversation about shared interests.',
    initialCoachMessage:
      "Hi there! Are you a regular at these design meetups, or is this your first time joining us?",
    suggestedResponses: [
      'This is actually my first time here! I’ve been following the group online and finally decided to drop in.',
      'I’ve dropped in a couple of times before. Always great to hear what people are building.',
    ],
    keyPhrases: [
      'This is actually my first time...',
      'What brought you out tonight?',
      'I’d love to keep in touch.',
    ],
  },
  {
    id: 'hobby-discussion',
    title: 'Discussing Creative Hobbies',
    tag: 'Shared Interests',
    category: 'Making Friends',
    difficulty: 'Intermediate',
    learnerRole: 'Enthusiastic hobbyist',
    coachRole: 'Curious conversation partner',
    goal: 'Describe personal creative or athletic pursuits with expressive pacing and enthusiasm.',
    contextDescription:
      'Sharing your passion for photography, hiking, music, or reading with someone who shares similar creative curiosities.',
    initialCoachMessage:
      "I noticed your camera bag—are you into street photography, or do you shoot landscapes mostly?",
    suggestedResponses: [
      'Mostly street photography and urban architecture! I love capturing candid moments in the city.',
      'I’m more into nature and hiking trails, though I’ve been experimenting with portrait photography lately.',
    ],
    keyPhrases: [
      'I’ve always been fascinated by...',
      'What got you into...',
      'There’s something magical about...',
    ],
  },

  // 3. Workplace conversations and professional networking
  {
    id: 'networking-elevator-pitch',
    title: 'Professional Networking Mixer',
    tag: 'Career Growth',
    category: 'Workplace',
    difficulty: 'Intermediate',
    learnerRole: 'Conference attendee',
    coachRole: 'Senior industry professional',
    goal: 'Deliver a concise, articulate 30-second professional introduction and pivot to open dialogue.',
    contextDescription:
      'Meeting a senior leader at an industry networking reception and exchanging professional backgrounds.',
    initialCoachMessage:
      "Hello! I'm Sarah from the product strategy team. What brings you to the summit this year?",
    suggestedResponses: [
      'Hi Sarah, I lead product design at a fintech startup. I’m here exploring how teams scale their design systems.',
      'Great to meet you! I work on developer tooling, and I’m especially interested in the talks on automated workflows.',
    ],
    keyPhrases: [
      'What brings you to the summit?',
      'I’m especially interested in...',
      'How has your experience been so far?',
    ],
  },
  {
    id: 'cross-functional-alignment',
    title: 'Cross-Functional Alignment Chat',
    tag: 'Collaboration',
    category: 'Workplace',
    difficulty: 'Advanced',
    learnerRole: 'Project Lead',
    coachRole: 'Engineering Manager',
    goal: 'Negotiate priorities across departments with clarity, empathy, and professional diplomacy.',
    contextDescription:
      'Discussing conflicting delivery schedules with a peer manager to find common ground without friction.',
    initialCoachMessage:
      "Thanks for jumping on this sync. Regarding the Q3 feature release, engineering is feeling a bit squeezed on QA bandwidth.",
    suggestedResponses: [
      'I completely understand the resource constraint. What if we phase the release so core functionality goes live first?',
      'Let’s look at the critical path. Can we deprioritize the secondary analytics dashboard to protect the main launch date?',
    ],
    keyPhrases: [
      'I completely understand the constraint.',
      'What if we phase the release...',
      'Let’s look at the critical path.',
    ],
  },

  // 4. Meetings, presentations, and explaining ideas
  {
    id: 'explain-complex-idea',
    title: 'Explain an Architecture Shift',
    tag: 'Technical Clarity',
    category: 'Meetings & Ideas',
    difficulty: 'Advanced',
    learnerRole: 'Senior Engineer / Architect',
    coachRole: 'Executive Stakeholder',
    goal: 'Translate complex technical strategy into crisp, executive-ready language without jargon overload.',
    contextDescription:
      'Translating a sophisticated architectural change into high-level business benefits for executive leadership.',
    initialCoachMessage:
      "Thanks for joining. We have ten minutes before the executive committee joins. Could you give me the high-level rationale behind this architectural change we're proposing?",
    suggestedResponses: [
      'The core premise is straightforward: by decoupling the database layers, we cut system downtime in half and reduce cloud costs.',
      'Think of it as upgrading our pipeline foundation—it allows us to scale ten times faster without adding maintenance overhead.',
    ],
    keyPhrases: [
      'The core premise is straightforward...',
      'Think of it as upgrading...',
      'The bottom line for the business is...',
    ],
  },
  {
    id: 'meeting-kickoff-agenda',
    title: 'Running a Product Kickoff Meeting',
    tag: 'Meeting Leadership',
    category: 'Meetings & Ideas',
    difficulty: 'Intermediate',
    learnerRole: 'Meeting Facilitator',
    coachRole: 'Engaged Team Member',
    goal: 'Set a clear agenda, establish meeting norms, and invite participation with authoritative presence.',
    contextDescription:
      'Opening a strategic planning session and setting clear goals for the next quarter.',
    initialCoachMessage:
      "Good morning everyone! Let's get started. Today we're mapping out our Q4 product roadmap. Who would like to kick us off with the user research highlights?",
    suggestedResponses: [
      'I can jump in with the top three insights from our customer interviews last week.',
      'Before we dive in, I want to make sure we allocate 15 minutes for risk assessment on the migration timeline.',
    ],
    keyPhrases: [
      'Let’s get started.',
      'Who would like to kick us off?',
      'Before we dive in...',
    ],
  },

  // 5. Job interviews and career development
  {
    id: 'interview-behavioral',
    title: 'Behavioral Job Interview: Conflict',
    tag: 'Executive & Career',
    category: 'Job Interviews',
    difficulty: 'Advanced',
    learnerRole: 'Job Candidate',
    coachRole: 'Hiring Manager / Interviewer',
    goal: 'Answer behavioral interview questions using the STAR method with calm pacing and clear articulation.',
    contextDescription:
      'A formal interview question evaluating how you handle professional pushback and disagreement.',
    initialCoachMessage:
      "Welcome. Let's start with a classic behavioral question: Could you tell me about a time when you faced unexpected pushback on an idea, and how you navigated that conversation?",
    suggestedResponses: [
      'In my last project, our engineering lead was concerned about the timeline for a new feature. I listened to their concerns and proposed a phased rollout...',
      'Early in my career, I proposed an overhaul to our reporting system and encountered skepticism. I scheduled a 1-on-1 walk-through to address their data security worries...',
    ],
    keyPhrases: [
      'Could you tell me about a time when...',
      'I listened to their concerns and...',
      'The result was a 30% reduction in...',
    ],
  },
  {
    id: 'salary-negotiation-chat',
    title: 'Career Growth & Compensation Chat',
    tag: 'Career Development',
    category: 'Job Interviews',
    difficulty: 'Advanced',
    learnerRole: 'Employee / Candidate',
    coachRole: 'Department Director',
    goal: 'Articulate your professional value with confidence, diplomacy, and calm assertiveness.',
    contextDescription:
      'Discussing scope expansion and professional development review with your manager.',
    initialCoachMessage:
      "Thanks for meeting with me. I wanted to review your mid-year performance review and discuss how your role scope has expanded.",
    suggestedResponses: [
      'Thank you. Over the last six months, I’ve taken on ownership of the cross-functional mobile migration while maintaining our core delivery metrics.',
      'I’m glad we’re reviewing this. I’d love to discuss how my expanded responsibilities align with our growth goals.',
    ],
    keyPhrases: [
      'Over the last six months, I’ve taken on...',
      'I’d love to discuss how...',
      'Looking ahead to the next quarter...',
    ],
  },

  // 6. Expressing opinions, agreeing, and disagreeing politely
  {
    id: 'express-opinion-debate',
    title: 'Debating Remote Work Culture',
    tag: 'Persuasion & Stance',
    category: 'Opinions & Debate',
    difficulty: 'Advanced',
    learnerRole: 'Panel Participant',
    coachRole: 'Discussion Moderator',
    goal: 'Articulate a nuanced viewpoint with structured reasoning, polite qualifiers, and strong vocal presence.',
    contextDescription:
      'Expressing your perspective on remote work culture, AI tools in daily life, or creative autonomy.',
    initialCoachMessage:
      "I'm curious about your perspective: Do you think fully remote teams weaken organizational culture, or do they unlock global talent pools?",
    suggestedResponses: [
      'I believe it’s a double-edged sword; while it expands talent access, intentional rituals are required to maintain deep trust.',
      'In my view, culture isn’t about physical proximity—it’s about clarity of written communication and shared accountability.',
    ],
    keyPhrases: [
      'I see both sides of the coin...',
      'In my view, culture isn’t about...',
      'To build on that point...',
    ],
  },
  {
    id: 'disagreeing-politely',
    title: 'Disagreeing Politely in a Review',
    tag: 'Tactful Diplomacy',
    category: 'Opinions & Debate',
    difficulty: 'Advanced',
    learnerRole: 'Product Contributor',
    coachRole: 'Senior Stakeholder',
    goal: 'Politely voice a dissenting perspective without causing defensiveness.',
    contextDescription:
      'Challenging an assumption made during a product design review while maintaining collaborative goodwill.',
    initialCoachMessage:
      "I think we should remove the search filter bar on mobile to keep the screen clean and minimalist.",
    suggestedResponses: [
      'I understand wanting a clean aesthetic, but our user data shows that over 60% of mobile users rely on that filter immediately.',
      'That’s an interesting angle, though I’d worry that removing it might increase drop-off rates on search results.',
    ],
    keyPhrases: [
      'I understand wanting to keep...',
      'Our user data actually shows that...',
      'Have we considered the trade-off with...',
    ],
  },

  // 7. Asking questions, clarifying, and handling misunderstandings
  {
    id: 'clarifying-requirements',
    title: 'Clarifying Ambiguous Requirements',
    tag: 'Active Inquiry',
    category: 'Clarification',
    difficulty: 'Intermediate',
    learnerRole: 'Software Engineer / Designer',
    coachRole: 'Product Owner',
    goal: 'Ask precise, clarifying questions to untangle vague project requirements.',
    contextDescription:
      'Receiving high-level instructions that lack specific acceptance criteria and probing for concrete details.',
    initialCoachMessage:
      "We need the new reporting dashboard to be much more dynamic and user-friendly for enterprise clients by next month.",
    suggestedResponses: [
      'That sounds like a great goal! Could you clarify what specific data exports enterprise clients are asking for most frequently?',
      'To make sure we build the right thing, what does "dynamic" mean in terms of latency and filtering?',
    ],
    keyPhrases: [
      'Could you clarify what specific...',
      'To make sure we build the right thing...',
      'Just to replay what you said...',
    ],
  },
  {
    id: 'handling-misunderstanding',
    title: 'Resolving a Miscommunication',
    tag: 'Conflict Resolution',
    category: 'Clarification',
    difficulty: 'Intermediate',
    learnerRole: 'Account Lead',
    coachRole: 'Frustrated Client',
    goal: 'Calmly defuse a misunderstanding, apologize professionally, and reset expectations.',
    contextDescription:
      'Addressing a client who received the wrong report deliverable due to a miscommunication.',
    initialCoachMessage:
      "I reviewed the report you sent over, and this only covers Q1 metrics when we specifically requested the year-over-year growth breakdown.",
    suggestedResponses: [
      'You are entirely right, and I apologize for missing that requirement. Let me pull the year-over-year figures right now.',
      'I can see why that caused confusion. Let me re-run the analysis to include the full annual breakdown by this afternoon.',
    ],
    keyPhrases: [
      'You are entirely right, and I apologize...',
      'Let me pull those figures right now...',
      'We’ll make sure this is updated immediately.',
    ],
  },

  // 8. Storytelling and sharing personal experiences
  {
    id: 'storytelling-turning-point',
    title: 'Sharing a Professional Turning Point',
    tag: 'Narrative Arc',
    category: 'Storytelling',
    difficulty: 'Advanced',
    learnerRole: 'Podcast Guest / Speaker',
    coachRole: 'Podcast Host',
    goal: 'Craft a compelling narrative with pacing, suspense, and emotional resonance.',
    contextDescription:
      'Sharing a pivotal career moment when a major project failure taught you an invaluable lesson.',
    initialCoachMessage:
      "Welcome to the show! Tell our listeners about a moment in your career when everything seemed to go wrong, and how it shaped your approach today.",
    suggestedResponses: [
      'It was 2021, and our flagship launch crashed within ten minutes of going live. At first, panic set in...',
      'Picture this: three hours before our biggest investor presentation, our demo environment completely wiped its database...',
    ],
    keyPhrases: [
      'Picture this: three hours before...',
      'At first, panic set in, but then...',
      'That experience completely changed how I...',
    ],
  },
  {
    id: 'youtube-documentary-narration',
    title: 'Documentary Narration & Tone',
    tag: 'Vocal Dynamics',
    category: 'Storytelling',
    difficulty: 'Intermediate',
    learnerRole: 'Voiceover Narrator',
    coachRole: 'Audio Producer',
    goal: 'Practice engaging narrative pacing, suspense, and vocal color for media projects.',
    contextDescription:
      'Practicing engaging narrative pacing, suspense, and vocal color for a documentary voiceover.',
    initialCoachMessage:
      "Imagine you are narrating the opening 45 seconds of a documentary about a deep-sea exploration submarine venturing into the Mariana Trench. Set the scene.",
    suggestedResponses: [
      'Seven miles beneath the Pacific surface, daylight ceases to exist. Here, the water pressure is enough to crush titanium...',
      'In the darkest reaches of our planet, life doesn’t merely survive; it flourishes in quiet, eerie perfection.',
    ],
    keyPhrases: [
      'Seven miles beneath the Pacific surface...',
      'In the darkest reaches of our planet...',
      'What lies ahead is entirely unknown...',
    ],
  },

  // 9. Telephone and video calls
  {
    id: 'remote-video-call-checkin',
    title: 'Virtual Video Call Icebreaker',
    tag: 'Remote Etiquette',
    category: 'Phone & Video',
    difficulty: 'Beginner',
    learnerRole: 'Meeting Attendee',
    coachRole: 'Remote Teammate',
    goal: 'Overcome audio latency and camera presence with crisp, clear vocal projection.',
    contextDescription:
      'Opening a remote video conference call and making small talk before diving into the agenda.',
    initialCoachMessage:
      "Can everyone hear me okay? My internet connection has been acting a little spotty this morning.",
    suggestedResponses: [
      'Loud and clear on my end! Though your video froze for just a second.',
      'We can hear you fine. How’s the weather treating you over on the West Coast?',
    ],
    keyPhrases: [
      'Loud and clear on my end!',
      'Your video froze for a second.',
      'Let’s dive right into the agenda.',
    ],
  },
  {
    id: 'handling-bad-connection',
    title: 'Managing Technical Glitches on a Call',
    tag: 'Troubleshooting',
    category: 'Phone & Video',
    difficulty: 'Intermediate',
    learnerRole: 'Presenter',
    coachRole: 'Meeting Participant',
    goal: 'Gracefully handle unexpected audio dropouts or screen-sharing glitches with calm composure.',
    contextDescription:
      'Your slides freeze mid-presentation on a client video call and you need to pivot smoothly.',
    initialCoachMessage:
      "Oh, it looks like your slides just went black. Are you still sharing your screen?",
    suggestedResponses: [
      'Thanks for catching that! Let me re-share my window right now.',
      'It looks like my presentation app crashed. Give me ten seconds to pull up the backup PDF.',
    ],
    keyPhrases: [
      'Thanks for catching that!',
      'Let me re-share my window right now.',
      'Give me ten seconds to pull up...',
    ],
  },

  // 10. Unexpected situations requiring quick responses
  {
    id: 'elevator-pitch-surprise',
    title: 'Surprise Elevator Pitch to a CEO',
    tag: 'Impromptu Speaking',
    category: 'Unexpected',
    difficulty: 'Advanced',
    learnerRole: 'Innovator',
    coachRole: 'Company CEO',
    goal: 'Deliver a structured, confident impromptu response when put on the spot unexpectedly.',
    contextDescription:
      'Stepping into the office elevator and finding yourself face-to-face with the CEO who asks what you are working on.',
    initialCoachMessage:
      "Hey! You're on the new speech AI project, right? What's the most exciting breakthrough your team has shipped this week?",
    suggestedResponses: [
      'Hi Alex! We just launched real-time phonetic feedback that highlights vowel accuracy instantly. Engagement is up 40%.',
      'Good morning! We’ve cracked sub-second audio transcription turnaround, which makes conversational practice feel completely lifelike.',
    ],
    keyPhrases: [
      'What’s the most exciting breakthrough...',
      'We just launched real-time feedback...',
      'The biggest win for us has been...',
    ],
  },
  {
    id: 'handling-curveball-question',
    title: 'Handling a Curveball Question in Q&A',
    tag: 'Grace Under Pressure',
    category: 'Unexpected',
    difficulty: 'Advanced',
    learnerRole: 'Presenter',
    coachRole: 'Skeptical Audience Member',
    goal: 'Maintain composure, buy thinking time gracefully, and address an unexpected curveball question.',
    contextDescription:
      'An audience member asks a sharp, off-topic question during a live presentation Q&A.',
    initialCoachMessage:
      "That rollout plan sounds fine for enterprise, but how does this help small teams with zero budget?",
    suggestedResponses: [
      'That is a fantastic question. While our enterprise tiers provide advanced analytics, our core practice drills are 100% free for individual learners.',
      'I’m glad you raised that. In fact, we’ve designed a lightweight self-serve tier specifically for bootstrapped teams.',
    ],
    keyPhrases: [
      'That is a fantastic question.',
      'In fact, we’ve designed specifically...',
      'I’m glad you raised that point.',
    ],
  },
  {
    id: 'party-rooftop-intro',
    title: 'Meeting Someone at a Lively Rooftop Party',
    tag: 'Socializing',
    category: 'Making Friends',
    difficulty: 'Intermediate',
    learnerRole: 'Party guest',
    coachRole: 'Friendly attendee (Jordan)',
    goal: 'Strike up a natural, engaging conversation in a social setting and find common ground.',
    contextDescription: 'A lively rooftop gathering on a Friday evening with ambient music and great views.',
    initialCoachMessage: "Hey! Incredible view from up here, right? Have you known the host long, or are you floating around meeting new people like I am?",
    suggestedResponses: [
      'I’m actually a friend of a friend! Just dropped in to enjoy the music and meet some new faces.',
      'Known the host since college. How about yourself? How did you end up on the rooftop tonight?',
    ],
    keyPhrases: [
      'Have you known the host long?',
      'How about yourself?',
      'It’s a fantastic vibe up here.',
    ],
  },
  {
    id: 'art-gallery-stranger',
    title: 'Starting a Conversation at an Art Gallery',
    tag: 'Cultural Chat',
    category: 'Making Friends',
    difficulty: 'Intermediate',
    learnerRole: 'Art enthusiast',
    coachRole: 'Gallery visitor (Sam)',
    goal: 'Initiate a thoughtful conversation about abstract art and share personal impressions.',
    contextDescription: 'Standing in front of a striking abstract painting at a local gallery opening.',
    initialCoachMessage: "I’ve been staring at this particular canvas for five minutes and I still can’t decide if it’s brilliant or completely chaotic. What’s your take?",
    suggestedResponses: [
      'I think that’s kind of the beauty of it. It feels chaotic at first glance, but the color palette has this weirdly calming balance.',
      'Honestly? It looks like my toddler’s art project after three cups of espresso. But I kind of love it.',
    ],
    keyPhrases: [
      'What’s your take on this?',
      'At first glance...',
      'It’s kind of growing on me.',
    ],
  },
  {
    id: 'lounge-playful-banter',
    title: 'Flirting and Playful Banter at a Lounge',
    tag: 'Charming Wit',
    category: 'Everyday',
    difficulty: 'Advanced',
    learnerRole: 'Witty conversationalist',
    coachRole: 'Charming local (Taylor)',
    goal: 'Exchange playful tease, dry humor, and witty observations with smooth pacing.',
    contextDescription: 'Relaxing at a dim lit lounge bar on a Saturday night.',
    initialCoachMessage: "I noticed you ordered the most complicated drink on the menu. Is that a statement or a desperate cry for caffeine?",
    suggestedResponses: [
      'A bit of both, honestly. Life’s too short for boring beverages.',
      'It’s actually a secret intelligence test. You passed by noticing.',
    ],
    keyPhrases: [
      'Is that a statement or...',
      'Life’s too short for...',
      'Consider it a test.',
    ],
  },
  {
    id: 'first-date-drinks',
    title: 'First Date: Drinks & Appetizers',
    tag: 'Romantic Interest',
    category: 'Everyday',
    difficulty: 'Intermediate',
    learnerRole: 'First-date participant',
    coachRole: 'Date partner (Morgan)',
    goal: 'Keep conversational momentum flowing naturally, ask engaging follow-up questions, and share personal stories.',
    contextDescription: 'Sitting across from each other at a cozy neighborhood bistro over drinks.',
    initialCoachMessage: "So far this place is living up to the hype. Tell me, when you're not trying out new restaurants, what do you usually do to unwind?",
    suggestedResponses: [
      'Usually hiking or getting lost in a good sci-fi novel. What about you? What’s your go-to weekend escape?',
      'I’m a huge fan of cooking experiments—sometimes successful, sometimes total disasters.',
    ],
    keyPhrases: [
      'What do you usually do to unwind?',
      'What’s your go-to weekend escape?',
      'That sounds right up my alley.',
    ],
  },
  {
    id: 'awkward-silence-recovery',
    title: 'Handling an Awkward Silence Gracefully',
    tag: 'Grace Under Pressure',
    category: 'Unexpected',
    difficulty: 'Advanced',
    learnerRole: 'Smooth communicator',
    coachRole: 'Conversation partner (Chris)',
    goal: 'Notice an awkward pause and pivot smoothly with a self-aware, humorous observation.',
    contextDescription: 'A brief, awkward silence settles into the conversation during a dinner party.',
    initialCoachMessage: "(Quiet pause for a moment)... So, uh. Nice weather we’re having lately.",
    suggestedResponses: [
      'Ah, the classic weather backup! We’ve officially run out of small talk topics. Let’s fix that—what was your most memorable travel disaster?',
      'That silence was so heavy you could hear a pin drop. Let’s start over: if you could instantly master any skill right now, what would it be?',
    ],
    keyPhrases: [
      'The classic weather backup!',
      'Let’s start over.',
      'What was your most memorable...',
    ],
  },
  {
    id: 'playful-disagreement-comeback',
    title: 'Playing Devil’s Advocate & Witty Comebacks',
    tag: 'Spicy Banter',
    category: 'Opinions & Debate',
    difficulty: 'Advanced',
    learnerRole: 'Debater',
    coachRole: 'Challenger (Pat)',
    goal: 'Disagree playfully without being adversarial, using a clever counter-argument and a smile.',
    contextDescription: 'Debating a lighthearted topic like whether pineapple belongs on pizza or if cities are better than the countryside.',
    initialCoachMessage: "I honestly don't understand how anyone can enjoy living in a bustling city. The noise alone would drive me insane.",
    suggestedResponses: [
      'Fair point, but quiet suburban streets give me low-key horror movie vibes after 9 PM. Give me city energy any day.',
      'That’s because you haven’t discovered the secret rooftop cafes yet. Silence is overrated!',
    ],
    keyPhrases: [
      'Fair point, but...',
      'Give me city energy any day.',
      'Silence is overrated!',
    ],
  },
];
