"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const jwt_js_1 = require("../utils/jwt.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
exports.authenticate = (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
    let token;
    // Check cookie first
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    // Fallback to Authorization header
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new apiError_js_1.ApiError(401, "Authentication required. Please log in."));
    }
    try {
        const decoded = (0, jwt_js_1.verifyAccessToken)(token);
        req.user = decoded;
        return next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new apiError_js_1.ApiError(401, "Access token expired. Please refresh."));
        }
        return next(new apiError_js_1.ApiError(401, "Invalid access token. Please log in again."));
    }
});
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new apiError_js_1.ApiError(401, "Authentication required."));
        }
        if (!roles.includes(req.user.role)) {
            return next(new apiError_js_1.ApiError(403, `Access denied. Role '${req.user.role}' is not authorized to access this resource.`));
        }
        return next();
    };
};
exports.authorize = authorize;
