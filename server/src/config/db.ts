import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { config } from "./config.js";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var pgPool: pg.Pool | undefined;
}

const pool = globalThis.pgPool || new pg.Pool({
  connectionString: config.DATABASE_URL,
});

if (config.NODE_ENV !== "production") {
  globalThis.pgPool = pool;
}

const adapter = new PrismaPg(pool);

export const prisma = globalThis.prisma || new PrismaClient({
  adapter,
  log: config.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (config.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
