import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/config.js";
import { logger } from "./config/logger.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import apiRouter from "./routes/index.js";
import { ApiError } from "./utils/apiError.js";
import path from "path";

const app = express();

// Security Headers
app.use(helmet());

// Logging configuration
const morganFormat = config.NODE_ENV === "production" ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// CORS configuration
// When CORS_ORIGIN="*" we use origin:true which reflects the requesting origin back
// — this is required when the client sends withCredentials:true (cookies/auth headers).
// In production, set CORS_ORIGIN on Render to your Vercel URL, e.g.:
//   CORS_ORIGIN=https://carboom.vercel.app
// Multiple origins are comma-separated: https://a.vercel.app,https://b.vercel.app
const allowedOrigins =
  config.CORS_ORIGIN === "*"
    ? true
    : config.CORS_ORIGIN.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200, // Some browsers (IE11) choke on 204
  })
);

// Explicitly handle OPTIONS pre-flight for all routes
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// Body and Cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Serve static files for uploaded avatars
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Global Rate Limiting
app.use(apiLimiter);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to CarBoom API",
  });
});

// API Routes
app.use("/api/v1", apiRouter);
app.use("/api", apiRouter);
app.use("/", apiRouter);

// 404 Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;