const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = process.env; // Make sure you have this in your .env file

// Middleware to authenticate and authorize users
exports.authenticate = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error });
    }
};

// Middleware to check for specific roles
exports.authorize = (roles = []) => {
    // Roles param can be a single role string (e.g. 'admin') or an array of roles (e.g. ['admin', 'driver'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Check if the user has the required role
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
