import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const categories = [
  {
    id: 'hiragana',
    title: 'Hiragana',
    subtitle: 'ひらがな',
    description: '46 huruf dasar bahasa Jepang. Fondasi utama untuk belajar bahasa Jepang.',
    icon: 'あ',
    color: 'from-red-400 to-rose-500',
    items: 46,
  },
  {
    id: 'katakana',
    title: 'Katakana',
    subtitle: 'カタカナ',
    description: 'Huruf untuk kata serapan asing. Penting untuk membaca menu, nama, dan brand.',
    icon: 'ア',
    color: 'from-blue-400 to-indigo-500',
    items: 46,
  },
  {
    id: 'vocabulary',
    title: 'Kosakata N5',
    subtitle: '語彙',
    description: 'Kosakata dasar level JLPT N5. Salam, angka, kata kerja, dan kata sifat.',
    icon: '📚',
    color: 'from-green-400 to-emerald-500',
    items: 50,
  },
  {
    id: 'grammar',
    title: 'Tata Bahasa',
    subtitle: '文法',
    description: 'Pola grammar dasar N5-N4. Partikel, bentuk kata kerja, dan struktur kalimat.',
    icon: '📝',
    color: 'from-purple-400 to-violet-500',
    items: 12,
    comingSoon: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Learn() {
  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title mb-3">📖 Materi Pembelajaran</h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Pilih kategori materi yang ingin kamu pelajari. Mulai dari huruf dasar sampai grammar!
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={item}>
              {cat.comingSoon ? (
                <div className="card relative overflow-hidden opacity-60 cursor-not-allowed">
                  <div className="absolute top-4 right-4 badge-pill bg-gray-100 text-text-muted text-xs">
                    Coming Soon
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 text-white text-2xl`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{cat.title}</h3>
                  <p className="text-sm text-text-muted font-mono mb-2">{cat.subtitle}</p>
                  <p className="text-text-muted text-sm">{cat.description}</p>
                </div>
              ) : (
                <Link to={`/learn/${cat.id}`} className="card group relative overflow-hidden hover:-translate-y-1 block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                      </div>
                      <span className="badge-pill bg-gray-50 text-text-muted text-xs">
                        {cat.items} item
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-text-muted font-mono mb-2">{cat.subtitle}</p>
                    <p className="text-text-muted text-sm mb-4">{cat.description}</p>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      Pelajari
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-accent/5 border border-accent/10 rounded-2xl p-6"
        >
          <h3 className="font-bold text-accent mb-3 flex items-center gap-2">
            <CheckCircle size={20} />
            Tips Belajar
          </h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Mulai dari Hiragana — ini adalah fondasi semua bacaan bahasa Jepang.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Latihan setiap hari walau cuma 10 menit. Konsistensi lebih penting dari durasi!
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Setelah menguasai huruf, langsung coba kuis untuk memperkuat ingatan.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
