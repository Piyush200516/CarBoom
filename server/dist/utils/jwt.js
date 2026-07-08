"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config/config.js");
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_js_1.config.JWT_ACCESS_SECRET, {
        expiresIn: config_js_1.config.JWT_ACCESS_EXPIRY,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_js_1.config.JWT_REFRESH_SECRET, {
        expiresIn: config_js_1.config.JWT_REFRESH_EXPIRY,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_js_1.config.JWT_ACCESS_SECRET);
    }
    catch (error) {
        throw error;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_js_1.config.JWT_REFRESH_SECRET);
    }
    catch (error) {
        throw error;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
