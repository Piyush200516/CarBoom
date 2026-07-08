"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("./config/config.js");
const app_js_1 = __importDefault(require("./app.js"));
const db_js_1 = require("./config/db.js");
const logger_js_1 = require("./config/logger.js");
const PORT = config_js_1.config.PORT;
const startServer = async () => {
    try {
        logger_js_1.logger.info("Connecting to Neon PostgreSQL database...");
        await db_js_1.prisma.$connect();
        logger_js_1.logger.info("✅ Database connection established successfully.");
        app_js_1.default.listen(PORT, () => {
            logger_js_1.logger.info(`🚀 Server is running in ${config_js_1.config.NODE_ENV} mode on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        logger_js_1.logger.error("❌ Failed to start server:");
        logger_js_1.logger.error(error.message || error);
        process.exit(1);
    }
};
startServer();
