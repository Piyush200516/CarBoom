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
app.use(
  cors({
    origin: config.CORS_ORIGIN === "*" ? true : config.CORS_ORIGIN.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Body and Cookie parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// 404 Route Not Found
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;