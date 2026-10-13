import os
#!/usr/bin/env python3
import json

base_entries = [
    # A
    ("Abate", "verb", "To decrease in force, intensity, or amount; to subside.", "Intermediate", ["Action & Change"]),
    ("Aberration", "noun", "A departure from what is normal, usual, or expected.", "Advanced", ["Logic & Philosophy"]),
    ("Abeyance", "noun", "A state of temporary disuse or suspension.", "Advanced", ["Law & Governance"]),
    ("Abjure", "verb", "To solemnly renounce or reject a belief, cause, or claim.", "Advanced", ["Argumentation"]),
    ("Abnegation", "noun", "The act of renouncing or rejecting something; self-denial.", "Advanced", ["Psychology"]),
    ("Abridge", "verb", "To shorten a text or speech without losing its central meaning.", "Intermediate", ["Writing & Rhetoric"]),
    ("Absolve", "verb", "To declare someone free from blame, guilt, or responsibility.", "Intermediate", ["Ethics & Law"]),
    ("Abstemious", "adjective", "Not self-indulgent, especially when eating and drinking; moderate.", "Advanced", ["Personality & Character"]),
    ("Abstruse", "adjective", "Difficult to understand; obscure or esoteric.", "Advanced", ["Cognition & Knowledge"]),
    ("Accede", "verb", "To agree to a demand, request, or treaty; to assume an office.", "Intermediate", ["Governance & Law"]),
    ("Acclimate", "verb", "To become accustomed to a new climate or environment; adapt.", "Intermediate", ["Action & Change"]),
    ("Accolade", "noun", "An award, honor, or expression of praise and approval.", "Intermediate", ["Leadership & Career"]),
    ("Accretion", "noun", "Growth or increase by gradual addition or accumulation.", "Advanced", ["Science & Nature"]),
    ("Acerbic", "adjective", "Sharp and forthright in tone or temper; tasting sour.", "Advanced", ["Rhetoric & Speech"]),
    ("Acquiesce", "verb", "To accept or agree to something reluctantly but without protest.", "Intermediate", ["Relationships"]),
    ("Acrimonious", "adjective", "Angry and bitter in tone or language.", "Advanced", ["Rhetoric & Speech"]),
    ("Acumen", "noun", "The ability to make good judgments and quick decisions.", "Intermediate", ["Leadership & Strategy"]),
    ("Adage", "noun", "A traditional saying expressing a common observation or truth.", "Intermediate", ["Literature & Speech"]),
    ("Adamant", "adjective", "Refusing to be persuaded or to change one's mind; resolute.", "Intermediate", ["Personality & Character"]),
    ("Adduce", "verb", "To cite as evidence or proof in an argument.", "Advanced", ["Argumentation & Logic"]),
    ("Adept", "adjective", "Very skilled or proficient at something.", "Foundational", ["Leadership & Strategy"]),
    ("Admonish", "verb", "To warn or reprimand someone firmly.", "Intermediate", ["Communication"]),
    ("Adroit", "adjective", "Clever or skillful in using the hands or mind.", "Intermediate", ["Leadership & Strategy"]),
    ("Adulation", "noun", "Excessive praise, admiration, or flattery.", "Intermediate", ["Social Dynamics"]),
    ("Adulterate", "verb", "To render something impure or weaker by adding inferior elements.", "Intermediate", ["Action & Change"]),
    ("Adversity", "noun", "Difficulties, misfortune, or hardship.", "Foundational", ["Psychology"]),
    ("Advocate", "verb", "To publicly recommend or support a particular cause or policy.", "Foundational", ["Rhetoric & Speech"]),
    ("Aesthetic", "adjective", "Concerned with beauty or the appreciation of beauty.", "Intermediate", ["Literature & Arts"]),
    ("Affable", "adjective", "Friendly, good-natured, or easy to talk to.", "Foundational", ["Personality & Character"]),
    ("Affectation", "noun", "Behavior, speech, or writing that is artificial and designed to impress.", "Advanced", ["Psychology"]),
    ("Affluence", "noun", "The state of having a great deal of money or wealth.", "Foundational", ["Economics & Society"]),
    ("Aggrandize", "verb", "To increase the power, status, or wealth of an individual or nation.", "Advanced", ["Governance & Law"]),
    ("Agility", "noun", "Ability to move quickly and easily or think rapidly.", "Foundational", ["Cognition"]),
    ("Alacrity", "noun", "Brisk and cheerful readiness or eagerness.", "Advanced", ["Personality & Character"]),
    ("Algorithmic", "adjective", "Relating to a step-by-step procedure for solving a problem.", "Intermediate", ["Science & Tech"]),
    ("Alienate", "verb", "To cause someone to feel isolated or estranged.", "Foundational", ["Psychology"]),
    ("Allay", "verb", "To diminish, soothe, or put at rest fear, suspicion, or worry.", "Intermediate", ["Psychology & Emotion"]),
    ("Alleviate", "verb", "To make suffering, deficiency, or a problem less severe.", "Foundational", ["Action & Change"]),
    ("Allocate", "verb", "To distribute resources or duties for a specific purpose.", "Foundational", ["Management & Strategy"]),
    ("Allude", "verb", "To suggest or call attention to indirectly; hint at.", "Intermediate", ["Writing & Rhetoric"]),
    ("Aloof", "adjective", "Not friendly or forthcoming; cool and distant.", "Foundational", ["Personality & Character"]),
    ("Altruism", "noun", "Unselfish regard for or devotion to the welfare of others.", "Intermediate", ["Ethics & Philosophy"]),
    ("Amalgamate", "verb", "To combine or unite to form one organization or structure.", "Intermediate", ["Management & Strategy"]),
    ("Ambiguity", "noun", "The quality of being open to more than one interpretation.", "Intermediate", ["Logic & Philosophy"]),
    ("Ambivalence", "noun", "The state of having mixed feelings or contradictory ideas.", "Intermediate", ["Psychology & Emotion"]),
    ("Ameliorate", "verb", "To make a bad situation better or more tolerable.", "Advanced", ["Action & Change"]),
    ("Amenable", "adjective", "Open and responsive to suggestion; easily persuaded.", "Intermediate", ["Personality & Character"]),
    ("Amiable", "adjective", "Having or displaying a friendly and pleasant manner.", "Foundational", ["Personality & Character"]),
    ("Amity", "noun", "A friendly relationship between people or countries.", "Intermediate", ["Governance & Law"]),
    ("Anachronism", "noun", "Something belonging or appropriate to a period other than that in which it exists.", "Advanced", ["Literature & History"]),
    ("Analogy", "noun", "A comparison between two things for explanation or clarification.", "Foundational", ["Logic & Rhetoric"]),
    ("Anarchic", "adjective", "Lacking control, order, or authority; chaotic.", "Intermediate", ["Governance & Law"]),
    ("Anathema", "noun", "Something or someone that one vehemently dislikes or detests.", "Advanced", ["Rhetoric & Speech"]),
    ("Anecdote", "noun", "A short and amusing or interesting story about a real incident.", "Foundational", ["Literature & Rhetoric"]),
    ("Animosity", "noun", "Strong hostility, ill feeling, or hatred.", "Foundational", ["Psychology & Emotion"]),
    ("Anomaly", "noun", "Something that deviates from what is standard, normal, or expected.", "Intermediate", ["Science & Nature"]),
    ("Antagonism", "noun", "Active hostility or opposition.", "Foundational", ["Social Dynamics"]),
    ("Antecedent", "noun", "A thing or event that existed before or logically precedes another.", "Intermediate", ["Logic & History"]),
    ("Antipathy", "noun", "A deep-seated feeling of dislike or aversion.", "Advanced", ["Psychology & Emotion"]),
    ("Antiquated", "adjective", "Old-fashioned or outdated.", "Foundational", ["History & Society"]),
    ("Antithesis", "noun", "A person or thing that is the direct opposite of someone or something else.", "Advanced", ["Logic & Rhetoric"]),
    ("Apathy", "noun", "Lack of interest, enthusiasm, or concern.", "Foundational", ["Psychology & Emotion"]),
    ("Apex", "noun", "The highest point or peak of something.", "Foundational", ["Quantitative & Spatial"]),
    ("Aphorism", "noun", "A pithy observation that contains a general truth.", "Advanced", ["Literature & Rhetoric"]),
    ("Aplomb", "noun", "Self-confidence or assurance, especially when in a demanding situation.", "Advanced", ["Leadership & Strategy"]),
    ("Apocryphal", "adjective", "Of doubtful authenticity, although widely circulated as being true.", "Advanced", ["Literature & History"]),
    ("Apologist", "noun", "A person who offers any defense in support of something controversial.", "Advanced", ["Argumentation & Law"]),
    ("Apostate", "noun", "A person who renounces a religious or political belief or principle.", "Advanced", ["Governance & Law"]),
    ("Appease", "verb", "To pacify or placate someone by acceding to their demands.", "Intermediate", ["Governance & Law"]),
    ("Apposite", "adjective", "Apt in the circumstances or in relation to something; relevant.", "Advanced", ["Logic & Rhetoric"]),
    ("Appraise", "verb", "To assess the value or quality of something.", "Foundational", ["Management & Strategy"]),
    ("Apprehension", "noun", "Anxiety or fear that something bad or unpleasant will happen.", "Foundational", ["Psychology & Emotion"]),
    ("Approbation", "noun", "Approval or praise.", "Advanced", ["Social Dynamics"]),
    ("Appropriate", "verb", "To take something for one's own use, typically without permission.", "Intermediate", ["Governance & Law"]),
    ("Apropos", "adjective", "Very appropriate or relevant to a given situation.", "Intermediate", ["Communication"]),
    ("Ardent", "adjective", "Enthusiastic or passionate.", "Foundational", ["Psychology & Emotion"]),
    ("Arduous", "adjective", "Involving or requiring strenuous effort; difficult and tiring.", "Intermediate", ["Action & Change"]),
    ("Arrogance", "noun", "An insulting degree of self-importance or haughtiness.", "Foundational", ["Personality & Character"]),
    ("Articulate", "verb", "To express an idea or feeling fluently and coherently.", "Foundational", ["Rhetoric & Speech"]),
    ("Ascetic", "adjective", "Characterized by severe self-discipline and abstention from indulgences.", "Advanced", ["Philosophy"]),
    ("Ascribe", "verb", "To attribute something to a cause, person, or origin.", "Intermediate", ["Logic & Reasoning"]),
    ("Asperity", "noun", "Harshness of tone or manner.", "Advanced", ["Rhetoric & Speech"]),
    ("Aspersion", "noun", "An attack on the reputation or integrity of someone or something.", "Advanced", ["Rhetoric & Speech"]),
    ("Assail", "verb", "To make a concerted or violent attack on.", "Intermediate", ["Action & Change"]),
    ("Assent", "noun", "The expression of approval or agreement.", "Intermediate", ["Governance & Law"]),
    ("Assert", "verb", "To state a fact or belief confidently and forcefully.", "Foundational", ["Rhetoric & Speech"]),
    ("Assiduous", "adjective", "Showing great care, attention, and effort.", "Advanced", ["Leadership & Strategy"]),
    ("Assuage", "verb", "To make an unpleasant feeling less intense or satisfy a desire.", "Intermediate", ["Psychology & Emotion"]),
    ("Astute", "adjective", "Having or showing an ability to accurately assess situations.", "Intermediate", ["Cognition & Knowledge"]),
    ("Audacious", "adjective", "Showing a willingness to take surprisingly bold risks.", "Intermediate", ["Personality & Character"]),
    ("Augment", "verb", "To make something greater by adding to it; increase.", "Foundational", ["Action & Change"]),
    ("August", "adjective", "Respected and impressive; majestic or venerable.", "Advanced", ["Governance & Leadership"]),
    ("Auspicious", "adjective", "Conducive to success; favorable.", "Intermediate", ["Life & Society"]),
    ("Austerity", "noun", "Sternness or severity of manner; extreme plainness and frugality.", "Intermediate", ["Economics & Governance"]),
    ("Authentic", "adjective", "Of undisputed origin; genuine and real.", "Foundational", ["Philosophy"]),
    ("Autocratic", "adjective", "Taking no account of other people's wishes or opinions; domineering.", "Intermediate", ["Governance & Law"]),
    ("Autonomous", "adjective", "Having self-government or freedom to act independently.", "Foundational", ["Governance & Law"]),
    ("Avarice", "noun", "Extreme greed for wealth or material gain.", "Advanced", ["Psychology"]),
    ("Aver", "verb", "To state or assert to be the case.", "Advanced", ["Argumentation"]),
    ("Aversion", "noun", "A strong dislike or disinclination towards something.", "Foundational", ["Psychology & Emotion"]),
    ("Avow", "verb", "To assert or confess openly.", "Intermediate", ["Communication"]),
    ("Axiom", "noun", "A statement or proposition that is regarded as self-evidently true.", "Advanced", ["Logic & Philosophy"]),
]

