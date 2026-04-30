import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import progressRoutes from './routes/progress.routes.js';
import aiRoutes from './routes/ai.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://daud-sensei.vercel.app', 'https://*.vercel.app']
    : ['http://localhost:5173', 'http://localhost:3000']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Daud Sensei API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For Vercel serverless functions
if (process.env.NODE_ENV === 'production') {
  // Export the app for Vercel
  export default app;
} else {
  // Start server for local development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}
