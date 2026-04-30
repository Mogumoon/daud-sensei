import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Timer, Trophy, ArrowRight, RotateCcw, Home, Zap, Clock, CheckCircle, XCircle } from 'lucide-react';
import useQuizStore from '../stores/useQuizStore';
import useProgressStore from '../stores/useProgressStore';
import { quizCategories, getQuizQuestions } from '../data/quizzes';

function ConfettiEffect() {
  const colors = ['#E8533C', '#2C6E8A', '#3A7D44', '#E0A020', '#F4896E', '#9333EA'];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.left}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotation + 720, opacity: 0 }}
          transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeOut' }}
          style={{ position: 'absolute', width: p.size, height: p.size, backgroundColor: p.color, borderRadius: 2 }}
        />
      ))}
    </div>
  );
}

function CategorySelect({ onSelect }) {
  const [searchParams] = useSearchParams();
  const preCategory = searchParams.get('category');

  useEffect(() => {
    if (preCategory && quizCategories.find(c => c.id === preCategory)) {
      onSelect(preCategory, 'practice');
    }
  }, [preCategory]);

  const [mode, setMode] = useState('practice');

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="section-title mb-3">🧠 Kuis Interaktif</h1>
          <p className="text-text-muted text-lg">Pilih kategori dan mode kuis untuk menguji kemampuanmu!</p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-3 mb-10">
          <button onClick={() => setMode('practice')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'practice' ? 'bg-accent text-white shadow-md' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}>
            <Brain size={18} /> Practice
          </button>
          <button onClick={() => setMode('challenge')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${mode === 'challenge' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}>
            <Zap size={18} /> Challenge
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelect(cat.id, mode)}
              className="card group text-left hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm text-text-muted mb-3">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="badge-pill bg-gray-50 text-text-muted text-xs">{cat.totalQuestions} soal tersedia</span>
                <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Mulai <ArrowRight size={14} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {mode === 'challenge' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-xl text-sm">
              <Timer size={16} /> Mode Challenge: 15 detik per soal!
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function QuizQuestion() {
  const { questions, currentIndex, mode, timeLeft, answerQuestion, tick, timeUp } = useQuizStore();
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const question = questions[currentIndex];

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [currentIndex]);

  useEffect(() => {
    if (mode !== 'challenge' || showResult) return;
    if (timeLeft <= 0) { timeUp(); return; }
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, mode, showResult]);

  const handleSelect = (option) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    setTimeout(() => answerQuestion(option), 1200);
  };

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>Soal {currentIndex + 1} / {questions.length}</span>
            {mode === 'challenge' && (
              <span className={`flex items-center gap-1 font-mono font-bold ${timeLeft <= 5 ? 'text-primary animate-pulse' : 'text-accent'}`}>
                <Clock size={14} /> {timeLeft}s
              </span>
            )}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="card mb-6 text-center"
          >
            <p className="text-sm text-text-muted mb-4">{question.questionLabel}</p>
            <div className="text-6xl md:text-7xl font-display text-primary mb-2">{question.question}</div>
            {question.questionSub && <div className="text-lg text-text-muted">{question.questionSub}</div>}
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let cls = 'quiz-option';
            if (showResult) {
              if (option === question.correctAnswer) cls += ' correct';
              else if (option === selected) cls += ' incorrect';
            } else if (option === selected) {
              cls += ' selected';
            }
            return (
              <motion.button
                key={`${currentIndex}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={cls}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && option === question.correctAnswer && <CheckCircle size={20} className="text-success" />}
                  {showResult && option === selected && option !== question.correctAnswer && <XCircle size={20} className="text-red-500" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QuizResult() {
  const { score, questions, answers, currentQuiz, mode, resetQuiz } = useQuizStore();
  const { addXp, recordQuiz, earnBadge } = useProgressStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const xpEarned = score * 10 + (mode === 'challenge' ? score * 5 : 0);
  const isPerfect = score === total;

  useEffect(() => {
    addXp(xpEarned);
    recordQuiz({ category: currentQuiz, score, total, xpEarned, mode });
    if (isPerfect) {
      setShowConfetti(true);
      earnBadge('perfect-score');
      if (currentQuiz === 'hiragana') earnBadge('hiragana-master');
      if (currentQuiz === 'katakana') earnBadge('katakana-master');
    }
    earnBadge('first-quiz');
  }, []);

  const wrongAnswers = answers.filter(a => !a.isCorrect);

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      {showConfetti && <ConfettiEffect />}
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card text-center mb-8">
          <div className="text-6xl mb-4">{isPerfect ? '🎉' : percentage >= 70 ? '👏' : '💪'}</div>
          <h2 className="text-3xl font-display font-bold mb-2">
            {isPerfect ? 'Kanpeki! 完璧！' : percentage >= 70 ? 'Yoku dekimashita!' : 'Ganbatte!'}
          </h2>
          <p className="text-text-muted mb-6">
            {isPerfect ? 'Skor sempurna! Kamu luar biasa!' : percentage >= 70 ? 'Bagus! Terus berlatih!' : 'Jangan menyerah, coba lagi!'}
          </p>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="stat-card">
              <Trophy size={24} className="text-warning" />
              <div className="text-3xl font-bold">{score}/{total}</div>
              <div className="text-xs text-text-muted">Skor</div>
            </div>
            <div className="stat-card">
              <Zap size={24} className="text-accent" />
              <div className="text-3xl font-bold text-accent">+{xpEarned}</div>
              <div className="text-xs text-text-muted">XP</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl">{percentage >= 70 ? '⭐' : '📊'}</div>
              <div className="text-3xl font-bold">{percentage}%</div>
              <div className="text-xs text-text-muted">Akurasi</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
              <RotateCcw size={18} /> Kuis Lagi
            </button>
            <Link to="/" className="btn-outline flex items-center gap-2">
              <Home size={18} /> Home
            </Link>
          </div>
        </motion.div>

        {wrongAnswers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <XCircle size={20} className="text-red-400" /> Review Jawaban Salah
            </h3>
            <div className="space-y-3">
              {wrongAnswers.map((a, i) => {
                const q = questions.find(q => q.id === a.questionId);
                return (
                  <div key={i} className="card !p-4 border-l-4 border-red-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display text-xl text-primary">{q?.question}</div>
                        <div className="text-sm text-text-muted mt-1">
                          Jawabanmu: <span className="text-red-500 font-medium">{a.answer || '(tidak dijawab)'}</span>
                        </div>
                        <div className="text-sm text-text-muted">
                          Benar: <span className="text-success font-medium">{a.correct}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Quiz() {
  const { currentQuiz, isFinished, startQuiz, questions } = useQuizStore();

  const handleSelect = useCallback((categoryId, mode) => {
    const qs = getQuizQuestions(categoryId, 10);
    startQuiz(categoryId, qs, mode);
  }, [startQuiz]);

  if (!currentQuiz) return <CategorySelect onSelect={handleSelect} />;
  if (isFinished) return <QuizResult />;
  return <QuizQuestion />;
}
