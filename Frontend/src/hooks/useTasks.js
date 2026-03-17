import { useState, useCallback } from "react";
import { taskApi } from "../services/taskApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async (statusFilter = null) => {
    setLoading(true);
    try {
      const data = await taskApi.getAllTask(statusFilter);
      setTasks(data);
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      await taskApi.createTask(taskData);
      await loadTasks();
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to create task");
    }
  };

  const removeTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      await loadTasks();
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to delete task");
    }
  };

  const editTask = async (id, updatedData) => {
    try {
      await taskApi.updateTask(id, updatedData);
      await loadTasks();
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to update task");
    }
  };

  const completeTask = async (id) => {
    try {
      await taskApi.completeTask(id);
      await loadTasks();
      setError(null);
    } catch (e) {
      setError(e.message || "Failed to complete task");
    }
  };

  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    removeTask,
    editTask,
    completeTask,
  };
}