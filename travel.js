// Travel Planning Page
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const backFromTravelBtn = document.getElementById("backFromTravel");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Load travel template and tasks from database
  await loadTravelTemplate();

  // Back to templates page
  backFromTravelBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  projectsNavItem.addEventListener("click", function () {
    // Already on projects page (travel planning)
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
  const sourceInput = document.getElementById("source");
  const destinationInput = document.getElementById("destination");
  const fromDateInput = document.getElementById("fromDate");
  const toDateInput = document.getElementById("toDate");

  // Add input change handlers
  [sourceInput, destinationInput, fromDateInput, toDateInput].forEach(
    (input) => {
      input.addEventListener("change", function () {
        saveTravelData();
      });
    }
  );

  // Load saved travel data
  loadTravelData();

  // Load travel template from database
  async function loadTravelTemplate() {
    try {
      const response = await api.getTemplate("travel");
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

      console.log("Travel template loaded:", template);
    } catch (error) {
      console.error("Error loading travel template:", error);
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

  // Handle generic actions
  function handleGenericAction(action) {
    switch (action) {
      case "flights":
        alert("Book Flights functionality coming soon!");
        break;
      case "hotels":
        alert("Reserve Hotels functionality coming soon!");
        break;
      case "itinerary":
        alert("Plan Itinerary functionality coming soon!");
        break;
      case "activities":
        alert("Schedule Activities functionality coming soon!");
        break;
      case "tickets":
        alert("Purchase Tickets functionality coming soon!");
        break;
      case "budget":
        alert("Budget Expenses functionality coming soon!");
        break;
      default:
        console.log(`Action clicked: ${action}`);
    }
  }

  // Save travel data to localStorage
  function saveTravelData() {
    const travelData = {
      source: sourceInput.value,
      destination: destinationInput.value,
      fromDate: fromDateInput.value,
      toDate: toDateInput.value,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("travelData", JSON.stringify(travelData));
  }

  // Load travel data from localStorage
  function loadTravelData() {
    const savedData = localStorage.getItem("travelData");
    if (savedData) {
      const travelData = JSON.parse(savedData);
      sourceInput.value = travelData.source || "";
      destinationInput.value = travelData.destination || "";
      fromDateInput.value = travelData.fromDate || "";
      toDateInput.value = travelData.toDate || "";
    }
  }
});
