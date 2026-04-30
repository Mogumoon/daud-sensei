import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, MessageCircle, BarChart3, Sparkles, ArrowRight, Flame } from 'lucide-react';
import useProgressStore from '../stores/useProgressStore';
import { getLevelName } from '../data/badges';

const features = [
  {
    icon: BookOpen,
    title: 'Materi Lengkap',
    description: 'Hiragana, Katakana, Kosakata, dan Grammar dari level N5 sampai N4.',
    color: 'bg-blue-50 text-blue-600',
    link: '/learn',
  },
  {
    icon: Brain,
    title: 'Kuis Interaktif',
    description: 'Uji kemampuanmu dengan kuis pilihan ganda, mode Practice & Challenge.',
    color: 'bg-green-50 text-green-600',
    link: '/quiz',
  },
  {
    icon: MessageCircle,
    title: 'Tanya Sensei',
    description: 'Tanya langsung ke AI tentang grammar, kosakata, atau apapun soal Jepang.',
    color: 'bg-purple-50 text-purple-600',
    link: '/ask',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Pantau XP, level, streak harian, dan badge yang sudah kamu raih.',
    color: 'bg-orange-50 text-orange-600',
    link: '/progress',
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

export default function Home() {
  const { level, streak } = useProgressStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Background decorations */}
        <div className="absolute inset-0 jp-pattern opacity-50" />
        <div className="absolute top-20 right-10 text-8xl opacity-5 select-none font-display">日本語</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-5 select-none font-display">学ぶ</div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="text-7xl md:text-8xl block mb-4 animate-float">⛩️</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            Belajar Bahasa Jepang
            <br />
            <span className="gradient-text">Jadi Menyenangkan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10"
          >
            Pelajari Hiragana, Katakana, Kosakata, dan Grammar dengan kuis interaktif
            dan bantuan AI. Mulai perjalananmu menuju JLPT sekarang!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/learn" className="btn-primary text-lg flex items-center gap-2 group">
              Mulai Belajar
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/quiz" className="btn-outline text-lg flex items-center gap-2">
              <Brain size={20} />
              Coba Kuis
            </Link>
          </motion.div>

          {/* Quick stats */}
          {(level > 1 || streak > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 inline-flex items-center gap-6 bg-white/80 backdrop-blur px-6 py-3 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-warning" />
                <span className="text-sm font-medium">Level {level} — {getLevelName(level)}</span>
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-primary animate-streak-flame" />
                  <span className="text-sm font-medium">{streak} hari streak</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:py-24 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-3">Fitur Unggulan</h2>
            <p className="text-text-muted text-lg">Semua yang kamu butuhkan untuk belajar bahasa Jepang</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={item}>
                <Link
                  to={feature.link}
                  className="card group flex gap-5 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Kana Preview */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-3">Mulai dari Dasar</h2>
            <p className="text-text-muted text-lg mb-10">
              Kuasai Hiragana dan Katakana — pondasi bahasa Jepang
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-5 gap-3 max-w-md mx-auto mb-8"
          >
            {['あ', 'い', 'う', 'え', 'お'].map((char, i) => (
              <motion.div
                key={char}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="kana-cell !p-4 hover:!border-primary"
              >
                <span className="text-3xl font-display text-primary">{char}</span>
                <span className="text-xs text-text-muted font-mono mt-1">
                  {['a', 'i', 'u', 'e', 'o'][i]}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
          >
            Lihat semua materi
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-accent rounded-3xl p-10 md:p-16 text-white shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Siap Mulai Belajar? 🚀
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Gabung ribuan learner yang sudah belajar bahasa Jepang dengan Daud Sensei.
            Gratis, tanpa perlu login!
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg text-lg group"
          >
            Mulai Sekarang
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
