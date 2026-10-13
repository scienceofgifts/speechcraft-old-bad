import { FluencyGymDrill } from '../types/speech';

export const FLUENCY_GYM_DRILLS: FluencyGymDrill[] = [
  // 1. Reducing Fillers
  {
    id: 'drill-30s-no-fillers',
    title: '30 Seconds Zero Fillers Challenge',
    category: 'fillers',
    difficulty: 'Beginner',
    prepTimeSeconds: 3,
    timeLimitSeconds: 30,
    targetFocus: 'Eliminating verbal padding (um, uh, like, you know)',
    prompt:
      'Describe what you ate or drank today and why you chose it. Speak continuously for 30 seconds without using a single filler word.',
    challengeRule:
      'When your brain searches for the next word, close your lips and take a silent breath instead of voicing "um" or "uh".',
    modelDemonstration:
      'This morning I brewed a dark roast coffee. [pause] I chose it because I had an early design review and needed clean mental focus. [pause] Later for lunch, I prepared a warm quinoa bowl with roasted vegetables.',
  },
  {
    id: 'drill-deliberate-pause',
    title: 'Replace Fillers with Deliberate Pauses',
    category: 'fillers',
    difficulty: 'Intermediate',
    prepTimeSeconds: 5,
    timeLimitSeconds: 45,
    targetFocus: 'Silence as confidence & pacing punctuation',
    prompt:
      'Discuss a book, podcast, or film that influenced how you think. Whenever you feel an urge to say "you know" or "like", remain silent for a full second.',
    challengeRule:
      'Silence is golden. A two-second pause sounds confident and thoughtful to listeners, whereas a filler sounds hesitant.',
    modelDemonstration:
      'A book that profoundly shifted my perspective is Atomic Habits by James Clear. [pause] His central thesis is that tiny, compound improvements generate extraordinary long-term outcomes. [pause] Rather than focusing solely on ambitious goals, building friction-free daily systems is what produces lasting transformation.',
  },

  // 2. Organizing Thoughts
  {
    id: 'drill-60s-concept',
    title: '60 Seconds Concept Breakdown',
    category: 'organizing',
    difficulty: 'Intermediate',
    prepTimeSeconds: 5,
    timeLimitSeconds: 60,
    targetFocus: 'Structured thinking & consistent conversational pacing',
    prompt:
      'Explain how a common everyday appliance or service works in approximately 60 seconds.',
    challengeRule:
      'Use a 3-part structure: 1) What it is, 2) The core mechanism, 3) The practical benefit to the user.',
    modelDemonstration:
      'A thermostat is an automated device that regulates the temperature of a living space. [pause] At its core, it contains a sensor that continuously monitors ambient room temperature and compares it against your target setting. When the temperature falls below that threshold, it sends an electrical signal to trigger the furnace. [pause] Ultimately, this provides both daily comfort and energy efficiency.',
  },
  {
    id: 'drill-short-story-arc',
    title: 'Storytelling Arc (Beginning, Middle, End)',
    category: 'organizing',
    difficulty: 'Advanced',
    prepTimeSeconds: 5,
    timeLimitSeconds: 60,
    targetFocus: 'Narrative structure, chronological pacing, and resolution',
    prompt:
      'Tell a 60-second story about a time when something did not go as planned while traveling or working on a task.',
    challengeRule:
      'Clear 3-act structure: 1) The setup & expectation, 2) The obstacle / turning point, 3) The resolution & takeaway.',
    modelDemonstration:
      'Last winter, I planned a weekend trip to an isolated mountain cabin, expecting three days of quiet reading. However, two miles from the cabin, a sudden snow squall coated the gravel road in black ice and my vehicle slid into a soft snowbank. Instead of panicking, I walked to a nearby farmhouse where a gracious neighbor helped tow my car out with his tractor. That unexpected detour taught me that flexibility matters far more than an airtight itinerary.',
  },

  // 3. Concision
  {
    id: 'drill-3-sentence-summary',
    title: '3-Sentence Executive Summary',
    category: 'concision',
    difficulty: 'Intermediate',
    prepTimeSeconds: 4,
    timeLimitSeconds: 45,
    targetFocus: 'High information density & concise verbal discipline',
    prompt:
      'Summarize why physical exercise or daily walking is valuable in exactly three clear sentences. Do not use run-on sentences.',
    challengeRule:
      'Exactly three complete sentences. Finish each with a crisp downward pitch cadence.',
    modelDemonstration:
      'Daily physical activity dramatically improves cardiovascular health and sustains energy levels throughout the workday. Additionally, even a brisk twenty-minute walk releases endorphins that reduce mental fatigue and enhance cognitive clarity. Prioritizing consistent movement is one of the highest-leverage investments in long-term longevity.',
  },
  {
    id: 'drill-anti-rambling',
    title: 'Direct Answer (Anti-Rambling / BLUF)',
    category: 'concision',
    difficulty: 'Beginner',
    prepTimeSeconds: 3,
    timeLimitSeconds: 45,
    targetFocus: 'Lead with the answer (Bottom Line Up Front)',
    prompt:
      'Question: "Would you rather work completely remotely, fully in-person, or hybrid, and why?"',
    challengeRule:
      'Answer directly in the very first sentence. Follow with two supporting rationale points, then stop cleanly without trailing off.',
    modelDemonstration:
      'I prefer a hybrid arrangement because it combines focused solitary deep work with high-bandwidth collaborative energy. Working remotely two days a week allows uninterrupted concentration on complex problem-solving. Meanwhile, in-person days cultivate team rapport and spontaneous whiteboard discussions that are difficult to replicate through a screen.',
  },
  {
    id: 'drill-repeat-with-concision',
    title: 'The Concision Re-Take Drill',
    category: 'concision',
    difficulty: 'Advanced',
    prepTimeSeconds: 5,
    timeLimitSeconds: 45,
    targetFocus: 'Trimming 30% of verbal flab on second take',
    prompt:
      'State what your core professional or creative objective is for this coming year.',
    challengeRule:
      'Record once freely. Then record again aiming to say the same truth using 30% fewer words with twice the punch.',
    modelDemonstration:
      'Take 1: "Well, what I am really hoping to accomplish, you know, over the course of the next twelve months is basically to build up my communication presence..."\nTake 2: "My core objective this year is to lead high-stakes executive presentations with clarity, brevity, and natural American cadence."',
  },

  // 4. Impromptu Structuring
  {
    id: 'drill-unexpected-question',
    title: 'The Curveball (Impromptu Speaking)',
    category: 'impromptu',
    difficulty: 'Advanced',
    prepTimeSeconds: 6,
    timeLimitSeconds: 60,
    targetFocus: 'Graceful impromptu composure and mental framing',
    prompt:
      'Unexpected prompt: "If you could instantly become an expert in any obscure craft or discipline tomorrow, which would you pick and how would you use it?"',
    challengeRule:
      'Take 3 seconds of calm silence before your first word. Pick one angle and stick with it.',
    modelDemonstration:
      'If I could master any craft overnight, I would choose traditional woodworking. [pause] Working with raw timber requires an intimate understanding of natural grain, patience, and precise tactile joinery without relying on digital shortcuts. I would use that mastery to design heirloom furniture that outlasts disposable consumer trends.',
  },

  // 5. Thinking in English
  {
    id: 'drill-simple-language',
    title: 'Explain Complex Ideas in Plain English',
    category: 'thinking-english',
    difficulty: 'Intermediate',
    prepTimeSeconds: 5,
    timeLimitSeconds: 60,
    targetFocus: 'Eliminating jargon and intellectual posturing',
    prompt:
      'Explain "cloud computing" (or another technical topic) as if you are explaining it to a curious ten-year-old child.',
    challengeRule:
      'Zero unnecessary technical acronyms or buzzwords. Use a tangible everyday analogy.',
    modelDemonstration:
      'Imagine you want to play a huge collection of video games, but your computer does not have enough storage space to hold them all. Instead of buying a dozen giant hard drives for your bedroom, you connect through the internet to a massive, secure library of computers in another city. That giant library stores your files and runs your programs for you. That is cloud computing.',
  },

  // Additional Expanded Drills
  {
    id: 'drill-response-speed-1',
    title: 'Instant Opinion Spark',
    category: 'response-speed',
    difficulty: 'Beginner',
    prepTimeSeconds: 2,
    timeLimitSeconds: 30,
    targetFocus: 'Zero hesitation startup',
    prompt:
      'Is morning or evening better for deep creative work? Give your stance within 1 second of starting.',
    challengeRule:
      'No introductory throat-clearing like "Well, that is an interesting question." Jump straight into your opinion.',
    modelDemonstration:
      'Morning is unequivocally better because cognitive energy is highest before daily distractions accumulate.',
  },
  {
    id: 'drill-expanding-ideas-1',
    title: 'The "For Instance" Expansion',
    category: 'expanding',
    difficulty: 'Intermediate',
    prepTimeSeconds: 4,
    timeLimitSeconds: 45,
    targetFocus: 'Backing up general claims with concrete personal examples',
    prompt:
      'Claim: "Good listeners ask better questions." Expand this statement with a vivid real-world example.',
    challengeRule:
      'Spend the first 10 seconds on the principle, then spend 30 seconds telling a specific micro-story proving it.',
    modelDemonstration:
      'When someone asks "How was your project?", it invites a polite "Fine." But when someone asks "What was the hardest bottleneck you solved today?", it unlocks genuine dialogue. For instance, last week...',
  },
  {
    id: 'drill-paraphrasing-1',
    title: 'Say It Three Ways (Paraphrasing)',
    category: 'paraphrasing',
    difficulty: 'Advanced',
    prepTimeSeconds: 4,
    timeLimitSeconds: 50,
    targetFocus: 'Lexical agility and flexible phrasing',
    prompt:
      'Express the idea "Time management is essential for success" using three completely different metaphors without repeating words.',
    challengeRule:
      'Use distinct vocabulary for each variation: 1) Architectural, 2) Financial, 3) Athletic.',
    modelDemonstration:
      'First, structuring your hours is like laying the load-bearing foundation of a skyscraper. Second, allocating your attention is investing scarce currency with high compound returns. Third, pacing your daily schedule is like a marathon runner banking energy for the final incline.',
  },
];
