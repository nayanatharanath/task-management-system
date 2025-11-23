import React, { createContext, useContext, useReducer, useState } from "react";
import { TASK_PRIORITY, TASK_STATUS } from "../../utils/tasks";

// This file is used for state management related to tasks across the application.
const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Morning Jog",
    description: "Jog for 30 minutes in the park",
    completed: false,
    priority: TASK_PRIORITY.MEDIUM,
    state: TASK_STATUS.NEW,
    createdDate: new Date().toISOString(),
  },
];

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [action.task, ...state];
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [filters, setFilters] = useState({
    search: "",
    priority: [],
    state: [],
  });

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      createdDate: new Date().toISOString(),
      completed: false,
      state: TASK_STATUS.NEW,
      ...taskData,
    };
    dispatch({ type: "ADD_TASK", task: newTask });
  };

  const updateTask = (taskData) => {
    dispatch({ type: "UPDATE_TASK", task: taskData });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", id: taskId });
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchSearch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesPriority =
        filters.priority.length === 0 ||
        filters.priority.includes(task.priority);
      const matchesState =
        filters.state.length === 0 || filters.state.includes(task.state);

      return matchSearch && matchesPriority && matchesState;
    });
  };

  const value = {
    tasks: getFilteredTasks(),
    addTask,
    updateTask,
    deleteTask,
    filters,
    setFilters,
  };

  return (
    <TaskContext.Provider value={value}> {children} </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be within a TaskProvider");
  }
  return context;
};
