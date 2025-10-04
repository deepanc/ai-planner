// Home Page Navigation
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const browseTemplatesBtn = document.querySelector(".btn-secondary");
  const createProjectBtn = document.querySelector(".btn-primary");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Navigate to templates page
  browseTemplatesBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Create project button - show template selection
  createProjectBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    // Already on home page
    console.log("Already on home page");
  });

  projectsNavItem.addEventListener("click", function () {
    // Placeholder for projects page
    console.log("Navigate to projects page");
  });

  tasksNavItem.addEventListener("click", function () {
    // Placeholder for tasks page
    console.log("Navigate to tasks page");
  });

  settingsNavItem.addEventListener("click", function () {
    // Placeholder for settings page
    console.log("Navigate to settings page");
  });

  // Load and display recent projects
  await loadRecentProjects();

  // Load recent projects from database
  async function loadRecentProjects() {
    try {
      // For demo purposes, using a default user ID
      const userId = "demo-user";
      const response = await api.getProjects(userId);
      const projects = response.data;

      if (projects.length > 0) {
        displayRecentProjects(projects.slice(0, 3)); // Show last 3 projects
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }

  // Display recent projects on home page
  function displayRecentProjects(projects) {
    const welcomeSection = document.querySelector(".welcome-section");
    const actionButtons = document.querySelector(".action-buttons");

    // Create recent projects section
    const recentProjectsHTML = `
      <div class="recent-projects">
        <h3>Recent Projects</h3>
        <div class="projects-list">
          ${projects
            .map(
              (project) => `
            <div class="project-item" data-project-id="${project._id}">
              <div class="project-info">
                <h4 class="project-title">${project.name}</h4>
                <p class="project-description">${
                  project.description || "No description"
                }</p>
                <div class="project-meta">
                  <span class="project-status">${project.status}</span>
                  <span class="project-tasks">${
                    project.tasks.length
                  } tasks</span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    // Insert before action buttons
    actionButtons.insertAdjacentHTML("beforebegin", recentProjectsHTML);

    // Add click handlers for project items
    document.querySelectorAll(".project-item").forEach((item) => {
      item.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project-id");
        // Navigate to project details (placeholder)
        alert(`Opening project: ${projectId}`);
      });
    });
  }

  // Create project from template
  async function createProjectFromTemplate(templateData) {
    try {
      const projectData = {
        templateId: templateData.type,
        userId: "demo-user",
        name: `My ${templateData.title} Project`,
        description: `Project created from ${templateData.title} template`,
        metadata: {
          source: "",
          destination: "",
          dateRange: "",
          budget: 0,
        },
      };

      const response = await api.createProject(projectData);
      console.log("Project created:", response.data);

      // Show success message
      alert(
        `Project created successfully! You can now start working on your ${templateData.title} project.`
      );

      // Reload recent projects
      await loadRecentProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  }
});
