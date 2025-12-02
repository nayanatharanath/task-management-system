import React, { createContext, useContext, useState, useEffect } from 'react';
import { TASK_STATE, TASK_PRIORITY } from '../utils/tasks';
import api from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: [],
    state: []
  });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.priority.length > 0) {
        filters.priority.forEach(p => params.append('priority', p));
      }
      if (filters.state.length > 0) {
        filters.state.forEach(s => params.append('state', s));
      }

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.items || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const addTask = async (taskData) => {
    try {
      setError(null);
      const response = await api.post('/tasks', {
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority || TASK_PRIORITY.MEDIUM,
        state: taskData.state || TASK_STATE.NEW
      });
      
      setTasks([response.data.task, ...tasks]);
      return { success: true, task: response.data.task };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setError(null);
      const response = await api.put(`/tasks/${taskId}`, {
        title: taskData.title,
        description: taskData.description || '',
        priority: taskData.priority,
        state: taskData.state,
        completed: taskData.completed || false
      });
      
      setTasks(tasks.map(t => t.id === taskId ? response.data.task : t));
      return { success: true, task: response.data.task };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to update task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError(null);
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to delete task';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const value = {
    tasks,
    loading,
    error,
    filters,
    setFilters: updateFilters,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};