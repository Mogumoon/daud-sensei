import { allHiragana } from './hiragana';
import { allKatakana } from './katakana';
import { vocabularyData } from './vocabulary';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateKanaQuiz(kanaList, type) {
  return kanaList.map((item) => {
    const others = kanaList.filter(k => k.romaji !== item.romaji);
    const wrongAnswers = shuffle(others).slice(0, 3).map(k => k.romaji);
    const options = shuffle([item.romaji, ...wrongAnswers]);
    return {
      id: `${type}-${item.kana}`,
      type,
      question: item.kana,
      questionLabel: `Apa romaji dari "${item.kana}"?`,
      correctAnswer: item.romaji,
      options,
    };
  });
}

function generateVocabQuiz() {
  return vocabularyData.map((item) => {
    const others = vocabularyData.filter(v => v.id !== item.id);
    const wrongAnswers = shuffle(others).slice(0, 3).map(v => v.meaning);
    const options = shuffle([item.meaning, ...wrongAnswers]);
    return {
      id: `vocab-${item.id}`,
      type: 'vocabulary',
      question: item.kana,
      questionSub: item.kanji || null,
      questionLabel: `Apa arti dari "${item.kana}"?`,
      correctAnswer: item.meaning,
      options,
    };
  });
}

function generateReverseVocabQuiz() {
  return vocabularyData.map((item) => {
    const others = vocabularyData.filter(v => v.id !== item.id);
    const wrongAnswers = shuffle(others).slice(0, 3).map(v => v.kana);
    const options = shuffle([item.kana, ...wrongAnswers]);
    return {
      id: `vocab-rev-${item.id}`,
      type: 'vocabulary-reverse',
      question: item.meaning,
      questionLabel: `Apa bahasa Jepang dari "${item.meaning}"?`,
      correctAnswer: item.kana,
      options,
    };
  });
}

export const quizCategories = [
  { id: 'hiragana', title: 'Hiragana', description: 'Tebak romaji dari huruf Hiragana', icon: 'あ', color: 'from-red-400 to-pink-500', totalQuestions: allHiragana.length },
  { id: 'katakana', title: 'Katakana', description: 'Tebak romaji dari huruf Katakana', icon: 'ア', color: 'from-blue-400 to-cyan-500', totalQuestions: allKatakana.length },
  { id: 'vocabulary', title: 'Kosakata → Arti', description: 'Tebak arti kosakata bahasa Jepang', icon: '📚', color: 'from-green-400 to-emerald-500', totalQuestions: vocabularyData.length },
  { id: 'vocabulary-reverse', title: 'Arti → Kosakata', description: 'Tebak kosakata dari arti Indonesia', icon: '🔄', color: 'from-purple-400 to-violet-500', totalQuestions: vocabularyData.length },
];

export function getQuizQuestions(categoryId, count = 10) {
  let allQuestions;
  switch (categoryId) {
    case 'hiragana': allQuestions = generateKanaQuiz(allHiragana, 'hiragana'); break;
    case 'katakana': allQuestions = generateKanaQuiz(allKatakana, 'katakana'); break;
    case 'vocabulary': allQuestions = generateVocabQuiz(); break;
    case 'vocabulary-reverse': allQuestions = generateReverseVocabQuiz(); break;
    default: allQuestions = [];
  }
  return shuffle(allQuestions).slice(0, count);
}
