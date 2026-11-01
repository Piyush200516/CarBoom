import http from "http";
import { config } from "./config/config.js";
import app from "./app.js";
import { prisma } from "./config/db.js";
import { logger } from "./config/logger.js";
import { initSocketIO } from "./lib/socketManager.js";

const PORT = config.PORT;

const startServer = async () => {
  try {
    logger.info("Connecting to Neon PostgreSQL database...");
    await prisma.$connect();
    logger.info("✅ Database connection established successfully.");

    // Create a raw HTTP server so Socket.IO and Express share the same port
    const httpServer = http.createServer(app);

    // Initialize Socket.IO (must happen before httpServer.listen)
    initSocketIO(httpServer);

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server is running in ${config.NODE_ENV} mode on http://localhost:${PORT}`);
      logger.info(`🔌 Socket.IO is live on ws://localhost:${PORT}`);
    });
  } catch (error: any) {
    logger.error("❌ Failed to start server:");
    logger.error(error.message || error);
    process.exit(1);
  }
};

startServer();