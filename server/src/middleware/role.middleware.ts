import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';

type UserRole = 'RENTER' | 'OWNER' | 'ADMIN';

/**
 * Middleware to restrict access based on user role.
 * Usage: `roleMiddleware(['OWNER'])` allows only owners.
 */
export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // set by auth.middleware
    if (!user) {
      return next(new ApiError(403, 'User not authenticated'));
    }
    if (!allowedRoles.includes(user.role as UserRole)) {
      return next(new ApiError(403, 'Insufficient permissions'));
    }
    next();
  };
};
