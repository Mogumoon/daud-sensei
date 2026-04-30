import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  currentQuiz: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
  isFinished: false,
  mode: 'practice',
  timeLeft: 0,
  timerActive: false,

  startQuiz: (category, questions, mode = 'practice') => {
    set({
      currentQuiz: category,
      questions,
      currentIndex: 0,
      answers: [],
      score: 0,
      isFinished: false,
      mode,
      timeLeft: mode === 'challenge' ? 15 : 0,
      timerActive: mode === 'challenge',
    });
  },

  answerQuestion: (answer) => {
    const { questions, currentIndex, answers, score } = get();
    const current = questions[currentIndex];
    const isCorrect = answer === current.correctAnswer;
    const newAnswers = [...answers, { questionId: current.id, answer, isCorrect, correct: current.correctAnswer }];
    const newScore = isCorrect ? score + 1 : score;
    const isLast = currentIndex >= questions.length - 1;

    set({
      answers: newAnswers,
      score: newScore,
      currentIndex: isLast ? currentIndex : currentIndex + 1,
      isFinished: isLast,
      timeLeft: get().mode === 'challenge' ? 15 : 0,
    });
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1, timeLeft: get().mode === 'challenge' ? 15 : 0 });
    }
  },

  timeUp: () => {
    const { questions, currentIndex, answers, score } = get();
    const current = questions[currentIndex];
    const newAnswers = [...answers, { questionId: current.id, answer: null, isCorrect: false, correct: current.correctAnswer }];
    const isLast = currentIndex >= questions.length - 1;
    set({ answers: newAnswers, currentIndex: isLast ? currentIndex : currentIndex + 1, isFinished: isLast, timeLeft: 15 });
  },

  tick: () => set((s) => ({ timeLeft: Math.max(0, s.timeLeft - 1) })),

  resetQuiz: () => set({
    currentQuiz: null, questions: [], currentIndex: 0, answers: [], score: 0, isFinished: false, mode: 'practice', timeLeft: 0, timerActive: false,
  }),
}));

export default useQuizStore;
