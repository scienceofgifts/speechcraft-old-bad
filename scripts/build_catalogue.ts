import fs from 'fs';
import path from 'path';
import { DETAILED_WORD_LESSONS, WORD_ROOTS } from '../src/data/vocabBuilderData';
import { VocabularyCatalogueItem } from '../src/types/speech';
import { ADDITIONAL_VOCAB_ENTRIES } from './vocabEntriesBank';

console.log(`Preserved detailed lessons count: ${DETAILED_WORD_LESSONS.length}`);
console.log(`Word roots count: ${WORD_ROOTS.length}`);

// Valid root IDs set
const validRootIds = new Set(WORD_ROOTS.map(r => r.id));

const catalogue: VocabularyCatalogueItem[] = [];
const seenHeadwords = new Set<string>();

// 1. Add all 36 preserved detailed lessons first with their EXACT IDs ('lesson-1' ... 'lesson-36')
DETAILED_WORD_LESSONS.forEach(lesson => {
  const normWord = lesson.word.trim().toLowerCase();
  seenHeadwords.add(normWord);
  
  let rootId: string | undefined = undefined;
  if (lesson.etymology?.rootId && validRootIds.has(lesson.etymology.rootId)) {
    rootId = lesson.etymology.rootId;
  }
  
  catalogue.push({
    id: lesson.id,
    word: lesson.word,
    partOfSpeech: lesson.partOfSpeech,
    definition: lesson.shortGloss,
    difficulty: lesson.difficulty,
    topicTags: [lesson.register || 'General', 'Rhetoric & Speech'],
    rootId,
    hasDetailedLesson: true
  });
});

console.log(`Added ${catalogue.length} preserved detailed lessons.`);

// 2. Add derived words from roots with verified rootId
WORD_ROOTS.forEach(rootItem => {
  if (rootItem.derivedWordsList && Array.isArray(rootItem.derivedWordsList)) {
    rootItem.derivedWordsList.forEach(derived => {
      const normWord = derived.word.trim().toLowerCase();
      if (!seenHeadwords.has(normWord)) {
        seenHeadwords.add(normWord);
        
        let pos = derived.pos || 'noun';
        if (pos.includes('adj')) pos = 'adjective';
        else if (pos.includes('verb')) pos = 'verb';
        else if (pos.includes('noun')) pos = 'noun';

        catalogue.push({
          id: `cat-${catalogue.length + 1}`,
          word: derived.word,
          partOfSpeech: pos,
          definition: derived.briefDefinition,
          difficulty: 'Intermediate',
          topicTags: ['Etymology & Roots', rootItem.thematicCluster || 'Word Families'],
          rootId: rootItem.id,
          hasDetailedLesson: false
        });
      }
    });
  }
});

console.log(`Catalogue size after root derived words: ${catalogue.length}`);

// 3. Add entries from ADDITIONAL_VOCAB_ENTRIES
ADDITIONAL_VOCAB_ENTRIES.forEach(entry => {
  const normWord = entry.word.trim().toLowerCase();
  if (!seenHeadwords.has(normWord)) {
    seenHeadwords.add(normWord);
    catalogue.push({
      id: `cat-${catalogue.length + 1}`,
      word: entry.word,
      partOfSpeech: entry.partOfSpeech,
      definition: entry.definition,
      difficulty: entry.difficulty,
      topicTags: entry.topicTags,
      rootId: entry.rootId && validRootIds.has(entry.rootId) ? entry.rootId : undefined,
      hasDetailedLesson: false
    });
  }
});

console.log(`Final catalogue size: ${catalogue.length}`);

// Write src/data/vocabularyCatalogue.ts
const outputPath = path.join(process.cwd(), 'src', 'data', 'vocabularyCatalogue.ts');
const fileContent = `// Scalable Vocabulary Catalogue Seed with over 1,000 unique curated English words.
// Preserves all 36 detailed lessons from vocabBuilderData.ts with original IDs.
import { VocabularyCatalogueItem } from '../types/speech';

export const VOCABULARY_CATALOGUE: VocabularyCatalogueItem[] = ${JSON.stringify(catalogue, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully written catalogue to ${outputPath}`);

// Validation report
const totalRecords = catalogue.length;
const uniqueIds = new Set(catalogue.map(c => c.id)).size;
const uniqueHeadwords = new Set(catalogue.map(c => c.word.trim().toLowerCase())).size;
const emptyDefs = catalogue.filter(c => !c.definition || !c.definition.trim()).length;
const preservedCount = catalogue.filter(c => c.hasDetailedLesson).length;
const validDifficulties = catalogue.filter(c => ['Foundational', 'Intermediate', 'Advanced', 'Mastery'].includes(c.difficulty)).length;
const verifiedRootsCount = catalogue.filter(c => !!c.rootId && validRootIds.has(c.rootId)).length;

console.log('\n================ VALIDATION REPORT ================');
console.log(`Total Record Count:          ${totalRecords}`);
console.log(`Unique Record IDs:           ${uniqueIds}`);
console.log(`Unique Headwords:            ${uniqueHeadwords}`);
console.log(`Empty Definitions:           ${emptyDefs}`);
console.log(`Preserved Detailed Lessons:  ${preservedCount}`);
console.log(`Verified Root References:    ${verifiedRootsCount}`);
console.log(`Valid Difficulty Levels:     ${validDifficulties}/${totalRecords}`);
console.log('====================================================\n');

if (totalRecords >= 1000 && uniqueIds === totalRecords && uniqueHeadwords === totalRecords && emptyDefs === 0 && preservedCount === 36 && validDifficulties === totalRecords && verifiedRootsCount >= 100) {
  console.log('✅ VALIDATION PASSED: All Phase 1 requirements met successfully!');
  process.exit(0);
} else {
  console.error('❌ VALIDATION FAILED!');
  process.exit(1);
}
