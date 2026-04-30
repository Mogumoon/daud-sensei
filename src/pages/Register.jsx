import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) { setError('Semua field harus diisi'); return; }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return; }
    
    const result = await register({ username, email, password });
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">⛩️</span>
          <h1 className="font-display text-3xl font-bold mb-2">Daftar Sekarang</h1>
          <p className="text-text-muted">Buat akun dan mulai belajar bahasa Jepang</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="input-field !pl-10" placeholder="daud_sensei" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field !pl-10" placeholder="email@contoh.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field !pl-10 !pr-10" placeholder="Minimal 6 karakter" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Daftar</button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Masuk</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
