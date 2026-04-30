export const badgesData = [
  { id: 'hiragana-master', name: 'Hiragana Master', icon: '🅰️', description: 'Selesaikan kuis Hiragana dengan skor sempurna', condition: 'perfect_hiragana' },
  { id: 'katakana-master', name: 'Katakana Master', icon: '🔤', description: 'Selesaikan kuis Katakana dengan skor sempurna', condition: 'perfect_katakana' },
  { id: 'vocab-beginner', name: 'Kosakata Pemula', icon: '📖', description: 'Selesaikan 5 kuis kosakata', condition: 'vocab_5' },
  { id: 'first-quiz', name: 'Langkah Pertama', icon: '🎯', description: 'Selesaikan kuis pertamamu', condition: 'first_quiz' },
  { id: 'streak-3', name: 'On Fire!', icon: '🔥', description: 'Raih streak 3 hari berturut-turut', condition: 'streak_3' },
  { id: 'streak-7', name: 'Samurai Tekun', icon: '⚔️', description: 'Raih streak 7 hari berturut-turut', condition: 'streak_7' },
  { id: 'xp-100', name: 'Centurion', icon: '💯', description: 'Kumpulkan 100 XP', condition: 'xp_100' },
  { id: 'xp-500', name: 'Shogun Muda', icon: '🏯', description: 'Kumpulkan 500 XP', condition: 'xp_500' },
  { id: 'perfect-score', name: 'Kanpeki!', icon: '🌟', description: 'Raih skor sempurna di kuis apapun', condition: 'any_perfect' },
  { id: 'speed-demon', name: 'Hayai!', icon: '⚡', description: 'Selesaikan kuis Challenge dalam 30 detik', condition: 'speed_30s' },
];

export const levelNames = [
  'Pemula', 'Murid', 'Pelajar', 'Praktikan', 'Chuukyuu',
  'Jukurensha', 'Sensei Muda', 'Sensei', 'Master', 'Shogun',
];

export function getLevelName(level) {
  return levelNames[Math.min(level - 1, levelNames.length - 1)] || 'Shogun';
}

export function getXpForLevel(level) {
  return level * 100;
}
