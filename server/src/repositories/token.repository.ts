import { prisma } from "../config/db.js";

export class TokenRepository {
  async createToken(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async findToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: {
        user: true, // Fetch associated user
      },
    });
  }

  async deleteToken(token: string) {
    return prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteUserTokens(userId: string) {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async deleteExpiredTokens() {
    return prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export const tokenRepository = new TokenRepository();
export default tokenRepository;