# Read from build_1000_catalogue.py or make_final_catalogue.py to extract all tuples
import re

sources = ['scripts/build_1000_catalogue.py', 'scripts/make_final_catalogue.py']
all_tuples = list(base_entries)

for src in sources:
    if os.path.exists(src):
        with open(src, 'r', encoding='utf-8') as f:
            content = f.read()
        matches = re.findall(r'\("([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*\[([^\]]+)\]\)', content)
        for w, pos, defn, diff, t_str in matches:
            topics = [t.strip().strip('"').strip("'") for t in t_str.split(',')]
            all_tuples.append((w.strip(), pos, defn, diff, topics))

seen = set()
unique_items = []

for w, pos, defn, diff, topics in all_tuples:
    w_norm = w.strip().lower()
    if w_norm not in seen:
        seen.add(w_norm)
        unique_items.append({
            "word": w.strip(),
            "partOfSpeech": pos,
            "definition": defn,
            "difficulty": diff,
            "topicTags": topics
        })

print(f"Total unique entries extracted: {len(unique_items)}")

ts_output = f"""import {{ DifficultyLevel }} from '../src/types/speech';

export interface BankEntry {{
  word: string;
  partOfSpeech: string;
  definition: string;
  difficulty: DifficultyLevel;
  topicTags: string[];
  rootId?: string;
}}

export const ADDITIONAL_VOCAB_ENTRIES: BankEntry[] = {json.dumps(unique_items, indent=2)};
"""

with open('scripts/vocabEntriesBank.ts', 'w', encoding='utf-8') as f:
    f.write(ts_output)

print("Successfully written scripts/vocabEntriesBank.ts!")
