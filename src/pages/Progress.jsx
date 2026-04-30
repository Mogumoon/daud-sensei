import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, Star, Target, TrendingUp, Award } from 'lucide-react';
import useProgressStore from '../stores/useProgressStore';
import { getLevelName, getXpForLevel, badgesData } from '../data/badges';

export default function Progress() {
  const { xp, level, streak, totalQuizzes, perfectScores, quizHistory, earnedBadges } = useProgressStore();
  const xpNeeded = getXpForLevel(level);
  const xpPercent = Math.min((xp / xpNeeded) * 100, 100);

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="section-title mb-3">📊 Progress Kamu</h1>
          <p className="text-text-muted">Pantau perkembangan belajar bahasa Jepangmu</p>
        </motion.div>

        {/* Level & XP Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="card mb-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">{level}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Level</div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-xl font-bold">{getLevelName(level)}</h2>
                <span className="text-sm text-text-muted font-mono">{xp} / {xpNeeded} XP</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-xs text-text-muted mt-1">{xpNeeded - xp} XP lagi untuk level {level + 1}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="stat-card">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <Flame size={20} className="text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-xs text-text-muted">Hari Streak</div>
          </div>
          <div className="stat-card">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Target size={20} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{totalQuizzes}</div>
            <div className="text-xs text-text-muted">Total Kuis</div>
          </div>
          <div className="stat-card">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Star size={20} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold">{perfectScores}</div>
            <div className="text-xs text-text-muted">Skor Sempurna</div>
          </div>
          <div className="stat-card">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Award size={20} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold">{earnedBadges.length}</div>
            <div className="text-xs text-text-muted">Badge</div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-warning" /> Badge Collection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {badgesData.map((badge) => {
              const earned = earnedBadges.includes(badge.id);
              return (
                <div key={badge.id} className={`card !p-4 text-center transition-all ${earned ? '' : 'opacity-40 grayscale'}`}>
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div className="text-xs font-bold">{badge.name}</div>
                  <div className="text-[10px] text-text-muted mt-1">{badge.description}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quiz History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-accent" /> Riwayat Kuis
          </h3>
          {quizHistory.length === 0 ? (
            <div className="card text-center text-text-muted py-10">
              <p className="text-4xl mb-3">📝</p>
              <p>Belum ada riwayat kuis. Mulai kuis pertamamu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {quizHistory.slice(0, 10).map((h, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="card !p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${h.score === h.total ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-text-muted'}`}>
                      {Math.round((h.score / h.total) * 100)}%
                    </div>
                    <div>
                      <div className="font-medium text-sm capitalize">{h.category}</div>
                      <div className="text-xs text-text-muted">
                        {new Date(h.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{h.score}/{h.total}</div>
                    <div className="text-xs text-accent">+{h.xpEarned} XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
