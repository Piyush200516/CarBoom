"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const apiError_js_1 = require("../utils/apiError.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const validate = (schema) => {
    return (0, asyncHandler_js_1.asyncHandler)(async (req, res, next) => {
        try {
            const parsed = (await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            }));
            // Assign back validated data to keep types correct if needed
            req.body = parsed.body || req.body;
            req.query = parsed.query || req.query;
            req.params = parsed.params || req.params;
            return next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorDetails = error.issues.map((err) => ({
                    field: err.path.slice(1).join("."), // remove the root type ('body', 'query', etc.)
                    message: err.message,
                }));
                return next(new apiError_js_1.ApiError(400, "Validation Failed", errorDetails));
            }
            return next(error);
        }
    });
};
exports.validate = validate;
exports.default = exports.validate;
