"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_js_1 = require("./config/config.js");
const logger_js_1 = require("./config/logger.js");
const rateLimit_middleware_js_1 = require("./middleware/rateLimit.middleware.js");
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const apiError_js_1 = require("./utils/apiError.js");
const app = (0, express_1.default)();
// Security Headers
app.use((0, helmet_1.default)());
// Logging configuration
const morganFormat = config_js_1.config.NODE_ENV === "production" ? "combined" : "dev";
app.use((0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => logger_js_1.logger.http(message.trim()),
    },
}));
// CORS configuration
app.use((0, cors_1.default)({
    origin: config_js_1.config.CORS_ORIGIN === "*" ? true : config_js_1.config.CORS_ORIGIN.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));
// Body and Cookie parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Global Rate Limiting
app.use(rateLimit_middleware_js_1.apiLimiter);
// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Welcome to CarBoom API",
    });
});
// API Routes
app.use("/api/v1", index_js_1.default);
// 404 Route Not Found
app.use((req, res, next) => {
    next(new apiError_js_1.ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});
// Global Error Handler Middleware
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
