"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiError_js_1 = require("../utils/apiError.js");
const logger_js_1 = require("../config/logger.js");
const config_js_1 = require("../config/config.js");
const errorHandler = (err, req, res, next) => {
    let error = err;
    // If it is not an instance of ApiError, create a standard ApiError
    if (!(error instanceof apiError_js_1.ApiError)) {
        const statusCode = error.statusCode || (error.status ? parseInt(error.status) : 500);
        const message = error.message || "Internal Server Error";
        error = new apiError_js_1.ApiError(statusCode, message, [], err.stack);
    }
    // Log error using Winston
    logger_js_1.logger.error(`${req.method} ${req.originalUrl} - ${error.statusCode} - ${error.message}`);
    if (config_js_1.config.NODE_ENV === "development" && error.stack) {
        logger_js_1.logger.error(error.stack);
    }
    const responseBody = {
        success: false,
        message: error.message,
        errors: error.errors,
        ...(config_js_1.config.NODE_ENV === "development" && { stack: error.stack }),
    };
    res.status(error.statusCode).json(responseBody);
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
