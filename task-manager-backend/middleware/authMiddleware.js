const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.sendStatus(403);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.sendStatus(403);
    }
};