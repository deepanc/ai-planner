// Templates Page Navigation
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const backFromTemplatesBtn = document.getElementById("backFromTemplates");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Load templates from database
  await loadTemplates();

  // Back to home page
  backFromTemplatesBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  projectsNavItem.addEventListener("click", function () {
    // Stay on current page since we're already in templates
    console.log("Already on templates page");
  });

  tasksNavItem.addEventListener("click", function () {
    // Placeholder for tasks page
    console.log("Navigate to tasks page");
  });

  settingsNavItem.addEventListener("click", function () {
    // Placeholder for settings page
    console.log("Navigate to settings page");
  });

  // Load templates from database
  async function loadTemplates() {
    try {
      const response = await api.getTemplates();
      const templates = response.data;

      // Update template items with database data
      const templateItems = document.querySelectorAll(".template-item");
      templateItems.forEach((item, index) => {
        if (templates[index]) {
          const template = templates[index];
          item.setAttribute("data-template", template.id);

          const titleElement = item.querySelector(".template-title");
          const descriptionElement = item.querySelector(
            ".template-description"
          );

          if (titleElement) titleElement.textContent = template.name;
          if (descriptionElement)
            descriptionElement.textContent = template.description;
        }
      });
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  }

  // Template selection
  const templateItems = document.querySelectorAll(".template-item");
  templateItems.forEach((item) => {
    item.addEventListener("click", function () {
      const templateType = this.getAttribute("data-template");
      const templateTitle = this.querySelector(".template-title").textContent;

      // Add visual feedback
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);

      // Handle template selection
      handleTemplateSelection(templateType, templateTitle);
    });
  });

  // Template selection handler
  function handleTemplateSelection(templateType, templateTitle) {
    // Navigate directly to template page based on type
    switch (templateType) {
      case "travel":
        window.location.href = "travel.html";
        break;
      case "event-planning":
        window.location.href = "event.html";
        break;
      case "house-shifting":
        window.location.href = "house-shifting.html";
        break;
      case "product-roadmap":
        window.location.href = "product-roadmap.html";
        break;
      default:
        // Fallback to home page
        window.location.href = "index.html";
    }
  }
});
