import React, { useState } from "react";
import "./Tasks.css";
import { useTasks } from "./TaskContext";
import TaskFilters from "./TaskFilters";
import TaskFrom from "./TaskForm";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, filters, setFilters } =
    useTasks();
  const [editTask, setEditTask] = useState(null);

  const handleSubmit = (taskData) => {
    if (editTask) {
      updateTask({ ...editTask, ...taskData });
      setEditTask(null);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="task-page">
      <div className="page-header">
        <h1>Tasks</h1>
        <p className="subtitle">Manage your tasks and track habits</p>
      </div>

      <TaskFilters filters={filters} onFilterChange={setFilters} />
      <TaskFrom
        task={editTask}
        onSubmit={handleSubmit}
        onCancel={() => setEditTask(null)}
      />
      <TaskItem task={tasks} onEdit={setEditTask} onDelete={deleteTask} />
    </div>
  );
};

export default Tasks;
