"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const index_js_1 = require("../../generated/prisma/index.js");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const config_js_1 = require("./config.js");
const pool = globalThis.pgPool || new pg_1.default.Pool({
    connectionString: config_js_1.config.DATABASE_URL,
});
if (config_js_1.config.NODE_ENV !== "production") {
    globalThis.pgPool = pool;
}
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = globalThis.prisma || new index_js_1.PrismaClient({
    adapter,
    log: config_js_1.config.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
if (config_js_1.config.NODE_ENV !== "production") {
    globalThis.prisma = exports.prisma;
}
