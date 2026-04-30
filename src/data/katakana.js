export const katakanaData = {
  vowels: [
    { kana: 'ア', romaji: 'a' },
    { kana: 'イ', romaji: 'i' },
    { kana: 'ウ', romaji: 'u' },
    { kana: 'エ', romaji: 'e' },
    { kana: 'オ', romaji: 'o' },
  ],
  k: [
    { kana: 'カ', romaji: 'ka' },
    { kana: 'キ', romaji: 'ki' },
    { kana: 'ク', romaji: 'ku' },
    { kana: 'ケ', romaji: 'ke' },
    { kana: 'コ', romaji: 'ko' },
  ],
  s: [
    { kana: 'サ', romaji: 'sa' },
    { kana: 'シ', romaji: 'shi' },
    { kana: 'ス', romaji: 'su' },
    { kana: 'セ', romaji: 'se' },
    { kana: 'ソ', romaji: 'so' },
  ],
  t: [
    { kana: 'タ', romaji: 'ta' },
    { kana: 'チ', romaji: 'chi' },
    { kana: 'ツ', romaji: 'tsu' },
    { kana: 'テ', romaji: 'te' },
    { kana: 'ト', romaji: 'to' },
  ],
  n: [
    { kana: 'ナ', romaji: 'na' },
    { kana: 'ニ', romaji: 'ni' },
    { kana: 'ヌ', romaji: 'nu' },
    { kana: 'ネ', romaji: 'ne' },
    { kana: 'ノ', romaji: 'no' },
  ],
  h: [
    { kana: 'ハ', romaji: 'ha' },
    { kana: 'ヒ', romaji: 'hi' },
    { kana: 'フ', romaji: 'fu' },
    { kana: 'ヘ', romaji: 'he' },
    { kana: 'ホ', romaji: 'ho' },
  ],
  m: [
    { kana: 'マ', romaji: 'ma' },
    { kana: 'ミ', romaji: 'mi' },
    { kana: 'ム', romaji: 'mu' },
    { kana: 'メ', romaji: 'me' },
    { kana: 'モ', romaji: 'mo' },
  ],
  y: [
    { kana: 'ヤ', romaji: 'ya' },
    { kana: '', romaji: '' },
    { kana: 'ユ', romaji: 'yu' },
    { kana: '', romaji: '' },
    { kana: 'ヨ', romaji: 'yo' },
  ],
  r: [
    { kana: 'ラ', romaji: 'ra' },
    { kana: 'リ', romaji: 'ri' },
    { kana: 'ル', romaji: 'ru' },
    { kana: 'レ', romaji: 're' },
    { kana: 'ロ', romaji: 'ro' },
  ],
  w: [
    { kana: 'ワ', romaji: 'wa' },
    { kana: '', romaji: '' },
    { kana: '', romaji: '' },
    { kana: '', romaji: '' },
    { kana: 'ヲ', romaji: 'wo' },
  ],
  nn: [
    { kana: 'ン', romaji: 'n' },
  ],
};

export const allKatakana = Object.values(katakanaData)
  .flat()
  .filter(item => item.kana !== '');

export const katakanaRows = ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'nn'];
export const katakanaRowLabels = {
  vowels: 'Vokal',
  k: 'K-row',
  s: 'S-row',
  t: 'T-row',
  n: 'N-row',
  h: 'H-row',
  m: 'M-row',
  y: 'Y-row',
  r: 'R-row',
  w: 'W-row',
  nn: 'N',
};
