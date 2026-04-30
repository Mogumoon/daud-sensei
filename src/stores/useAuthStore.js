import { create } from 'zustand';
import api from '../lib/axios';
import useProgressStore from './useProgressStore';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('daud-user') || 'null'),
  isGuest: !localStorage.getItem('daud-user'),

  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      localStorage.setItem('daud-user', JSON.stringify(response.data));
      set({ user: response.data, isGuest: false });
      
      // Sync progress from backend
      const progressStore = useProgressStore.getState();
      await progressStore.fetchProgress();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login gagal' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('daud-user', JSON.stringify(response.data));
      set({ user: response.data, isGuest: false });
      
      // Sync local guest progress to backend
      const progressStore = useProgressStore.getState();
      await progressStore.syncToBackend();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Register gagal' };
    }
  },

  logout: () => {
    localStorage.removeItem('daud-user');
    set({ user: null, isGuest: true });
    // Reset progress to guest mode
    useProgressStore.getState().resetProgress();
  },
}));

export default useAuthStore;
