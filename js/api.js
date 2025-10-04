// API Service for MongoDB Backend
class APIService {
  constructor() {
    this.baseURL = window.location.origin + "/api";
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Template API methods
  async getTemplates() {
    return this.request("/templates");
  }

  async getTemplate(id) {
    return this.request(`/templates/${id}`);
  }

  async createTemplate(templateData) {
    return this.request("/templates", {
      method: "POST",
      body: JSON.stringify(templateData),
    });
  }

  async updateTemplate(id, templateData) {
    return this.request(`/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(templateData),
    });
  }

  async deleteTemplate(id) {
    return this.request(`/templates/${id}`, {
      method: "DELETE",
    });
  }

  // Project API methods
  async getProjects(userId) {
    return this.request(`/projects?userId=${userId}`);
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  }

  async updateTaskStatus(projectId, taskId, status, notes = "") {
    return this.request(`/projects/${projectId}/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    });
  }

  // Utility methods
  async healthCheck() {
    return this.request("/health");
  }
}

// Create global API instance
window.api = new APIService();
