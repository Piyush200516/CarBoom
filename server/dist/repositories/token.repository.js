"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = exports.TokenRepository = void 0;
const db_js_1 = require("../config/db.js");
class TokenRepository {
    async createToken(userId, token, expiresAt) {
        return db_js_1.prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt,
            },
        });
    }
    async findToken(token) {
        return db_js_1.prisma.refreshToken.findUnique({
            where: { token },
            include: {
                user: true, // Fetch associated user
            },
        });
    }
    async deleteToken(token) {
        return db_js_1.prisma.refreshToken.delete({
            where: { token },
        });
    }
    async deleteUserTokens(userId) {
        return db_js_1.prisma.refreshToken.deleteMany({
            where: { userId },
        });
    }
    async deleteExpiredTokens() {
        return db_js_1.prisma.refreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }
}
exports.TokenRepository = TokenRepository;
exports.tokenRepository = new TokenRepository();
exports.default = exports.tokenRepository;
