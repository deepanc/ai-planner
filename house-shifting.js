// House/Office Shifting Page
document.addEventListener("DOMContentLoaded", async function () {
  // Get navigation elements
  const backFromHouseBtn = document.getElementById("backFromHouse");
  const homeNavItem = document.querySelector(".nav-item:first-child");
  const projectsNavItem = document.querySelector(".nav-item:nth-child(2)");
  const tasksNavItem = document.querySelector(".nav-item:nth-child(3)");
  const settingsNavItem = document.querySelector(".nav-item:nth-child(4)");

  // Load house shifting template and tasks from database
  await loadHouseTemplate();

  // Back to templates page
  backFromHouseBtn.addEventListener("click", function () {
    window.location.href = "templates.html";
  });

  // Navigation handlers
  homeNavItem.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  projectsNavItem.addEventListener("click", function () {
    // Already on projects page (house shifting)
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
  const currentAddressInput = document.getElementById("currentAddress");
  const newAddressInput = document.getElementById("newAddress");
  const moveDateInput = document.getElementById("moveDate");

  // Add input change handlers
  [currentAddressInput, newAddressInput, moveDateInput].forEach((input) => {
    input.addEventListener("change", function () {
      saveHouseData();
    });
  });

  // Load saved house data
  loadHouseData();

  // Load house shifting template from database
  async function loadHouseTemplate() {
    try {
      const response = await api.getTemplate("house-shifting");
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

      console.log("House shifting template loaded:", template);
    } catch (error) {
      console.error("Error loading house shifting template:", error);
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
      case "movers":
        alert("Find Movers functionality coming soon!");
        break;
      case "packing":
        alert("Pack Belongings functionality coming soon!");
        break;
      case "address":
        alert("Update Address functionality coming soon!");
        break;
      case "utilities":
        alert("Transfer Utilities functionality coming soon!");
        break;
      case "cleaning":
        alert("Clean Old Place functionality coming soon!");
        break;
      case "settling":
        alert("Settle In functionality coming soon!");
        break;
      default:
        console.log(`Action clicked: ${action}`);
    }
  }

  // Save house data to localStorage
  function saveHouseData() {
    const houseData = {
      currentAddress: currentAddressInput.value,
      newAddress: newAddressInput.value,
      moveDate: moveDateInput.value,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("houseData", JSON.stringify(houseData));
  }

  // Load house data from localStorage
  function loadHouseData() {
    const savedData = localStorage.getItem("houseData");
    if (savedData) {
      const houseData = JSON.parse(savedData);
      currentAddressInput.value = houseData.currentAddress || "";
      newAddressInput.value = houseData.newAddress || "";
      moveDateInput.value = houseData.moveDate || "";
    }
  }
});
