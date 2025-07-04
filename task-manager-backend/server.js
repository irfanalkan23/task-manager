const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const User = require('./models/User'); // Add this line
// Add to top with other requires
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(helmet()); // ✅ Helmet for secure headers

// Middleware (ORDER MATTERS!)
// app.use(cors({
//     origin: 'http://localhost:5173', // Your Vite frontend URL
//     credentials: true // Allow cookies
// }));

app.use(cors({
    origin: 'https://task-manager-frontend-dexd.onrender.com',
    credentials: true
}));


app.use(express.json());

// Add after other middleware
app.use(cookieParser());

// Add MongoDB Connection
// Insert this after middleware but before routes:
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit if DB fails
    });

// Add this AFTER MongoDB connection
const taskRouter = require('./routes/tasks');
app.use('/api/tasks', taskRouter);

// Add after MongoDB connection
app.use('/api/auth', authRouter);


// Health check route
app.get('/api/health', (req, res) => {
    console.log('✅ Health check passed');
    res.json({ status: 'OK' });
});



// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
});