const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const validate = require("../middleware/validate");
const verifyToken = require("../middleware/auth");

// All task routes require authentication
router.use(verifyToken);

// Get all tasks with filters (GET - /api/tasks)
router.get("/", taskController.getAllTasks);

// Create a new task (POST - /api/tasks)
router.post("/", validate("createTask"), taskController.createTask);

// Get a specific task by ID (GET - /api/tasks/:id)
router.get("/:id", taskController.getTaskById);

// Update a task by ID (PUT - /api/tasks/:id)
router.put("/:id", validate("updateTask"), taskController.updateTask);

// Delete a task by ID (DELETE - /api/tasks/:id)
router.delete("/:id", taskController.deleteTask);

module.exports = router;
