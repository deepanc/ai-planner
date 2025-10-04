// Product Roadmap Page
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const backFromRoadmapBtn = document.getElementById("backFromRoadmap");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Load product roadmap template and tasks from database
  await loadRoadmapTemplate();

  // Back to templates page
  backFromRoadmapBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  projectsNavItem.addEventListener("click", function () {
    // Already on projects page (product roadmap)
    console.log("Already on projects page");
  });

  tasksNavItem.addEventListener("click", function () {
    // Placeholder for tasks page
    console.log("Navigate to tasks page");
  });

  settingsNavItem.addEventListener("click", function () {
    // Placeholder for settings page
    console.log("Navigate to settings page");
  });

  // Action buttons
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      const taskId = this.getAttribute("data-task-id");
      handleActionClick(action, taskId);
    });
  });

  // Input field interactions
  const productNameInput = document.getElementById("productName");
  const targetMarketInput = document.getElementById("targetMarket");
  const launchDateInput = document.getElementById("launchDate");

  // Add input change handlers
  [productNameInput, targetMarketInput, launchDateInput].forEach((input) => {
    input.addEventListener("change", function () {
      saveRoadmapData();
    });
  });

  // Load saved roadmap data
  loadRoadmapData();

  // Load product roadmap template from database
  async function loadRoadmapTemplate() {
    try {
      const response = await api.getTemplate("product-roadmap");
      const template = response.data;

      // Update action buttons with database tasks
      const actionButtons = document.querySelectorAll(".action-btn");
      actionButtons.forEach((btn, index) => {
        if (template.tasks[index]) {
          const task = template.tasks[index];
          btn.setAttribute("data-action", task.action);
          btn.setAttribute("data-task-id", task.id);

          // Update icon
          const iconElement = btn.querySelector("i");
          if (iconElement) {
            iconElement.className = task.icon;
          }

          // Update text
          const textElement = btn.querySelector("span");
          if (textElement) {
            textElement.textContent = task.title;
          }
        }
      });

      console.log("Product roadmap template loaded:", template);
    } catch (error) {
      console.error("Error loading product roadmap template:", error);
    }
  }

  // Action button click handler
  function handleActionClick(action, taskId) {
    // Add visual feedback
    const btn = document.querySelector(`[data-action="${action}"]`);
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 150);

    // Handle actions directly
    handleGenericAction(action);
  }

  // Handle generic actions (fallback)
  function handleGenericAction(action) {
    switch (action) {
      case "vision":
        alert("Define Vision functionality coming soon!");
        break;
      case "research":
        alert("Research Market functionality coming soon!");
        break;
      case "features":
        alert("Define Features functionality coming soon!");
        break;
      case "timeline":
        alert("Create Timeline functionality coming soon!");
        break;
      case "resources":
        alert("Assign Resources functionality coming soon!");
        break;
      case "tracking":
        alert("Track Progress functionality coming soon!");
        break;
      default:
        console.log(`Action clicked: ${action}`);
    }
  }

  // Save roadmap data to localStorage
  function saveRoadmapData() {
    const roadmapData = {
      productName: productNameInput.value,
      targetMarket: targetMarketInput.value,
      launchDate: launchDateInput.value,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("roadmapData", JSON.stringify(roadmapData));
  }

  // Load roadmap data from localStorage
  function loadRoadmapData() {
    const savedData = localStorage.getItem("roadmapData");
    if (savedData) {
      const roadmapData = JSON.parse(savedData);
      productNameInput.value = roadmapData.productName || "";
      targetMarketInput.value = roadmapData.targetMarket || "";
      launchDateInput.value = roadmapData.launchDate || "";
    }
  }
});
