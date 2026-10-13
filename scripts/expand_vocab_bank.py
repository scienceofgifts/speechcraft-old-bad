#!/usr/bin/env python3
import json

# Load current bank
with open('scripts/vocabEntriesBank.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse existing json array in file
json_str = content[content.find('['):content.rfind(']')+1]
items = json.loads(json_str)

existing_words = set(x['word'].strip().lower() for x in items)
print(f"Current bank size: {len(items)}")

additional_words = [
    ("Acquiescence", "noun", "Reluctant acceptance of something without protest.", "Intermediate", ["Relationships", "Communication"]),
    ("Acquisitive", "adjective", "Excessively interested in acquiring money or material things.", "Intermediate", ["Economics", "Personality"]),
    ("Affidavit", "noun", "A written statement confirmed by oath or affirmation for use as evidence.", "Intermediate", ["Law & Governance"]),
    ("Allegory", "noun", "A story, poem, or picture that can be interpreted to reveal a hidden meaning.", "Foundational", ["Literature"]),
    ("Alliteration", "noun", "The occurrence of the same letter or sound at the beginning of adjacent words.", "Foundational", ["Rhetoric & Speech"]),
    ("Altercation", "noun", "A noisy argument or disagreement, especially in public.", "Foundational", ["Communication"]),
    ("Altruistic", "adjective", "Showing a disinterested and selfless concern for the well-being of others.", "Foundational", ["Ethics & Philosophy"]),
    ("Ambidextrous", "adjective", "Able to use the right and left hands equally well.", "Foundational", ["Physical"]),
    ("Axiology", "noun", "The study of nature, types, and criteria of values and of value judgments.", "Mastery", ["Philosophy"]),
    ("Belligerence", "noun", "Aggressive or warlike behavior.", "Intermediate", ["Personality & Character"]),
    ("Benefactor", "noun", "A person who gives money or other help to a person or cause.", "Foundational", ["Social Dynamics"]),
    ("Beneficiary", "noun", "A person who derives advantage from something, especially a trust or will.", "Foundational", ["Law & Economics"]),
    ("Benevolence", "noun", "The quality of being well meaning; kindness.", "Foundational", ["Personality & Character"]),
    ("Biocentric", "adjective", "Considering all living organisms as having inherent value.", "Advanced", ["Ethics & Environment"]),
    ("Biodiversity", "noun", "The variety of life in the world or in a particular habitat or ecosystem.", "Foundational", ["Science & Nature"]),
    ("Biography", "noun", "An account of someone's life written by someone else.", "Foundational", ["Literature"]),
    ("Cacophonous", "adjective", "Involving or producing a harsh, discordant mixture of sounds.", "Intermediate", ["Music & Rhetoric"]),
    ("Castigation", "noun", "Severe reprimand or punishment.", "Advanced", ["Communication"]),
    ("Cataclysmic", "adjective", "Relating to or denoting a violent natural or political event.", "Advanced", ["Nature & Governance"]),
    ("Categorization", "noun", "The action or process of placing in a class or group.", "Foundational", ["Logic"]),
    ("Circumlocutory", "adjective", "Using an unnecessarily large number of words to express an idea.", "Advanced", ["Rhetoric & Writing"]),
    ("Cognitive", "adjective", "Relating to the mental processes of perception, memory, and reasoning.", "Foundational", ["Cognition & Psychology"]),
    ("Cohesion", "noun", "The action or fact of forming a united whole.", "Foundational", ["Logic & Structure"]),
    ("Commutative", "adjective", "Involving the condition that quantities combined give the same result.", "Intermediate", ["Mathematics & Logic"]),
    ("Comparative", "adjective", "Perceptible by comparison; relative.", "Foundational", ["Logic & Analysis"]),
    ("Compilation", "noun", "A thing produced by assembling items from different sources.", "Foundational", ["Writing"]),
    ("Concentric", "adjective", "Denoting circles or shapes that share the same center.", "Foundational", ["Spatial & Geometry"]),
    ("Conceptualize", "verb", "To form a concept or idea of something.", "Foundational", ["Cognition & Logic"]),
    ("Condensation", "noun", "A concise summary or version of a larger work or speech.", "Foundational", ["Writing"]),
    ("Conglomerate", "noun", "A number of different things or parts grouped together.", "Foundational", ["Business & Governance"]),
    ("Conjecture", "noun", "An opinion or conclusion formed on the basis of incomplete information.", "Intermediate", ["Logic & Reasoning"]),
    ("Connotation", "noun", "An idea or feeling that a word invokes in addition to its literal meaning.", "Foundational", ["Language & Writing"]),
    ("Consensual", "adjective", "Relating to or involving mutual consent.", "Foundational", ["Law & Ethics"]),
    ("Contiguity", "noun", "The state of being direct in contact or touching.", "Advanced", ["Spatial & Logic"]),
    ("Correlation", "noun", "A mutual relationship or connection between two or more things.", "Foundational", ["Science & Data"]),
    ("Counterpoint", "noun", "An argument, idea, or theme used to create a contrast with another.", "Intermediate", ["Logic & Arts"]),
    ("Credential", "noun", "A qualification, achievement, or aspect of a background.", "Foundational", ["Career & Education"]),
    ("Cryptic", "adjective", "Having a meaning that is mysterious or obscure.", "Foundational", ["Language"]),
    ("Cumulative", "adjective", "Increasing or increased by successive additions.", "Foundational", ["Data & Math"]),
    ("Debilitating", "adjective", "Tending to weaken or enfeeble.", "Foundational", ["Health & State"]),
    ("Deduction", "noun", "The inference of particular instances by reference to a general law.", "Foundational", ["Logic & Reasoning"]),
    ("Delimitation", "noun", "The action of fixing the boundary or limits of something.", "Advanced", ["Governance & Logic"]),
    ("Demarcation", "noun", "The action of fixing the boundary or limits of something.", "Intermediate", ["Governance & Structure"]),
    ("Denotation", "noun", "The literal or primary meaning of a word.", "Foundational", ["Linguistics"]),
    ("Dependency", "noun", "A state of reliance on another person or entity.", "Foundational", ["Psychology & Law"]),
    ("Derivation", "noun", "The obtaining or developing of something from a source or origin.", "Intermediate", ["Linguistics & Science"]),
    ("Disambiguation", "noun", "The removal of ambiguity by making something clear.", "Advanced", ["Linguistics & Logic"]),
    ("Discourse", "noun", "Written or spoken communication or debate.", "Foundational", ["Rhetoric & Communication"]),
    ("Disparity", "noun", "A great difference or inequality.", "Foundational", ["Sociology & Economics"]),
    ("Disposition", "noun", "A person's inherent qualities of mind and character.", "Foundational", ["Personality & Psychology"]),
    ("Disseminator", "noun", "One who spreads or disperses information widely.", "Intermediate", ["Communication"]),
    ("Dissertation", "noun", "A formal and long essay on a particular subject.", "Intermediate", ["Academic & Education"]),
    ("Divergent", "adjective", "Tending to be different or develop in different directions.", "Foundational", ["Logic & Thinking"]),
    ("Diversification", "noun", "The action of making or becoming more diverse or varied.", "Foundational", ["Economics & Business"]),
    ("Dogmatism", "noun", "The tendency to lay down principles as incontrovertibly true.", "Intermediate", ["Philosophy & Logic"]),
    ("Domain", "noun", "A specified sphere of activity or knowledge.", "Foundational", ["General"]),
    ("Dynamics", "noun", "The forces or properties which stimulate growth or change.", "Foundational", ["Science & Society"]),
    ("Elicitation", "noun", "The act of drawing out or evoking a response.", "Intermediate", ["Communication"]),
    ("Empowerment", "noun", "Authority or power given to someone to do something.", "Foundational", ["Leadership & Society"]),
    ("Enumeration", "noun", "The action of mentioning a number of things one by one.", "Intermediate", ["Logic & Writing"]),
    ("Equilibrium", "noun", "A state in which opposing forces or influences are balanced.", "Foundational", ["Science & Philosophy"]),
    ("Eradication", "noun", "The complete destruction of something.", "Foundational", ["Action & Change"]),
    ("Essentialism", "noun", "A belief that things have a set of characteristics making them what they are.", "Advanced", ["Philosophy"]),
    ("Evaluation", "noun", "The making of a judgment about the value of something.", "Foundational", ["Logic & Management"]),
    ("Evocation", "noun", "The act of recalling a feeling, memory, or image.", "Intermediate", ["Literature & Psychology"]),
    ("Excavation", "noun", "The action of excavating or unearthing something.", "Foundational", ["History & Science"]),
    ("Exegesis", "noun", "Critical explanation or interpretation of a text.", "Advanced", ["Literature & Philosophy"]),
    ("Exemplification", "noun", "The act of showing or illustrating by example.", "Intermediate", ["Writing & Rhetoric"]),
    ("Explicating", "verb", "Analyzing and developing an idea or principle in detail.", "Intermediate", ["Writing & Rhetoric"]),
    ("Exponential", "adjective", "Becoming more and more rapid in growth.", "Foundational", ["Science & Mathematics"]),
    ("Factorization", "noun", "The resolution of an entity into factors.", "Intermediate", ["Mathematics"]),
    ("Fallibility", "noun", "The tendency to make mistakes or be wrong.", "Foundational", ["Psychology & Logic"]),
    ("Formalization", "noun", "The process of giving something a definite form.", "Intermediate", ["Logic & Structure"]),
    ("Formulation", "noun", "The action of devising or creating something systematically.", "Foundational", ["Logic & Creation"]),
    ("Framework", "noun", "A basic structure underlying a system, concept, or text.", "Foundational", ["Structure & Logic"]),
    ("Generalization", "noun", "A general statement obtained by inference from specific cases.", "Foundational", ["Logic & Reasoning"]),
    ("Hermeneutics", "noun", "The branch of knowledge that deals with interpretation of texts.", "Advanced", ["Literature & Philosophy"]),
    ("Hierarchy", "noun", "A system in which people or groups are ranked according to status.", "Foundational", ["Governance & Sociology"]),
    ("Hypothesis", "noun", "A proposed explanation made as a starting point for investigation.", "Foundational", ["Science & Logic"]),
    ("Ideology", "noun", "A system of ideas forming the basis of economic or political theory.", "Foundational", ["Politics & Philosophy"]),
    ("Illuminating", "adjective", "Providing insight, clarity, or intellectual understanding.", "Foundational", ["Cognition"]),
    ("Illustration", "noun", "An example serving to clarify or prove something.", "Foundational", ["Communication"]),
    ("Implementation", "noun", "The process of putting a decision or plan into effect.", "Foundational", ["Management & Action"]),
    ("Implication", "noun", "A conclusion that can be drawn from something not explicitly stated.", "Foundational", ["Logic & Reasoning"]),
    ("Inconsistency", "noun", "The fact or state of lacking agreement or compatibility.", "Foundational", ["Logic"]),
    ("Incubate", "verb", "Develop an idea or strategy slowly over time.", "Foundational", ["Creativity & Strategy"]),
    ("Induction", "noun", "The inference of a general law from particular instances.", "Intermediate", ["Logic & Reasoning"]),
    ("Inference", "noun", "A conclusion reached on the basis of evidence and reasoning.", "Foundational", ["Logic & Reasoning"]),
    ("Inflection", "noun", "A change in the form of a word to express a grammatical function.", "Intermediate", ["Linguistics"]),
    ("Infrastructure", "noun", "The basic physical and organizational structures needed for operation.", "Foundational", ["Governance & Economics"]),
    ("Integration", "noun", "An act or instance of combining into an integral whole.", "Foundational", ["Structure & Society"]),
    ("Intellectualism", "noun", "Devotion to the exercise of intellect and pursuit of knowledge.", "Intermediate", ["Philosophy"]),
    ("Interdependence", "noun", "The dependence of two or more people or things on each other.", "Foundational", ["Sociology & Ecosystems"]),
    ("Interpretation", "noun", "The action of explaining the meaning of something.", "Foundational", ["Logic & Literature"]),
    ("Intervention", "noun", "Action taken to improve a situation or prevent a negative outcome.", "Foundational", ["Strategy & Action"]),
    ("Iteration", "noun", "The repetition of a process or utterance.", "Foundational", ["Technology & Logic"]),
    ("Legitimacy", "noun", "Conformity to the law or to rules.", "Foundational", ["Governance & Law"]),
    ("Lineage", "noun", "Direct descent from an ancestor; pedigree.", "Foundational", ["History & Biology"]),
    ("Linguistic", "adjective", "Relating to language or linguistics.", "Foundational", ["Linguistics"]),
    ("Manifesto", "noun", "A public declaration of policy and aims.", "Foundational", ["Politics & Rhetoric"]),
    ("Methodology", "noun", "A system of methods used in a particular area of study.", "Foundational", ["Science & Logic"]),
    ("Modality", "noun", "A particular mode in which something exists or is experienced.", "Intermediate", ["Philosophy & Logic"]),
    ("Optimization", "noun", "The action of making the best or most effective use of a situation.", "Foundational", ["Technology & Strategy"]),
    ("Orientation", "noun", "The determination of the relative position or alignment.", "Foundational", ["General"]),
    ("Perspective", "noun", "A particular attitude toward or way of regarding something; point of view.", "Foundational", ["Cognition & Art"]),
    ("Phenomenology", "noun", "The science of phenomena as distinct from that of being.", "Advanced", ["Philosophy"]),
    ("Polysemy", "noun", "The coexistence of many possible meanings for a word or phrase.", "Advanced", ["Linguistics"]),
    ("Postulate", "verb", "Suggest or assume the existence of something as a basis for reasoning.", "Intermediate", ["Logic & Philosophy"]),
    ("Premise", "noun", "A statement or proposition from which another is inferred as a conclusion.", "Foundational", ["Logic & Argumentation"]),
    ("Proposition", "noun", "A statement or assertion that expresses a judgment or opinion.", "Foundational", ["Logic & Argumentation"]),
    ("Qualitative", "adjective", "Relating to, measuring, or measured by the quality of something.", "Foundational", ["Data & Science"]),
    ("Quantitative", "adjective", "Relating to, measuring, or measured by the quantity of something.", "Foundational", ["Data & Science"]),
    ("Rationalism", "noun", "A belief that opinions and actions should be based on reason.", "Intermediate", ["Philosophy"]),
    ("Reductionism", "noun", "Analyzing and describing a complex phenomenon in terms of simpler ones.", "Advanced", ["Science & Philosophy"]),
    ("Refutation", "noun", "The action of proving a statement or theory to be wrong or false.", "Foundational", ["Logic & Argumentation"]),
    ("Syllogism", "noun", "An instance of reasoning in which a conclusion is drawn from two premises.", "Intermediate", ["Logic & Philosophy"]),
    ("Synthesis", "noun", "The combination of ideas to form a theory or system.", "Foundational", ["Logic & Science"]),
    ("Taxonomy", "noun", "The branch of science concerned with classification.", "Intermediate", ["Science & Structure"]),
    ("Theoretical", "adjective", "Concerned with or involving the theory of a subject.", "Foundational", ["Science & Logic"]),
    ("Typology", "noun", "A classification according to general type.", "Intermediate", ["Sociology & Science"]),
    ("Verification", "noun", "The process of establishing the truth, accuracy, or validity of something.", "Foundational", ["Science & Logic"])
]

for w, pos, defn, diff, topics in additional_words:
    w_norm = w.strip().lower()
    if w_norm not in existing_words:
        existing_words.add(w_norm)
        items.append({
            "word": w.strip(),
            "partOfSpeech": pos,
            "definition": defn,
            "difficulty": diff,
            "topicTags": topics
        })

print(f"Updated bank size: {len(items)}")

bank_ts_content = f"""import {{ DifficultyLevel }} from '../src/types/speech';

export interface BankEntry {{
  word: string;
  partOfSpeech: string;
  definition: string;
  difficulty: DifficultyLevel;
  topicTags: string[];
  rootId?: string;
}}

export const ADDITIONAL_VOCAB_ENTRIES: BankEntry[] = {json.dumps(items, indent=2)};
"""

with open('scripts/vocabEntriesBank.ts', 'w', encoding='utf-8') as f:
    f.write(bank_ts_content)

print("Saved scripts/vocabEntriesBank.ts")
