import asyncHandler from 'express-async-handler';

/**
 * Middleware to restrict access to specific roles.
 * Usage: protect, verifyRole('admin', 'professional')
 */
const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`User role '${req.user.role}' is not authorized to access this route`);
        }
        next();
    };
};

export { verifyRole };
