const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');  // Double dots for parent directory

// Add auth middleware to protected routes
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all tasks
router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ user: req.userId })
        .populate('user', 'email'); // Include user email
    res.json(tasks);
});

// POST new task
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            user: req.userId, // Add this line
            completed: false
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET single task
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
});

// DELETE task
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove();
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
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