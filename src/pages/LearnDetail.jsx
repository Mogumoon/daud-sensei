import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain } from 'lucide-react';
import { hiraganaData, hiraganaRows, hiraganaRowLabels } from '../data/hiragana';
import { katakanaData, katakanaRows, katakanaRowLabels } from '../data/katakana';
import { vocabularyData, vocabCategories } from '../data/vocabulary';
import { useState } from 'react';

function KanaGrid({ data, rows, labels }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row}>
          <div className="text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">{labels[row]}</div>
          <div className={`grid gap-2 ${row === 'nn' ? 'grid-cols-1 max-w-[80px]' : 'grid-cols-5'}`}>
            {data[row].map((item, i) => (
              item.kana ? (
                <motion.button
                  key={`${row}-${i}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(selected?.kana === item.kana ? null : item)}
                  className={`kana-cell ${selected?.kana === item.kana ? 'active !border-primary !bg-primary/5 ring-2 ring-primary/20' : ''}`}
                >
                  <span className="text-2xl md:text-3xl font-display">{item.kana}</span>
                  <span className="text-xs text-text-muted font-mono">{item.romaji}</span>
                </motion.button>
              ) : (
                <div key={`${row}-${i}`} className="p-2" />
              )
            ))}
          </div>
        </div>
      ))}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-5 flex items-center gap-6 z-50"
        >
          <span className="text-5xl font-display text-primary">{selected.kana}</span>
          <div>
            <div className="text-2xl font-mono font-bold">{selected.romaji}</div>
            <div className="text-sm text-text-muted">Klik huruf lain atau klik lagi untuk menutup</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function VocabSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [flipped, setFlipped] = useState({});

  const filtered = activeCategory === 'all'
    ? vocabularyData
    : vocabularyData.filter(v => v.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`badge-pill transition-all ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}
        >
          Semua
        </button>
        {vocabCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`badge-pill transition-all ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((vocab) => (
          <motion.div
            key={vocab.id}
            whileHover={{ y: -2 }}
            onClick={() => setFlipped(p => ({ ...p, [vocab.id]: !p[vocab.id] }))}
            className="card cursor-pointer group"
          >
            {!flipped[vocab.id] ? (
              <div className="text-center">
                <div className="text-3xl font-display mb-2 text-primary">{vocab.kana}</div>
                {vocab.kanji && <div className="text-lg text-text-muted mb-1">{vocab.kanji}</div>}
                <div className="text-xs text-text-muted">Tap untuk lihat arti</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg font-bold mb-1">{vocab.meaning}</div>
                <div className="font-mono text-sm text-accent">{vocab.romaji}</div>
                <div className="text-sm text-text-muted mt-1">{vocab.kana} {vocab.kanji && `(${vocab.kanji})`}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const pageInfo = {
  hiragana: { title: 'Hiragana', subtitle: 'ひらがな', desc: 'Huruf dasar bahasa Jepang yang digunakan untuk kata asli Jepang.', color: 'from-red-400 to-rose-500' },
  katakana: { title: 'Katakana', subtitle: 'カタカナ', desc: 'Huruf untuk kata serapan asing, nama, dan onomatope.', color: 'from-blue-400 to-indigo-500' },
  vocabulary: { title: 'Kosakata N5', subtitle: '語彙', desc: 'Kosakata dasar level JLPT N5 yang wajib dikuasai.', color: 'from-green-400 to-emerald-500' },
};

export default function LearnDetail() {
  const { category } = useParams();
  const info = pageInfo[category];

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Kategori tidak ditemukan</h2>
          <Link to="/learn" className="text-primary hover:underline">Kembali ke materi</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/learn" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main mb-6 transition-colors">
            <ArrowLeft size={18} /> Kembali ke Materi
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white text-lg shadow-md`}>
                  {info.subtitle[0]}
                </div>
                <div>
                  <h1 className="text-3xl font-display font-bold">{info.title}</h1>
                  <p className="text-sm font-mono text-text-muted">{info.subtitle}</p>
                </div>
              </div>
              <p className="text-text-muted">{info.desc}</p>
            </div>
            <Link to={`/quiz?category=${category}`} className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Brain size={18} /> Mulai Kuis
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {category === 'hiragana' && (
            <KanaGrid data={hiraganaData} rows={hiraganaRows} labels={hiraganaRowLabels} />
          )}
          {category === 'katakana' && (
            <KanaGrid data={katakanaData} rows={katakanaRows} labels={katakanaRowLabels} />
          )}
          {category === 'vocabulary' && <VocabSection />}
        </motion.div>
      </div>
    </div>
  );
}
