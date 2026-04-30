import { create } from 'zustand';
import api from '../lib/axios';
import { getXpForLevel } from '../data/badges';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('daud-progress')) || defaultProgress();
  } catch { return defaultProgress(); }
}

function defaultProgress() {
  return { xp: 0, level: 1, streak: 0, lastQuizDate: null, quizHistory: [], earnedBadges: [], totalQuizzes: 0, perfectScores: 0 };
}

function saveProgress(progress) {
  localStorage.setItem('daud-progress', JSON.stringify(progress));
}

const useProgressStore = create((set, get) => ({
  ...loadProgress(),

  addXp: (amount) => {
    set((state) => {
      let { xp, level } = state;
      xp += amount;
      while (xp >= getXpForLevel(level)) {
        xp -= getXpForLevel(level);
        level++;
      }
      const newState = { ...state, xp, level };
      saveProgress(newState);
      
      // If logged in, sync to backend
      if (localStorage.getItem('daud-user')) {
        api.post('/progress/sync', { xpToAdd: amount }).catch(console.error);
      }
      
      return newState;
    });
  },

  recordQuiz: (result) => {
    set((state) => {
      const today = new Date().toDateString();
      const lastDate = state.lastQuizDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let streak = state.streak;
      if (lastDate === yesterday) streak += 1;
      else if (lastDate !== today) streak = 1;

      const isPerfect = result.score === result.total;
      const newState = {
        ...state,
        streak,
        lastQuizDate: today,
        totalQuizzes: state.totalQuizzes + 1,
        perfectScores: state.perfectScores + (isPerfect ? 1 : 0),
        quizHistory: [{ ...result, date: new Date().toISOString() }, ...state.quizHistory].slice(0, 50),
      };
      saveProgress(newState);
      
      if (localStorage.getItem('daud-user')) {
        api.post('/progress/sync', { quizzes: [result] }).catch(console.error);
      }
      
      return newState;
    });
  },

  earnBadge: (badgeId) => {
    set((state) => {
      if (state.earnedBadges.includes(badgeId)) return state;
      const newState = { ...state, earnedBadges: [...state.earnedBadges, badgeId] };
      saveProgress(newState);
      
      if (localStorage.getItem('daud-user')) {
        api.post('/progress/sync', { badges: [badgeId] }).catch(console.error);
      }
      
      return newState;
    });
  },

  resetProgress: () => {
    const fresh = defaultProgress();
    saveProgress(fresh);
    set(fresh);
  },

  fetchProgress: async () => {
    try {
      const res = await api.get('/progress');
      const data = res.data;
      const newState = {
        ...get(),
        xp: data.xp,
        level: data.level,
        streak: data.streak,
        quizHistory: data.quizHistory,
        earnedBadges: data.earnedBadges,
        totalQuizzes: data.quizHistory.length,
        perfectScores: data.quizHistory.filter(q => q.score === q.totalQ).length
      };
      saveProgress(newState);
      set(newState);
    } catch (error) {
      console.error('Failed to fetch progress', error);
    }
  },

  syncToBackend: async () => {
    try {
      const state = get();
      await api.post('/progress/sync', {
        xpToAdd: state.xp,
        quizzes: state.quizHistory,
        badges: state.earnedBadges
      });
    } catch (error) {
      console.error('Failed to sync progress', error);
    }
  }
}));

export default useProgressStore;
