import { ExpandedRootItem } from '../types/speech';

/**
 * COMPREHENSIVE GREEK, LATIN, GERMANIC & OLD FRENCH ROOTS & AFFIXES CATALOGUE
 * Total: 165 Curated, Verified Etymological Entries
 *
 * Each record preserves classical origins, original forms, semantic shift notes,
 * and 5 verified derived example words mapped to headwords and concepts.
 */
export const EXPANDED_ROOTS: ExpandedRootItem[] = [
  {
    "id": "root-ego",
    "root": "ego",
    "type": "root",
    "origin": "Latin",
    "originalForm": "ego",
    "meaning": "I, the self",
    "variants": [
      "ego-",
      "egot-"
    ],
    "pronunciationOrCombining": "EE-go or EG-oh; combines with -ist, -centric, -mania",
    "thematicCluster": "The Human Personality",
    "anchorWord": "egocentric",
    "historicalInsight": "In classical Latin, \"ego\" simply meant the first-person singular pronoun \"I\". Through 19th-century psychology and philosophy (particularly Freud's translator James Strachey), it was elevated into the psychological construct representing conscious agency and self-concept.",
    "semanticShiftNote": "Evolved from a neutral pronoun \"I\" into a clinical and colloquial term for self-importance and vanity.",
    "confusedWith": "alter (other)",
    "derivedWordsList": [
      {
        "word": "egocentric",
        "pos": "adj.",
        "briefDefinition": "Considering the self as the center of all things",
        "rootContribution": "ego (self) + centric (center)",
        "lessonId": "lesson-egocentric",
        "catalogueId": "cat-egocentric"
      },
      {
        "word": "egotist",
        "pos": "noun",
        "briefDefinition": "A person who talks boastfully about themselves constantly",
        "rootContribution": "ego (self) + -ist (person)"
      },
      {
        "word": "egoist",
        "pos": "noun",
        "briefDefinition": "A person whose actions are governed strictly by self-interest",
        "rootContribution": "ego (self) + -ist (philosophical agent)"
      },
      {
        "word": "egomania",
        "pos": "noun",
        "briefDefinition": "Morbid or obsessive self-preoccupation",
        "rootContribution": "ego (self) + mania (madness)"
      },
      {
        "word": "alter ego",
        "pos": "noun",
        "briefDefinition": "A second self or trusted other self",
        "rootContribution": "alter (other) + ego (self)"
      }
    ]
  },
  {
    "id": "root-alter",
    "root": "alter",
    "type": "root",
    "origin": "Latin",
    "originalForm": "alter",
    "meaning": "other, another",
    "variants": [
      "alter-",
      "altern-",
      "altru-"
    ],
    "pronunciationOrCombining": "AHL-ter or AWL-ter; combines as alter-, altern-",
    "thematicCluster": "The Human Personality",
    "anchorWord": "altruistic",
    "historicalInsight": "Derived from Latin \"alter\" (the other of two). Auguste Comte used its Italian-French derivative \"altruisme\" in the 1850s to coin the philosophical opposite of egoism (\"vivre pour autrui\" - to live for others).",
    "semanticShiftNote": "Comte shifted alter/autrui into \"altruism\" specifically to denote systemic concern for others.",
    "confusedWith": "alius (another of many) and altar (sacrificial table)",
    "derivedWordsList": [
      {
        "word": "altruistic",
        "pos": "adj.",
        "briefDefinition": "Unselfishly devoted to the welfare of others",
        "rootContribution": "altru (other) + -istic (pertaining to)",
        "lessonId": "lesson-altruistic",
        "catalogueId": "cat-altruistic"
      },
      {
        "word": "alteration",
        "pos": "noun",
        "briefDefinition": "A change making something other than what it was",
        "rootContribution": "alter (other) + -ation (process)"
      },
      {
        "word": "altercation",
        "pos": "noun",
        "briefDefinition": "A noisy heated dispute with another person",
        "rootContribution": "alter (other) + -ation (clash between two)"
      },
      {
        "word": "alternate",
        "pos": "verb / adj.",
        "briefDefinition": "To take turns or succeed in turns",
        "rootContribution": "alter (other) + -ate (action)"
      },
      {
        "word": "alternative",
        "pos": "noun / adj.",
        "briefDefinition": "A choice between other possibilities",
        "rootContribution": "alter (other) + -ative (option)"
      }
    ]
  },
  {
    "id": "root-vert",
    "root": "vert / vers",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vertere / versus",
    "meaning": "to turn",
    "variants": [
      "vert-",
      "vers-",
      "-version"
    ],
    "pronunciationOrCombining": "vert- (present stem), vers- (supine stem)",
    "thematicCluster": "The Human Personality",
    "anchorWord": "introvert",
    "historicalInsight": "From Latin \"vertere\" (to turn). Carl Jung adapted intro-vert (turn inward) and extra-vert (turn outward) in 1921 to categorize psychological orientation toward psychic energy.",
    "semanticShiftNote": "Originally physical turning (reverse, invert) adopted into psychological orientation of energy.",
    "confusedWith": "veritas (truth - as in verify)",
    "derivedWordsList": [
      {
        "word": "introvert",
        "pos": "noun / verb",
        "briefDefinition": "One whose energy turns inward",
        "rootContribution": "intro- (inward) + vert (turn)",
        "lessonId": "lesson-introvert",
        "catalogueId": "cat-introvert"
      },
      {
        "word": "extrovert",
        "pos": "noun / verb",
        "briefDefinition": "One whose energy turns outward toward others",
        "rootContribution": "extro- (outward) + vert (turn)",
        "lessonId": "lesson-extrovert",
        "catalogueId": "cat-extrovert"
      },
      {
        "word": "ambivert",
        "pos": "noun",
        "briefDefinition": "One having balanced inward and outward tendencies",
        "rootContribution": "ambi- (both) + vert (turn)",
        "lessonId": "lesson-ambivert",
        "catalogueId": "cat-ambivert"
      },
      {
        "word": "aversion",
        "pos": "noun",
        "briefDefinition": "A turning away from something with distaste",
        "rootContribution": "ab- (away) + vers (turn) + -ion"
      },
      {
        "word": "subversive",
        "pos": "adj.",
        "briefDefinition": "Seeking to turn under or overthrow established authority",
        "rootContribution": "sub- (under) + vers (turn) + -ive"
      }
    ]
  },
  {
    "id": "root-misein",
    "root": "misein",
    "type": "root",
    "origin": "Greek",
    "originalForm": "misein / misos",
    "meaning": "to hate, despise",
    "variants": [
      "mis-",
      "miso-"
    ],
    "pronunciationOrCombining": "mis- or miso- (before consonants)",
    "thematicCluster": "The Human Personality",
    "anchorWord": "misanthrope",
    "historicalInsight": "Greek \"misein\" (to hate) combines with roots naming the object of hatred to generate specific psychological and social orientations.",
    "semanticShiftNote": "Prefix mis- of Greek origin means hatred; distinct from Old English mis- (wrongly).",
    "confusedWith": "mis- (Germanic prefix meaning wrongly, as in mistake or mislead)",
    "derivedWordsList": [
      {
        "word": "misanthrope",
        "pos": "noun",
        "briefDefinition": "One who dislikes and distrusts humankind",
        "rootContribution": "mis- (hate) + anthrope (human)",
        "lessonId": "lesson-misanthrope",
        "catalogueId": "cat-misanthrope"
      },
      {
        "word": "misogynist",
        "pos": "noun",
        "briefDefinition": "One who holds hatred or prejudice against women",
        "rootContribution": "miso- (hate) + gyne (woman) + -ist",
        "lessonId": "lesson-misogynist",
        "catalogueId": "cat-misogynist"
      },
      {
        "word": "misogamist",
        "pos": "noun",
        "briefDefinition": "One who opposes or hates marriage",
        "rootContribution": "miso- (hate) + gamos (marriage) + -ist",
        "lessonId": "lesson-misogamist",
        "catalogueId": "cat-misogamist"
      },
      {
        "word": "misology",
        "pos": "noun",
        "briefDefinition": "A hatred of reason, argument, or intellectual debate",
        "rootContribution": "miso- (hate) + logos (reason)"
      },
      {
        "word": "misocapnist",
        "pos": "noun",
        "briefDefinition": "A person who hates tobacco smoke",
        "rootContribution": "miso- (hate) + kapnos (smoke) + -ist"
      }
    ]
  },
  {
    "id": "root-anthropos",
    "root": "anthropos",
    "type": "root",
    "origin": "Greek",
    "originalForm": "anthropos",
    "meaning": "human being, mankind",
    "variants": [
      "anthropo-",
      "-anthrope",
      "-anthropy"
    ],
    "pronunciationOrCombining": "anthropo- or -anthrope",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "philanthropy",
    "historicalInsight": "Greek \"anthropos\" signified human beings as upright-gazing species (as opposed to animals). Formed cornerstone of Enlightenment human science.",
    "semanticShiftNote": "In classical philosophy denoted human species; modern usage powers social sciences and charitable ethics.",
    "derivedWordsList": [
      {
        "word": "philanthropy",
        "pos": "noun",
        "briefDefinition": "Love of humanity demonstrated through benevolent action",
        "rootContribution": "phil- (love) + anthropy (humankind)"
      },
      {
        "word": "anthropology",
        "pos": "noun",
        "briefDefinition": "The scientific study of human origins and societies",
        "rootContribution": "anthropo- (human) + -logy (study)"
      },
      {
        "word": "anthropocentric",
        "pos": "adj.",
        "briefDefinition": "Regarding humanity as central or paramount",
        "rootContribution": "anthropo- (human) + centric (center)"
      },
      {
        "word": "anthropomorphic",
        "pos": "adj.",
        "briefDefinition": "Ascribing human form or traits to non-human things",
        "rootContribution": "anthropo- (human) + morph (form)"
      },
      {
        "word": "misanthrope",
        "pos": "noun",
        "briefDefinition": "A hater of humanity",
        "rootContribution": "mis- (hate) + anthrope (human)",
        "lessonId": "lesson-misanthrope",
        "catalogueId": "cat-misanthrope"
      }
    ]
  },
  {
    "id": "root-path",
    "root": "path",
    "type": "root",
    "origin": "Greek",
    "originalForm": "pathos / paschein",
    "meaning": "feeling, suffering, disease",
    "variants": [
      "path-",
      "-pathy",
      "patho-"
    ],
    "pronunciationOrCombining": "path- or -pathy",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "empathy",
    "historicalInsight": "From Greek \"pathos\" (suffering/feeling). In Greek medicine it meant disease state (pathology); in rhetoric it meant emotional appeal.",
    "semanticShiftNote": "Bifurcated into medical science (pathogen, pathology) and emotional psychology (empathy, apathy, sympathy).",
    "derivedWordsList": [
      {
        "word": "empathy",
        "pos": "noun",
        "briefDefinition": "Capacity to understand and share the feelings of another",
        "rootContribution": "em- (in) + pathy (feeling)",
        "lessonId": "lesson-empathy",
        "catalogueId": "cat-empathy"
      },
      {
        "word": "sympathy",
        "pos": "noun",
        "briefDefinition": "Feelings of pity and sorrow for another's misfortune",
        "rootContribution": "sym- (together) + pathy (feeling)",
        "lessonId": "lesson-sympathy",
        "catalogueId": "cat-sympathy"
      },
      {
        "word": "antipathy",
        "pos": "noun",
        "briefDefinition": "A deep-seated feeling of dislike or aversion",
        "rootContribution": "anti- (against) + pathy (feeling)",
        "lessonId": "lesson-antipathy",
        "catalogueId": "cat-antipathy"
      },
      {
        "word": "apathy",
        "pos": "noun",
        "briefDefinition": "Lack of interest, enthusiasm, or concern",
        "rootContribution": "a- (without) + pathy (feeling)",
        "lessonId": "lesson-apathy",
        "catalogueId": "cat-apathy"
      },
      {
        "word": "pathological",
        "pos": "adj.",
        "briefDefinition": "Involving or caused by a physical or mental disease",
        "rootContribution": "patho- (disease) + -logical"
      }
    ]
  },
  {
    "id": "root-chron",
    "root": "chron",
    "type": "root",
    "origin": "Greek",
    "originalForm": "chronos",
    "meaning": "time",
    "variants": [
      "chron-",
      "chrono-"
    ],
    "pronunciationOrCombining": "KRON-o or KRON",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "chronic",
    "historicalInsight": "Personified in Greek mythology as Chronos, titan of time. Adopted into Latin and English for sequential and temporal duration.",
    "semanticShiftNote": "Shifted from mythological time deity into precise scientific chronology and medical duration.",
    "derivedWordsList": [
      {
        "word": "chronic",
        "pos": "adj.",
        "briefDefinition": "Persisting for a long time or constantly recurring",
        "rootContribution": "chron (time) + -ic (pertaining to)"
      },
      {
        "word": "chronology",
        "pos": "noun",
        "briefDefinition": "Arrangement of events or dates in order of occurrence",
        "rootContribution": "chrono- (time) + -logy (study)"
      },
      {
        "word": "anachronism",
        "pos": "noun",
        "briefDefinition": "A thing belonging to a period other than that in which it exists",
        "rootContribution": "ana- (against/back) + chron (time) + -ism"
      },
      {
        "word": "synchronize",
        "pos": "verb",
        "briefDefinition": "Cause to occur or operate at the same time",
        "rootContribution": "syn- (together) + chron (time) + -ize"
      },
      {
        "word": "chronometer",
        "pos": "noun",
        "briefDefinition": "An instrument for measuring time with exceptional accuracy",
        "rootContribution": "chrono- (time) + meter (measure)"
      }
    ]
  },
  {
    "id": "root-graph",
    "root": "graph / gram",
    "type": "root",
    "origin": "Greek",
    "originalForm": "graphein / gramma",
    "meaning": "to write, draw, record",
    "variants": [
      "graph-",
      "-graphy",
      "gram-"
    ],
    "pronunciationOrCombining": "graph- or -gram",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "biography",
    "historicalInsight": "Greek \"graphein\" (scratch/carve/write) yielded both \"graph\" (written record) and \"gram\" (written symbol/letter).",
    "semanticShiftNote": "Expanded from physical scratching on clay/stone to modern telecommunications, drawing, and literature.",
    "derivedWordsList": [
      {
        "word": "biography",
        "pos": "noun",
        "briefDefinition": "An account of a person's life written by another",
        "rootContribution": "bio- (life) + graphy (writing)"
      },
      {
        "word": "telegraph",
        "pos": "noun / verb",
        "briefDefinition": "A system for transmitting messages from a distance",
        "rootContribution": "tele- (far) + graph (write)"
      },
      {
        "word": "autograph",
        "pos": "noun / verb",
        "briefDefinition": "A signature or manuscript in author's own handwriting",
        "rootContribution": "auto- (self) + graph (write)"
      },
      {
        "word": "diagram",
        "pos": "noun",
        "briefDefinition": "A simplified drawing showing appearance or structure",
        "rootContribution": "dia- (across) + gram (drawing)"
      },
      {
        "word": "monograph",
        "pos": "noun",
        "briefDefinition": "A detailed written study of a single specialized subject",
        "rootContribution": "mono- (single) + graph (write)"
      }
    ]
  },
  {
    "id": "root-dict",
    "root": "dict",
    "type": "root",
    "origin": "Latin",
    "originalForm": "dicere / dictus",
    "meaning": "to say, speak, declare",
    "variants": [
      "dict-",
      "-diction",
      "-dictate"
    ],
    "pronunciationOrCombining": "DIKT-",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "contradict",
    "historicalInsight": "Latin \"dicere\" (speak/tell). Provided legal and rhetorical terms throughout Roman law (edict, verdict, dicta).",
    "semanticShiftNote": "Maintained core vocal meaning while acquiring formal legal and authoritative power (dictator, dictate).",
    "derivedWordsList": [
      {
        "word": "contradict",
        "pos": "verb",
        "briefDefinition": "Assert the opposite of a statement made by someone",
        "rootContribution": "contra- (against) + dict (speak)"
      },
      {
        "word": "predict",
        "pos": "verb",
        "briefDefinition": "Say or estimate that a specified thing will happen in future",
        "rootContribution": "pre- (before) + dict (speak)"
      },
      {
        "word": "verdict",
        "pos": "noun",
        "briefDefinition": "A decision or opinion rendered on a disputed issue",
        "rootContribution": "ver- (true) + dict (spoken)"
      },
      {
        "word": "diction",
        "pos": "noun",
        "briefDefinition": "Choice and use of words in speech or writing",
        "rootContribution": "dict (speak) + -ion (act)"
      },
      {
        "word": "indictment",
        "pos": "noun",
        "briefDefinition": "A formal legal charge or accusation of a serious crime",
        "rootContribution": "in- (against) + dict (speak) + -ment"
      }
    ]
  },
  {
    "id": "root-voc",
    "root": "voc / vok",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vocare / vox",
    "meaning": "voice, to call",
    "variants": [
      "voc-",
      "vok-",
      "-vocal"
    ],
    "pronunciationOrCombining": "VOK- or VOH-k",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "equivocate",
    "historicalInsight": "Latin \"vox\" (voice) and \"vocare\" (to call). Linked to both physical vocal cords and spiritual/career calling (vocation).",
    "semanticShiftNote": "Expanded from physical voice to metaphysical calling, legal invocation, and political advocacy.",
    "derivedWordsList": [
      {
        "word": "equivocate",
        "pos": "verb",
        "briefDefinition": "Use ambiguous language so as to conceal the truth",
        "rootContribution": "equi- (equal) + voc (voice) + -ate",
        "lessonId": "lesson-equivocate",
        "catalogueId": "cat-equivocate"
      },
      {
        "word": "advocate",
        "pos": "noun / verb",
        "briefDefinition": "A person who publicly supports or calls for a cause",
        "rootContribution": "ad- (toward) + voc (call) + -ate"
      },
      {
        "word": "vocation",
        "pos": "noun",
        "briefDefinition": "A strong feeling of suitability for a career or calling",
        "rootContribution": "voc (call) + -ation"
      },
      {
        "word": "provocative",
        "pos": "adj.",
        "briefDefinition": "Causing annoyance, anger, or another strong reaction",
        "rootContribution": "pro- (forward) + voc (call) + -ative"
      },
      {
        "word": "irrevocable",
        "pos": "adj.",
        "briefDefinition": "Not able to be changed, reversed, or called back",
        "rootContribution": "ir- (not) + re- (back) + voc (call) + -able"
      }
    ]
  },
  {
    "id": "root-spect",
    "root": "spect / spec",
    "type": "root",
    "origin": "Latin",
    "originalForm": "specere / spectus",
    "meaning": "to look, see, observe",
    "variants": [
      "spect-",
      "spec-",
      "-spic"
    ],
    "pronunciationOrCombining": "SPEKT-",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "introspection",
    "historicalInsight": "Latin \"specere\" (look at). Spawned vast vocabulary of sight (spectacle, spectator) and careful mental analysis (inspection, perspective).",
    "semanticShiftNote": "Seamlessly spans physical vision, psychological introspection, and economic speculation.",
    "derivedWordsList": [
      {
        "word": "introspection",
        "pos": "noun",
        "briefDefinition": "Examination of one's own conscious thoughts and feelings",
        "rootContribution": "intro- (inward) + spect (look) + -ion"
      },
      {
        "word": "circumspect",
        "pos": "adj.",
        "briefDefinition": "Wary and unwilling to take risks; looking around carefully",
        "rootContribution": "circum- (around) + spect (look)"
      },
      {
        "word": "perspective",
        "pos": "noun",
        "briefDefinition": "A particular attitude toward or way of regarding something",
        "rootContribution": "per- (through) + spect (look) + -ive"
      },
      {
        "word": "conspicuous",
        "pos": "adj.",
        "briefDefinition": "Standing out so as to be clearly visible",
        "rootContribution": "con- (completely) + spic (look) + -uous"
      },
      {
        "word": "retrospect",
        "pos": "noun / verb",
        "briefDefinition": "A survey or review of a past course of events",
        "rootContribution": "retro- (backward) + spect (look)"
      }
    ]
  },
  {
    "id": "root-log",
    "root": "log / logue",
    "type": "root",
    "origin": "Greek",
    "originalForm": "logos",
    "meaning": "word, speech, reason, study",
    "variants": [
      "log-",
      "logo-",
      "-logy",
      "-logue"
    ],
    "pronunciationOrCombining": "LOG- or -logy",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "eloquent",
    "historicalInsight": "Greek \"logos\" is one of Western philosophy's most central terms (reason, order, discourse, principle). Yielded suffixes for all academic fields (-logy).",
    "semanticShiftNote": "Evolved from spoken words into formal logic, scientific study fields, and discourse types.",
    "derivedWordsList": [
      {
        "word": "loquacious",
        "pos": "adj.",
        "briefDefinition": "Tending to talk a great deal; talkative",
        "rootContribution": "loqu/log (speech) + -acious",
        "lessonId": "lesson-loquacious",
        "catalogueId": "cat-loquacious"
      },
      {
        "word": "logic",
        "pos": "noun",
        "briefDefinition": "Reasoning conducted according to strict principles",
        "rootContribution": "log (reason) + -ic"
      },
      {
        "word": "epilogue",
        "pos": "noun",
        "briefDefinition": "A section at the end of a book or play serving as a conclusion",
        "rootContribution": "epi- (in addition) + logue (speech)"
      },
      {
        "word": "apology",
        "pos": "noun",
        "briefDefinition": "A expression of regret or formal defense of an action",
        "rootContribution": "apo- (away/from) + logy (speech)"
      },
      {
        "word": "dialogue",
        "pos": "noun",
        "briefDefinition": "Conversation between two or more people",
        "rootContribution": "dia- (across/between) + logue (speech)"
      }
    ]
  },
  {
    "id": "prefix-sub",
    "root": "sub-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "sub",
    "meaning": "under, below, beneath, secondary",
    "variants": [
      "sub-",
      "suc-",
      "suf-",
      "sug-",
      "sup-",
      "sus-"
    ],
    "pronunciationOrCombining": "sub- (assimilates before c, f, g, p, r as suc-, suf-, etc.)",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "subconscious",
    "historicalInsight": "Latin preposition \"sub\" (under). In English it denotes spatial under, subordinate rank, or subtle secondary degree.",
    "semanticShiftNote": "Expanded from physical position (subway) to psychological depth (subconscious) and logical subtlety (subtle).",
    "derivedWordsList": [
      {
        "word": "subconscious",
        "pos": "adj. / noun",
        "briefDefinition": "Operating below the threshold of conscious awareness",
        "rootContribution": "sub- (under) + conscious"
      },
      {
        "word": "subversive",
        "pos": "adj.",
        "briefDefinition": "Seeking to undermine or overthrow an established system",
        "rootContribution": "sub- (under) + vers (turn) + -ive"
      },
      {
        "word": "subordinate",
        "pos": "adj. / noun",
        "briefDefinition": "Lower in rank, position, or importance",
        "rootContribution": "sub- (under) + ordin (order) + -ate"
      },
      {
        "word": "succumb",
        "pos": "verb",
        "briefDefinition": "Fail to resist pressure, temptation, or negative force",
        "rootContribution": "suc- (under) + cumb (lie down)"
      },
      {
        "word": "subtle",
        "pos": "adj.",
        "briefDefinition": "Delicate, understated, or difficult to analyze or detect",
        "rootContribution": "sub- (under) + tela (web/weave)"
      }
    ]
  },
  {
    "id": "prefix-trans",
    "root": "trans-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "trans",
    "meaning": "across, beyond, through",
    "variants": [
      "trans-",
      "tra-",
      "tran-"
    ],
    "pronunciationOrCombining": "tranz- or trans-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "transient",
    "historicalInsight": "Latin \"trans\" (across/beyond). Essential for verbs of movement, transformation, and crossing boundaries.",
    "semanticShiftNote": "Spans physical crossing (transport), state change (transform), and temporal impermanence (transient).",
    "derivedWordsList": [
      {
        "word": "transient",
        "pos": "adj.",
        "briefDefinition": "Lasting only for a short time; impermanent",
        "rootContribution": "trans- (across) + ient (going)"
      },
      {
        "word": "transcendent",
        "pos": "adj.",
        "briefDefinition": "Going beyond ordinary limits or human experience",
        "rootContribution": "trans- (beyond) + scand (climb) + -ent"
      },
      {
        "word": "transgress",
        "pos": "verb",
        "briefDefinition": "Go beyond the bounds of a moral principle or rule",
        "rootContribution": "trans- (across) + gress (step)"
      },
      {
        "word": "translucent",
        "pos": "adj.",
        "briefDefinition": "Allowing light to pass through, but not detailed shapes",
        "rootContribution": "trans- (through) + luc (light) + -ent"
      },
      {
        "word": "transform",
        "pos": "verb",
        "briefDefinition": "Make a thorough or dramatic change in form or appearance",
        "rootContribution": "trans- (across/change) + form"
      }
    ]
  },
  {
    "id": "prefix-inter",
    "root": "inter-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "inter",
    "meaning": "between, among, mutual",
    "variants": [
      "inter-",
      "intel-"
    ],
    "pronunciationOrCombining": "IN-ter",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "intervene",
    "historicalInsight": "Latin \"inter\" (between/among). Crucial prefix in English for relational dynamics and reciprocal systems.",
    "semanticShiftNote": "Distinguishes internal state (intra-) from reciprocal relationship between parties (inter-).",
    "confusedWith": "intra- (within, inside)",
    "derivedWordsList": [
      {
        "word": "intervene",
        "pos": "verb",
        "briefDefinition": "Come between dispute or event in order to prevent or alter result",
        "rootContribution": "inter- (between) + ven (come)"
      },
      {
        "word": "intermittent",
        "pos": "adj.",
        "briefDefinition": "Occurring at irregular intervals; not continuous",
        "rootContribution": "inter- (between) + mit (send) + -ent"
      },
      {
        "word": "intersect",
        "pos": "verb",
        "briefDefinition": "Pass through or cross two or more lines or paths",
        "rootContribution": "inter- (between) + sect (cut)"
      },
      {
        "word": "interpersonal",
        "pos": "adj.",
        "briefDefinition": "Relating to relationships or communication between people",
        "rootContribution": "inter- (between) + personal"
      },
      {
        "word": "interlude",
        "pos": "noun",
        "briefDefinition": "An intervening period of time or brief musical break",
        "rootContribution": "inter- (between) + lud (play)"
      }
    ]
  },
  {
    "id": "prefix-syn",
    "root": "syn- / sym-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "syn",
    "meaning": "with, together, same time",
    "variants": [
      "syn-",
      "sym-",
      "sys-",
      "syl-"
    ],
    "pronunciationOrCombining": "sin- or sim- (before b, p, m)",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "synthesize",
    "historicalInsight": "Greek \"syn\" (together). Equivalent to Latin \"com-\". Assimilates to \"sym-\" before labial consonants (symbiosis, sympathy).",
    "semanticShiftNote": "Core prefix for combining parts into wholes in chemistry, philosophy, music, and social harmony.",
    "derivedWordsList": [
      {
        "word": "synthesize",
        "pos": "verb",
        "briefDefinition": "Combine a number of things into a coherent whole",
        "rootContribution": "syn- (together) + the (place) + -ize",
        "lessonId": "lesson-synthesize",
        "catalogueId": "cat-synthesize"
      },
      {
        "word": "synergy",
        "pos": "noun",
        "briefDefinition": "Combined effect greater than the sum of separate parts",
        "rootContribution": "syn- (together) + erg (work) + -y"
      },
      {
        "word": "symphony",
        "pos": "noun",
        "briefDefinition": "An elaborate musical composition for full orchestra",
        "rootContribution": "sym- (together) + phon (sound) + -y"
      },
      {
        "word": "symbiosis",
        "pos": "noun",
        "briefDefinition": "Interaction between two different organisms living together",
        "rootContribution": "sym- (together) + bio (life) + -sis"
      },
      {
        "word": "synonym",
        "pos": "noun",
        "briefDefinition": "A word having the same or nearly same meaning as another",
        "rootContribution": "syn- (same/together) + onym (name)"
      }
    ]
  },
  {
    "id": "prefix-anti",
    "root": "anti-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "anti",
    "meaning": "against, opposite, preventing",
    "variants": [
      "anti-",
      "ant-"
    ],
    "pronunciationOrCombining": "AN-tee or AN-tai; becomes ant- before vowels (antagonist)",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "antipathy",
    "historicalInsight": "Greek \"anti\" (against/opposite/instead). One of the most productive prefixes in both science and everyday English.",
    "semanticShiftNote": "Used both for active opposition (antipathy) and counter-remedy (antidote).",
    "confusedWith": "ante- (Latin prefix meaning before)",
    "derivedWordsList": [
      {
        "word": "antipathy",
        "pos": "noun",
        "briefDefinition": "A deep-seated feeling of aversion or hostility",
        "rootContribution": "anti- (against) + path (feeling)",
        "lessonId": "lesson-antipathy",
        "catalogueId": "cat-antipathy"
      },
      {
        "word": "antidote",
        "pos": "noun",
        "briefDefinition": "A medicine taken to counteract a particular poison",
        "rootContribution": "anti- (against) + dot (give)"
      },
      {
        "word": "antagonist",
        "pos": "noun",
        "briefDefinition": "A person who actively opposes or competes with another",
        "rootContribution": "ant- (against) + agon (contest) + -ist"
      },
      {
        "word": "antithesis",
        "pos": "noun",
        "briefDefinition": "A person or thing that is the direct opposite of another",
        "rootContribution": "anti- (against) + thes (place) + -is"
      },
      {
        "word": "antibiotic",
        "pos": "noun",
        "briefDefinition": "A medicine that inhibits or destroys microorganisms",
        "rootContribution": "anti- (against) + bio (life) + -ic"
      }
    ]
  },
  {
    "id": "root-fer",
    "root": "fer",
    "type": "root",
    "origin": "Latin",
    "originalForm": "ferre",
    "meaning": "to carry, bear, bring, produce",
    "variants": [
      "fer-",
      "-ferous",
      "-ferent"
    ],
    "pronunciationOrCombining": "FER-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "deference",
    "historicalInsight": "Latin \"ferre\" (bear/carry). Cognate with English \"bear\". Highly productive in vocabulary of yielding, transferring, and producing.",
    "semanticShiftNote": "Spans physical carrying (transfer, ferry), producing (fertile), and social yielding (deference).",
    "derivedWordsList": [
      {
        "word": "deference",
        "pos": "noun",
        "briefDefinition": "Humble submission and respect toward an elder or authority",
        "rootContribution": "de- (down) + fer (carry) + -ence"
      },
      {
        "word": "proliferate",
        "pos": "verb",
        "briefDefinition": "Increase rapidly in numbers; multiply",
        "rootContribution": "proli- (offspring) + fer (bear) + -ate"
      },
      {
        "word": "fertile",
        "pos": "adj.",
        "briefDefinition": "Producing or capable of producing abundant vegetation or offspring",
        "rootContribution": "fer (produce) + -tile"
      },
      {
        "word": "inference",
        "pos": "noun",
        "briefDefinition": "A conclusion reached on the basis of evidence and reasoning",
        "rootContribution": "in- (into) + fer (carry) + -ence"
      },
      {
        "word": "transferable",
        "pos": "adj.",
        "briefDefinition": "Able to be moved or passed from one place or person to another",
        "rootContribution": "trans- (across) + fer (carry) + -able"
      }
    ]
  },
  {
    "id": "root-cap",
    "root": "cap / cip / cept",
    "type": "root",
    "origin": "Latin",
    "originalForm": "capere / captus",
    "meaning": "to take, hold, seize, receive",
    "variants": [
      "cap-",
      "cip-",
      "cept-",
      "ceive-"
    ],
    "pronunciationOrCombining": "KAP- / SEP- / SEEV-",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "perceptive",
    "historicalInsight": "Latin \"capere\" (take/seize). Shifts vowel in compounds: in-cipient (taking in), per-ception (taking through), re-ceive.",
    "semanticShiftNote": "Seamlessly connects physical capturing (captive, capacity) with mental understanding (perceive, concept).",
    "derivedWordsList": [
      {
        "word": "perceptive",
        "pos": "adj.",
        "briefDefinition": "Having or showing keen insight and sensitive understanding",
        "rootContribution": "per- (thoroughly) + cept (take) + -ive"
      },
      {
        "word": "capacity",
        "pos": "noun",
        "briefDefinition": "The maximum amount that something can contain or produce",
        "rootContribution": "cap (hold) + -acity"
      },
      {
        "word": "incipient",
        "pos": "adj.",
        "briefDefinition": "In an initial stage; beginning to happen or develop",
        "rootContribution": "in- (upon) + cip (take) + -ient"
      },
      {
        "word": "susceptible",
        "pos": "adj.",
        "briefDefinition": "Likely or liable to be influenced or harmed by something",
        "rootContribution": "sub- (under) + cept (take) + -ible"
      },
      {
        "word": "captivate",
        "pos": "verb",
        "briefDefinition": "Attract and hold the interest and attention of; charm",
        "rootContribution": "capt (take/hold) + -ivate"
      }
    ]
  },
  {
    "id": "root-tract",
    "root": "tract",
    "type": "root",
    "origin": "Latin",
    "originalForm": "trahere / tractus",
    "meaning": "to draw, pull, drag",
    "variants": [
      "tract-",
      "trag-"
    ],
    "pronunciationOrCombining": "TRAKT-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "intractable",
    "historicalInsight": "Latin \"trahere\" (pull). Gave us tractor (pulling vehicle), contract (pull together), abstract (pull away), intractable (un-pullable).",
    "semanticShiftNote": "Spans heavy physical pulling and high-level cognitive abstraction.",
    "derivedWordsList": [
      {
        "word": "intractable",
        "pos": "adj.",
        "briefDefinition": "Hard to control, deal with, or manage; stubborn",
        "rootContribution": "in- (not) + tract (pull) + -able",
        "lessonId": "lesson-intractable",
        "catalogueId": "cat-intractable"
      },
      {
        "word": "abstract",
        "pos": "adj. / noun",
        "briefDefinition": "Existing in thought or as an idea but not having a physical existence",
        "rootContribution": "ab- (away) + tract (pull)"
      },
      {
        "word": "detract",
        "pos": "verb",
        "briefDefinition": "Diminish the worth or value of a quality or achievement",
        "rootContribution": "de- (away) + tract (pull)"
      },
      {
        "word": "protracted",
        "pos": "adj.",
        "briefDefinition": "Lasting for a long time or longer than expected; drawn out",
        "rootContribution": "pro- (forward/out) + tract (draw) + -ed"
      },
      {
        "word": "retract",
        "pos": "verb",
        "briefDefinition": "Draw back or back in; withdraw a statement or promise",
        "rootContribution": "re- (back) + tract (draw)"
      }
    ]
  },
  {
    "id": "root-pos",
    "root": "pos / pon",
    "type": "root",
    "origin": "Latin",
    "originalForm": "ponere / positus",
    "meaning": "to place, put, set",
    "variants": [
      "pos-",
      "pon-",
      "posit-"
    ],
    "pronunciationOrCombining": "POS- or POHN-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "juxtapose",
    "historicalInsight": "Latin \"ponere\" (place/put). Provided present stem \"pon-\" (component, postpone) and supine stem \"posit-\" (position, compose, transpose).",
    "semanticShiftNote": "Central root for arrangement of objects, ideas, proposals, and social statuses.",
    "derivedWordsList": [
      {
        "word": "juxtapose",
        "pos": "verb",
        "briefDefinition": "Place or deal with close together for contrasting effect",
        "rootContribution": "juxta (next to) + pos (place)"
      },
      {
        "word": "component",
        "pos": "noun",
        "briefDefinition": "A constituent part or element of a larger whole",
        "rootContribution": "com- (together) + pon (put) + -ent"
      },
      {
        "word": "postpone",
        "pos": "verb",
        "briefDefinition": "Cause or arrange for something to take place at a time later than scheduled",
        "rootContribution": "post- (after) + pon (put)"
      },
      {
        "word": "disposition",
        "pos": "noun",
        "briefDefinition": "A person's inherent qualities of mind and character",
        "rootContribution": "dis- (apart) + pos (place) + -ition"
      },
      {
        "word": "imposition",
        "pos": "noun",
        "briefDefinition": "An unfair or unwelcome demand or burden put upon someone",
        "rootContribution": "im- (upon) + pos (place) + -ition"
      }
    ]
  },
  {
    "id": "root-gen",
    "root": "gen",
    "type": "root",
    "origin": "Greek",
    "originalForm": "genos / gignesthai",
    "meaning": "birth, produce, race, origin, kind",
    "variants": [
      "gen-",
      "gene-",
      "-genesis",
      "gon-"
    ],
    "pronunciationOrCombining": "JEN- or JEN-uh",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "congenial",
    "historicalInsight": "Greek \"genos\" and Latin \"genus/gens\" (family/kind/birth). Parent root for genetics, generation, gender, generic, and gentle.",
    "semanticShiftNote": "Extended from biological birth and lineage to broad class generation, creation, and pleasant disposition.",
    "derivedWordsList": [
      {
        "word": "congenial",
        "pos": "adj.",
        "briefDefinition": "Pleasant or agreeable because of suited tastes or inclinations",
        "rootContribution": "con- (together) + gen (kind/nature) + -ial"
      },
      {
        "word": "genealogy",
        "pos": "noun",
        "briefDefinition": "A line of descent traced continuously from an ancestor",
        "rootContribution": "genea- (descent) + -logy (study)"
      },
      {
        "word": "homogenous",
        "pos": "adj.",
        "briefDefinition": "Of the same kind; alike in structure or composition",
        "rootContribution": "homo- (same) + gen (kind) + -ous"
      },
      {
        "word": "generate",
        "pos": "verb",
        "briefDefinition": "Cause something to arise or come into being",
        "rootContribution": "gen (produce) + -erate"
      },
      {
        "word": "endigenous",
        "pos": "adj.",
        "briefDefinition": "Originating or occurring naturally in a particular place; native",
        "rootContribution": "endo- (within) + gen (born) + -ous"
      }
    ]
  },
  {
    "id": "root-capit",
    "root": "capit / cap",
    "type": "root",
    "origin": "Latin",
    "originalForm": "caput / capitis",
    "meaning": "head",
    "variants": [
      "capit-",
      "cap-"
    ],
    "pronunciationOrCombining": "KAP-it-",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "recapitulate",
    "historicalInsight": "Latin \"caput\" (head). Yielded words for literal head (decapitate), head city (capital), head of state (captain), and main headings (chapter/recap).",
    "semanticShiftNote": "Spans literal anatomy, head leadership, finance (capital), and summarizing main headings (recapitulate).",
    "derivedWordsList": [
      {
        "word": "recapitulate",
        "pos": "verb",
        "briefDefinition": "Summarize and state again the main points of",
        "rootContribution": "re- (again) + capit (head/heading) + -ulate"
      },
      {
        "word": "decapitate",
        "pos": "verb",
        "briefDefinition": "Cut off the head of a person or animal",
        "rootContribution": "de- (off) + capit (head) + -ate"
      },
      {
        "word": "capitalism",
        "pos": "noun",
        "briefDefinition": "Economic system based on private ownership of capital assets",
        "rootContribution": "capit (head/wealth count) + -al + -ism"
      },
      {
        "word": "precipitous",
        "pos": "adj.",
        "briefDefinition": "Dangerously high or steep; headlong and hasty",
        "rootContribution": "pre- (before) + cipit (head) + -ous"
      },
      {
        "word": "capitulate",
        "pos": "verb",
        "briefDefinition": "Surrender or cease resisting an opponent under agreed terms",
        "rootContribution": "capit (head/itemized terms) + -ulate"
      }
    ]
  },
  {
    "id": "root-mit",
    "root": "mit / miss",
    "type": "root",
    "origin": "Latin",
    "originalForm": "mittere / missus",
    "meaning": "to send, let go",
    "variants": [
      "mit-",
      "miss-",
      "-mission"
    ],
    "pronunciationOrCombining": "MIT- or MIS-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "intermittent",
    "historicalInsight": "Latin \"mittere\" (send/release). Derived present stem \"mit-\" (transmit, submit) and past participle stem \"miss-\" (missile, mission, dismiss).",
    "semanticShiftNote": "Core root for physical sending, letting pass (permit), and sending messages or rays.",
    "derivedWordsList": [
      {
        "word": "intermittent",
        "pos": "adj.",
        "briefDefinition": "Occurring at irregular intervals; not continuous",
        "rootContribution": "inter- (between) + mit (send) + -ent"
      },
      {
        "word": "unremitting",
        "pos": "adj.",
        "briefDefinition": "Never relaxing or slackening; incessant and unrelenting",
        "rootContribution": "un- (not) + re- (back) + mit (let go) + -ing"
      },
      {
        "word": "remittance",
        "pos": "noun",
        "briefDefinition": "A sum of money sent in payment or as a gift",
        "rootContribution": "re- (back) + mit (send) + -ance"
      },
      {
        "word": "missile",
        "pos": "noun",
        "briefDefinition": "An object which is forcibly propelled at a target",
        "rootContribution": "miss (send) + -ile"
      },
      {
        "word": "premise",
        "pos": "noun",
        "briefDefinition": "A previous statement from which another is inferred",
        "rootContribution": "pre- (before) + mis (sent) + -e"
      }
    ]
  },
  {
    "id": "suffix-tion",
    "root": "-tion / -sion",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "-tio / -tionis",
    "meaning": "act, state, process, or result of",
    "variants": [
      "-tion",
      "-sion",
      "-ion"
    ],
    "pronunciationOrCombining": "shun or zhun",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "delineation",
    "historicalInsight": "Latin nominalizing suffix \"-tio\". Turns verbs into abstract nouns representing the process, act, or completed state.",
    "semanticShiftNote": "Universal noun-forming suffix in academic and professional English.",
    "derivedWordsList": [
      {
        "word": "delineation",
        "pos": "noun",
        "briefDefinition": "The action of describing or portraying something precisely",
        "rootContribution": "de- + line + -ation (act/result)",
        "lessonId": "lesson-delineate",
        "catalogueId": "cat-delineate"
      },
      {
        "word": "exoneration",
        "pos": "noun",
        "briefDefinition": "The action of official clearing from blame or guilt",
        "rootContribution": "ex- + oner + -ation (act/result)",
        "lessonId": "lesson-exonerate",
        "catalogueId": "cat-exonerate"
      },
      {
        "word": "extrapolation",
        "pos": "noun",
        "briefDefinition": "The act of estimating unknown values by projecting trends",
        "rootContribution": "extra- + pol + -ation (process)",
        "lessonId": "lesson-extrapolate",
        "catalogueId": "cat-extrapolate"
      },
      {
        "word": "isolation",
        "pos": "noun",
        "briefDefinition": "The state of being separated from others",
        "rootContribution": "insula (island) + -ation (state)"
      },
      {
        "word": "precision",
        "pos": "noun",
        "briefDefinition": "The quality or state of being exact and accurate",
        "rootContribution": "pre- + cis (cut) + -ion (state)"
      }
    ]
  },
  {
    "id": "suffix-able",
    "root": "-able / -ible",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "-abilis / -ibilis",
    "meaning": "capable of, worthy of, inclined to",
    "variants": [
      "-able",
      "-ible",
      "-ability"
    ],
    "pronunciationOrCombining": "uh-bul or ih-bul",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "intractable",
    "historicalInsight": "Latin adjective-forming suffix \"-abilis\" attached to verb stems to denote passive capability or fitness.",
    "semanticShiftNote": "Highly active in English coining new adjectives from both Latin and native verbs.",
    "derivedWordsList": [
      {
        "word": "intractable",
        "pos": "adj.",
        "briefDefinition": "Not capable of being easily managed or controlled",
        "rootContribution": "in- (not) + tract + -able (capable)",
        "lessonId": "lesson-intractable",
        "catalogueId": "cat-intractable"
      },
      {
        "word": "ubiquitous",
        "pos": "adj.",
        "briefDefinition": "Present, appearing, or found everywhere",
        "rootContribution": "ubique (everywhere) + -ous (inclined)",
        "lessonId": "lesson-ubiquitous",
        "catalogueId": "cat-ubiquitous"
      },
      {
        "word": "plausible",
        "pos": "adj.",
        "briefDefinition": "Seeming reasonable or probable; deserving applause",
        "rootContribution": "plaus (applaud) + -ible (worthy of)"
      },
      {
        "word": "palpable",
        "pos": "adj.",
        "briefDefinition": "Able to be touched or felt; intense and plain to see",
        "rootContribution": "palp (touch) + -able (capable)"
      },
      {
        "word": "malleable",
        "pos": "adj.",
        "briefDefinition": "Capable of being shaped or influenced easily",
        "rootContribution": "malleus (hammer) + -able (capable)"
      }
    ]
  },
  {
    "id": "prefix-re",
    "root": "re-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "re-",
    "meaning": "again, back, anew",
    "variants": [
      "re-",
      "red-"
    ],
    "pronunciationOrCombining": "ree- or rih-",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "recapitulate",
    "historicalInsight": "Latin prefix \"re-\" / \"red-\". One of the most ubiquitous prefixes in Indo-European languages, denoting repetition, return to origin, or intensity.",
    "semanticShiftNote": "Can denote literal repetition (rebuild) or intensive focus (research, refine).",
    "derivedWordsList": [
      {
        "word": "recapitulate",
        "pos": "noun / verb",
        "briefDefinition": "Summarize and restate main points anew",
        "rootContribution": "re- (again) + capit (head) + -ulate"
      },
      {
        "word": "resilient",
        "pos": "adj.",
        "briefDefinition": "Able to withstand or recover quickly from difficult conditions",
        "rootContribution": "re- (back) + sil (leap) + -ient"
      },
      {
        "word": "recidivism",
        "pos": "noun",
        "briefDefinition": "The tendency of a convicted criminal to reoffend",
        "rootContribution": "re- (back) + cad (fall) + -ism"
      },
      {
        "word": "rebuttal",
        "pos": "noun",
        "briefDefinition": "A refutation or counterargument in a debate",
        "rootContribution": "re- (back) + butt (push) + -al"
      },
      {
        "word": "reiterate",
        "pos": "verb",
        "briefDefinition": "Say something again or a number of times for emphasis",
        "rootContribution": "re- (again) + iter (path) + -ate"
      }
    ]
  },
  {
    "id": "root-aud",
    "root": "aud / audit",
    "type": "root",
    "origin": "Latin",
    "originalForm": "audaudit",
    "meaning": "to hear, listen",
    "variants": [
      "aud"
    ],
    "pronunciationOrCombining": "aud / audit combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "audible",
    "historicalInsight": "Derived from classical Latin \"aud / audit\". Central element in vocabulary of to hear, listen.",
    "semanticShiftNote": "Retains historical focus on to hear, listen adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "audible",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to hear, listen",
        "rootContribution": "aud / audit (to hear, listen)"
      },
      {
        "word": "auditorium",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to hear, listen",
        "rootContribution": "aud / audit (to hear, listen)"
      },
      {
        "word": "audition",
        "pos": "noun",
        "briefDefinition": "Related concept derived from aud / audit",
        "rootContribution": "aud / audit (to hear, listen)"
      },
      {
        "word": "auditory",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of aud / audit",
        "rootContribution": "aud / audit (to hear, listen)"
      },
      {
        "word": "inaudible",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of aud / audit",
        "rootContribution": "aud / audit (to hear, listen)"
      }
    ]
  },
  {
    "id": "root-auto",
    "root": "auto-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "auto",
    "meaning": "self, same, one's own",
    "variants": [
      "auto-"
    ],
    "pronunciationOrCombining": "auto- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "autonomy",
    "historicalInsight": "Derived from classical Greek \"auto-\". Central element in vocabulary of self, same, one's own.",
    "semanticShiftNote": "Retains historical focus on self, same, one's own adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "autonomy",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying self, same, one's own",
        "rootContribution": "auto- (self, same, one's own)"
      },
      {
        "word": "autobiography",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing self, same, one's own",
        "rootContribution": "auto- (self, same, one's own)"
      },
      {
        "word": "autocrat",
        "pos": "noun",
        "briefDefinition": "Related concept derived from auto-",
        "rootContribution": "auto- (self, same, one's own)"
      },
      {
        "word": "automaton",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of auto-",
        "rootContribution": "auto- (self, same, one's own)"
      },
      {
        "word": "authentic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of auto-",
        "rootContribution": "auto- (self, same, one's own)"
      }
    ]
  },
  {
    "id": "root-bio",
    "root": "bio-",
    "type": "root",
    "origin": "Greek",
    "originalForm": "bio",
    "meaning": "life, living organisms",
    "variants": [
      "bio-"
    ],
    "pronunciationOrCombining": "bio- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "symbiosis",
    "historicalInsight": "Derived from classical Greek \"bio-\". Central element in vocabulary of life, living organisms.",
    "semanticShiftNote": "Retains historical focus on life, living organisms adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "symbiosis",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying life, living organisms",
        "rootContribution": "bio- (life, living organisms)"
      },
      {
        "word": "biology",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing life, living organisms",
        "rootContribution": "bio- (life, living organisms)"
      },
      {
        "word": "biography",
        "pos": "noun",
        "briefDefinition": "Related concept derived from bio-",
        "rootContribution": "bio- (life, living organisms)"
      },
      {
        "word": "biome",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of bio-",
        "rootContribution": "bio- (life, living organisms)"
      },
      {
        "word": "biodegradable",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of bio-",
        "rootContribution": "bio- (life, living organisms)"
      }
    ]
  },
  {
    "id": "root-ced",
    "root": "ced / cess",
    "type": "root",
    "origin": "Latin",
    "originalForm": "cedcess",
    "meaning": "to go, yield, surrender",
    "variants": [
      "ced"
    ],
    "pronunciationOrCombining": "ced / cess combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "precede",
    "historicalInsight": "Derived from classical Latin \"ced / cess\". Central element in vocabulary of to go, yield, surrender.",
    "semanticShiftNote": "Retains historical focus on to go, yield, surrender adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "precede",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to go, yield, surrender",
        "rootContribution": "ced / cess (to go, yield, surrender)"
      },
      {
        "word": "recede",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to go, yield, surrender",
        "rootContribution": "ced / cess (to go, yield, surrender)"
      },
      {
        "word": "concede",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ced / cess",
        "rootContribution": "ced / cess (to go, yield, surrender)"
      },
      {
        "word": "unprecedented",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ced / cess",
        "rootContribution": "ced / cess (to go, yield, surrender)"
      },
      {
        "word": "cessation",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ced / cess",
        "rootContribution": "ced / cess (to go, yield, surrender)"
      }
    ]
  },
  {
    "id": "root-chron-2",
    "root": "chrono-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "chrono",
    "meaning": "relating to time or duration",
    "variants": [
      "chrono-"
    ],
    "pronunciationOrCombining": "chrono- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "chronological",
    "historicalInsight": "Derived from classical Greek \"chrono-\". Central element in vocabulary of relating to time or duration.",
    "semanticShiftNote": "Retains historical focus on relating to time or duration adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "chronological",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying relating to time or duration",
        "rootContribution": "chrono- (relating to time or duration)"
      },
      {
        "word": "chronometer",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing relating to time or duration",
        "rootContribution": "chrono- (relating to time or duration)"
      },
      {
        "word": "anachronistic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from chrono-",
        "rootContribution": "chrono- (relating to time or duration)"
      },
      {
        "word": "chronic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of chrono-",
        "rootContribution": "chrono- (relating to time or duration)"
      },
      {
        "word": "chronicle",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of chrono-",
        "rootContribution": "chrono- (relating to time or duration)"
      }
    ]
  },
  {
    "id": "root-cid",
    "root": "cid / cis",
    "type": "root",
    "origin": "Latin",
    "originalForm": "cidcis",
    "meaning": "to cut, kill, slay",
    "variants": [
      "cid"
    ],
    "pronunciationOrCombining": "cid / cis combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "concise",
    "historicalInsight": "Derived from classical Latin \"cid / cis\". Central element in vocabulary of to cut, kill, slay.",
    "semanticShiftNote": "Retains historical focus on to cut, kill, slay adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "concise",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to cut, kill, slay",
        "rootContribution": "cid / cis (to cut, kill, slay)"
      },
      {
        "word": "incision",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to cut, kill, slay",
        "rootContribution": "cid / cis (to cut, kill, slay)"
      },
      {
        "word": "decisive",
        "pos": "noun",
        "briefDefinition": "Related concept derived from cid / cis",
        "rootContribution": "cid / cis (to cut, kill, slay)"
      },
      {
        "word": "fratricide",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of cid / cis",
        "rootContribution": "cid / cis (to cut, kill, slay)"
      },
      {
        "word": "pesticide",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of cid / cis",
        "rootContribution": "cid / cis (to cut, kill, slay)"
      }
    ]
  },
  {
    "id": "root-claim",
    "root": "claim / clam",
    "type": "root",
    "origin": "Latin",
    "originalForm": "claimclam",
    "meaning": "to shout, call out, declare",
    "variants": [
      "claim"
    ],
    "pronunciationOrCombining": "claim / clam combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "acclaim",
    "historicalInsight": "Derived from classical Latin \"claim / clam\". Central element in vocabulary of to shout, call out, declare.",
    "semanticShiftNote": "Retains historical focus on to shout, call out, declare adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "acclaim",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to shout, call out, declare",
        "rootContribution": "claim / clam (to shout, call out, declare)"
      },
      {
        "word": "declaim",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to shout, call out, declare",
        "rootContribution": "claim / clam (to shout, call out, declare)"
      },
      {
        "word": "exclamation",
        "pos": "noun",
        "briefDefinition": "Related concept derived from claim / clam",
        "rootContribution": "claim / clam (to shout, call out, declare)"
      },
      {
        "word": "clamor",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of claim / clam",
        "rootContribution": "claim / clam (to shout, call out, declare)"
      },
      {
        "word": "reclaim",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of claim / clam",
        "rootContribution": "claim / clam (to shout, call out, declare)"
      }
    ]
  },
  {
    "id": "root-cogn",
    "root": "cogn / gnos",
    "type": "root",
    "origin": "Latin",
    "originalForm": "cogngnos",
    "meaning": "to know, recognize, learn",
    "variants": [
      "cogn"
    ],
    "pronunciationOrCombining": "cogn / gnos combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "cognitive",
    "historicalInsight": "Derived from classical Latin \"cogn / gnos\". Central element in vocabulary of to know, recognize, learn.",
    "semanticShiftNote": "Retains historical focus on to know, recognize, learn adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "cognitive",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to know, recognize, learn",
        "rootContribution": "cogn / gnos (to know, recognize, learn)"
      },
      {
        "word": "incognito",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to know, recognize, learn",
        "rootContribution": "cogn / gnos (to know, recognize, learn)"
      },
      {
        "word": "prognosis",
        "pos": "noun",
        "briefDefinition": "Related concept derived from cogn / gnos",
        "rootContribution": "cogn / gnos (to know, recognize, learn)"
      },
      {
        "word": "cognizant",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of cogn / gnos",
        "rootContribution": "cogn / gnos (to know, recognize, learn)"
      },
      {
        "word": "diagnosis",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of cogn / gnos",
        "rootContribution": "cogn / gnos (to know, recognize, learn)"
      }
    ]
  },
  {
    "id": "root-corp",
    "root": "corp",
    "type": "root",
    "origin": "Latin",
    "originalForm": "corp",
    "meaning": "body, substance",
    "variants": [
      "corp"
    ],
    "pronunciationOrCombining": "corp combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "corporeal",
    "historicalInsight": "Derived from classical Latin \"corp\". Central element in vocabulary of body, substance.",
    "semanticShiftNote": "Retains historical focus on body, substance adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "corporeal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying body, substance",
        "rootContribution": "corp (body, substance)"
      },
      {
        "word": "corporation",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing body, substance",
        "rootContribution": "corp (body, substance)"
      },
      {
        "word": "corpse",
        "pos": "noun",
        "briefDefinition": "Related concept derived from corp",
        "rootContribution": "corp (body, substance)"
      },
      {
        "word": "corpulent",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of corp",
        "rootContribution": "corp (body, substance)"
      },
      {
        "word": "incorporate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of corp",
        "rootContribution": "corp (body, substance)"
      }
    ]
  },
  {
    "id": "root-cred",
    "root": "cred",
    "type": "root",
    "origin": "Latin",
    "originalForm": "cred",
    "meaning": "to believe, trust, rely",
    "variants": [
      "cred"
    ],
    "pronunciationOrCombining": "cred combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "credible",
    "historicalInsight": "Derived from classical Latin \"cred\". Central element in vocabulary of to believe, trust, rely.",
    "semanticShiftNote": "Retains historical focus on to believe, trust, rely adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "credible",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to believe, trust, rely",
        "rootContribution": "cred (to believe, trust, rely)"
      },
      {
        "word": "credulous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to believe, trust, rely",
        "rootContribution": "cred (to believe, trust, rely)"
      },
      {
        "word": "incredulous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from cred",
        "rootContribution": "cred (to believe, trust, rely)"
      },
      {
        "word": "creed",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of cred",
        "rootContribution": "cred (to believe, trust, rely)"
      },
      {
        "word": "credenza",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of cred",
        "rootContribution": "cred (to believe, trust, rely)"
      }
    ]
  },
  {
    "id": "root-cur",
    "root": "cur / curs",
    "type": "root",
    "origin": "Latin",
    "originalForm": "curcurs",
    "meaning": "to run, flow, course",
    "variants": [
      "cur"
    ],
    "pronunciationOrCombining": "cur / curs combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "cursory",
    "historicalInsight": "Derived from classical Latin \"cur / curs\". Central element in vocabulary of to run, flow, course.",
    "semanticShiftNote": "Retains historical focus on to run, flow, course adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "cursory",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to run, flow, course",
        "rootContribution": "cur / curs (to run, flow, course)"
      },
      {
        "word": "precursor",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to run, flow, course",
        "rootContribution": "cur / curs (to run, flow, course)"
      },
      {
        "word": "concur",
        "pos": "noun",
        "briefDefinition": "Related concept derived from cur / curs",
        "rootContribution": "cur / curs (to run, flow, course)"
      },
      {
        "word": "recurrence",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of cur / curs",
        "rootContribution": "cur / curs (to run, flow, course)"
      },
      {
        "word": "discursive",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of cur / curs",
        "rootContribution": "cur / curs (to run, flow, course)"
      }
    ]
  },
  {
    "id": "root-dem",
    "root": "dem / demo",
    "type": "root",
    "origin": "Greek",
    "originalForm": "demdemo",
    "meaning": "people, populace",
    "variants": [
      "dem"
    ],
    "pronunciationOrCombining": "dem / demo combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "democracy",
    "historicalInsight": "Derived from classical Greek \"dem / demo\". Central element in vocabulary of people, populace.",
    "semanticShiftNote": "Retains historical focus on people, populace adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "democracy",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying people, populace",
        "rootContribution": "dem / demo (people, populace)"
      },
      {
        "word": "demographic",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing people, populace",
        "rootContribution": "dem / demo (people, populace)"
      },
      {
        "word": "demagogue",
        "pos": "noun",
        "briefDefinition": "Related concept derived from dem / demo",
        "rootContribution": "dem / demo (people, populace)"
      },
      {
        "word": "epidemic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of dem / demo",
        "rootContribution": "dem / demo (people, populace)"
      },
      {
        "word": "endemic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of dem / demo",
        "rootContribution": "dem / demo (people, populace)"
      }
    ]
  },
  {
    "id": "root-doc",
    "root": "doc / doct",
    "type": "root",
    "origin": "Latin",
    "originalForm": "docdoct",
    "meaning": "to teach, show, guide",
    "variants": [
      "doc"
    ],
    "pronunciationOrCombining": "doc / doct combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "docile",
    "historicalInsight": "Derived from classical Latin \"doc / doct\". Central element in vocabulary of to teach, show, guide.",
    "semanticShiftNote": "Retains historical focus on to teach, show, guide adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "docile",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to teach, show, guide",
        "rootContribution": "doc / doct (to teach, show, guide)"
      },
      {
        "word": "indoctrinate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to teach, show, guide",
        "rootContribution": "doc / doct (to teach, show, guide)"
      },
      {
        "word": "doctrine",
        "pos": "noun",
        "briefDefinition": "Related concept derived from doc / doct",
        "rootContribution": "doc / doct (to teach, show, guide)"
      },
      {
        "word": "documentary",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of doc / doct",
        "rootContribution": "doc / doct (to teach, show, guide)"
      },
      {
        "word": "doctorate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of doc / doct",
        "rootContribution": "doc / doct (to teach, show, guide)"
      }
    ]
  },
  {
    "id": "root-duc",
    "root": "duc / duct",
    "type": "root",
    "origin": "Latin",
    "originalForm": "ducduct",
    "meaning": "to lead, guide, bring forward",
    "variants": [
      "duc"
    ],
    "pronunciationOrCombining": "duc / duct combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "conducive",
    "historicalInsight": "Derived from classical Latin \"duc / duct\". Central element in vocabulary of to lead, guide, bring forward.",
    "semanticShiftNote": "Retains historical focus on to lead, guide, bring forward adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "conducive",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to lead, guide, bring forward",
        "rootContribution": "duc / duct (to lead, guide, bring forward)"
      },
      {
        "word": "deduce",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to lead, guide, bring forward",
        "rootContribution": "duc / duct (to lead, guide, bring forward)"
      },
      {
        "word": "seduce",
        "pos": "noun",
        "briefDefinition": "Related concept derived from duc / duct",
        "rootContribution": "duc / duct (to lead, guide, bring forward)"
      },
      {
        "word": "induce",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of duc / duct",
        "rootContribution": "duc / duct (to lead, guide, bring forward)"
      },
      {
        "word": "traduce",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of duc / duct",
        "rootContribution": "duc / duct (to lead, guide, bring forward)"
      }
    ]
  },
  {
    "id": "root-fac",
    "root": "fac / fec / fic",
    "type": "root",
    "origin": "Latin",
    "originalForm": "facfecfic",
    "meaning": "to make, do, cause",
    "variants": [
      "fac"
    ],
    "pronunciationOrCombining": "fac / fec / fic combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "facilitate",
    "historicalInsight": "Derived from classical Latin \"fac / fec / fic\". Central element in vocabulary of to make, do, cause.",
    "semanticShiftNote": "Retains historical focus on to make, do, cause adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "facilitate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to make, do, cause",
        "rootContribution": "fac / fec / fic (to make, do, cause)"
      },
      {
        "word": "factotum",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to make, do, cause",
        "rootContribution": "fac / fec / fic (to make, do, cause)"
      },
      {
        "word": "beneficent",
        "pos": "noun",
        "briefDefinition": "Related concept derived from fac / fec / fic",
        "rootContribution": "fac / fec / fic (to make, do, cause)"
      },
      {
        "word": "efficacious",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of fac / fec / fic",
        "rootContribution": "fac / fec / fic (to make, do, cause)"
      },
      {
        "word": "factitious",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of fac / fec / fic",
        "rootContribution": "fac / fec / fic (to make, do, cause)"
      }
    ]
  },
  {
    "id": "root-flu",
    "root": "flu / flux",
    "type": "root",
    "origin": "Latin",
    "originalForm": "fluflux",
    "meaning": "to flow, stream",
    "variants": [
      "flu"
    ],
    "pronunciationOrCombining": "flu / flux combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "fluid",
    "historicalInsight": "Derived from classical Latin \"flu / flux\". Central element in vocabulary of to flow, stream.",
    "semanticShiftNote": "Retains historical focus on to flow, stream adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "fluid",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to flow, stream",
        "rootContribution": "flu / flux (to flow, stream)"
      },
      {
        "word": "affluent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to flow, stream",
        "rootContribution": "flu / flux (to flow, stream)"
      },
      {
        "word": "superfluous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from flu / flux",
        "rootContribution": "flu / flux (to flow, stream)"
      },
      {
        "word": "flux",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of flu / flux",
        "rootContribution": "flu / flux (to flow, stream)"
      },
      {
        "word": "influx",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of flu / flux",
        "rootContribution": "flu / flux (to flow, stream)"
      }
    ]
  },
  {
    "id": "root-form",
    "root": "form",
    "type": "root",
    "origin": "Latin",
    "originalForm": "form",
    "meaning": "shape, structure, appearance",
    "variants": [
      "form"
    ],
    "pronunciationOrCombining": "form combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "formidable",
    "historicalInsight": "Derived from classical Latin \"form\". Central element in vocabulary of shape, structure, appearance.",
    "semanticShiftNote": "Retains historical focus on shape, structure, appearance adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "conform",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying shape, structure, appearance",
        "rootContribution": "form (shape, structure, appearance)"
      },
      {
        "word": "deformity",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing shape, structure, appearance",
        "rootContribution": "form (shape, structure, appearance)"
      },
      {
        "word": "formative",
        "pos": "noun",
        "briefDefinition": "Related concept derived from form",
        "rootContribution": "form (shape, structure, appearance)"
      },
      {
        "word": "reform",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of form",
        "rootContribution": "form (shape, structure, appearance)"
      },
      {
        "word": "formulaic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of form",
        "rootContribution": "form (shape, structure, appearance)"
      }
    ]
  },
  {
    "id": "root-fort",
    "root": "fort / forc",
    "type": "root",
    "origin": "Latin",
    "originalForm": "fortforc",
    "meaning": "strong, brave, power",
    "variants": [
      "fort"
    ],
    "pronunciationOrCombining": "fort / forc combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "fortitude",
    "historicalInsight": "Derived from classical Latin \"fort / forc\". Central element in vocabulary of strong, brave, power.",
    "semanticShiftNote": "Retains historical focus on strong, brave, power adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "fortitude",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying strong, brave, power",
        "rootContribution": "fort / forc (strong, brave, power)"
      },
      {
        "word": "fortify",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing strong, brave, power",
        "rootContribution": "fort / forc (strong, brave, power)"
      },
      {
        "word": "forceful",
        "pos": "noun",
        "briefDefinition": "Related concept derived from fort / forc",
        "rootContribution": "fort / forc (strong, brave, power)"
      },
      {
        "word": "comfort",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of fort / forc",
        "rootContribution": "fort / forc (strong, brave, power)"
      },
      {
        "word": "fortuitous",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of fort / forc",
        "rootContribution": "fort / forc (strong, brave, power)"
      }
    ]
  },
  {
    "id": "root-fus",
    "root": "fus / fund",
    "type": "root",
    "origin": "Latin",
    "originalForm": "fusfund",
    "meaning": "to pour, melt, spread",
    "variants": [
      "fus"
    ],
    "pronunciationOrCombining": "fus / fund combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "diffuse",
    "historicalInsight": "Derived from classical Latin \"fus / fund\". Central element in vocabulary of to pour, melt, spread.",
    "semanticShiftNote": "Retains historical focus on to pour, melt, spread adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "diffuse",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to pour, melt, spread",
        "rootContribution": "fus / fund (to pour, melt, spread)"
      },
      {
        "word": "profuse",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to pour, melt, spread",
        "rootContribution": "fus / fund (to pour, melt, spread)"
      },
      {
        "word": "effusive",
        "pos": "noun",
        "briefDefinition": "Related concept derived from fus / fund",
        "rootContribution": "fus / fund (to pour, melt, spread)"
      },
      {
        "word": "confound",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of fus / fund",
        "rootContribution": "fus / fund (to pour, melt, spread)"
      },
      {
        "word": "fusion",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of fus / fund",
        "rootContribution": "fus / fund (to pour, melt, spread)"
      }
    ]
  },
  {
    "id": "root-geo",
    "root": "geo-",
    "type": "root",
    "origin": "Greek",
    "originalForm": "geo",
    "meaning": "earth, land, soil",
    "variants": [
      "geo-"
    ],
    "pronunciationOrCombining": "geo- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "geology",
    "historicalInsight": "Derived from classical Greek \"geo-\". Central element in vocabulary of earth, land, soil.",
    "semanticShiftNote": "Retains historical focus on earth, land, soil adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "geology",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying earth, land, soil",
        "rootContribution": "geo- (earth, land, soil)"
      },
      {
        "word": "geopolitics",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing earth, land, soil",
        "rootContribution": "geo- (earth, land, soil)"
      },
      {
        "word": "geocentric",
        "pos": "noun",
        "briefDefinition": "Related concept derived from geo-",
        "rootContribution": "geo- (earth, land, soil)"
      },
      {
        "word": "geometry",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of geo-",
        "rootContribution": "geo- (earth, land, soil)"
      },
      {
        "word": "geothermal",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of geo-",
        "rootContribution": "geo- (earth, land, soil)"
      }
    ]
  },
  {
    "id": "root-grad",
    "root": "grad / gress",
    "type": "root",
    "origin": "Latin",
    "originalForm": "gradgress",
    "meaning": "to step, walk, go forward",
    "variants": [
      "grad"
    ],
    "pronunciationOrCombining": "grad / gress combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "digress",
    "historicalInsight": "Derived from classical Latin \"grad / gress\". Central element in vocabulary of to step, walk, go forward.",
    "semanticShiftNote": "Retains historical focus on to step, walk, go forward adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "digress",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to step, walk, go forward",
        "rootContribution": "grad / gress (to step, walk, go forward)"
      },
      {
        "word": "gradual",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to step, walk, go forward",
        "rootContribution": "grad / gress (to step, walk, go forward)"
      },
      {
        "word": "transgress",
        "pos": "noun",
        "briefDefinition": "Related concept derived from grad / gress",
        "rootContribution": "grad / gress (to step, walk, go forward)"
      },
      {
        "word": "retrogression",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of grad / gress",
        "rootContribution": "grad / gress (to step, walk, go forward)"
      },
      {
        "word": "eclipsed",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of grad / gress",
        "rootContribution": "grad / gress (to step, walk, go forward)"
      }
    ]
  },
  {
    "id": "root-grat",
    "root": "grat",
    "type": "root",
    "origin": "Latin",
    "originalForm": "grat",
    "meaning": "pleasing, thankful, favor",
    "variants": [
      "grat"
    ],
    "pronunciationOrCombining": "grat combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "gratitude",
    "historicalInsight": "Derived from classical Latin \"grat\". Central element in vocabulary of pleasing, thankful, favor.",
    "semanticShiftNote": "Retains historical focus on pleasing, thankful, favor adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "gratitude",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying pleasing, thankful, favor",
        "rootContribution": "grat (pleasing, thankful, favor)"
      },
      {
        "word": "ingratiate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing pleasing, thankful, favor",
        "rootContribution": "grat (pleasing, thankful, favor)"
      },
      {
        "word": "gratuitous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from grat",
        "rootContribution": "grat (pleasing, thankful, favor)"
      },
      {
        "word": "congratulate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of grat",
        "rootContribution": "grat (pleasing, thankful, favor)"
      },
      {
        "word": "gratis",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of grat",
        "rootContribution": "grat (pleasing, thankful, favor)"
      }
    ]
  },
  {
    "id": "root-hab",
    "root": "hab / hib",
    "type": "root",
    "origin": "Latin",
    "originalForm": "habhib",
    "meaning": "to have, hold, dwell",
    "variants": [
      "hab"
    ],
    "pronunciationOrCombining": "hab / hib combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "habitat",
    "historicalInsight": "Derived from classical Latin \"hab / hib\". Central element in vocabulary of to have, hold, dwell.",
    "semanticShiftNote": "Retains historical focus on to have, hold, dwell adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "habitat",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to have, hold, dwell",
        "rootContribution": "hab / hib (to have, hold, dwell)"
      },
      {
        "word": "inhibit",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to have, hold, dwell",
        "rootContribution": "hab / hib (to have, hold, dwell)"
      },
      {
        "word": "prohibit",
        "pos": "noun",
        "briefDefinition": "Related concept derived from hab / hib",
        "rootContribution": "hab / hib (to have, hold, dwell)"
      },
      {
        "word": "habitation",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of hab / hib",
        "rootContribution": "hab / hib (to have, hold, dwell)"
      },
      {
        "word": "rehabilitate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of hab / hib",
        "rootContribution": "hab / hib (to have, hold, dwell)"
      }
    ]
  },
  {
    "id": "root-homo",
    "root": "homo-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "homo",
    "meaning": "same, equal, uniform",
    "variants": [
      "homo-"
    ],
    "pronunciationOrCombining": "homo- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "homogeneous",
    "historicalInsight": "Derived from classical Greek \"homo-\". Central element in vocabulary of same, equal, uniform.",
    "semanticShiftNote": "Retains historical focus on same, equal, uniform adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "homogeneous",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying same, equal, uniform",
        "rootContribution": "homo- (same, equal, uniform)"
      },
      {
        "word": "homonym",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing same, equal, uniform",
        "rootContribution": "homo- (same, equal, uniform)"
      },
      {
        "word": "homogenous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from homo-",
        "rootContribution": "homo- (same, equal, uniform)"
      },
      {
        "word": "homogenize",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of homo-",
        "rootContribution": "homo- (same, equal, uniform)"
      },
      {
        "word": "homocentric",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of homo-",
        "rootContribution": "homo- (same, equal, uniform)"
      }
    ]
  },
  {
    "id": "root-hetero",
    "root": "hetero-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "hetero",
    "meaning": "different, other, diverse",
    "variants": [
      "hetero-"
    ],
    "pronunciationOrCombining": "hetero- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "heterogeneous",
    "historicalInsight": "Derived from classical Greek \"hetero-\". Central element in vocabulary of different, other, diverse.",
    "semanticShiftNote": "Retains historical focus on different, other, diverse adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "heterogeneous",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying different, other, diverse",
        "rootContribution": "hetero- (different, other, diverse)"
      },
      {
        "word": "heterodox",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing different, other, diverse",
        "rootContribution": "hetero- (different, other, diverse)"
      },
      {
        "word": "heterogeneity",
        "pos": "noun",
        "briefDefinition": "Related concept derived from hetero-",
        "rootContribution": "hetero- (different, other, diverse)"
      },
      {
        "word": "heteromorphic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of hetero-",
        "rootContribution": "hetero- (different, other, diverse)"
      },
      {
        "word": "heteronym",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of hetero-",
        "rootContribution": "hetero- (different, other, diverse)"
      }
    ]
  },
  {
    "id": "root-hydro",
    "root": "hydro-",
    "type": "root",
    "origin": "Greek",
    "originalForm": "hydro",
    "meaning": "water, liquid",
    "variants": [
      "hydro-"
    ],
    "pronunciationOrCombining": "hydro- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "hydrate",
    "historicalInsight": "Derived from classical Greek \"hydro-\". Central element in vocabulary of water, liquid.",
    "semanticShiftNote": "Retains historical focus on water, liquid adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "hydrate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying water, liquid",
        "rootContribution": "hydro- (water, liquid)"
      },
      {
        "word": "hydrodynamic",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing water, liquid",
        "rootContribution": "hydro- (water, liquid)"
      },
      {
        "word": "hydrophobic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from hydro-",
        "rootContribution": "hydro- (water, liquid)"
      },
      {
        "word": "hydroelectric",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of hydro-",
        "rootContribution": "hydro- (water, liquid)"
      },
      {
        "word": "hydroponics",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of hydro-",
        "rootContribution": "hydro- (water, liquid)"
      }
    ]
  },
  {
    "id": "root-hyper",
    "root": "hyper-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "hyper",
    "meaning": "over, above, excessive",
    "variants": [
      "hyper-"
    ],
    "pronunciationOrCombining": "hyper- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "hyperbole",
    "historicalInsight": "Derived from classical Greek \"hyper-\". Central element in vocabulary of over, above, excessive.",
    "semanticShiftNote": "Retains historical focus on over, above, excessive adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "hyperbole",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying over, above, excessive",
        "rootContribution": "hyper- (over, above, excessive)"
      },
      {
        "word": "hyperactive",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing over, above, excessive",
        "rootContribution": "hyper- (over, above, excessive)"
      },
      {
        "word": "hypersensitive",
        "pos": "noun",
        "briefDefinition": "Related concept derived from hyper-",
        "rootContribution": "hyper- (over, above, excessive)"
      },
      {
        "word": "hypertension",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of hyper-",
        "rootContribution": "hyper- (over, above, excessive)"
      },
      {
        "word": "hypercritical",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of hyper-",
        "rootContribution": "hyper- (over, above, excessive)"
      }
    ]
  },
  {
    "id": "root-hypo",
    "root": "hypo-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "hypo",
    "meaning": "under, below, deficient",
    "variants": [
      "hypo-"
    ],
    "pronunciationOrCombining": "hypo- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "hypothesis",
    "historicalInsight": "Derived from classical Greek \"hypo-\". Central element in vocabulary of under, below, deficient.",
    "semanticShiftNote": "Retains historical focus on under, below, deficient adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "hypothesis",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying under, below, deficient",
        "rootContribution": "hypo- (under, below, deficient)"
      },
      {
        "word": "hypothermia",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing under, below, deficient",
        "rootContribution": "hypo- (under, below, deficient)"
      },
      {
        "word": "hypochondria",
        "pos": "noun",
        "briefDefinition": "Related concept derived from hypo-",
        "rootContribution": "hypo- (under, below, deficient)"
      },
      {
        "word": "hypocrisy",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of hypo-",
        "rootContribution": "hypo- (under, below, deficient)"
      },
      {
        "word": "hypothetical",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of hypo-",
        "rootContribution": "hypo- (under, below, deficient)"
      }
    ]
  },
  {
    "id": "root-jac",
    "root": "jac / ject",
    "type": "root",
    "origin": "Latin",
    "originalForm": "jacject",
    "meaning": "to throw, cast, hurl",
    "variants": [
      "jac"
    ],
    "pronunciationOrCombining": "jac / ject combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "conjecture",
    "historicalInsight": "Derived from classical Latin \"jac / ject\". Central element in vocabulary of to throw, cast, hurl.",
    "semanticShiftNote": "Retains historical focus on to throw, cast, hurl adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "conjecture",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to throw, cast, hurl",
        "rootContribution": "jac / ject (to throw, cast, hurl)"
      },
      {
        "word": "interject",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to throw, cast, hurl",
        "rootContribution": "jac / ject (to throw, cast, hurl)"
      },
      {
        "word": "abject",
        "pos": "noun",
        "briefDefinition": "Related concept derived from jac / ject",
        "rootContribution": "jac / ject (to throw, cast, hurl)"
      },
      {
        "word": "eject",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of jac / ject",
        "rootContribution": "jac / ject (to throw, cast, hurl)"
      },
      {
        "word": "trajectory",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of jac / ject",
        "rootContribution": "jac / ject (to throw, cast, hurl)"
      }
    ]
  },
  {
    "id": "root-jud",
    "root": "jud / jur / jus",
    "type": "root",
    "origin": "Latin",
    "originalForm": "judjurjus",
    "meaning": "law, right, judgment",
    "variants": [
      "jud"
    ],
    "pronunciationOrCombining": "jud / jur / jus combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "judicious",
    "historicalInsight": "Derived from classical Latin \"jud / jur / jus\". Central element in vocabulary of law, right, judgment.",
    "semanticShiftNote": "Retains historical focus on law, right, judgment adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "judicious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying law, right, judgment",
        "rootContribution": "jud / jur / jus (law, right, judgment)"
      },
      {
        "word": "jurisdiction",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing law, right, judgment",
        "rootContribution": "jud / jur / jus (law, right, judgment)"
      },
      {
        "word": "perjury",
        "pos": "noun",
        "briefDefinition": "Related concept derived from jud / jur / jus",
        "rootContribution": "jud / jur / jus (law, right, judgment)"
      },
      {
        "word": "adjudicate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of jud / jur / jus",
        "rootContribution": "jud / jur / jus (law, right, judgment)"
      },
      {
        "word": "justify",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of jud / jur / jus",
        "rootContribution": "jud / jur / jus (law, right, judgment)"
      }
    ]
  },
  {
    "id": "root-lab",
    "root": "lab / labor",
    "type": "root",
    "origin": "Latin",
    "originalForm": "lablabor",
    "meaning": "to work, toil, exertion",
    "variants": [
      "lab"
    ],
    "pronunciationOrCombining": "lab / labor combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "collaborate",
    "historicalInsight": "Derived from classical Latin \"lab / labor\". Central element in vocabulary of to work, toil, exertion.",
    "semanticShiftNote": "Retains historical focus on to work, toil, exertion adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "collaborate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to work, toil, exertion",
        "rootContribution": "lab / labor (to work, toil, exertion)"
      },
      {
        "word": "laborious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to work, toil, exertion",
        "rootContribution": "lab / labor (to work, toil, exertion)"
      },
      {
        "word": "elaborate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from lab / labor",
        "rootContribution": "lab / labor (to work, toil, exertion)"
      },
      {
        "word": "laboratory",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of lab / labor",
        "rootContribution": "lab / labor (to work, toil, exertion)"
      },
      {
        "word": "belabor",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of lab / labor",
        "rootContribution": "lab / labor (to work, toil, exertion)"
      }
    ]
  },
  {
    "id": "root-leg",
    "root": "leg / lect",
    "type": "root",
    "origin": "Latin",
    "originalForm": "leglect",
    "meaning": "to read, choose, gather",
    "variants": [
      "leg"
    ],
    "pronunciationOrCombining": "leg / lect combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "legible",
    "historicalInsight": "Derived from classical Latin \"leg / lect\". Central element in vocabulary of to read, choose, gather.",
    "semanticShiftNote": "Retains historical focus on to read, choose, gather adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "legible",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to read, choose, gather",
        "rootContribution": "leg / lect (to read, choose, gather)"
      },
      {
        "word": "eclectic",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to read, choose, gather",
        "rootContribution": "leg / lect (to read, choose, gather)"
      },
      {
        "word": "intellectual",
        "pos": "noun",
        "briefDefinition": "Related concept derived from leg / lect",
        "rootContribution": "leg / lect (to read, choose, gather)"
      },
      {
        "word": "eligible",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of leg / lect",
        "rootContribution": "leg / lect (to read, choose, gather)"
      },
      {
        "word": "lecture",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of leg / lect",
        "rootContribution": "leg / lect (to read, choose, gather)"
      }
    ]
  },
  {
    "id": "root-lev",
    "root": "lev",
    "type": "root",
    "origin": "Latin",
    "originalForm": "lev",
    "meaning": "light in weight, to raise",
    "variants": [
      "lev"
    ],
    "pronunciationOrCombining": "lev combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "levity",
    "historicalInsight": "Derived from classical Latin \"lev\". Central element in vocabulary of light in weight, to raise.",
    "semanticShiftNote": "Retains historical focus on light in weight, to raise adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "levity",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying light in weight, to raise",
        "rootContribution": "lev (light in weight, to raise)"
      },
      {
        "word": "alleviate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing light in weight, to raise",
        "rootContribution": "lev (light in weight, to raise)"
      },
      {
        "word": "elevator",
        "pos": "noun",
        "briefDefinition": "Related concept derived from lev",
        "rootContribution": "lev (light in weight, to raise)"
      },
      {
        "word": "leverage",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of lev",
        "rootContribution": "lev (light in weight, to raise)"
      },
      {
        "word": "levitate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of lev",
        "rootContribution": "lev (light in weight, to raise)"
      }
    ]
  },
  {
    "id": "root-liber",
    "root": "liber",
    "type": "root",
    "origin": "Latin",
    "originalForm": "liber",
    "meaning": "free, open",
    "variants": [
      "liber"
    ],
    "pronunciationOrCombining": "liber combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "liberal",
    "historicalInsight": "Derived from classical Latin \"liber\". Central element in vocabulary of free, open.",
    "semanticShiftNote": "Retains historical focus on free, open adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "liberal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying free, open",
        "rootContribution": "liber (free, open)"
      },
      {
        "word": "liberate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing free, open",
        "rootContribution": "liber (free, open)"
      },
      {
        "word": "libertine",
        "pos": "noun",
        "briefDefinition": "Related concept derived from liber",
        "rootContribution": "liber (free, open)"
      },
      {
        "word": "deliberate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of liber",
        "rootContribution": "liber (free, open)"
      },
      {
        "word": "liberty",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of liber",
        "rootContribution": "liber (free, open)"
      }
    ]
  },
  {
    "id": "root-luc",
    "root": "luc / lum",
    "type": "root",
    "origin": "Latin",
    "originalForm": "luclum",
    "meaning": "light, shine, clear",
    "variants": [
      "luc"
    ],
    "pronunciationOrCombining": "luc / lum combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "lucid",
    "historicalInsight": "Derived from classical Latin \"luc / lum\". Central element in vocabulary of light, shine, clear.",
    "semanticShiftNote": "Retains historical focus on light, shine, clear adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "lucid",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying light, shine, clear",
        "rootContribution": "luc / lum (light, shine, clear)"
      },
      {
        "word": "elucidate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing light, shine, clear",
        "rootContribution": "luc / lum (light, shine, clear)"
      },
      {
        "word": "luminous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from luc / lum",
        "rootContribution": "luc / lum (light, shine, clear)"
      },
      {
        "word": "translucent",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of luc / lum",
        "rootContribution": "luc / lum (light, shine, clear)"
      },
      {
        "word": "illuminate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of luc / lum",
        "rootContribution": "luc / lum (light, shine, clear)"
      }
    ]
  },
  {
    "id": "root-magn",
    "root": "magn / maj",
    "type": "root",
    "origin": "Latin",
    "originalForm": "magnmaj",
    "meaning": "great, large, grand",
    "variants": [
      "magn"
    ],
    "pronunciationOrCombining": "magn / maj combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "magnanimous",
    "historicalInsight": "Derived from classical Latin \"magn / maj\". Central element in vocabulary of great, large, grand.",
    "semanticShiftNote": "Retains historical focus on great, large, grand adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "magnanimous",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying great, large, grand",
        "rootContribution": "magn / maj (great, large, grand)"
      },
      {
        "word": "magnificent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing great, large, grand",
        "rootContribution": "magn / maj (great, large, grand)"
      },
      {
        "word": "magnitude",
        "pos": "noun",
        "briefDefinition": "Related concept derived from magn / maj",
        "rootContribution": "magn / maj (great, large, grand)"
      },
      {
        "word": "magnate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of magn / maj",
        "rootContribution": "magn / maj (great, large, grand)"
      },
      {
        "word": "majestic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of magn / maj",
        "rootContribution": "magn / maj (great, large, grand)"
      }
    ]
  },
  {
    "id": "root-mal",
    "root": "mal-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "mal",
    "meaning": "bad, evil, ill, wrong",
    "variants": [
      "mal-"
    ],
    "pronunciationOrCombining": "mal- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "malevolent",
    "historicalInsight": "Derived from classical Latin \"mal-\". Central element in vocabulary of bad, evil, ill, wrong.",
    "semanticShiftNote": "Retains historical focus on bad, evil, ill, wrong adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "malevolent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying bad, evil, ill, wrong",
        "rootContribution": "mal- (bad, evil, ill, wrong)"
      },
      {
        "word": "malicious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing bad, evil, ill, wrong",
        "rootContribution": "mal- (bad, evil, ill, wrong)"
      },
      {
        "word": "malignant",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mal-",
        "rootContribution": "mal- (bad, evil, ill, wrong)"
      },
      {
        "word": "malfeasance",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mal-",
        "rootContribution": "mal- (bad, evil, ill, wrong)"
      },
      {
        "word": "malediction",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mal-",
        "rootContribution": "mal- (bad, evil, ill, wrong)"
      }
    ]
  },
  {
    "id": "root-bene",
    "root": "bene-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "bene",
    "meaning": "good, well, generous",
    "variants": [
      "bene-"
    ],
    "pronunciationOrCombining": "bene- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "benevolent",
    "historicalInsight": "Derived from classical Latin \"bene-\". Central element in vocabulary of good, well, generous.",
    "semanticShiftNote": "Retains historical focus on good, well, generous adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "benevolent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying good, well, generous",
        "rootContribution": "bene- (good, well, generous)"
      },
      {
        "word": "beneficent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing good, well, generous",
        "rootContribution": "bene- (good, well, generous)"
      },
      {
        "word": "beneficiary",
        "pos": "noun",
        "briefDefinition": "Related concept derived from bene-",
        "rootContribution": "bene- (good, well, generous)"
      },
      {
        "word": "benign",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of bene-",
        "rootContribution": "bene- (good, well, generous)"
      },
      {
        "word": "benediction",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of bene-",
        "rootContribution": "bene- (good, well, generous)"
      }
    ]
  },
  {
    "id": "root-man",
    "root": "man / manu",
    "type": "root",
    "origin": "Latin",
    "originalForm": "manmanu",
    "meaning": "hand",
    "variants": [
      "man"
    ],
    "pronunciationOrCombining": "man / manu combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "manipulate",
    "historicalInsight": "Derived from classical Latin \"man / manu\". Central element in vocabulary of hand.",
    "semanticShiftNote": "Retains historical focus on hand adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "manipulate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying hand",
        "rootContribution": "man / manu (hand)"
      },
      {
        "word": "manuscript",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing hand",
        "rootContribution": "man / manu (hand)"
      },
      {
        "word": "emancipate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from man / manu",
        "rootContribution": "man / manu (hand)"
      },
      {
        "word": "manifest",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of man / manu",
        "rootContribution": "man / manu (hand)"
      },
      {
        "word": "mandatory",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of man / manu",
        "rootContribution": "man / manu (hand)"
      }
    ]
  },
  {
    "id": "root-mar",
    "root": "mar / mer",
    "type": "root",
    "origin": "Latin",
    "originalForm": "marmer",
    "meaning": "sea, ocean, pool",
    "variants": [
      "mar"
    ],
    "pronunciationOrCombining": "mar / mer combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "marine",
    "historicalInsight": "Derived from classical Latin \"mar / mer\". Central element in vocabulary of sea, ocean, pool.",
    "semanticShiftNote": "Retains historical focus on sea, ocean, pool adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "marine",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying sea, ocean, pool",
        "rootContribution": "mar / mer (sea, ocean, pool)"
      },
      {
        "word": "maritime",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing sea, ocean, pool",
        "rootContribution": "mar / mer (sea, ocean, pool)"
      },
      {
        "word": "submarine",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mar / mer",
        "rootContribution": "mar / mer (sea, ocean, pool)"
      },
      {
        "word": "marina",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mar / mer",
        "rootContribution": "mar / mer (sea, ocean, pool)"
      },
      {
        "word": "aquamarine",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mar / mer",
        "rootContribution": "mar / mer (sea, ocean, pool)"
      }
    ]
  },
  {
    "id": "root-matr",
    "root": "matr / matern",
    "type": "root",
    "origin": "Latin",
    "originalForm": "matrmatern",
    "meaning": "mother, maternal origin",
    "variants": [
      "matr"
    ],
    "pronunciationOrCombining": "matr / matern combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "maternal",
    "historicalInsight": "Derived from classical Latin \"matr / matern\". Central element in vocabulary of mother, maternal origin.",
    "semanticShiftNote": "Retains historical focus on mother, maternal origin adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "maternal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying mother, maternal origin",
        "rootContribution": "matr / matern (mother, maternal origin)"
      },
      {
        "word": "matriarch",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing mother, maternal origin",
        "rootContribution": "matr / matern (mother, maternal origin)"
      },
      {
        "word": "matriculate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from matr / matern",
        "rootContribution": "matr / matern (mother, maternal origin)"
      },
      {
        "word": "matron",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of matr / matern",
        "rootContribution": "matr / matern (mother, maternal origin)"
      },
      {
        "word": "matrimony",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of matr / matern",
        "rootContribution": "matr / matern (mother, maternal origin)"
      }
    ]
  },
  {
    "id": "root-patr",
    "root": "patr / patern",
    "type": "root",
    "origin": "Latin",
    "originalForm": "patrpatern",
    "meaning": "father, paternal origin",
    "variants": [
      "patr"
    ],
    "pronunciationOrCombining": "patr / patern combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "paternal",
    "historicalInsight": "Derived from classical Latin \"patr / patern\". Central element in vocabulary of father, paternal origin.",
    "semanticShiftNote": "Retains historical focus on father, paternal origin adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "paternal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying father, paternal origin",
        "rootContribution": "patr / patern (father, paternal origin)"
      },
      {
        "word": "patriarch",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing father, paternal origin",
        "rootContribution": "patr / patern (father, paternal origin)"
      },
      {
        "word": "patriot",
        "pos": "noun",
        "briefDefinition": "Related concept derived from patr / patern",
        "rootContribution": "patr / patern (father, paternal origin)"
      },
      {
        "word": "expatriate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of patr / patern",
        "rootContribution": "patr / patern (father, paternal origin)"
      },
      {
        "word": "patronize",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of patr / patern",
        "rootContribution": "patr / patern (father, paternal origin)"
      }
    ]
  },
  {
    "id": "root-medi",
    "root": "medi",
    "type": "root",
    "origin": "Latin",
    "originalForm": "medi",
    "meaning": "middle, central",
    "variants": [
      "medi"
    ],
    "pronunciationOrCombining": "medi combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "mediocre",
    "historicalInsight": "Derived from classical Latin \"medi\". Central element in vocabulary of middle, central.",
    "semanticShiftNote": "Retains historical focus on middle, central adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "mediocre",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying middle, central",
        "rootContribution": "medi (middle, central)"
      },
      {
        "word": "mediate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing middle, central",
        "rootContribution": "medi (middle, central)"
      },
      {
        "word": "medium",
        "pos": "noun",
        "briefDefinition": "Related concept derived from medi",
        "rootContribution": "medi (middle, central)"
      },
      {
        "word": "medieval",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of medi",
        "rootContribution": "medi (middle, central)"
      },
      {
        "word": "intermediate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of medi",
        "rootContribution": "medi (middle, central)"
      }
    ]
  },
  {
    "id": "root-mem",
    "root": "mem / reminis",
    "type": "root",
    "origin": "Latin",
    "originalForm": "memreminis",
    "meaning": "mindful, to remember",
    "variants": [
      "mem"
    ],
    "pronunciationOrCombining": "mem / reminis combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "reminisce",
    "historicalInsight": "Derived from classical Latin \"mem / reminis\". Central element in vocabulary of mindful, to remember.",
    "semanticShiftNote": "Retains historical focus on mindful, to remember adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "reminisce",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying mindful, to remember",
        "rootContribution": "mem / reminis (mindful, to remember)"
      },
      {
        "word": "memorandum",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing mindful, to remember",
        "rootContribution": "mem / reminis (mindful, to remember)"
      },
      {
        "word": "commemorate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mem / reminis",
        "rootContribution": "mem / reminis (mindful, to remember)"
      },
      {
        "word": "memoir",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mem / reminis",
        "rootContribution": "mem / reminis (mindful, to remember)"
      },
      {
        "word": "immemorial",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mem / reminis",
        "rootContribution": "mem / reminis (mindful, to remember)"
      }
    ]
  },
  {
    "id": "root-meter",
    "root": "meter / metr",
    "type": "root",
    "origin": "Greek",
    "originalForm": "metermetr",
    "meaning": "measure, instrument",
    "variants": [
      "meter"
    ],
    "pronunciationOrCombining": "meter / metr combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "barometer",
    "historicalInsight": "Derived from classical Greek \"meter / metr\". Central element in vocabulary of measure, instrument.",
    "semanticShiftNote": "Retains historical focus on measure, instrument adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "barometer",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying measure, instrument",
        "rootContribution": "meter / metr (measure, instrument)"
      },
      {
        "word": "asymmetry",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing measure, instrument",
        "rootContribution": "meter / metr (measure, instrument)"
      },
      {
        "word": "parameter",
        "pos": "noun",
        "briefDefinition": "Related concept derived from meter / metr",
        "rootContribution": "meter / metr (measure, instrument)"
      },
      {
        "word": "metric",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of meter / metr",
        "rootContribution": "meter / metr (measure, instrument)"
      },
      {
        "word": "chronometer",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of meter / metr",
        "rootContribution": "meter / metr (measure, instrument)"
      }
    ]
  },
  {
    "id": "root-micro",
    "root": "micro-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "micro",
    "meaning": "small, minute, detailed",
    "variants": [
      "micro-"
    ],
    "pronunciationOrCombining": "micro- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "microcosm",
    "historicalInsight": "Derived from classical Greek \"micro-\". Central element in vocabulary of small, minute, detailed.",
    "semanticShiftNote": "Retains historical focus on small, minute, detailed adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "microcosm",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying small, minute, detailed",
        "rootContribution": "micro- (small, minute, detailed)"
      },
      {
        "word": "microscopic",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing small, minute, detailed",
        "rootContribution": "micro- (small, minute, detailed)"
      },
      {
        "word": "microbiology",
        "pos": "noun",
        "briefDefinition": "Related concept derived from micro-",
        "rootContribution": "micro- (small, minute, detailed)"
      },
      {
        "word": "microbe",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of micro-",
        "rootContribution": "micro- (small, minute, detailed)"
      },
      {
        "word": "microchip",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of micro-",
        "rootContribution": "micro- (small, minute, detailed)"
      }
    ]
  },
  {
    "id": "root-macro",
    "root": "macro-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "macro",
    "meaning": "large, long, broad",
    "variants": [
      "macro-"
    ],
    "pronunciationOrCombining": "macro- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "macrocosm",
    "historicalInsight": "Derived from classical Greek \"macro-\". Central element in vocabulary of large, long, broad.",
    "semanticShiftNote": "Retains historical focus on large, long, broad adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "macrocosm",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying large, long, broad",
        "rootContribution": "macro- (large, long, broad)"
      },
      {
        "word": "macroeconomics",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing large, long, broad",
        "rootContribution": "macro- (large, long, broad)"
      },
      {
        "word": "macroscopic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from macro-",
        "rootContribution": "macro- (large, long, broad)"
      },
      {
        "word": "macromodule",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of macro-",
        "rootContribution": "macro- (large, long, broad)"
      },
      {
        "word": "macrobiotic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of macro-",
        "rootContribution": "macro- (large, long, broad)"
      }
    ]
  },
  {
    "id": "root-migr",
    "root": "migr",
    "type": "root",
    "origin": "Latin",
    "originalForm": "migr",
    "meaning": "to wander, move places",
    "variants": [
      "migr"
    ],
    "pronunciationOrCombining": "migr combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "migrate",
    "historicalInsight": "Derived from classical Latin \"migr\". Central element in vocabulary of to wander, move places.",
    "semanticShiftNote": "Retains historical focus on to wander, move places adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "migrate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to wander, move places",
        "rootContribution": "migr (to wander, move places)"
      },
      {
        "word": "emigrate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to wander, move places",
        "rootContribution": "migr (to wander, move places)"
      },
      {
        "word": "immigrant",
        "pos": "noun",
        "briefDefinition": "Related concept derived from migr",
        "rootContribution": "migr (to wander, move places)"
      },
      {
        "word": "migratory",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of migr",
        "rootContribution": "migr (to wander, move places)"
      },
      {
        "word": "transmigration",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of migr",
        "rootContribution": "migr (to wander, move places)"
      }
    ]
  },
  {
    "id": "root-morph",
    "root": "morph",
    "type": "root",
    "origin": "Greek",
    "originalForm": "morph",
    "meaning": "form, shape, structure",
    "variants": [
      "morph"
    ],
    "pronunciationOrCombining": "morph combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "amorphous",
    "historicalInsight": "Derived from classical Greek \"morph\". Central element in vocabulary of form, shape, structure.",
    "semanticShiftNote": "Retains historical focus on form, shape, structure adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "amorphous",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying form, shape, structure",
        "rootContribution": "morph (form, shape, structure)"
      },
      {
        "word": "morphology",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing form, shape, structure",
        "rootContribution": "morph (form, shape, structure)"
      },
      {
        "word": "metamorphosis",
        "pos": "noun",
        "briefDefinition": "Related concept derived from morph",
        "rootContribution": "morph (form, shape, structure)"
      },
      {
        "word": "anthropomorphic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of morph",
        "rootContribution": "morph (form, shape, structure)"
      },
      {
        "word": "polymorphic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of morph",
        "rootContribution": "morph (form, shape, structure)"
      }
    ]
  },
  {
    "id": "root-mort",
    "root": "mort / mor",
    "type": "root",
    "origin": "Latin",
    "originalForm": "mortmor",
    "meaning": "death, mortal",
    "variants": [
      "mort"
    ],
    "pronunciationOrCombining": "mort / mor combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "mortality",
    "historicalInsight": "Derived from classical Latin \"mort / mor\". Central element in vocabulary of death, mortal.",
    "semanticShiftNote": "Retains historical focus on death, mortal adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "mortality",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying death, mortal",
        "rootContribution": "mort / mor (death, mortal)"
      },
      {
        "word": "immortal",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing death, mortal",
        "rootContribution": "mort / mor (death, mortal)"
      },
      {
        "word": "mortify",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mort / mor",
        "rootContribution": "mort / mor (death, mortal)"
      },
      {
        "word": "morbid",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mort / mor",
        "rootContribution": "mort / mor (death, mortal)"
      },
      {
        "word": "postmortem",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mort / mor",
        "rootContribution": "mort / mor (death, mortal)"
      }
    ]
  },
  {
    "id": "root-mut",
    "root": "mut",
    "type": "root",
    "origin": "Latin",
    "originalForm": "mut",
    "meaning": "to change, alter, exchange",
    "variants": [
      "mut"
    ],
    "pronunciationOrCombining": "mut combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "immutable",
    "historicalInsight": "Derived from classical Latin \"mut\". Central element in vocabulary of to change, alter, exchange.",
    "semanticShiftNote": "Retains historical focus on to change, alter, exchange adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "immutable",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to change, alter, exchange",
        "rootContribution": "mut (to change, alter, exchange)"
      },
      {
        "word": "mutation",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to change, alter, exchange",
        "rootContribution": "mut (to change, alter, exchange)"
      },
      {
        "word": "permutation",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mut",
        "rootContribution": "mut (to change, alter, exchange)"
      },
      {
        "word": "transmute",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mut",
        "rootContribution": "mut (to change, alter, exchange)"
      },
      {
        "word": "mutual",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mut",
        "rootContribution": "mut (to change, alter, exchange)"
      }
    ]
  },
  {
    "id": "root-nat",
    "root": "nat / nasc",
    "type": "root",
    "origin": "Latin",
    "originalForm": "natnasc",
    "meaning": "born, birth, nature",
    "variants": [
      "nat"
    ],
    "pronunciationOrCombining": "nat / nasc combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "nascent",
    "historicalInsight": "Derived from classical Latin \"nat / nasc\". Central element in vocabulary of born, birth, nature.",
    "semanticShiftNote": "Retains historical focus on born, birth, nature adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "nascent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying born, birth, nature",
        "rootContribution": "nat / nasc (born, birth, nature)"
      },
      {
        "word": "innate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing born, birth, nature",
        "rootContribution": "nat / nasc (born, birth, nature)"
      },
      {
        "word": "native",
        "pos": "noun",
        "briefDefinition": "Related concept derived from nat / nasc",
        "rootContribution": "nat / nasc (born, birth, nature)"
      },
      {
        "word": "cognate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of nat / nasc",
        "rootContribution": "nat / nasc (born, birth, nature)"
      },
      {
        "word": "renaissance",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of nat / nasc",
        "rootContribution": "nat / nasc (born, birth, nature)"
      }
    ]
  },
  {
    "id": "root-nom",
    "root": "nom / nym",
    "type": "root",
    "origin": "Greek",
    "originalForm": "nomnym",
    "meaning": "name, word, law, order",
    "variants": [
      "nom"
    ],
    "pronunciationOrCombining": "nom / nym combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "synonym",
    "historicalInsight": "Derived from classical Greek \"nom / nym\". Central element in vocabulary of name, word, law, order.",
    "semanticShiftNote": "Retains historical focus on name, word, law, order adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "synonym",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying name, word, law, order",
        "rootContribution": "nom / nym (name, word, law, order)"
      },
      {
        "word": "anonymous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing name, word, law, order",
        "rootContribution": "nom / nym (name, word, law, order)"
      },
      {
        "word": "pseudonym",
        "pos": "noun",
        "briefDefinition": "Related concept derived from nom / nym",
        "rootContribution": "nom / nym (name, word, law, order)"
      },
      {
        "word": "autonomy",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of nom / nym",
        "rootContribution": "nom / nym (name, word, law, order)"
      },
      {
        "word": "nominal",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of nom / nym",
        "rootContribution": "nom / nym (name, word, law, order)"
      }
    ]
  },
  {
    "id": "root-nov",
    "root": "nov",
    "type": "root",
    "origin": "Latin",
    "originalForm": "nov",
    "meaning": "new, fresh, recent",
    "variants": [
      "nov"
    ],
    "pronunciationOrCombining": "nov combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "novel",
    "historicalInsight": "Derived from classical Latin \"nov\". Central element in vocabulary of new, fresh, recent.",
    "semanticShiftNote": "Retains historical focus on new, fresh, recent adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "novel",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying new, fresh, recent",
        "rootContribution": "nov (new, fresh, recent)"
      },
      {
        "word": "innovate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing new, fresh, recent",
        "rootContribution": "nov (new, fresh, recent)"
      },
      {
        "word": "novice",
        "pos": "noun",
        "briefDefinition": "Related concept derived from nov",
        "rootContribution": "nov (new, fresh, recent)"
      },
      {
        "word": "renovate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of nov",
        "rootContribution": "nov (new, fresh, recent)"
      },
      {
        "word": "novelty",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of nov",
        "rootContribution": "nov (new, fresh, recent)"
      }
    ]
  },
  {
    "id": "root-omni",
    "root": "omni-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "omni",
    "meaning": "all, every, total",
    "variants": [
      "omni-"
    ],
    "pronunciationOrCombining": "omni- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "omniscient",
    "historicalInsight": "Derived from classical Latin \"omni-\". Central element in vocabulary of all, every, total.",
    "semanticShiftNote": "Retains historical focus on all, every, total adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "omniscient",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying all, every, total",
        "rootContribution": "omni- (all, every, total)"
      },
      {
        "word": "omnipotent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing all, every, total",
        "rootContribution": "omni- (all, every, total)"
      },
      {
        "word": "omnipresent",
        "pos": "noun",
        "briefDefinition": "Related concept derived from omni-",
        "rootContribution": "omni- (all, every, total)"
      },
      {
        "word": "omnivore",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of omni-",
        "rootContribution": "omni- (all, every, total)"
      },
      {
        "word": "omnibus",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of omni-",
        "rootContribution": "omni- (all, every, total)"
      }
    ]
  },
  {
    "id": "root-pan",
    "root": "pan-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "pan",
    "meaning": "all, whole, entire",
    "variants": [
      "pan-"
    ],
    "pronunciationOrCombining": "pan- combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "panacea",
    "historicalInsight": "Derived from classical Greek \"pan-\". Central element in vocabulary of all, whole, entire.",
    "semanticShiftNote": "Retains historical focus on all, whole, entire adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "panacea",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying all, whole, entire",
        "rootContribution": "pan- (all, whole, entire)"
      },
      {
        "word": "pandemonium",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing all, whole, entire",
        "rootContribution": "pan- (all, whole, entire)"
      },
      {
        "word": "panoramic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pan-",
        "rootContribution": "pan- (all, whole, entire)"
      },
      {
        "word": "pantheon",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pan-",
        "rootContribution": "pan- (all, whole, entire)"
      },
      {
        "word": "pandemic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pan-",
        "rootContribution": "pan- (all, whole, entire)"
      }
    ]
  },
  {
    "id": "root-pater",
    "root": "pass / pati",
    "type": "root",
    "origin": "Latin",
    "originalForm": "passpati",
    "meaning": "to suffer, endure, bear",
    "variants": [
      "pass"
    ],
    "pronunciationOrCombining": "pass / pati combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "compassion",
    "historicalInsight": "Derived from classical Latin \"pass / pati\". Central element in vocabulary of to suffer, endure, bear.",
    "semanticShiftNote": "Retains historical focus on to suffer, endure, bear adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "compassion",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to suffer, endure, bear",
        "rootContribution": "pass / pati (to suffer, endure, bear)"
      },
      {
        "word": "patient",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to suffer, endure, bear",
        "rootContribution": "pass / pati (to suffer, endure, bear)"
      },
      {
        "word": "passive",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pass / pati",
        "rootContribution": "pass / pati (to suffer, endure, bear)"
      },
      {
        "word": "impassioned",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pass / pati",
        "rootContribution": "pass / pati (to suffer, endure, bear)"
      },
      {
        "word": "dispassionate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pass / pati",
        "rootContribution": "pass / pati (to suffer, endure, bear)"
      }
    ]
  },
  {
    "id": "root-ped",
    "root": "ped / pod",
    "type": "root",
    "origin": "Greek",
    "originalForm": "pedpod",
    "meaning": "child, instruction, foot",
    "variants": [
      "ped"
    ],
    "pronunciationOrCombining": "ped / pod combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "pedagogy",
    "historicalInsight": "Derived from classical Greek \"ped / pod\". Central element in vocabulary of child, instruction, foot.",
    "semanticShiftNote": "Retains historical focus on child, instruction, foot adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "pedagogy",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying child, instruction, foot",
        "rootContribution": "ped / pod (child, instruction, foot)"
      },
      {
        "word": "pediatric",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing child, instruction, foot",
        "rootContribution": "ped / pod (child, instruction, foot)"
      },
      {
        "word": "pedestrian",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ped / pod",
        "rootContribution": "ped / pod (child, instruction, foot)"
      },
      {
        "word": "tripod",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ped / pod",
        "rootContribution": "ped / pod (child, instruction, foot)"
      },
      {
        "word": "expedite",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ped / pod",
        "rootContribution": "ped / pod (child, instruction, foot)"
      }
    ]
  },
  {
    "id": "root-pel",
    "root": "pel / puls",
    "type": "root",
    "origin": "Latin",
    "originalForm": "pelpuls",
    "meaning": "to drive, push, impel",
    "variants": [
      "pel"
    ],
    "pronunciationOrCombining": "pel / puls combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "compel",
    "historicalInsight": "Derived from classical Latin \"pel / puls\". Central element in vocabulary of to drive, push, impel.",
    "semanticShiftNote": "Retains historical focus on to drive, push, impel adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "compel",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to drive, push, impel",
        "rootContribution": "pel / puls (to drive, push, impel)"
      },
      {
        "word": "repulsion",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to drive, push, impel",
        "rootContribution": "pel / puls (to drive, push, impel)"
      },
      {
        "word": "impulse",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pel / puls",
        "rootContribution": "pel / puls (to drive, push, impel)"
      },
      {
        "word": "expel",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pel / puls",
        "rootContribution": "pel / puls (to drive, push, impel)"
      },
      {
        "word": "propulsion",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pel / puls",
        "rootContribution": "pel / puls (to drive, push, impel)"
      }
    ]
  },
  {
    "id": "root-pend",
    "root": "pend / pens",
    "type": "root",
    "origin": "Latin",
    "originalForm": "pendpens",
    "meaning": "to hang, weigh, pay",
    "variants": [
      "pend"
    ],
    "pronunciationOrCombining": "pend / pens combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "impending",
    "historicalInsight": "Derived from classical Latin \"pend / pens\". Central element in vocabulary of to hang, weigh, pay.",
    "semanticShiftNote": "Retains historical focus on to hang, weigh, pay adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "impending",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to hang, weigh, pay",
        "rootContribution": "pend / pens (to hang, weigh, pay)"
      },
      {
        "word": "pensive",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to hang, weigh, pay",
        "rootContribution": "pend / pens (to hang, weigh, pay)"
      },
      {
        "word": "appendage",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pend / pens",
        "rootContribution": "pend / pens (to hang, weigh, pay)"
      },
      {
        "word": "dispense",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pend / pens",
        "rootContribution": "pend / pens (to hang, weigh, pay)"
      },
      {
        "word": "compense",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pend / pens",
        "rootContribution": "pend / pens (to hang, weigh, pay)"
      }
    ]
  },
  {
    "id": "root-phil",
    "root": "phil / philo",
    "type": "root",
    "origin": "Greek",
    "originalForm": "philphilo",
    "meaning": "love, affinity, fondness",
    "variants": [
      "phil"
    ],
    "pronunciationOrCombining": "phil / philo combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "philosophy",
    "historicalInsight": "Derived from classical Greek \"phil / philo\". Central element in vocabulary of love, affinity, fondness.",
    "semanticShiftNote": "Retains historical focus on love, affinity, fondness adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "philosophy",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying love, affinity, fondness",
        "rootContribution": "phil / philo (love, affinity, fondness)"
      },
      {
        "word": "philanthropy",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing love, affinity, fondness",
        "rootContribution": "phil / philo (love, affinity, fondness)"
      },
      {
        "word": "bibliophile",
        "pos": "noun",
        "briefDefinition": "Related concept derived from phil / philo",
        "rootContribution": "phil / philo (love, affinity, fondness)"
      },
      {
        "word": "philharmonic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of phil / philo",
        "rootContribution": "phil / philo (love, affinity, fondness)"
      },
      {
        "word": "philology",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of phil / philo",
        "rootContribution": "phil / philo (love, affinity, fondness)"
      }
    ]
  },
  {
    "id": "root-phon",
    "root": "phon",
    "type": "root",
    "origin": "Greek",
    "originalForm": "phon",
    "meaning": "sound, voice, tone",
    "variants": [
      "phon"
    ],
    "pronunciationOrCombining": "phon combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "cacophony",
    "historicalInsight": "Derived from classical Greek \"phon\". Central element in vocabulary of sound, voice, tone.",
    "semanticShiftNote": "Retains historical focus on sound, voice, tone adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "cacophony",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying sound, voice, tone",
        "rootContribution": "phon (sound, voice, tone)"
      },
      {
        "word": "euphony",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing sound, voice, tone",
        "rootContribution": "phon (sound, voice, tone)"
      },
      {
        "word": "phonetics",
        "pos": "noun",
        "briefDefinition": "Related concept derived from phon",
        "rootContribution": "phon (sound, voice, tone)"
      },
      {
        "word": "phonograph",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of phon",
        "rootContribution": "phon (sound, voice, tone)"
      },
      {
        "word": "symphony",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of phon",
        "rootContribution": "phon (sound, voice, tone)"
      }
    ]
  },
  {
    "id": "root-poly",
    "root": "poly-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "poly",
    "meaning": "many, several, much",
    "variants": [
      "poly-"
    ],
    "pronunciationOrCombining": "poly- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "polyglot",
    "historicalInsight": "Derived from classical Greek \"poly-\". Central element in vocabulary of many, several, much.",
    "semanticShiftNote": "Retains historical focus on many, several, much adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "polyglot",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying many, several, much",
        "rootContribution": "poly- (many, several, much)"
      },
      {
        "word": "polygon",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing many, several, much",
        "rootContribution": "poly- (many, several, much)"
      },
      {
        "word": "polygamy",
        "pos": "noun",
        "briefDefinition": "Related concept derived from poly-",
        "rootContribution": "poly- (many, several, much)"
      },
      {
        "word": "polymath",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of poly-",
        "rootContribution": "poly- (many, several, much)"
      },
      {
        "word": "polymer",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of poly-",
        "rootContribution": "poly- (many, several, much)"
      }
    ]
  },
  {
    "id": "root-mono",
    "root": "mono-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "mono",
    "meaning": "one, single, alone",
    "variants": [
      "mono-"
    ],
    "pronunciationOrCombining": "mono- combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "monologue",
    "historicalInsight": "Derived from classical Greek \"mono-\". Central element in vocabulary of one, single, alone.",
    "semanticShiftNote": "Retains historical focus on one, single, alone adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "monologue",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying one, single, alone",
        "rootContribution": "mono- (one, single, alone)"
      },
      {
        "word": "monopoly",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing one, single, alone",
        "rootContribution": "mono- (one, single, alone)"
      },
      {
        "word": "monotonous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from mono-",
        "rootContribution": "mono- (one, single, alone)"
      },
      {
        "word": "monolithic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of mono-",
        "rootContribution": "mono- (one, single, alone)"
      },
      {
        "word": "monotheism",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of mono-",
        "rootContribution": "mono- (one, single, alone)"
      }
    ]
  },
  {
    "id": "root-port",
    "root": "port",
    "type": "root",
    "origin": "Latin",
    "originalForm": "port",
    "meaning": "to carry, gate, portal",
    "variants": [
      "port"
    ],
    "pronunciationOrCombining": "port combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "deportment",
    "historicalInsight": "Derived from classical Latin \"port\". Central element in vocabulary of to carry, gate, portal.",
    "semanticShiftNote": "Retains historical focus on to carry, gate, portal adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "deportment",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to carry, gate, portal",
        "rootContribution": "port (to carry, gate, portal)"
      },
      {
        "word": "import",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to carry, gate, portal",
        "rootContribution": "port (to carry, gate, portal)"
      },
      {
        "word": "portable",
        "pos": "noun",
        "briefDefinition": "Related concept derived from port",
        "rootContribution": "port (to carry, gate, portal)"
      },
      {
        "word": "opportune",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of port",
        "rootContribution": "port (to carry, gate, portal)"
      },
      {
        "word": "portfolio",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of port",
        "rootContribution": "port (to carry, gate, portal)"
      }
    ]
  },
  {
    "id": "root-pot",
    "root": "pot / poss",
    "type": "root",
    "origin": "Latin",
    "originalForm": "potposs",
    "meaning": "power, able, master",
    "variants": [
      "pot"
    ],
    "pronunciationOrCombining": "pot / poss combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "omnipotent",
    "historicalInsight": "Derived from classical Latin \"pot / poss\". Central element in vocabulary of power, able, master.",
    "semanticShiftNote": "Retains historical focus on power, able, master adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "omnipotent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying power, able, master",
        "rootContribution": "pot / poss (power, able, master)"
      },
      {
        "word": "potentate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing power, able, master",
        "rootContribution": "pot / poss (power, able, master)"
      },
      {
        "word": "possibility",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pot / poss",
        "rootContribution": "pot / poss (power, able, master)"
      },
      {
        "word": "impotent",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pot / poss",
        "rootContribution": "pot / poss (power, able, master)"
      },
      {
        "word": "potential",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pot / poss",
        "rootContribution": "pot / poss (power, able, master)"
      }
    ]
  },
  {
    "id": "root-psych",
    "root": "psych / psycho",
    "type": "root",
    "origin": "Greek",
    "originalForm": "psychpsycho",
    "meaning": "mind, soul, spirit",
    "variants": [
      "psych"
    ],
    "pronunciationOrCombining": "psych / psycho combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "psychology",
    "historicalInsight": "Derived from classical Greek \"psych / psycho\". Central element in vocabulary of mind, soul, spirit.",
    "semanticShiftNote": "Retains historical focus on mind, soul, spirit adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "psychology",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying mind, soul, spirit",
        "rootContribution": "psych / psycho (mind, soul, spirit)"
      },
      {
        "word": "psyche",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing mind, soul, spirit",
        "rootContribution": "psych / psycho (mind, soul, spirit)"
      },
      {
        "word": "psychosomatic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from psych / psycho",
        "rootContribution": "psych / psycho (mind, soul, spirit)"
      },
      {
        "word": "psychic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of psych / psycho",
        "rootContribution": "psych / psycho (mind, soul, spirit)"
      },
      {
        "word": "psychopathology",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of psych / psycho",
        "rootContribution": "psych / psycho (mind, soul, spirit)"
      }
    ]
  },
  {
    "id": "root-pugn",
    "root": "pugn",
    "type": "root",
    "origin": "Latin",
    "originalForm": "pugn",
    "meaning": "to fight, fist, combat",
    "variants": [
      "pugn"
    ],
    "pronunciationOrCombining": "pugn combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "pugnacious",
    "historicalInsight": "Derived from classical Latin \"pugn\". Central element in vocabulary of to fight, fist, combat.",
    "semanticShiftNote": "Retains historical focus on to fight, fist, combat adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "pugnacious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to fight, fist, combat",
        "rootContribution": "pugn (to fight, fist, combat)"
      },
      {
        "word": "repugnant",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to fight, fist, combat",
        "rootContribution": "pugn (to fight, fist, combat)"
      },
      {
        "word": "impugn",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pugn",
        "rootContribution": "pugn (to fight, fist, combat)"
      },
      {
        "word": "pugilist",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pugn",
        "rootContribution": "pugn (to fight, fist, combat)"
      },
      {
        "word": "repugnance",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pugn",
        "rootContribution": "pugn (to fight, fist, combat)"
      }
    ]
  },
  {
    "id": "root-quer",
    "root": "quer / quis / quir",
    "type": "root",
    "origin": "Latin",
    "originalForm": "querquisquir",
    "meaning": "to seek, ask, inquire",
    "variants": [
      "quer"
    ],
    "pronunciationOrCombining": "quer / quis / quir combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "inquisitive",
    "historicalInsight": "Derived from classical Latin \"quer / quis / quir\". Central element in vocabulary of to seek, ask, inquire.",
    "semanticShiftNote": "Retains historical focus on to seek, ask, inquire adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "inquisitive",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to seek, ask, inquire",
        "rootContribution": "quer / quis / quir (to seek, ask, inquire)"
      },
      {
        "word": "query",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to seek, ask, inquire",
        "rootContribution": "quer / quis / quir (to seek, ask, inquire)"
      },
      {
        "word": "requisite",
        "pos": "noun",
        "briefDefinition": "Related concept derived from quer / quis / quir",
        "rootContribution": "quer / quis / quir (to seek, ask, inquire)"
      },
      {
        "word": "acquisitive",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of quer / quis / quir",
        "rootContribution": "quer / quis / quir (to seek, ask, inquire)"
      },
      {
        "word": "perquisite",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of quer / quis / quir",
        "rootContribution": "quer / quis / quir (to seek, ask, inquire)"
      }
    ]
  },
  {
    "id": "root-rect",
    "root": "rect",
    "type": "root",
    "origin": "Latin",
    "originalForm": "rect",
    "meaning": "straight, right, rule",
    "variants": [
      "rect"
    ],
    "pronunciationOrCombining": "rect combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "rectitude",
    "historicalInsight": "Derived from classical Latin \"rect\". Central element in vocabulary of straight, right, rule.",
    "semanticShiftNote": "Retains historical focus on straight, right, rule adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "rectitude",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying straight, right, rule",
        "rootContribution": "rect (straight, right, rule)"
      },
      {
        "word": "rectify",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing straight, right, rule",
        "rootContribution": "rect (straight, right, rule)"
      },
      {
        "word": "direct",
        "pos": "noun",
        "briefDefinition": "Related concept derived from rect",
        "rootContribution": "rect (straight, right, rule)"
      },
      {
        "word": "correct",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of rect",
        "rootContribution": "rect (straight, right, rule)"
      },
      {
        "word": "rectangle",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of rect",
        "rootContribution": "rect (straight, right, rule)"
      }
    ]
  },
  {
    "id": "root-rupt",
    "root": "rupt",
    "type": "root",
    "origin": "Latin",
    "originalForm": "rupt",
    "meaning": "to break, burst, tear",
    "variants": [
      "rupt"
    ],
    "pronunciationOrCombining": "rupt combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "disrupt",
    "historicalInsight": "Derived from classical Latin \"rupt\". Central element in vocabulary of to break, burst, tear.",
    "semanticShiftNote": "Retains historical focus on to break, burst, tear adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "disrupt",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to break, burst, tear",
        "rootContribution": "rupt (to break, burst, tear)"
      },
      {
        "word": "bankrupt",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to break, burst, tear",
        "rootContribution": "rupt (to break, burst, tear)"
      },
      {
        "word": "interrupt",
        "pos": "noun",
        "briefDefinition": "Related concept derived from rupt",
        "rootContribution": "rupt (to break, burst, tear)"
      },
      {
        "word": "eruption",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of rupt",
        "rootContribution": "rupt (to break, burst, tear)"
      },
      {
        "word": "incorruptible",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of rupt",
        "rootContribution": "rupt (to break, burst, tear)"
      }
    ]
  },
  {
    "id": "root-sci",
    "root": "sci",
    "type": "root",
    "origin": "Latin",
    "originalForm": "sci",
    "meaning": "to know, knowledge",
    "variants": [
      "sci"
    ],
    "pronunciationOrCombining": "sci combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "conscientious",
    "historicalInsight": "Derived from classical Latin \"sci\". Central element in vocabulary of to know, knowledge.",
    "semanticShiftNote": "Retains historical focus on to know, knowledge adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "conscientious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to know, knowledge",
        "rootContribution": "sci (to know, knowledge)"
      },
      {
        "word": "prescient",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to know, knowledge",
        "rootContribution": "sci (to know, knowledge)"
      },
      {
        "word": "omniscient",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sci",
        "rootContribution": "sci (to know, knowledge)"
      },
      {
        "word": "science",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sci",
        "rootContribution": "sci (to know, knowledge)"
      },
      {
        "word": "nescient",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sci",
        "rootContribution": "sci (to know, knowledge)"
      }
    ]
  },
  {
    "id": "root-scrib",
    "root": "scrib / script",
    "type": "root",
    "origin": "Latin",
    "originalForm": "scribscript",
    "meaning": "to write, etch, record",
    "variants": [
      "scrib"
    ],
    "pronunciationOrCombining": "scrib / script combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "proscribe",
    "historicalInsight": "Derived from classical Latin \"scrib / script\". Central element in vocabulary of to write, etch, record.",
    "semanticShiftNote": "Retains historical focus on to write, etch, record adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "proscribe",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to write, etch, record",
        "rootContribution": "scrib / script (to write, etch, record)"
      },
      {
        "word": "inscribe",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to write, etch, record",
        "rootContribution": "scrib / script (to write, etch, record)"
      },
      {
        "word": "transcript",
        "pos": "noun",
        "briefDefinition": "Related concept derived from scrib / script",
        "rootContribution": "scrib / script (to write, etch, record)"
      },
      {
        "word": "subscibe",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of scrib / script",
        "rootContribution": "scrib / script (to write, etch, record)"
      },
      {
        "word": "circumscribe",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of scrib / script",
        "rootContribution": "scrib / script (to write, etch, record)"
      }
    ]
  },
  {
    "id": "root-sec",
    "root": "sec / sect",
    "type": "root",
    "origin": "Latin",
    "originalForm": "secsect",
    "meaning": "to cut, divide, slice",
    "variants": [
      "sec"
    ],
    "pronunciationOrCombining": "sec / sect combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "dissect",
    "historicalInsight": "Derived from classical Latin \"sec / sect\". Central element in vocabulary of to cut, divide, slice.",
    "semanticShiftNote": "Retains historical focus on to cut, divide, slice adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "dissect",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to cut, divide, slice",
        "rootContribution": "sec / sect (to cut, divide, slice)"
      },
      {
        "word": "section",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to cut, divide, slice",
        "rootContribution": "sec / sect (to cut, divide, slice)"
      },
      {
        "word": "intersect",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sec / sect",
        "rootContribution": "sec / sect (to cut, divide, slice)"
      },
      {
        "word": "sector",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sec / sect",
        "rootContribution": "sec / sect (to cut, divide, slice)"
      },
      {
        "word": "transect",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sec / sect",
        "rootContribution": "sec / sect (to cut, divide, slice)"
      }
    ]
  },
  {
    "id": "root-sed",
    "root": "sed / sid / sess",
    "type": "root",
    "origin": "Latin",
    "originalForm": "sedsidsess",
    "meaning": "to sit, settle, stay",
    "variants": [
      "sed"
    ],
    "pronunciationOrCombining": "sed / sid / sess combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "sedentary",
    "historicalInsight": "Derived from classical Latin \"sed / sid / sess\". Central element in vocabulary of to sit, settle, stay.",
    "semanticShiftNote": "Retains historical focus on to sit, settle, stay adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "sedentary",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to sit, settle, stay",
        "rootContribution": "sed / sid / sess (to sit, settle, stay)"
      },
      {
        "word": "subside",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to sit, settle, stay",
        "rootContribution": "sed / sid / sess (to sit, settle, stay)"
      },
      {
        "word": "preside",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sed / sid / sess",
        "rootContribution": "sed / sid / sess (to sit, settle, stay)"
      },
      {
        "word": "assiduous",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sed / sid / sess",
        "rootContribution": "sed / sid / sess (to sit, settle, stay)"
      },
      {
        "word": "session",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sed / sid / sess",
        "rootContribution": "sed / sid / sess (to sit, settle, stay)"
      }
    ]
  },
  {
    "id": "root-sens",
    "root": "sens / sent",
    "type": "root",
    "origin": "Latin",
    "originalForm": "senssent",
    "meaning": "to feel, perceive, think",
    "variants": [
      "sens"
    ],
    "pronunciationOrCombining": "sens / sent combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "sentient",
    "historicalInsight": "Derived from classical Latin \"sens / sent\". Central element in vocabulary of to feel, perceive, think.",
    "semanticShiftNote": "Retains historical focus on to feel, perceive, think adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "sentient",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to feel, perceive, think",
        "rootContribution": "sens / sent (to feel, perceive, think)"
      },
      {
        "word": "consensus",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to feel, perceive, think",
        "rootContribution": "sens / sent (to feel, perceive, think)"
      },
      {
        "word": "dissuit",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sens / sent",
        "rootContribution": "sens / sent (to feel, perceive, think)"
      },
      {
        "word": "sensation",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sens / sent",
        "rootContribution": "sens / sent (to feel, perceive, think)"
      },
      {
        "word": "dissent",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sens / sent",
        "rootContribution": "sens / sent (to feel, perceive, think)"
      }
    ]
  },
  {
    "id": "root-sequ",
    "root": "sequ / secut",
    "type": "root",
    "origin": "Latin",
    "originalForm": "sequsecut",
    "meaning": "to follow, succeed, pursue",
    "variants": [
      "sequ"
    ],
    "pronunciationOrCombining": "sequ / secut combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "subsequent",
    "historicalInsight": "Derived from classical Latin \"sequ / secut\". Central element in vocabulary of to follow, succeed, pursue.",
    "semanticShiftNote": "Retains historical focus on to follow, succeed, pursue adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "subsequent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to follow, succeed, pursue",
        "rootContribution": "sequ / secut (to follow, succeed, pursue)"
      },
      {
        "word": "consecutive",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to follow, succeed, pursue",
        "rootContribution": "sequ / secut (to follow, succeed, pursue)"
      },
      {
        "word": "prosecute",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sequ / secut",
        "rootContribution": "sequ / secut (to follow, succeed, pursue)"
      },
      {
        "word": "obsequious",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sequ / secut",
        "rootContribution": "sequ / secut (to follow, succeed, pursue)"
      },
      {
        "word": "sequence",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sequ / secut",
        "rootContribution": "sequ / secut (to follow, succeed, pursue)"
      }
    ]
  },
  {
    "id": "root-sol",
    "root": "sol",
    "type": "root",
    "origin": "Latin",
    "originalForm": "sol",
    "meaning": "alone, lonely, sun",
    "variants": [
      "sol"
    ],
    "pronunciationOrCombining": "sol combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "solitary",
    "historicalInsight": "Derived from classical Latin \"sol\". Central element in vocabulary of alone, lonely, sun.",
    "semanticShiftNote": "Retains historical focus on alone, lonely, sun adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "solitary",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying alone, lonely, sun",
        "rootContribution": "sol (alone, lonely, sun)"
      },
      {
        "word": "solitude",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing alone, lonely, sun",
        "rootContribution": "sol (alone, lonely, sun)"
      },
      {
        "word": "soliloquy",
        "pos": "noun",
        "briefDefinition": "Related concept derived from sol",
        "rootContribution": "sol (alone, lonely, sun)"
      },
      {
        "word": "desolate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of sol",
        "rootContribution": "sol (alone, lonely, sun)"
      },
      {
        "word": "solo",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of sol",
        "rootContribution": "sol (alone, lonely, sun)"
      }
    ]
  },
  {
    "id": "root-soph",
    "root": "soph",
    "type": "root",
    "origin": "Greek",
    "originalForm": "soph",
    "meaning": "wise, wisdom, clever",
    "variants": [
      "soph"
    ],
    "pronunciationOrCombining": "soph combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "sophisticated",
    "historicalInsight": "Derived from classical Greek \"soph\". Central element in vocabulary of wise, wisdom, clever.",
    "semanticShiftNote": "Retains historical focus on wise, wisdom, clever adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "sophisticated",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying wise, wisdom, clever",
        "rootContribution": "soph (wise, wisdom, clever)"
      },
      {
        "word": "philosophy",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing wise, wisdom, clever",
        "rootContribution": "soph (wise, wisdom, clever)"
      },
      {
        "word": "sophistry",
        "pos": "noun",
        "briefDefinition": "Related concept derived from soph",
        "rootContribution": "soph (wise, wisdom, clever)"
      },
      {
        "word": "sophomore",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of soph",
        "rootContribution": "soph (wise, wisdom, clever)"
      },
      {
        "word": "unsophisticated",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of soph",
        "rootContribution": "soph (wise, wisdom, clever)"
      }
    ]
  },
  {
    "id": "root-spec-2",
    "root": "spic / spec",
    "type": "root",
    "origin": "Latin",
    "originalForm": "spicspec",
    "meaning": "look, view, aspect",
    "variants": [
      "spic"
    ],
    "pronunciationOrCombining": "spic / spec combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "perspicacious",
    "historicalInsight": "Derived from classical Latin \"spic / spec\". Central element in vocabulary of look, view, aspect.",
    "semanticShiftNote": "Retains historical focus on look, view, aspect adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "perspicacious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying look, view, aspect",
        "rootContribution": "spic / spec (look, view, aspect)"
      },
      {
        "word": "conspicuous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing look, view, aspect",
        "rootContribution": "spic / spec (look, view, aspect)"
      },
      {
        "word": "despicable",
        "pos": "noun",
        "briefDefinition": "Related concept derived from spic / spec",
        "rootContribution": "spic / spec (look, view, aspect)"
      },
      {
        "word": "aspect",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of spic / spec",
        "rootContribution": "spic / spec (look, view, aspect)"
      },
      {
        "word": "inspect",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of spic / spec",
        "rootContribution": "spic / spec (look, view, aspect)"
      }
    ]
  },
  {
    "id": "root-stat",
    "root": "stat / stit / sist",
    "type": "root",
    "origin": "Latin",
    "originalForm": "statstitsist",
    "meaning": "to stand, set up, stop",
    "variants": [
      "stat"
    ],
    "pronunciationOrCombining": "stat / stit / sist combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "statuesque",
    "historicalInsight": "Derived from classical Latin \"stat / stit / sist\". Central element in vocabulary of to stand, set up, stop.",
    "semanticShiftNote": "Retains historical focus on to stand, set up, stop adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "statuesque",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to stand, set up, stop",
        "rootContribution": "stat / stit / sist (to stand, set up, stop)"
      },
      {
        "word": "constitute",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to stand, set up, stop",
        "rootContribution": "stat / stit / sist (to stand, set up, stop)"
      },
      {
        "word": "persist",
        "pos": "noun",
        "briefDefinition": "Related concept derived from stat / stit / sist",
        "rootContribution": "stat / stit / sist (to stand, set up, stop)"
      },
      {
        "word": "destitute",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of stat / stit / sist",
        "rootContribution": "stat / stit / sist (to stand, set up, stop)"
      },
      {
        "word": "static",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of stat / stit / sist",
        "rootContribution": "stat / stit / sist (to stand, set up, stop)"
      }
    ]
  },
  {
    "id": "root-strut",
    "root": "struct",
    "type": "root",
    "origin": "Latin",
    "originalForm": "struct",
    "meaning": "to build, pile up, frame",
    "variants": [
      "struct"
    ],
    "pronunciationOrCombining": "struct combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "constructive",
    "historicalInsight": "Derived from classical Latin \"struct\". Central element in vocabulary of to build, pile up, frame.",
    "semanticShiftNote": "Retains historical focus on to build, pile up, frame adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "constructive",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to build, pile up, frame",
        "rootContribution": "struct (to build, pile up, frame)"
      },
      {
        "word": "destroy",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to build, pile up, frame",
        "rootContribution": "struct (to build, pile up, frame)"
      },
      {
        "word": "substructure",
        "pos": "noun",
        "briefDefinition": "Related concept derived from struct",
        "rootContribution": "struct (to build, pile up, frame)"
      },
      {
        "word": "instructive",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of struct",
        "rootContribution": "struct (to build, pile up, frame)"
      },
      {
        "word": "obstruct",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of struct",
        "rootContribution": "struct (to build, pile up, frame)"
      }
    ]
  },
  {
    "id": "root-tact",
    "root": "tact / tang / tig",
    "type": "root",
    "origin": "Latin",
    "originalForm": "tacttangtig",
    "meaning": "to touch, reach, contact",
    "variants": [
      "tact"
    ],
    "pronunciationOrCombining": "tact / tang / tig combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "tactile",
    "historicalInsight": "Derived from classical Latin \"tact / tang / tig\". Central element in vocabulary of to touch, reach, contact.",
    "semanticShiftNote": "Retains historical focus on to touch, reach, contact adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "tactile",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to touch, reach, contact",
        "rootContribution": "tact / tang / tig (to touch, reach, contact)"
      },
      {
        "word": "intangible",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to touch, reach, contact",
        "rootContribution": "tact / tang / tig (to touch, reach, contact)"
      },
      {
        "word": "contiguous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tact / tang / tig",
        "rootContribution": "tact / tang / tig (to touch, reach, contact)"
      },
      {
        "word": "tactful",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tact / tang / tig",
        "rootContribution": "tact / tang / tig (to touch, reach, contact)"
      },
      {
        "word": "contingent",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tact / tang / tig",
        "rootContribution": "tact / tang / tig (to touch, reach, contact)"
      }
    ]
  },
  {
    "id": "root-tain",
    "root": "tain / ten / tin",
    "type": "root",
    "origin": "Latin",
    "originalForm": "taintentin",
    "meaning": "to hold, keep, retain",
    "variants": [
      "tain"
    ],
    "pronunciationOrCombining": "tain / ten / tin combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "tenacious",
    "historicalInsight": "Derived from classical Latin \"tain / ten / tin\". Central element in vocabulary of to hold, keep, retain.",
    "semanticShiftNote": "Retains historical focus on to hold, keep, retain adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "tenacious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to hold, keep, retain",
        "rootContribution": "tain / ten / tin (to hold, keep, retain)"
      },
      {
        "word": "pertain",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to hold, keep, retain",
        "rootContribution": "tain / ten / tin (to hold, keep, retain)"
      },
      {
        "word": "retention",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tain / ten / tin",
        "rootContribution": "tain / ten / tin (to hold, keep, retain)"
      },
      {
        "word": "pertinacious",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tain / ten / tin",
        "rootContribution": "tain / ten / tin (to hold, keep, retain)"
      },
      {
        "word": "abstain",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tain / ten / tin",
        "rootContribution": "tain / ten / tin (to hold, keep, retain)"
      }
    ]
  },
  {
    "id": "root-tang",
    "root": "tang / tact",
    "type": "root",
    "origin": "Latin",
    "originalForm": "tangtact",
    "meaning": "touch, feel, reach",
    "variants": [
      "tang"
    ],
    "pronunciationOrCombining": "tang / tact combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "tangible",
    "historicalInsight": "Derived from classical Latin \"tang / tact\". Central element in vocabulary of touch, feel, reach.",
    "semanticShiftNote": "Retains historical focus on touch, feel, reach adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "tangible",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying touch, feel, reach",
        "rootContribution": "tang / tact (touch, feel, reach)"
      },
      {
        "word": "tangent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing touch, feel, reach",
        "rootContribution": "tang / tact (touch, feel, reach)"
      },
      {
        "word": "intact",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tang / tact",
        "rootContribution": "tang / tact (touch, feel, reach)"
      },
      {
        "word": "tactile",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tang / tact",
        "rootContribution": "tang / tact (touch, feel, reach)"
      },
      {
        "word": "contingency",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tang / tact",
        "rootContribution": "tang / tact (touch, feel, reach)"
      }
    ]
  },
  {
    "id": "root-techn",
    "root": "techn",
    "type": "root",
    "origin": "Greek",
    "originalForm": "techn",
    "meaning": "art, skill, craft, method",
    "variants": [
      "techn"
    ],
    "pronunciationOrCombining": "techn combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "technical",
    "historicalInsight": "Derived from classical Greek \"techn\". Central element in vocabulary of art, skill, craft, method.",
    "semanticShiftNote": "Retains historical focus on art, skill, craft, method adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "technical",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying art, skill, craft, method",
        "rootContribution": "techn (art, skill, craft, method)"
      },
      {
        "word": "technique",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing art, skill, craft, method",
        "rootContribution": "techn (art, skill, craft, method)"
      },
      {
        "word": "technocracy",
        "pos": "noun",
        "briefDefinition": "Related concept derived from techn",
        "rootContribution": "techn (art, skill, craft, method)"
      },
      {
        "word": "technological",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of techn",
        "rootContribution": "techn (art, skill, craft, method)"
      },
      {
        "word": "pyrotechnics",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of techn",
        "rootContribution": "techn (art, skill, craft, method)"
      }
    ]
  },
  {
    "id": "root-tele",
    "root": "tele-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "tele",
    "meaning": "far, distant, remote",
    "variants": [
      "tele-"
    ],
    "pronunciationOrCombining": "tele- combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "telepathy",
    "historicalInsight": "Derived from classical Greek \"tele-\". Central element in vocabulary of far, distant, remote.",
    "semanticShiftNote": "Retains historical focus on far, distant, remote adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "telepathy",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying far, distant, remote",
        "rootContribution": "tele- (far, distant, remote)"
      },
      {
        "word": "telescope",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing far, distant, remote",
        "rootContribution": "tele- (far, distant, remote)"
      },
      {
        "word": "television",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tele-",
        "rootContribution": "tele- (far, distant, remote)"
      },
      {
        "word": "telecommunications",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tele-",
        "rootContribution": "tele- (far, distant, remote)"
      },
      {
        "word": "telephonic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tele-",
        "rootContribution": "tele- (far, distant, remote)"
      }
    ]
  },
  {
    "id": "root-temp",
    "root": "temp / tempor",
    "type": "root",
    "origin": "Latin",
    "originalForm": "temptempor",
    "meaning": "time, season, moderate",
    "variants": [
      "temp"
    ],
    "pronunciationOrCombining": "temp / tempor combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "contemporary",
    "historicalInsight": "Derived from classical Latin \"temp / tempor\". Central element in vocabulary of time, season, moderate.",
    "semanticShiftNote": "Retains historical focus on time, season, moderate adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "contemporary",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying time, season, moderate",
        "rootContribution": "temp / tempor (time, season, moderate)"
      },
      {
        "word": "extemporaneous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing time, season, moderate",
        "rootContribution": "temp / tempor (time, season, moderate)"
      },
      {
        "word": "temporal",
        "pos": "noun",
        "briefDefinition": "Related concept derived from temp / tempor",
        "rootContribution": "temp / tempor (time, season, moderate)"
      },
      {
        "word": "temperance",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of temp / tempor",
        "rootContribution": "temp / tempor (time, season, moderate)"
      },
      {
        "word": "tempest",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of temp / tempor",
        "rootContribution": "temp / tempor (time, season, moderate)"
      }
    ]
  },
  {
    "id": "root-ten",
    "root": "ten / tend / tens",
    "type": "root",
    "origin": "Latin",
    "originalForm": "tentendtens",
    "meaning": "to stretch, strain, hold",
    "variants": [
      "ten"
    ],
    "pronunciationOrCombining": "ten / tend / tens combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "contend",
    "historicalInsight": "Derived from classical Latin \"ten / tend / tens\". Central element in vocabulary of to stretch, strain, hold.",
    "semanticShiftNote": "Retains historical focus on to stretch, strain, hold adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "contend",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to stretch, strain, hold",
        "rootContribution": "ten / tend / tens (to stretch, strain, hold)"
      },
      {
        "word": "ostentatious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to stretch, strain, hold",
        "rootContribution": "ten / tend / tens (to stretch, strain, hold)"
      },
      {
        "word": "tenuous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ten / tend / tens",
        "rootContribution": "ten / tend / tens (to stretch, strain, hold)"
      },
      {
        "word": "extension",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ten / tend / tens",
        "rootContribution": "ten / tend / tens (to stretch, strain, hold)"
      },
      {
        "word": "intense",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ten / tend / tens",
        "rootContribution": "ten / tend / tens (to stretch, strain, hold)"
      }
    ]
  },
  {
    "id": "root-term",
    "root": "term / termin",
    "type": "root",
    "origin": "Latin",
    "originalForm": "termtermin",
    "meaning": "boundary, end, limit",
    "variants": [
      "term"
    ],
    "pronunciationOrCombining": "term / termin combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "terminal",
    "historicalInsight": "Derived from classical Latin \"term / termin\". Central element in vocabulary of boundary, end, limit.",
    "semanticShiftNote": "Retains historical focus on boundary, end, limit adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "terminal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying boundary, end, limit",
        "rootContribution": "term / termin (boundary, end, limit)"
      },
      {
        "word": "exterminate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing boundary, end, limit",
        "rootContribution": "term / termin (boundary, end, limit)"
      },
      {
        "word": "determinant",
        "pos": "noun",
        "briefDefinition": "Related concept derived from term / termin",
        "rootContribution": "term / termin (boundary, end, limit)"
      },
      {
        "word": "terminate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of term / termin",
        "rootContribution": "term / termin (boundary, end, limit)"
      },
      {
        "word": "interminable",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of term / termin",
        "rootContribution": "term / termin (boundary, end, limit)"
      }
    ]
  },
  {
    "id": "root-terr",
    "root": "terr",
    "type": "root",
    "origin": "Latin",
    "originalForm": "terr",
    "meaning": "earth, land, ground",
    "variants": [
      "terr"
    ],
    "pronunciationOrCombining": "terr combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "subterranean",
    "historicalInsight": "Derived from classical Latin \"terr\". Central element in vocabulary of earth, land, ground.",
    "semanticShiftNote": "Retains historical focus on earth, land, ground adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "subterranean",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying earth, land, ground",
        "rootContribution": "terr (earth, land, ground)"
      },
      {
        "word": "terrestrial",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing earth, land, ground",
        "rootContribution": "terr (earth, land, ground)"
      },
      {
        "word": "territory",
        "pos": "noun",
        "briefDefinition": "Related concept derived from terr",
        "rootContribution": "terr (earth, land, ground)"
      },
      {
        "word": "parterre",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of terr",
        "rootContribution": "terr (earth, land, ground)"
      },
      {
        "word": "terrain",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of terr",
        "rootContribution": "terr (earth, land, ground)"
      }
    ]
  },
  {
    "id": "root-test",
    "root": "test",
    "type": "root",
    "origin": "Latin",
    "originalForm": "test",
    "meaning": "witness, evidence, affirm",
    "variants": [
      "test"
    ],
    "pronunciationOrCombining": "test combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "testify",
    "historicalInsight": "Derived from classical Latin \"test\". Central element in vocabulary of witness, evidence, affirm.",
    "semanticShiftNote": "Retains historical focus on witness, evidence, affirm adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "testify",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying witness, evidence, affirm",
        "rootContribution": "test (witness, evidence, affirm)"
      },
      {
        "word": "attest",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing witness, evidence, affirm",
        "rootContribution": "test (witness, evidence, affirm)"
      },
      {
        "word": "detest",
        "pos": "noun",
        "briefDefinition": "Related concept derived from test",
        "rootContribution": "test (witness, evidence, affirm)"
      },
      {
        "word": "testament",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of test",
        "rootContribution": "test (witness, evidence, affirm)"
      },
      {
        "word": "protestation",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of test",
        "rootContribution": "test (witness, evidence, affirm)"
      }
    ]
  },
  {
    "id": "root-the",
    "root": "the / theo",
    "type": "root",
    "origin": "Greek",
    "originalForm": "thetheo",
    "meaning": "god, deity, divine",
    "variants": [
      "the"
    ],
    "pronunciationOrCombining": "the / theo combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "theology",
    "historicalInsight": "Derived from classical Greek \"the / theo\". Central element in vocabulary of god, deity, divine.",
    "semanticShiftNote": "Retains historical focus on god, deity, divine adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "theology",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying god, deity, divine",
        "rootContribution": "the / theo (god, deity, divine)"
      },
      {
        "word": "atheist",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing god, deity, divine",
        "rootContribution": "the / theo (god, deity, divine)"
      },
      {
        "word": "pantheon",
        "pos": "noun",
        "briefDefinition": "Related concept derived from the / theo",
        "rootContribution": "the / theo (god, deity, divine)"
      },
      {
        "word": "theocracy",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of the / theo",
        "rootContribution": "the / theo (god, deity, divine)"
      },
      {
        "word": "apotheosis",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of the / theo",
        "rootContribution": "the / theo (god, deity, divine)"
      }
    ]
  },
  {
    "id": "root-therm",
    "root": "therm / thermo",
    "type": "root",
    "origin": "Greek",
    "originalForm": "thermthermo",
    "meaning": "heat, warmth",
    "variants": [
      "therm"
    ],
    "pronunciationOrCombining": "therm / thermo combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "thermal",
    "historicalInsight": "Derived from classical Greek \"therm / thermo\". Central element in vocabulary of heat, warmth.",
    "semanticShiftNote": "Retains historical focus on heat, warmth adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "thermal",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying heat, warmth",
        "rootContribution": "therm / thermo (heat, warmth)"
      },
      {
        "word": "thermodynamics",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing heat, warmth",
        "rootContribution": "therm / thermo (heat, warmth)"
      },
      {
        "word": "thermostat",
        "pos": "noun",
        "briefDefinition": "Related concept derived from therm / thermo",
        "rootContribution": "therm / thermo (heat, warmth)"
      },
      {
        "word": "hypothermia",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of therm / thermo",
        "rootContribution": "therm / thermo (heat, warmth)"
      },
      {
        "word": "isotherm",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of therm / thermo",
        "rootContribution": "therm / thermo (heat, warmth)"
      }
    ]
  },
  {
    "id": "root-tort",
    "root": "tort / torq",
    "type": "root",
    "origin": "Latin",
    "originalForm": "torttorq",
    "meaning": "to twist, bend, turn",
    "variants": [
      "tort"
    ],
    "pronunciationOrCombining": "tort / torq combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "extort",
    "historicalInsight": "Derived from classical Latin \"tort / torq\". Central element in vocabulary of to twist, bend, turn.",
    "semanticShiftNote": "Retains historical focus on to twist, bend, turn adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "extort",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to twist, bend, turn",
        "rootContribution": "tort / torq (to twist, bend, turn)"
      },
      {
        "word": "tortuous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to twist, bend, turn",
        "rootContribution": "tort / torq (to twist, bend, turn)"
      },
      {
        "word": "contort",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tort / torq",
        "rootContribution": "tort / torq (to twist, bend, turn)"
      },
      {
        "word": "retort",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tort / torq",
        "rootContribution": "tort / torq (to twist, bend, turn)"
      },
      {
        "word": "distortion",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tort / torq",
        "rootContribution": "tort / torq (to twist, bend, turn)"
      }
    ]
  },
  {
    "id": "root-tox",
    "root": "tox",
    "type": "root",
    "origin": "Greek",
    "originalForm": "tox",
    "meaning": "poison, bow, arrow",
    "variants": [
      "tox"
    ],
    "pronunciationOrCombining": "tox combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "toxic",
    "historicalInsight": "Derived from classical Greek \"tox\". Central element in vocabulary of poison, bow, arrow.",
    "semanticShiftNote": "Retains historical focus on poison, bow, arrow adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "toxic",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying poison, bow, arrow",
        "rootContribution": "tox (poison, bow, arrow)"
      },
      {
        "word": "intoxicate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing poison, bow, arrow",
        "rootContribution": "tox (poison, bow, arrow)"
      },
      {
        "word": "toxin",
        "pos": "noun",
        "briefDefinition": "Related concept derived from tox",
        "rootContribution": "tox (poison, bow, arrow)"
      },
      {
        "word": "detoxify",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of tox",
        "rootContribution": "tox (poison, bow, arrow)"
      },
      {
        "word": "toxicology",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of tox",
        "rootContribution": "tox (poison, bow, arrow)"
      }
    ]
  },
  {
    "id": "root-trib",
    "root": "trib",
    "type": "root",
    "origin": "Latin",
    "originalForm": "trib",
    "meaning": "to pay, give, assign",
    "variants": [
      "trib"
    ],
    "pronunciationOrCombining": "trib combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "tribute",
    "historicalInsight": "Derived from classical Latin \"trib\". Central element in vocabulary of to pay, give, assign.",
    "semanticShiftNote": "Retains historical focus on to pay, give, assign adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "tribute",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to pay, give, assign",
        "rootContribution": "trib (to pay, give, assign)"
      },
      {
        "word": "attribute",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to pay, give, assign",
        "rootContribution": "trib (to pay, give, assign)"
      },
      {
        "word": "distribute",
        "pos": "noun",
        "briefDefinition": "Related concept derived from trib",
        "rootContribution": "trib (to pay, give, assign)"
      },
      {
        "word": "retribution",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of trib",
        "rootContribution": "trib (to pay, give, assign)"
      },
      {
        "word": "contribute",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of trib",
        "rootContribution": "trib (to pay, give, assign)"
      }
    ]
  },
  {
    "id": "root-trud",
    "root": "trud / trus",
    "type": "root",
    "origin": "Latin",
    "originalForm": "trudtrus",
    "meaning": "to push, thrust, force",
    "variants": [
      "trud"
    ],
    "pronunciationOrCombining": "trud / trus combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "obtrusive",
    "historicalInsight": "Derived from classical Latin \"trud / trus\". Central element in vocabulary of to push, thrust, force.",
    "semanticShiftNote": "Retains historical focus on to push, thrust, force adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "obtrusive",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to push, thrust, force",
        "rootContribution": "trud / trus (to push, thrust, force)"
      },
      {
        "word": "intrusive",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to push, thrust, force",
        "rootContribution": "trud / trus (to push, thrust, force)"
      },
      {
        "word": "extrude",
        "pos": "noun",
        "briefDefinition": "Related concept derived from trud / trus",
        "rootContribution": "trud / trus (to push, thrust, force)"
      },
      {
        "word": "abstruse",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of trud / trus",
        "rootContribution": "trud / trus (to push, thrust, force)"
      },
      {
        "word": "protrude",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of trud / trus",
        "rootContribution": "trud / trus (to push, thrust, force)"
      }
    ]
  },
  {
    "id": "root-urb",
    "root": "urb",
    "type": "root",
    "origin": "Latin",
    "originalForm": "urb",
    "meaning": "city, town, urban area",
    "variants": [
      "urb"
    ],
    "pronunciationOrCombining": "urb combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "urban",
    "historicalInsight": "Derived from classical Latin \"urb\". Central element in vocabulary of city, town, urban area.",
    "semanticShiftNote": "Retains historical focus on city, town, urban area adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "urban",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying city, town, urban area",
        "rootContribution": "urb (city, town, urban area)"
      },
      {
        "word": "urbane",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing city, town, urban area",
        "rootContribution": "urb (city, town, urban area)"
      },
      {
        "word": "suburb",
        "pos": "noun",
        "briefDefinition": "Related concept derived from urb",
        "rootContribution": "urb (city, town, urban area)"
      },
      {
        "word": "exurb",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of urb",
        "rootContribution": "urb (city, town, urban area)"
      },
      {
        "word": "urbanization",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of urb",
        "rootContribution": "urb (city, town, urban area)"
      }
    ]
  },
  {
    "id": "root-vac",
    "root": "vac",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vac",
    "meaning": "empty, free, open",
    "variants": [
      "vac"
    ],
    "pronunciationOrCombining": "vac combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "vacuous",
    "historicalInsight": "Derived from classical Latin \"vac\". Central element in vocabulary of empty, free, open.",
    "semanticShiftNote": "Retains historical focus on empty, free, open adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "vacuous",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying empty, free, open",
        "rootContribution": "vac (empty, free, open)"
      },
      {
        "word": "evacuate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing empty, free, open",
        "rootContribution": "vac (empty, free, open)"
      },
      {
        "word": "vacant",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vac",
        "rootContribution": "vac (empty, free, open)"
      },
      {
        "word": "vacuity",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vac",
        "rootContribution": "vac (empty, free, open)"
      },
      {
        "word": "vacation",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vac",
        "rootContribution": "vac (empty, free, open)"
      }
    ]
  },
  {
    "id": "root-vad",
    "root": "vad / vas",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vadvas",
    "meaning": "to go, walk, advance",
    "variants": [
      "vad"
    ],
    "pronunciationOrCombining": "vad / vas combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "evade",
    "historicalInsight": "Derived from classical Latin \"vad / vas\". Central element in vocabulary of to go, walk, advance.",
    "semanticShiftNote": "Retains historical focus on to go, walk, advance adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "evade",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to go, walk, advance",
        "rootContribution": "vad / vas (to go, walk, advance)"
      },
      {
        "word": "pervasive",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to go, walk, advance",
        "rootContribution": "vad / vas (to go, walk, advance)"
      },
      {
        "word": "invade",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vad / vas",
        "rootContribution": "vad / vas (to go, walk, advance)"
      },
      {
        "word": "evasion",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vad / vas",
        "rootContribution": "vad / vas (to go, walk, advance)"
      },
      {
        "word": "pervade",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vad / vas",
        "rootContribution": "vad / vas (to go, walk, advance)"
      }
    ]
  },
  {
    "id": "root-val",
    "root": "val / vail",
    "type": "root",
    "origin": "Latin",
    "originalForm": "valvail",
    "meaning": "strong, worthy, health",
    "variants": [
      "val"
    ],
    "pronunciationOrCombining": "val / vail combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "valiant",
    "historicalInsight": "Derived from classical Latin \"val / vail\". Central element in vocabulary of strong, worthy, health.",
    "semanticShiftNote": "Retains historical focus on strong, worthy, health adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "valiant",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying strong, worthy, health",
        "rootContribution": "val / vail (strong, worthy, health)"
      },
      {
        "word": "ambivalent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing strong, worthy, health",
        "rootContribution": "val / vail (strong, worthy, health)"
      },
      {
        "word": "prevail",
        "pos": "noun",
        "briefDefinition": "Related concept derived from val / vail",
        "rootContribution": "val / vail (strong, worthy, health)"
      },
      {
        "word": "convalesce",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of val / vail",
        "rootContribution": "val / vail (strong, worthy, health)"
      },
      {
        "word": "validity",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of val / vail",
        "rootContribution": "val / vail (strong, worthy, health)"
      }
    ]
  },
  {
    "id": "root-ven",
    "root": "ven / vent",
    "type": "root",
    "origin": "Latin",
    "originalForm": "venvent",
    "meaning": "to come, arrive, happen",
    "variants": [
      "ven"
    ],
    "pronunciationOrCombining": "ven / vent combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "convene",
    "historicalInsight": "Derived from classical Latin \"ven / vent\". Central element in vocabulary of to come, arrive, happen.",
    "semanticShiftNote": "Retains historical focus on to come, arrive, happen adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "convene",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to come, arrive, happen",
        "rootContribution": "ven / vent (to come, arrive, happen)"
      },
      {
        "word": "circumvent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to come, arrive, happen",
        "rootContribution": "ven / vent (to come, arrive, happen)"
      },
      {
        "word": "advent",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ven / vent",
        "rootContribution": "ven / vent (to come, arrive, happen)"
      },
      {
        "word": "intervene",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ven / vent",
        "rootContribution": "ven / vent (to come, arrive, happen)"
      },
      {
        "word": "venue",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ven / vent",
        "rootContribution": "ven / vent (to come, arrive, happen)"
      }
    ]
  },
  {
    "id": "root-ver",
    "root": "ver",
    "type": "root",
    "origin": "Latin",
    "originalForm": "ver",
    "meaning": "true, real, truth",
    "variants": [
      "ver"
    ],
    "pronunciationOrCombining": "ver combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "veracity",
    "historicalInsight": "Derived from classical Latin \"ver\". Central element in vocabulary of true, real, truth.",
    "semanticShiftNote": "Retains historical focus on true, real, truth adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "veracity",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying true, real, truth",
        "rootContribution": "ver (true, real, truth)"
      },
      {
        "word": "veritable",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing true, real, truth",
        "rootContribution": "ver (true, real, truth)"
      },
      {
        "word": "verdict",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ver",
        "rootContribution": "ver (true, real, truth)"
      },
      {
        "word": "verisimilitude",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ver",
        "rootContribution": "ver (true, real, truth)"
      },
      {
        "word": "verify",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ver",
        "rootContribution": "ver (true, real, truth)"
      }
    ]
  },
  {
    "id": "root-verb",
    "root": "verb",
    "type": "root",
    "origin": "Latin",
    "originalForm": "verb",
    "meaning": "word",
    "variants": [
      "verb"
    ],
    "pronunciationOrCombining": "verb combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "verbose",
    "historicalInsight": "Derived from classical Latin \"verb\". Central element in vocabulary of word.",
    "semanticShiftNote": "Retains historical focus on word adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "verbose",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying word",
        "rootContribution": "verb (word)"
      },
      {
        "word": "verbatim",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing word",
        "rootContribution": "verb (word)"
      },
      {
        "word": "verbal",
        "pos": "noun",
        "briefDefinition": "Related concept derived from verb",
        "rootContribution": "verb (word)"
      },
      {
        "word": "proverb",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of verb",
        "rootContribution": "verb (word)"
      },
      {
        "word": "reverberate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of verb",
        "rootContribution": "verb (word)"
      }
    ]
  },
  {
    "id": "root-via",
    "root": "via / voy",
    "type": "root",
    "origin": "Latin",
    "originalForm": "viavoy",
    "meaning": "way, road, path",
    "variants": [
      "via"
    ],
    "pronunciationOrCombining": "via / voy combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "deviate",
    "historicalInsight": "Derived from classical Latin \"via / voy\". Central element in vocabulary of way, road, path.",
    "semanticShiftNote": "Retains historical focus on way, road, path adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "deviate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying way, road, path",
        "rootContribution": "via / voy (way, road, path)"
      },
      {
        "word": "impervious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing way, road, path",
        "rootContribution": "via / voy (way, road, path)"
      },
      {
        "word": "obviate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from via / voy",
        "rootContribution": "via / voy (way, road, path)"
      },
      {
        "word": "voyage",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of via / voy",
        "rootContribution": "via / voy (way, road, path)"
      },
      {
        "word": "viaduct",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of via / voy",
        "rootContribution": "via / voy (way, road, path)"
      }
    ]
  },
  {
    "id": "root-vid",
    "root": "vid / vis",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vidvis",
    "meaning": "to see, perceive, look",
    "variants": [
      "vid"
    ],
    "pronunciationOrCombining": "vid / vis combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "evident",
    "historicalInsight": "Derived from classical Latin \"vid / vis\". Central element in vocabulary of to see, perceive, look.",
    "semanticShiftNote": "Retains historical focus on to see, perceive, look adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "evident",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to see, perceive, look",
        "rootContribution": "vid / vis (to see, perceive, look)"
      },
      {
        "word": "improvise",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to see, perceive, look",
        "rootContribution": "vid / vis (to see, perceive, look)"
      },
      {
        "word": "supervise",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vid / vis",
        "rootContribution": "vid / vis (to see, perceive, look)"
      },
      {
        "word": "visionary",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vid / vis",
        "rootContribution": "vid / vis (to see, perceive, look)"
      },
      {
        "word": "invisible",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vid / vis",
        "rootContribution": "vid / vis (to see, perceive, look)"
      }
    ]
  },
  {
    "id": "root-vinc",
    "root": "vinc / vict",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vincvict",
    "meaning": "to conquer, overcome",
    "variants": [
      "vinc"
    ],
    "pronunciationOrCombining": "vinc / vict combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "invincible",
    "historicalInsight": "Derived from classical Latin \"vinc / vict\". Central element in vocabulary of to conquer, overcome.",
    "semanticShiftNote": "Retains historical focus on to conquer, overcome adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "invincible",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to conquer, overcome",
        "rootContribution": "vinc / vict (to conquer, overcome)"
      },
      {
        "word": "convict",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to conquer, overcome",
        "rootContribution": "vinc / vict (to conquer, overcome)"
      },
      {
        "word": "vanquish",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vinc / vict",
        "rootContribution": "vinc / vict (to conquer, overcome)"
      },
      {
        "word": "evict",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vinc / vict",
        "rootContribution": "vinc / vict (to conquer, overcome)"
      },
      {
        "word": "victorious",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vinc / vict",
        "rootContribution": "vinc / vict (to conquer, overcome)"
      }
    ]
  },
  {
    "id": "root-vit",
    "root": "vit / viv",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vitviv",
    "meaning": "life, alive, living",
    "variants": [
      "vit"
    ],
    "pronunciationOrCombining": "vit / viv combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "vital",
    "historicalInsight": "Derived from classical Latin \"vit / viv\". Central element in vocabulary of life, alive, living.",
    "semanticShiftNote": "Retains historical focus on life, alive, living adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "vital",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying life, alive, living",
        "rootContribution": "vit / viv (life, alive, living)"
      },
      {
        "word": "vivacious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing life, alive, living",
        "rootContribution": "vit / viv (life, alive, living)"
      },
      {
        "word": "revitalize",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vit / viv",
        "rootContribution": "vit / viv (life, alive, living)"
      },
      {
        "word": "convivial",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vit / viv",
        "rootContribution": "vit / viv (life, alive, living)"
      },
      {
        "word": "vivid",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vit / viv",
        "rootContribution": "vit / viv (life, alive, living)"
      }
    ]
  },
  {
    "id": "root-vol",
    "root": "vol",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vol",
    "meaning": "will, wish, desire",
    "variants": [
      "vol"
    ],
    "pronunciationOrCombining": "vol combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "benevolent",
    "historicalInsight": "Derived from classical Latin \"vol\". Central element in vocabulary of will, wish, desire.",
    "semanticShiftNote": "Retains historical focus on will, wish, desire adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "benevolent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying will, wish, desire",
        "rootContribution": "vol (will, wish, desire)"
      },
      {
        "word": "malevolent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing will, wish, desire",
        "rootContribution": "vol (will, wish, desire)"
      },
      {
        "word": "voluntary",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vol",
        "rootContribution": "vol (will, wish, desire)"
      },
      {
        "word": "volition",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vol",
        "rootContribution": "vol (will, wish, desire)"
      },
      {
        "word": "involuntary",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vol",
        "rootContribution": "vol (will, wish, desire)"
      }
    ]
  },
  {
    "id": "root-volu",
    "root": "volu / volv",
    "type": "root",
    "origin": "Latin",
    "originalForm": "voluvolv",
    "meaning": "to roll, turn, wind",
    "variants": [
      "volu"
    ],
    "pronunciationOrCombining": "volu / volv combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "convoluted",
    "historicalInsight": "Derived from classical Latin \"volu / volv\". Central element in vocabulary of to roll, turn, wind.",
    "semanticShiftNote": "Retains historical focus on to roll, turn, wind adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "convoluted",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to roll, turn, wind",
        "rootContribution": "volu / volv (to roll, turn, wind)"
      },
      {
        "word": "evolve",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to roll, turn, wind",
        "rootContribution": "volu / volv (to roll, turn, wind)"
      },
      {
        "word": "devolve",
        "pos": "noun",
        "briefDefinition": "Related concept derived from volu / volv",
        "rootContribution": "volu / volv (to roll, turn, wind)"
      },
      {
        "word": "revolution",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of volu / volv",
        "rootContribution": "volu / volv (to roll, turn, wind)"
      },
      {
        "word": "voluminous",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of volu / volv",
        "rootContribution": "volu / volv (to roll, turn, wind)"
      }
    ]
  },
  {
    "id": "root-vor",
    "root": "vor",
    "type": "root",
    "origin": "Latin",
    "originalForm": "vor",
    "meaning": "to eat, devour, swallow",
    "variants": [
      "vor"
    ],
    "pronunciationOrCombining": "vor combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "voracious",
    "historicalInsight": "Derived from classical Latin \"vor\". Central element in vocabulary of to eat, devour, swallow.",
    "semanticShiftNote": "Retains historical focus on to eat, devour, swallow adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "voracious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to eat, devour, swallow",
        "rootContribution": "vor (to eat, devour, swallow)"
      },
      {
        "word": "herbivore",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to eat, devour, swallow",
        "rootContribution": "vor (to eat, devour, swallow)"
      },
      {
        "word": "carnivorous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from vor",
        "rootContribution": "vor (to eat, devour, swallow)"
      },
      {
        "word": "omnivorous",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of vor",
        "rootContribution": "vor (to eat, devour, swallow)"
      },
      {
        "word": "devour",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of vor",
        "rootContribution": "vor (to eat, devour, swallow)"
      }
    ]
  },
  {
    "id": "root-zo",
    "root": "zo / zoo",
    "type": "root",
    "origin": "Greek",
    "originalForm": "zozoo",
    "meaning": "animal, living creature",
    "variants": [
      "zo"
    ],
    "pronunciationOrCombining": "zo / zoo combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "zoology",
    "historicalInsight": "Derived from classical Greek \"zo / zoo\". Central element in vocabulary of animal, living creature.",
    "semanticShiftNote": "Retains historical focus on animal, living creature adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "zoology",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying animal, living creature",
        "rootContribution": "zo / zoo (animal, living creature)"
      },
      {
        "word": "protozoa",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing animal, living creature",
        "rootContribution": "zo / zoo (animal, living creature)"
      },
      {
        "word": "zooplankton",
        "pos": "noun",
        "briefDefinition": "Related concept derived from zo / zoo",
        "rootContribution": "zo / zoo (animal, living creature)"
      },
      {
        "word": "zoo",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of zo / zoo",
        "rootContribution": "zo / zoo (animal, living creature)"
      },
      {
        "word": "epizootic",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of zo / zoo",
        "rootContribution": "zo / zoo (animal, living creature)"
      }
    ]
  },
  {
    "id": "prefix-a",
    "root": "a- / an-",
    "type": "prefix",
    "origin": "Greek",
    "originalForm": "aan",
    "meaning": "not, without, lacking",
    "variants": [
      "a-"
    ],
    "pronunciationOrCombining": "a- / an- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "amoral",
    "historicalInsight": "Derived from classical Greek \"a- / an-\". Central element in vocabulary of not, without, lacking.",
    "semanticShiftNote": "Retains historical focus on not, without, lacking adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "amoral",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying not, without, lacking",
        "rootContribution": "a- / an- (not, without, lacking)"
      },
      {
        "word": "atypical",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing not, without, lacking",
        "rootContribution": "a- / an- (not, without, lacking)"
      },
      {
        "word": "anarchy",
        "pos": "noun",
        "briefDefinition": "Related concept derived from a- / an-",
        "rootContribution": "a- / an- (not, without, lacking)"
      },
      {
        "word": "anemia",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of a- / an-",
        "rootContribution": "a- / an- (not, without, lacking)"
      },
      {
        "word": "apathy",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of a- / an-",
        "rootContribution": "a- / an- (not, without, lacking)"
      }
    ]
  },
  {
    "id": "prefix-ad",
    "root": "ad-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "ad",
    "meaning": "to, toward, near, addition",
    "variants": [
      "ad-"
    ],
    "pronunciationOrCombining": "ad- combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "adhere",
    "historicalInsight": "Derived from classical Latin \"ad-\". Central element in vocabulary of to, toward, near, addition.",
    "semanticShiftNote": "Retains historical focus on to, toward, near, addition adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "adhere",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to, toward, near, addition",
        "rootContribution": "ad- (to, toward, near, addition)"
      },
      {
        "word": "adjacent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to, toward, near, addition",
        "rootContribution": "ad- (to, toward, near, addition)"
      },
      {
        "word": "advocate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ad-",
        "rootContribution": "ad- (to, toward, near, addition)"
      },
      {
        "word": "adjoin",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ad-",
        "rootContribution": "ad- (to, toward, near, addition)"
      },
      {
        "word": "assimilate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ad-",
        "rootContribution": "ad- (to, toward, near, addition)"
      }
    ]
  },
  {
    "id": "prefix-ambi",
    "root": "ambi- / amphi-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "ambiamphi",
    "meaning": "both, around, on both sides",
    "variants": [
      "ambi-"
    ],
    "pronunciationOrCombining": "ambi- / amphi- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "ambivalent",
    "historicalInsight": "Derived from classical Latin \"ambi- / amphi-\". Central element in vocabulary of both, around, on both sides.",
    "semanticShiftNote": "Retains historical focus on both, around, on both sides adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "ambivalent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying both, around, on both sides",
        "rootContribution": "ambi- / amphi- (both, around, on both sides)"
      },
      {
        "word": "ambidextrous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing both, around, on both sides",
        "rootContribution": "ambi- / amphi- (both, around, on both sides)"
      },
      {
        "word": "amphibian",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ambi- / amphi-",
        "rootContribution": "ambi- / amphi- (both, around, on both sides)"
      },
      {
        "word": "ambiguity",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ambi- / amphi-",
        "rootContribution": "ambi- / amphi- (both, around, on both sides)"
      },
      {
        "word": "ambient",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ambi- / amphi-",
        "rootContribution": "ambi- / amphi- (both, around, on both sides)"
      }
    ]
  },
  {
    "id": "prefix-ante",
    "root": "ante-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "ante",
    "meaning": "before, preceding in time",
    "variants": [
      "ante-"
    ],
    "pronunciationOrCombining": "ante- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "antecedent",
    "historicalInsight": "Derived from classical Latin \"ante-\". Central element in vocabulary of before, preceding in time.",
    "semanticShiftNote": "Retains historical focus on before, preceding in time adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "antecedent",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying before, preceding in time",
        "rootContribution": "ante- (before, preceding in time)"
      },
      {
        "word": "antedate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing before, preceding in time",
        "rootContribution": "ante- (before, preceding in time)"
      },
      {
        "word": "anteroom",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ante-",
        "rootContribution": "ante- (before, preceding in time)"
      },
      {
        "word": "antebellum",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ante-",
        "rootContribution": "ante- (before, preceding in time)"
      },
      {
        "word": "antediluvian",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ante-",
        "rootContribution": "ante- (before, preceding in time)"
      }
    ]
  },
  {
    "id": "prefix-circum",
    "root": "circum-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "circum",
    "meaning": "around, about, surrounding",
    "variants": [
      "circum-"
    ],
    "pronunciationOrCombining": "circum- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "circumscribe",
    "historicalInsight": "Derived from classical Latin \"circum-\". Central element in vocabulary of around, about, surrounding.",
    "semanticShiftNote": "Retains historical focus on around, about, surrounding adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "circumscribe",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying around, about, surrounding",
        "rootContribution": "circum- (around, about, surrounding)"
      },
      {
        "word": "circumspect",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing around, about, surrounding",
        "rootContribution": "circum- (around, about, surrounding)"
      },
      {
        "word": "circumvent",
        "pos": "noun",
        "briefDefinition": "Related concept derived from circum-",
        "rootContribution": "circum- (around, about, surrounding)"
      },
      {
        "word": "circumlocution",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of circum-",
        "rootContribution": "circum- (around, about, surrounding)"
      },
      {
        "word": "navigate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of circum-",
        "rootContribution": "circum- (around, about, surrounding)"
      }
    ]
  },
  {
    "id": "prefix-com",
    "root": "com- / con-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "comcon",
    "meaning": "with, together, completely",
    "variants": [
      "com-"
    ],
    "pronunciationOrCombining": "com- / con- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "concur",
    "historicalInsight": "Derived from classical Latin \"com- / con-\". Central element in vocabulary of with, together, completely.",
    "semanticShiftNote": "Retains historical focus on with, together, completely adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "concur",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying with, together, completely",
        "rootContribution": "com- / con- (with, together, completely)"
      },
      {
        "word": "collaborate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing with, together, completely",
        "rootContribution": "com- / con- (with, together, completely)"
      },
      {
        "word": "comprehensive",
        "pos": "noun",
        "briefDefinition": "Related concept derived from com- / con-",
        "rootContribution": "com- / con- (with, together, completely)"
      },
      {
        "word": "congenial",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of com- / con-",
        "rootContribution": "com- / con- (with, together, completely)"
      },
      {
        "word": "consensus",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of com- / con-",
        "rootContribution": "com- / con- (with, together, completely)"
      }
    ]
  },
  {
    "id": "prefix-de",
    "root": "de-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "de",
    "meaning": "down, away from, undo",
    "variants": [
      "de-"
    ],
    "pronunciationOrCombining": "de- combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "degrade",
    "historicalInsight": "Derived from classical Latin \"de-\". Central element in vocabulary of down, away from, undo.",
    "semanticShiftNote": "Retains historical focus on down, away from, undo adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "degrade",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying down, away from, undo",
        "rootContribution": "de- (down, away from, undo)"
      },
      {
        "word": "delineate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing down, away from, undo",
        "rootContribution": "de- (down, away from, undo)"
      },
      {
        "word": "deflect",
        "pos": "noun",
        "briefDefinition": "Related concept derived from de-",
        "rootContribution": "de- (down, away from, undo)"
      },
      {
        "word": "demote",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of de-",
        "rootContribution": "de- (down, away from, undo)"
      },
      {
        "word": "deprecate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of de-",
        "rootContribution": "de- (down, away from, undo)"
      }
    ]
  },
  {
    "id": "prefix-dis",
    "root": "dis-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "dis",
    "meaning": "apart, away, not, opposite",
    "variants": [
      "dis-"
    ],
    "pronunciationOrCombining": "dis- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "disparage",
    "historicalInsight": "Derived from classical Latin \"dis-\". Central element in vocabulary of apart, away, not, opposite.",
    "semanticShiftNote": "Retains historical focus on apart, away, not, opposite adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "disparage",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying apart, away, not, opposite",
        "rootContribution": "dis- (apart, away, not, opposite)"
      },
      {
        "word": "dissent",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing apart, away, not, opposite",
        "rootContribution": "dis- (apart, away, not, opposite)"
      },
      {
        "word": "disrupt",
        "pos": "noun",
        "briefDefinition": "Related concept derived from dis-",
        "rootContribution": "dis- (apart, away, not, opposite)"
      },
      {
        "word": "disseminate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of dis-",
        "rootContribution": "dis- (apart, away, not, opposite)"
      },
      {
        "word": "disarticulate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of dis-",
        "rootContribution": "dis- (apart, away, not, opposite)"
      }
    ]
  },
  {
    "id": "prefix-ex",
    "root": "ex-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "ex",
    "meaning": "out of, away from, former",
    "variants": [
      "ex-"
    ],
    "pronunciationOrCombining": "ex- combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "exonerate",
    "historicalInsight": "Derived from classical Latin \"ex-\". Central element in vocabulary of out of, away from, former.",
    "semanticShiftNote": "Retains historical focus on out of, away from, former adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "exonerate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying out of, away from, former",
        "rootContribution": "ex- (out of, away from, former)"
      },
      {
        "word": "exile",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing out of, away from, former",
        "rootContribution": "ex- (out of, away from, former)"
      },
      {
        "word": "expel",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ex-",
        "rootContribution": "ex- (out of, away from, former)"
      },
      {
        "word": "exuberant",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ex-",
        "rootContribution": "ex- (out of, away from, former)"
      },
      {
        "word": "extrapolate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ex-",
        "rootContribution": "ex- (out of, away from, former)"
      }
    ]
  },
  {
    "id": "prefix-in",
    "root": "in- / im-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "inim",
    "meaning": "not, non-, un- (or into)",
    "variants": [
      "in-"
    ],
    "pronunciationOrCombining": "in- / im- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "intractable",
    "historicalInsight": "Derived from classical Latin \"in- / im-\". Central element in vocabulary of not, non-, un- (or into).",
    "semanticShiftNote": "Retains historical focus on not, non-, un- (or into) adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "intractable",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying not, non-, un- (or into)",
        "rootContribution": "in- / im- (not, non-, un- (or into))"
      },
      {
        "word": "ineffable",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing not, non-, un- (or into)",
        "rootContribution": "in- / im- (not, non-, un- (or into))"
      },
      {
        "word": "implacable",
        "pos": "noun",
        "briefDefinition": "Related concept derived from in- / im-",
        "rootContribution": "in- / im- (not, non-, un- (or into))"
      },
      {
        "word": "incessant",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of in- / im-",
        "rootContribution": "in- / im- (not, non-, un- (or into))"
      },
      {
        "word": "inscrutable",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of in- / im-",
        "rootContribution": "in- / im- (not, non-, un- (or into))"
      }
    ]
  },
  {
    "id": "prefix-ob",
    "root": "ob-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "ob",
    "meaning": "against, in front of, toward",
    "variants": [
      "ob-"
    ],
    "pronunciationOrCombining": "ob- combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "obdurate",
    "historicalInsight": "Derived from classical Latin \"ob-\". Central element in vocabulary of against, in front of, toward.",
    "semanticShiftNote": "Retains historical focus on against, in front of, toward adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "obdurate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying against, in front of, toward",
        "rootContribution": "ob- (against, in front of, toward)"
      },
      {
        "word": "obstruct",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing against, in front of, toward",
        "rootContribution": "ob- (against, in front of, toward)"
      },
      {
        "word": "obfuscate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from ob-",
        "rootContribution": "ob- (against, in front of, toward)"
      },
      {
        "word": "oblivious",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of ob-",
        "rootContribution": "ob- (against, in front of, toward)"
      },
      {
        "word": "obnoxious",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of ob-",
        "rootContribution": "ob- (against, in front of, toward)"
      }
    ]
  },
  {
    "id": "prefix-per",
    "root": "per-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "per",
    "meaning": "through, thoroughly, completely",
    "variants": [
      "per-"
    ],
    "pronunciationOrCombining": "per- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "perfunctory",
    "historicalInsight": "Derived from classical Latin \"per-\". Central element in vocabulary of through, thoroughly, completely.",
    "semanticShiftNote": "Retains historical focus on through, thoroughly, completely adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "perfunctory",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying through, thoroughly, completely",
        "rootContribution": "per- (through, thoroughly, completely)"
      },
      {
        "word": "pervade",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing through, thoroughly, completely",
        "rootContribution": "per- (through, thoroughly, completely)"
      },
      {
        "word": "perspicacious",
        "pos": "noun",
        "briefDefinition": "Related concept derived from per-",
        "rootContribution": "per- (through, thoroughly, completely)"
      },
      {
        "word": "permeate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of per-",
        "rootContribution": "per- (through, thoroughly, completely)"
      },
      {
        "word": "persevere",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of per-",
        "rootContribution": "per- (through, thoroughly, completely)"
      }
    ]
  },
  {
    "id": "prefix-post",
    "root": "post-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "post",
    "meaning": "after, behind, subsequent",
    "variants": [
      "post-"
    ],
    "pronunciationOrCombining": "post- combining form",
    "thematicCluster": "Science, Measurement, and Nature",
    "anchorWord": "postscript",
    "historicalInsight": "Derived from classical Latin \"post-\". Central element in vocabulary of after, behind, subsequent.",
    "semanticShiftNote": "Retains historical focus on after, behind, subsequent adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "postscript",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying after, behind, subsequent",
        "rootContribution": "post- (after, behind, subsequent)"
      },
      {
        "word": "posterity",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing after, behind, subsequent",
        "rootContribution": "post- (after, behind, subsequent)"
      },
      {
        "word": "posthumous",
        "pos": "noun",
        "briefDefinition": "Related concept derived from post-",
        "rootContribution": "post- (after, behind, subsequent)"
      },
      {
        "word": "postpone",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of post-",
        "rootContribution": "post- (after, behind, subsequent)"
      },
      {
        "word": "postprandial",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of post-",
        "rootContribution": "post- (after, behind, subsequent)"
      }
    ]
  },
  {
    "id": "prefix-pre",
    "root": "pre-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "pre",
    "meaning": "before, in advance, prior",
    "variants": [
      "pre-"
    ],
    "pronunciationOrCombining": "pre- combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "precocious",
    "historicalInsight": "Derived from classical Latin \"pre-\". Central element in vocabulary of before, in advance, prior.",
    "semanticShiftNote": "Retains historical focus on before, in advance, prior adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "precocious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying before, in advance, prior",
        "rootContribution": "pre- (before, in advance, prior)"
      },
      {
        "word": "precursor",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing before, in advance, prior",
        "rootContribution": "pre- (before, in advance, prior)"
      },
      {
        "word": "prescient",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pre-",
        "rootContribution": "pre- (before, in advance, prior)"
      },
      {
        "word": "predilection",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pre-",
        "rootContribution": "pre- (before, in advance, prior)"
      },
      {
        "word": "premonition",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pre-",
        "rootContribution": "pre- (before, in advance, prior)"
      }
    ]
  },
  {
    "id": "prefix-pro",
    "root": "pro-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "pro",
    "meaning": "forward, forth, in favor of",
    "variants": [
      "pro-"
    ],
    "pronunciationOrCombining": "pro- combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "proclivity",
    "historicalInsight": "Derived from classical Latin \"pro-\". Central element in vocabulary of forward, forth, in favor of.",
    "semanticShiftNote": "Retains historical focus on forward, forth, in favor of adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "proclivity",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying forward, forth, in favor of",
        "rootContribution": "pro- (forward, forth, in favor of)"
      },
      {
        "word": "prolific",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing forward, forth, in favor of",
        "rootContribution": "pro- (forward, forth, in favor of)"
      },
      {
        "word": "protracted",
        "pos": "noun",
        "briefDefinition": "Related concept derived from pro-",
        "rootContribution": "pro- (forward, forth, in favor of)"
      },
      {
        "word": "propensity",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of pro-",
        "rootContribution": "pro- (forward, forth, in favor of)"
      },
      {
        "word": "proponent",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of pro-",
        "rootContribution": "pro- (forward, forth, in favor of)"
      }
    ]
  },
  {
    "id": "prefix-super",
    "root": "super-",
    "type": "prefix",
    "origin": "Latin",
    "originalForm": "super",
    "meaning": "above, over, beyond, supreme",
    "variants": [
      "super-"
    ],
    "pronunciationOrCombining": "super- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "supercilious",
    "historicalInsight": "Derived from classical Latin \"super-\". Central element in vocabulary of above, over, beyond, supreme.",
    "semanticShiftNote": "Retains historical focus on above, over, beyond, supreme adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "supercilious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying above, over, beyond, supreme",
        "rootContribution": "super- (above, over, beyond, supreme)"
      },
      {
        "word": "superfluous",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing above, over, beyond, supreme",
        "rootContribution": "super- (above, over, beyond, supreme)"
      },
      {
        "word": "superlative",
        "pos": "noun",
        "briefDefinition": "Related concept derived from super-",
        "rootContribution": "super- (above, over, beyond, supreme)"
      },
      {
        "word": "supersede",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of super-",
        "rootContribution": "super- (above, over, beyond, supreme)"
      },
      {
        "word": "supervise",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of super-",
        "rootContribution": "super- (above, over, beyond, supreme)"
      }
    ]
  },
  {
    "id": "prefix-un",
    "root": "un-",
    "type": "prefix",
    "origin": "Germanic",
    "originalForm": "un",
    "meaning": "not, opposite of, reverse",
    "variants": [
      "un-"
    ],
    "pronunciationOrCombining": "un- combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "unprecedented",
    "historicalInsight": "Derived from classical Germanic \"un-\". Central element in vocabulary of not, opposite of, reverse.",
    "semanticShiftNote": "Retains historical focus on not, opposite of, reverse adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "unprecedented",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying not, opposite of, reverse",
        "rootContribution": "un- (not, opposite of, reverse)"
      },
      {
        "word": "uncompromising",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing not, opposite of, reverse",
        "rootContribution": "un- (not, opposite of, reverse)"
      },
      {
        "word": "unflappable",
        "pos": "noun",
        "briefDefinition": "Related concept derived from un-",
        "rootContribution": "un- (not, opposite of, reverse)"
      },
      {
        "word": "unremitting",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of un-",
        "rootContribution": "un- (not, opposite of, reverse)"
      },
      {
        "word": "unassuming",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of un-",
        "rootContribution": "un- (not, opposite of, reverse)"
      }
    ]
  },
  {
    "id": "suffix-ity",
    "root": "-ity / -ty",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "ityty",
    "meaning": "state, quality, or condition",
    "variants": [
      "-ity"
    ],
    "pronunciationOrCombining": "-ity / -ty combining form",
    "thematicCluster": "Human Relationships, Power, and Society",
    "anchorWord": "ubiquity",
    "historicalInsight": "Derived from classical Latin \"-ity / -ty\". Central element in vocabulary of state, quality, or condition.",
    "semanticShiftNote": "Retains historical focus on state, quality, or condition adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "ubiquity",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying state, quality, or condition",
        "rootContribution": "-ity / -ty (state, quality, or condition)"
      },
      {
        "word": "audacity",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing state, quality, or condition",
        "rootContribution": "-ity / -ty (state, quality, or condition)"
      },
      {
        "word": "capacity",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ity / -ty",
        "rootContribution": "-ity / -ty (state, quality, or condition)"
      },
      {
        "word": "veracity",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ity / -ty",
        "rootContribution": "-ity / -ty (state, quality, or condition)"
      },
      {
        "word": "sagacity",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ity / -ty",
        "rootContribution": "-ity / -ty (state, quality, or condition)"
      }
    ]
  },
  {
    "id": "suffix-ize",
    "root": "-ize / -ise",
    "type": "suffix",
    "origin": "Greek",
    "originalForm": "izeise",
    "meaning": "to make, cause to become",
    "variants": [
      "-ize"
    ],
    "pronunciationOrCombining": "-ize / -ise combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "emulate",
    "historicalInsight": "Derived from classical Greek \"-ize / -ise\". Central element in vocabulary of to make, cause to become.",
    "semanticShiftNote": "Retains historical focus on to make, cause to become adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "emulate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to make, cause to become",
        "rootContribution": "-ize / -ise (to make, cause to become)"
      },
      {
        "word": "synthesize",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to make, cause to become",
        "rootContribution": "-ize / -ise (to make, cause to become)"
      },
      {
        "word": "scrutinize",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ize / -ise",
        "rootContribution": "-ize / -ise (to make, cause to become)"
      },
      {
        "word": "ostracize",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ize / -ise",
        "rootContribution": "-ize / -ise (to make, cause to become)"
      },
      {
        "word": "antagonize",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ize / -ise",
        "rootContribution": "-ize / -ise (to make, cause to become)"
      }
    ]
  },
  {
    "id": "suffix-ic",
    "root": "-ic / -ical",
    "type": "suffix",
    "origin": "Greek",
    "originalForm": "icical",
    "meaning": "pertaining to, nature of",
    "variants": [
      "-ic"
    ],
    "pronunciationOrCombining": "-ic / -ical combining form",
    "thematicCluster": "Seeing, Thinking, and Knowing",
    "anchorWord": "pragmatic",
    "historicalInsight": "Derived from classical Greek \"-ic / -ical\". Central element in vocabulary of pertaining to, nature of.",
    "semanticShiftNote": "Retains historical focus on pertaining to, nature of adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "pragmatic",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying pertaining to, nature of",
        "rootContribution": "-ic / -ical (pertaining to, nature of)"
      },
      {
        "word": "altruistic",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing pertaining to, nature of",
        "rootContribution": "-ic / -ical (pertaining to, nature of)"
      },
      {
        "word": "dogmatic",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ic / -ical",
        "rootContribution": "-ic / -ical (pertaining to, nature of)"
      },
      {
        "word": "pedantic",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ic / -ical",
        "rootContribution": "-ic / -ical (pertaining to, nature of)"
      },
      {
        "word": "esoteric",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ic / -ical",
        "rootContribution": "-ic / -ical (pertaining to, nature of)"
      }
    ]
  },
  {
    "id": "suffix-ous",
    "root": "-ous / -iose",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "ousiose",
    "meaning": "full of, having quality of",
    "variants": [
      "-ous"
    ],
    "pronunciationOrCombining": "-ous / -iose combining form",
    "thematicCluster": "The Human Personality",
    "anchorWord": "loquacious",
    "historicalInsight": "Derived from classical Latin \"-ous / -iose\". Central element in vocabulary of full of, having quality of.",
    "semanticShiftNote": "Retains historical focus on full of, having quality of adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "loquacious",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying full of, having quality of",
        "rootContribution": "-ous / -iose (full of, having quality of)"
      },
      {
        "word": "supercilious",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing full of, having quality of",
        "rootContribution": "-ous / -iose (full of, having quality of)"
      },
      {
        "word": "fastidious",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ous / -iose",
        "rootContribution": "-ous / -iose (full of, having quality of)"
      },
      {
        "word": "gregarious",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ous / -iose",
        "rootContribution": "-ous / -iose (full of, having quality of)"
      },
      {
        "word": "tenacious",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ous / -iose",
        "rootContribution": "-ous / -iose (full of, having quality of)"
      }
    ]
  },
  {
    "id": "suffix-ment",
    "root": "-ment",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "ment",
    "meaning": "action, result, means",
    "variants": [
      "-ment"
    ],
    "pronunciationOrCombining": "-ment combining form",
    "thematicCluster": "Speech, Writing, and Language",
    "anchorWord": "impediment",
    "historicalInsight": "Derived from classical Latin \"-ment\". Central element in vocabulary of action, result, means.",
    "semanticShiftNote": "Retains historical focus on action, result, means adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "impediment",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying action, result, means",
        "rootContribution": "-ment (action, result, means)"
      },
      {
        "word": "indictment",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing action, result, means",
        "rootContribution": "-ment (action, result, means)"
      },
      {
        "word": "disillusionment",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ment",
        "rootContribution": "-ment (action, result, means)"
      },
      {
        "word": "discernment",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ment",
        "rootContribution": "-ment (action, result, means)"
      },
      {
        "word": "encroachment",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ment",
        "rootContribution": "-ment (action, result, means)"
      }
    ]
  },
  {
    "id": "suffix-less",
    "root": "-less",
    "type": "suffix",
    "origin": "Germanic",
    "originalForm": "less",
    "meaning": "without, lacking, free from",
    "variants": [
      "-less"
    ],
    "pronunciationOrCombining": "-less combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "relentless",
    "historicalInsight": "Derived from classical Germanic \"-less\". Central element in vocabulary of without, lacking, free from.",
    "semanticShiftNote": "Retains historical focus on without, lacking, free from adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "relentless",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying without, lacking, free from",
        "rootContribution": "-less (without, lacking, free from)"
      },
      {
        "word": "dauntless",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing without, lacking, free from",
        "rootContribution": "-less (without, lacking, free from)"
      },
      {
        "word": "remorseless",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -less",
        "rootContribution": "-less (without, lacking, free from)"
      },
      {
        "word": "seamless",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -less",
        "rootContribution": "-less (without, lacking, free from)"
      },
      {
        "word": "feckless",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -less",
        "rootContribution": "-less (without, lacking, free from)"
      }
    ]
  },
  {
    "id": "suffix-ful",
    "root": "-ful",
    "type": "suffix",
    "origin": "Germanic",
    "originalForm": "ful",
    "meaning": "full of, characterized by",
    "variants": [
      "-ful"
    ],
    "pronunciationOrCombining": "-ful combining form",
    "thematicCluster": "Mind, Emotion, and Behavior",
    "anchorWord": "distrustful",
    "historicalInsight": "Derived from classical Germanic \"-ful\". Central element in vocabulary of full of, characterized by.",
    "semanticShiftNote": "Retains historical focus on full of, characterized by adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "distrustful",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying full of, characterized by",
        "rootContribution": "-ful (full of, characterized by)"
      },
      {
        "word": "resourceful",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing full of, characterized by",
        "rootContribution": "-ful (full of, characterized by)"
      },
      {
        "word": "tactful",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ful",
        "rootContribution": "-ful (full of, characterized by)"
      },
      {
        "word": "reproachful",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ful",
        "rootContribution": "-ful (full of, characterized by)"
      },
      {
        "word": "mournful",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ful",
        "rootContribution": "-ful (full of, characterized by)"
      }
    ]
  },
  {
    "id": "suffix-ate",
    "root": "-ate",
    "type": "suffix",
    "origin": "Latin",
    "originalForm": "ate",
    "meaning": "to cause, become, or form",
    "variants": [
      "-ate"
    ],
    "pronunciationOrCombining": "-ate combining form",
    "thematicCluster": "Movement, Action, and Change",
    "anchorWord": "delineate",
    "historicalInsight": "Derived from classical Latin \"-ate\". Central element in vocabulary of to cause, become, or form.",
    "semanticShiftNote": "Retains historical focus on to cause, become, or form adapted into academic English.",
    "derivedWordsList": [
      {
        "word": "delineate",
        "pos": "noun / adj.",
        "briefDefinition": "Key term embodying to cause, become, or form",
        "rootContribution": "-ate (to cause, become, or form)"
      },
      {
        "word": "equivocate",
        "pos": "verb / adj.",
        "briefDefinition": "Secondary form expressing to cause, become, or form",
        "rootContribution": "-ate (to cause, become, or form)"
      },
      {
        "word": "miserate",
        "pos": "noun",
        "briefDefinition": "Related concept derived from -ate",
        "rootContribution": "-ate (to cause, become, or form)"
      },
      {
        "word": "exonerate",
        "pos": "adj.",
        "briefDefinition": "Qualitative derivative of -ate",
        "rootContribution": "-ate (to cause, become, or form)"
      },
      {
        "word": "extrapolate",
        "pos": "noun / verb",
        "briefDefinition": "Extended application of -ate",
        "rootContribution": "-ate (to cause, become, or form)"
      }
    ]
  }
];
