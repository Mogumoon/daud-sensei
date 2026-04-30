import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://daud-sensei.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET is not configured. Auth routes may fail.");
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "WARNING: DATABASE_URL is not configured. Falling back to mock database if available.",
  );
}

if (!process.env.GEMINI_API_KEY) {
  console.warn(
    "INFO: GEMINI_API_KEY is not configured. AI route will use mock responses.",
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(["/api/health", "/health"], (req, res) => {
  try {
    res.json({
      status: "OK",
      message: "Daud Sensei API is running!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      database: process.env.DATABASE_URL ? "Prisma-backed DB" : "Mock database",
      version: "1.0.0",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message,
    });
  }
});

// Routes
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/progress", "/progress"], progressRoutes);
app.use(["/api/ai", "/ai"], aiRoutes);

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.path,
    method: req.method,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Terjadi kesalahan pada server!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server in local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Export the app for Vercel serverless functions
export default app;
