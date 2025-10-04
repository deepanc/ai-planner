const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Template = require("../models/Template");

// GET /api/projects - Get all projects for a user
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const projects = await Project.find({ userId })
      .select("-__v")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
});

// GET /api/projects/:id - Get project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select("-__v");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
});

// POST /api/projects - Create new project from template
router.post("/", async (req, res) => {
  try {
    const { templateId, userId, name, description, metadata } = req.body;

    // Get template with tasks
    const template = await Template.findOne({ id: templateId, isActive: true });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    // Create project tasks from template tasks
    const projectTasks = template.tasks.map((templateTask) => ({
      taskId: templateTask.id,
      title: templateTask.title,
      description: templateTask.description,
      icon: templateTask.icon,
      action: templateTask.action,
      priority: templateTask.priority,
      category: templateTask.category,
      status: "pending",
    }));

    const project = new Project({
      name,
      description,
      templateId,
      templateName: template.name,
      userId,
      tasks: projectTasks,
      metadata: metadata || {},
    });

    await project.save();

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
});

// PUT /api/projects/:id - Update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
});

// PUT /api/projects/:id/tasks/:taskId - Update task status
router.put("/:id/tasks/:taskId", async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status, notes } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = project.tasks.find((t) => t.taskId === taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;
    if (notes) task.notes = notes;
    if (status === "completed") task.completedAt = new Date();

    await project.save();

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
});

module.exports = router;
