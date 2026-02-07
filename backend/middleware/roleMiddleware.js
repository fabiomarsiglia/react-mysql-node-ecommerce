const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // req.user filled by authMiddleware
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Verify if the user's role is permitted
        if (allowedRoles.includes(req.user.role)) {
            next(); // User has the right role, proceed to route
        } else {
            return res.status(403).json({ 
                message: `Access denied: one of the following roles is required: ${allowedRoles.join(', ')}` 
            });
        }
    };
};

module.exports = checkRole;