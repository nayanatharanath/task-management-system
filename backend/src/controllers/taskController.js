const taskModel = require("../models/Task");

// POST (/api/tasks)
async function createTask(req, res, next) {
  try {
    const {
      title,
      description = "",
      priority = "MEDIUM",
      state = "NEW",
    } = req.body;
    const user_id = req?.user?.userId; // Get user_id from authenticated token
    if (!user_id) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }
    console.log("Creating task for user: ", user_id);

    const task = await taskModel.createTask({
      user_id,
      title,
      description,
      priority,
      state,
    });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
}

// GET (/api/tasks)
async function getAllTasks(req, res, next) {
  try {
    const {
      search = "",
      priority = "",
      state = "",
      limit = 50,
      offset = 0,
    } = req.query;
    const user_id = req?.user?.userId; // Get user_id from authenticated token
    const tasks = await taskModel.getAllTasks({
      user_id: user_id,
      search: search.trim(),
      priority: priority.trim(),
      state: state.trim(),
      limit: Math.min(Number(limit) || 50, 100),
      offset: Number(offset) || 0,
    });
    res.json({
      success: true,
      items: tasks,
      count: tasks.length,
    });
  } catch (error) {
    next(error);
  }
}

// GET (/api/tasks/:id)
async function getTaskById(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user_id = req?.user?.userId; // Get user_id from authenticated token
    
    if(!user_id || isNaN(id)){
      return res.status(401).json({
        success: false,
        error: "Invalid"
      })
    }
    
    const task = await taskModel.getTaskById(id, user_id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
}

// UPDATE/PUT (/api/tasks/:id)
async function updateTask(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user_id = req?.user?.userId; // Get user_id from authenticated token
    const updates = req.body;

    const task = await taskModel.updateTask(Number(id), user_id, updates);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE (/api/tasks/:id)
async function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user_id = req?.user?.userId; // Get user_id from authenticated token
    const deleted = await taskModel.deleteTask(Number(id), user_id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
