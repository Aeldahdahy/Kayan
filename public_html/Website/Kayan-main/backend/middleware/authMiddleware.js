const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const activeTokens = new Map(); // Token blacklist to store invalidated tokens

// Bearer token authorization middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is active
        const activeToken = activeTokens.get(decoded.admin_id);
        if (!activeToken || activeToken !== token) {
            return res.status(401).json({ message: 'Token is invalid or has been logged out.' });
        }

        req.user = decoded; // Attach decoded token to the request object
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

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.admin_id;

        // Remove token from activeTokens map
        if (activeTokens.has(adminId)) {
            activeTokens.delete(adminId);
            // console.log(`Token invalidated for admin_id: ${adminId}`);
        }

        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};



module.exports = { authMiddleware, logout, activeTokens };