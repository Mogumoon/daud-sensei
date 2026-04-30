# 🚀 Deployment Guide - Daud Sensei

Panduan lengkap untuk deploy aplikasi Daud Sensei ke berbagai platform hosting.

## 📋 Pre-deployment Checklist

- [ ] File `.env` tidak ter-commit (cek `.gitignore`)
- [ ] Database migration sudah dijalankan
- [ ] Build frontend berhasil (`npm run build`)
- [ ] Server berjalan tanpa error
- [ ] API endpoints sudah ditest

## 🌐 Frontend Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy di Vercel**
- Login ke [vercel.com](https://vercel.com)
- Import repository dari GitHub
- Set build command: `npm run build`
- Set output directory: `dist`
- Deploy!

3. **Environment Variables**
```
VITE_API_URL=https://your-backend-url.com/api
```

### Netlify

1. **Build locally**
```bash
npm run build
```

2. **Deploy**
- Drag & drop folder `dist` ke [netlify.com](https://netlify.com)
- Atau connect GitHub repository

### GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://mogumoon.github.io/daud-sensei"
}
```

3. **Deploy**
```bash
npm run build
npm run deploy
```

## 🖥 Backend Deployment

### Railway (Recommended)

1. **Prepare for Railway**
```bash
cd server
echo "web: npm start" > Procfile
```

2. **Deploy**
- Login ke [railway.app](https://railway.app)
- Connect GitHub repository
- Select `server` folder as root
- Add environment variables

3. **Environment Variables**
```
PORT=5000
DATABASE_URL=file:./prod.db
JWT_SECRET=your_super_secure_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

4. **Database Setup**
```bash
# Railway akan otomatis run:
npx prisma generate
npx prisma migrate deploy
```

### Render

1. **Create render.yaml**
```yaml
services:
  - type: web
    name: daud-sensei-api
    env: node
    buildCommand: cd server && npm install && npx prisma generate
    startCommand: cd server && npx prisma migrate deploy && npm start
    envVars:
      - key: DATABASE_URL
        value: file:./prod.db
      - key: JWT_SECRET
        generateValue: true
      - key: GEMINI_API_KEY
        sync: false
```

### Heroku

1. **Prepare Heroku**
```bash
cd server
echo "web: npm start" > Procfile
echo "node" > runtime.txt
```

2. **Deploy**
```bash
heroku create daud-sensei-api
heroku config:set JWT_SECRET=your_secret
heroku config:set GEMINI_API_KEY=your_key
git subtree push --prefix server heroku main
```

## 🗄 Database Options

### Development: SQLite
```env
DATABASE_URL="file:./dev.db"
```

### Production: PostgreSQL
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### Production: MySQL
```env
DATABASE_URL="mysql://user:password@host:port/database"
```

## 🔧 Production Configuration

### Frontend Environment
```env
# .env.production
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Daud Sensei
VITE_APP_VERSION=1.0.0
```

### Backend Environment
```env
# Production .env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_production_database_url
JWT_SECRET=super_secure_random_string_min_32_chars
GEMINI_API_KEY=your_gemini_api_key
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔒 Security Checklist

- [ ] JWT secret minimal 32 karakter random
- [ ] CORS dikonfigurasi untuk domain production
- [ ] Rate limiting diaktifkan
- [ ] HTTPS digunakan (SSL certificate)
- [ ] Environment variables tidak ter-expose
- [ ] Database credentials aman
- [ ] API keys tidak ter-commit

## 📊 Monitoring & Analytics

### Error Tracking
```bash
npm install @sentry/react @sentry/node
```

### Performance Monitoring
- Google Analytics
- Vercel Analytics
- Railway Metrics

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

## 🔄 Update Process

1. **Development**
```bash
git checkout develop
# Make changes
git add .
git commit -m "Feature: new functionality"
git push origin develop
```

2. **Production**
```bash
git checkout main
git merge develop
git push origin main
# Auto-deploy via CI/CD
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

**Database Issues**
```bash
# Reset database
npx prisma migrate reset
npx prisma generate
```

**CORS Errors**
```javascript
// server/src/index.js
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
```

### Performance Optimization

**Frontend**
- Enable gzip compression
- Use CDN for static assets
- Implement code splitting
- Optimize images

**Backend**
- Use connection pooling
- Implement caching (Redis)
- Optimize database queries
- Use compression middleware

## 📞 Support

Jika mengalami masalah deployment:
1. Check logs di platform hosting
2. Verify environment variables
3. Test API endpoints
4. Check database connection
5. Contact support atau buat issue di GitHub

---

**Happy Deploying! 🚀**