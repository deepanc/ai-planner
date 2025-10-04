// Event Planning Page
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const backFromEventBtn = document.getElementById("backFromEvent");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Load event template and tasks from database
  await loadEventTemplate();

  // Back to templates page
  backFromEventBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  projectsNavItem.addEventListener("click", function () {
    // Already on projects page (event planning)
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
  const eventNameInput = document.getElementById("eventName");
  const eventDateInput = document.getElementById("eventDate");
  const guestCountInput = document.getElementById("guestCount");

  // Add input change handlers
  [eventNameInput, eventDateInput, guestCountInput].forEach((input) => {
    input.addEventListener("change", function () {
      saveEventData();
    });
  });

  // Load saved event data
  loadEventData();

  // Load event template from database
  async function loadEventTemplate() {
    try {
      const response = await api.getTemplate("event-planning");
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

      console.log("Event template loaded:", template);
    } catch (error) {
      console.error("Error loading event template:", error);
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
      case "venue":
        alert("Choose Venue functionality coming soon!");
        break;
      case "guests":
        alert("Create Guest List functionality coming soon!");
        break;
      case "catering":
        alert("Plan Catering functionality coming soon!");
        break;
      case "entertainment":
        alert("Book Entertainment functionality coming soon!");
        break;
      case "invitations":
        alert("Send Invitations functionality coming soon!");
        break;
      case "budget":
        alert("Manage Budget functionality coming soon!");
        break;
      default:
        console.log(`Action clicked: ${action}`);
    }
  }

  // Save event data to localStorage
  function saveEventData() {
    const eventData = {
      eventName: eventNameInput.value,
      eventDate: eventDateInput.value,
      guestCount: guestCountInput.value,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("eventData", JSON.stringify(eventData));
  }

  // Load event data from localStorage
  function loadEventData() {
    const savedData = localStorage.getItem("eventData");
    if (savedData) {
      const eventData = JSON.parse(savedData);
      eventNameInput.value = eventData.eventName || "";
      eventDateInput.value = eventData.eventDate || "";
      guestCountInput.value = eventData.guestCount || "";
    }
  }
});
