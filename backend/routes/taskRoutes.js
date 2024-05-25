const express = require('express');
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// Retrieve all tasks
router.get('/tasks', getTasks);

// Retrieve a single task by ID
router.get('/tasks/:id', getTaskById);

// Create a new task
router.post('/tasks', createTask);

// Update an existing task by ID
router.put('/tasks/:id', updateTask);

// Delete a task by ID
router.delete('/tasks/:id', deleteTask);

module.exports = router;
