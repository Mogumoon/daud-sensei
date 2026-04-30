import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, MessageCircle, BarChart3, Menu, X, User, LogOut } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';

const navLinks = [
  { path: '/', label: 'Home', icon: null },
  { path: '/learn', label: 'Materi', icon: BookOpen },
  { path: '/quiz', label: 'Kuis', icon: Brain },
  { path: '/ask', label: 'Tanya Sensei', icon: MessageCircle },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl" role="img" aria-label="torii">⛩️</span>
            <span className="font-display text-xl font-bold text-primary group-hover:text-primary-dark transition-colors">
              Daud Sensei
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-text-muted hover:text-text-main hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <link.icon size={16} />}
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl">
                  <User size={16} className="text-accent" />
                  <span className="text-sm font-medium">{user.username || 'User'}</span>
                </div>
                <button onClick={logout} className="p-2 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-gray-50" aria-label="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-primary bg-primary/5' : 'text-text-muted hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon && <link.icon size={18} />}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-gray-100 flex gap-2">
                {user ? (
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50">
                    Keluar
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50">Masuk</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 text-center btn-primary !py-2.5 text-sm">Daftar</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
