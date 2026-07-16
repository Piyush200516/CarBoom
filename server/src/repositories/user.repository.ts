import { prisma } from "../config/db.js";
import { Role } from "@prisma/client";

export class UserRepository {
  async createUser(data: {
    email: string;
    passwordHash: string;
    name: string;
    phone?: string;
    role?: Role;
  }) {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.passwordHash,
        name: data.name,
        phone: data.phone,
        role: data.role || Role.RENTER,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { password: passwordHash },
    });
  }

  // Update user profile with allowed fields
  async updateProfile(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export const userRepository = new UserRepository();
export default userRepository;

