const API_BASE = import.meta.env.VITE_API_URL;

export const taskApi = {
  getAllTask: async (status = null) => {
    let url = API_BASE;
    if (status != null) url += `?status=${status}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load tasks");

    return response.json();
  },

  createTask: async (taskData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  updateTask: async (id, updatedData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete task");
  },
};
