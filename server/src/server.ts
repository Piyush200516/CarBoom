import { config } from "./config/config.js";
import app from "./app.js";
import { prisma } from "./config/db.js";
import { logger } from "./config/logger.js";

const PORT = config.PORT;

const startServer = async () => {
  try {
    logger.info("Connecting to Neon PostgreSQL database...");
    await prisma.$connect();
    logger.info("✅ Database connection established successfully.");

    app.listen(PORT, () => {
      logger.info(`🚀 Server is running in ${config.NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    logger.error("❌ Failed to start server:");
    logger.error(error.message || error);
    process.exit(1);
  }
};

startServer();