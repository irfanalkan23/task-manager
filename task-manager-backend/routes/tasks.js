const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed
const Task = require('../models/Task');  // Double dots for parent directory
const { body, validationResult } = require('express-validator');


// Add auth middleware to protected routes
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tasks for user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new task
router.post('/',
    authMiddleware,
    [
        body('title').trim().notEmpty().escape().withMessage('Title is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const task = new Task({
                title: req.body.title,
                user: req.userId,
                completed: false
            });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);


// GET single task
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { $set: { title: req.body.title, completed: req.body.completed } },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id, user: req.userId });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get task by ID
async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.task = task;
    next();
}

module.exports = router;