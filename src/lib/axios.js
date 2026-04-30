import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? '/api'  // Same domain for Vercel production
    : 'http://localhost:5000/api',  // Local development
  timeout: 10000,
});

// Request interceptor untuk menambahkan auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('daud-user') || '{}');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Response interceptor untuk handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('daud-user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
