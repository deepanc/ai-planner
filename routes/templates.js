const express = require("express");
const router = express.Router();
const Template = require("../models/Template");

// GET /api/templates - Get all templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true })
      .select("-__v")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching templates",
      error: error.message,
    });
  }
});

// GET /api/templates/:id - Get template by ID
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findOne({
      id: req.params.id,
      isActive: true,
    }).select("-__v");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching template",
      error: error.message,
    });
  }
});

// POST /api/templates - Create new template
router.post("/", async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();

    res.status(201).json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating template",
      error: error.message,
    });
  }
});

// PUT /api/templates/:id - Update template
router.put("/:id", async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ).select("-__v");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating template",
      error: error.message,
    });
  }
});

// DELETE /api/templates/:id - Soft delete template
router.delete("/:id", async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { id: req.params.id },
      { isActive: false },
      { new: true }
    ).select("-__v");

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    res.json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting template",
      error: error.message,
    });
  }
});

module.exports = router;
