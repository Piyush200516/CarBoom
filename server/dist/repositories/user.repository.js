"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const db_js_1 = require("../config/db.js");
const index_js_1 = require("../../generated/prisma/index.js");
class UserRepository {
    async createUser(data) {
        return db_js_1.prisma.user.create({
            data: {
                email: data.email,
                password: data.passwordHash,
                name: data.name,
                phone: data.phone,
                role: data.role || index_js_1.Role.RENTER,
            },
        });
    }
    async findByEmail(email) {
        return db_js_1.prisma.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return db_js_1.prisma.user.findUnique({
            where: { id },
        });
    }
    async updatePassword(id, passwordHash) {
        return db_js_1.prisma.user.update({
            where: { id },
            data: { password: passwordHash },
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
exports.default = exports.userRepository;
