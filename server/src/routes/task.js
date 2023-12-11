const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', auth, taskController.createTask);

// Get tasks with optional query parameters
router.get('/tasks', auth, taskController.getTasks);

// Get a single task by ID
router.get('/tasks/:id', auth, taskController.getTaskById);

// Update a task by ID
router.patch('/tasks/:id', auth, taskController.updateTask);

// Delete a task by ID
router.delete('/tasks/:id', auth, taskController.deleteTask);

module.exports = router;
