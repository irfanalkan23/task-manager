const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5,
    message: 'Too many attempts, please try again later.'
});



// Register
router.post('/register', authLimiter,
    [
        body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).trim().escape().withMessage('Password must be at least 6 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) return res.status(400).json({ message: 'Email already exists' });

            const user = new User({
                email: req.body.email,
                password: req.body.password
            });

            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            }).status(201).json({
                message: 'User registered successfully',
                token,
                user: { id: user._id, email: user.email }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Login
router.post('/login', authLimiter,
    [
        body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
        body('password').notEmpty().trim().escape().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            }).json({
                message: 'Login successful',
                token,
                user: { id: user._id, email: user.email }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

// In your backend auth routes
router.get('/verify', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying user' });
    }
});

// Add this error handler at the end of the file
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = router;