import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛩️</span>
            <span className="font-display text-lg font-bold text-primary">Daud Sensei</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link to="/learn" className="hover:text-primary transition-colors">Materi</Link>
            <Link to="/quiz" className="hover:text-primary transition-colors">Kuis</Link>
            <Link to="/ask" className="hover:text-primary transition-colors">Tanya Sensei</Link>
          </div>
          <div className="flex items-center gap-1 text-sm text-text-muted">
            Made with <Heart size={14} className="text-primary fill-primary" /> for Japanese learners
          </div>
        </div>
      </div>
    </footer>
  );
}
