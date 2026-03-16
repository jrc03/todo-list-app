import { useState, useCallback, useState } from "react";
import { taskApi } from "../src/services/taskApi";

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
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    await taskApi.createTask(taskData);
    await loadTasks();
  };
  const removeTask = async (id) => {
    await taskApi.deleteTask(id);
    await loadTasks();
  };
  const editTask = async (id, updatedData) => {
    await taskApi.updateTask(id, updatedData);
  };
  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    removeTask,
    editTask,
  };
}
