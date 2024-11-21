const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
//Bearer
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token (including admin_id) to the request object
        next();
    } catch (error) {
        console.error('JWT Error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid token.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired.' });
        }
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Logout handler - invalidate token
const logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided to log out.' });
    }

    // Add token to the blacklist to invalidate it
    activeTokens.add(token);
    res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = { authMiddleware, logout };
