// config/jwt.js

const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure you have access to environment variables

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Default to 1 hour

/**
 * Generate a JWT token
 * @param {object} payload - The payload to include in the token
 * @returns {string} - The generated JWT token
 */
function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify a JWT token
 * @param {string} token - The token to verify
 * @returns {object} - The decoded payload
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
