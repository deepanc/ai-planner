const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./config");

// Import routes
const templatesRouter = require("./routes/templates");
const projectsRouter = require("./routes/projects");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname)));

// Database connection
mongoose
  .connect(config.mongodb.uri, config.mongodb.options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// API Routes
app.use("/api/templates", templatesRouter);
app.use("/api/projects", projectsRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Planner API is running",
    timestamp: new Date().toISOString(),
  });
});

// Serve the main application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve templates page
app.get("/templates", (req, res) => {
  res.sendFile(path.join(__dirname, "templates.html"));
});

// Serve travel page
app.get("/travel", (req, res) => {
  res.sendFile(path.join(__dirname, "travel.html"));
});

// Serve event page
app.get("/event", (req, res) => {
  res.sendFile(path.join(__dirname, "event.html"));
});

// Serve house shifting page
app.get("/house-shifting", (req, res) => {
  res.sendFile(path.join(__dirname, "house-shifting.html"));
});

// Serve product roadmap page
app.get("/product-roadmap", (req, res) => {
  res.sendFile(path.join(__dirname, "product-roadmap.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://${config.server.host}:${PORT}`);
  console.log(
    `API endpoints available at http://${config.server.host}:${PORT}/api`
  );
});
