export const hiraganaData = {
  vowels: [
    { kana: 'あ', romaji: 'a' },
    { kana: 'い', romaji: 'i' },
    { kana: 'う', romaji: 'u' },
    { kana: 'え', romaji: 'e' },
    { kana: 'お', romaji: 'o' },
  ],
  k: [
    { kana: 'か', romaji: 'ka' },
    { kana: 'き', romaji: 'ki' },
    { kana: 'く', romaji: 'ku' },
    { kana: 'け', romaji: 'ke' },
    { kana: 'こ', romaji: 'ko' },
  ],
  s: [
    { kana: 'さ', romaji: 'sa' },
    { kana: 'し', romaji: 'shi' },
    { kana: 'す', romaji: 'su' },
    { kana: 'せ', romaji: 'se' },
    { kana: 'そ', romaji: 'so' },
  ],
  t: [
    { kana: 'た', romaji: 'ta' },
    { kana: 'ち', romaji: 'chi' },
    { kana: 'つ', romaji: 'tsu' },
    { kana: 'て', romaji: 'te' },
    { kana: 'と', romaji: 'to' },
  ],
  n: [
    { kana: 'な', romaji: 'na' },
    { kana: 'に', romaji: 'ni' },
    { kana: 'ぬ', romaji: 'nu' },
    { kana: 'ね', romaji: 'ne' },
    { kana: 'の', romaji: 'no' },
  ],
  h: [
    { kana: 'は', romaji: 'ha' },
    { kana: 'ひ', romaji: 'hi' },
    { kana: 'ふ', romaji: 'fu' },
    { kana: 'へ', romaji: 'he' },
    { kana: 'ほ', romaji: 'ho' },
  ],
  m: [
    { kana: 'ま', romaji: 'ma' },
    { kana: 'み', romaji: 'mi' },
    { kana: 'む', romaji: 'mu' },
    { kana: 'め', romaji: 'me' },
    { kana: 'も', romaji: 'mo' },
  ],
  y: [
    { kana: 'や', romaji: 'ya' },
    { kana: '', romaji: '' },
    { kana: 'ゆ', romaji: 'yu' },
    { kana: '', romaji: '' },
    { kana: 'よ', romaji: 'yo' },
  ],
  r: [
    { kana: 'ら', romaji: 'ra' },
    { kana: 'り', romaji: 'ri' },
    { kana: 'る', romaji: 'ru' },
    { kana: 'れ', romaji: 're' },
    { kana: 'ろ', romaji: 'ro' },
  ],
  w: [
    { kana: 'わ', romaji: 'wa' },
    { kana: '', romaji: '' },
    { kana: '', romaji: '' },
    { kana: '', romaji: '' },
    { kana: 'を', romaji: 'wo' },
  ],
  nn: [
    { kana: 'ん', romaji: 'n' },
  ],
};

export const allHiragana = Object.values(hiraganaData)
  .flat()
  .filter(item => item.kana !== '');

export const hiraganaRows = ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', 'nn'];
export const hiraganaRowLabels = {
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
