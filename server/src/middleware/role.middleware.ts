import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../types/express';
import { ForbiddenError } from '../../utils/apiError';

/**
 * Middleware to restrict access based on user role.
 * Usage: `roleMiddleware(['OWNER'])` allows only owners.
 */
export const roleMiddleware = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // set by auth.middleware
    if (!user) {
      return next(new ForbiddenError('User not authenticated'));
    }
    if (!allowedRoles.includes(user.role as UserRole)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }
    next();
  };
};
