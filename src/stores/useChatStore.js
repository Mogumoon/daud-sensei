import { create } from 'zustand';
import api from '../lib/axios';

const useChatStore = create((set, get) => ({
  messages: [{ 
    role: 'assistant', 
    content: 'Konnichiwa! 🎌 Saya **Daud Sensei**, guru bahasa Jepangmu.\n\nAda yang ingin kamu tanyakan tentang bahasa Jepang? Tanya aja, jangan malu! 😊\n\n*Tip: Kamu bisa bertanya tentang tata bahasa, kosakata, kanji, atau budaya Jepang.*', 
    timestamp: Date.now() 
  }],
  isLoading: false,
  error: null,

  sendMessage: async (content) => {
    const userMsg = { role: 'user', content, timestamp: Date.now() };
    set((s) => ({ 
      messages: [...s.messages, userMsg], 
      isLoading: true, 
      error: null 
    }));

    try {
      const response = await api.post('/ai/chat', {
        messages: [...get().messages, userMsg]
      });
      
      const assistantMsg = { 
        role: 'assistant', 
        content: response.data.response, 
        timestamp: Date.now() 
      };
      
      set((s) => ({ 
        messages: [...s.messages, assistantMsg], 
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi nanti ya! 🙇‍♂️';
      
      if (error.response?.status === 429) {
        errorMessage = 'Terlalu banyak permintaan. Tunggu sebentar ya! ⏰';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server sedang bermasalah. Coba lagi dalam beberapa menit! 🔧';
      } else if (!navigator.onLine) {
        errorMessage = 'Koneksi internet terputus. Periksa koneksi Anda! 📶';
      }
      
      const errorMsg = { 
        role: 'assistant', 
        content: errorMessage, 
        timestamp: Date.now() 
      };
      
      set((s) => ({ 
        messages: [...s.messages, errorMsg], 
        isLoading: false,
        error: null
      }));
    }
  },

  clearChat: () => set({ 
    messages: [{ 
      role: 'assistant', 
      content: 'Konnichiwa! 🎌 Saya **Daud Sensei**. Ada pertanyaan tentang bahasa Jepang? 😊\n\n*Siap membantu Anda belajar!*', 
      timestamp: Date.now() 
    }], 
    isLoading: false,
    error: null
  }),

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useChatStore;
