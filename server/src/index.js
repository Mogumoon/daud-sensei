import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from the correct path (handles both local dev and Vercel)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try server/.env first (local dev), then root .env.production
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env.production") });

import authRoutes from "./routes/auth.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // Allow all vercel.app domains and localhost
      if (
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Log env status on startup (helpful for debugging Vercel)
console.log("ENV CHECK:", {
  NODE_ENV: process.env.NODE_ENV,
  HAS_DATABASE_URL: !!process.env.DATABASE_URL,
  HAS_JWT_SECRET: !!process.env.JWT_SECRET,
  HAS_GEMINI_KEY: !!process.env.GEMINI_API_KEY,
  DB_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 20) + "...",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(["/api/health", "/health"], (req, res) => {
  res.json({
    status: "OK",
    message: "Daud Sensei API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: process.env.DATABASE_URL ? "Connected" : "Not configured",
    version: "1.0.0",
  });
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
  console.error("Server Error:", err.stack);
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
