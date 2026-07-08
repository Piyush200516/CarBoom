import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../utils/apiError.js";
import { logger } from "../config/logger.js";
import { config } from "../config/config.js";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;

  // If it is not an instance of ApiError, create a standard ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.status ? parseInt(error.status) : 500);
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  // Log error using Winston
  logger.error(`${req.method} ${req.originalUrl} - ${error.statusCode} - ${error.message}`);
  if (config.NODE_ENV === "development" && error.stack) {
    logger.error(error.stack);
  }

  const responseBody = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(config.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode).json(responseBody);
};

export default errorHandler;
