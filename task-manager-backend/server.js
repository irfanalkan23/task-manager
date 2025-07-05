const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/tasks');
require('dotenv').config();

const app = express();

// ✅ Trust Render's proxy to allow secure cookies and rate limiting
app.set('trust proxy', 1);

// ✅ Secure HTTP headers
app.use(helmet());

// ✅ CORS configuration for frontend on Render
app.use(cors({
    origin: 'https://task-manager-frontend-dexd.onrender.com',
    credentials: true
}));

// ✅ Parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

// ✅ Health check route
app.get('/api/health', (req, res) => {
    console.log('✅ Health check passed');
    res.json({ status: 'OK' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Handle port conflicts gracefully
process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
});
