# 🎌 Daud Sensei - Japanese Learning Platform

Aplikasi pembelajaran bahasa Jepang yang interaktif dengan AI assistant, quiz, dan tracking progress.

![Daud Sensei](https://img.shields.io/badge/Language-Japanese%20Learning-red)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## ✨ Fitur Utama

### 🎯 **Pembelajaran Interaktif**
- **Hiragana & Katakana Quiz** - Latihan karakter dasar Jepang
- **Vocabulary Quiz** - Kosakata sehari-hari dengan audio
- **Grammar Lessons** - Tata bahasa dengan contoh praktis
- **Progress Tracking** - XP, level, dan streak harian

### 🤖 **AI Assistant (Tanya Sensei)**
- Chat dengan AI untuk belajar bahasa Jepang
- Penjelasan tata bahasa, kosakata, dan budaya
- Response yang context-aware dan educational
- Format text yang mudah dibaca dengan highlighting

### 🏆 **Gamification**
- Sistem XP dan leveling
- Badge achievements
- Daily streak tracking
- Leaderboard (coming soon)

### 📱 **Modern UI/UX**
- Responsive design untuk mobile & desktop
- Japanese-inspired design dengan gradient
- Smooth animations dan transitions
- Dark/Light mode support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/Mogumoon/daud-sensei.git
cd daud-sensei
```

2. **Setup Frontend**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Setup Backend**
```bash
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Start server
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

**Server (.env)**
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_super_secret_jwt_key_here"
GEMINI_API_KEY="your_gemini_api_key_here"
```

### Gemini API Setup
1. Buat akun di [Google AI Studio](https://makersuite.google.com/)
2. Generate API key
3. Masukkan ke file `.env` sebagai `GEMINI_API_KEY`

## 📁 Project Structure

```
daud-sensei/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── stores/            # Zustand state management
│   ├── data/              # Static data (hiragana, katakana, etc.)
│   └── lib/               # Utilities
├── server/                # Backend Express app
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── lib/           # Database & utilities
│   └── prisma/            # Database schema & migrations
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Google Generative AI** - AI responses

## 📚 API Documentation

### Authentication
```bash
# Register
POST /api/auth/register
{
  "username": "string",
  "email": "string", 
  "password": "string"
}

# Login
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}
```

### AI Chat
```bash
# Send message to AI
POST /api/ai/chat
{
  "messages": [
    {
      "role": "user",
      "content": "Apa bedanya は dan が?",
      "timestamp": 1234567890
    }
  ]
}
```

### Progress
```bash
# Get user progress
GET /api/progress

# Record quiz result
POST /api/progress/quiz
{
  "category": "hiragana",
  "score": 8,
  "total": 10,
  "xpEarned": 50,
  "mode": "practice"
}
```

## 🎨 Features Showcase

### 🎯 **Quiz System**
- Multiple choice questions
- Real-time feedback
- Score calculation
- XP rewards

### 💬 **AI Chat Interface**
- Modern chat bubbles
- Japanese text highlighting
- Copy message functionality
- Typing indicators

### 📊 **Progress Dashboard**
- XP and level display
- Quiz statistics
- Achievement badges
- Learning streaks

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)
```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy
npm start
```

### Environment Variables for Production
- Set all environment variables in your hosting platform
- Use production database URL
- Generate secure JWT secret
- Add your Gemini API key

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Development Notes

### Database Schema
- **User**: Authentication & profile
- **QuizResult**: Quiz scores & history
- **ChatLog**: AI conversation history
- **UserBadge**: Achievement system

### State Management
- **useAuthStore**: User authentication
- **useProgressStore**: Learning progress
- **useQuizStore**: Quiz state
- **useChatStore**: AI chat messages

## 🐛 Known Issues

- Gemini API free tier has rate limits
- SQLite is for development (use PostgreSQL for production)
- Some animations may be slow on older devices

## 🔮 Roadmap

- [ ] Voice recognition for pronunciation
- [ ] Kanji writing practice
- [ ] Multiplayer quiz battles
- [ ] Mobile app (React Native)
- [ ] Advanced grammar lessons
- [ ] Cultural lessons with videos

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Japanese language data from various open sources
- UI inspiration from modern language learning apps
- Community feedback and contributions

---

**頑張って！(Ganbatte! - Good luck with your Japanese learning!)** 🎌✨
