import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskFilters from './TaskFilters'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './Tasks.css';

const Tasks = () => {
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const handleSubmitSuccess = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="tasks-page">
      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p className="subtitle">Manage your tasks and track habits</p>
        </div>
        {!showForm && !editingTask && (
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
             New Task
          </button>
        )}
      </div>

      {error && (
        <div className="error-banner">{error}</div>
      )}

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmitSuccess={handleSubmitSuccess}
          onCancel={handleCancel}
        />
      )}

      <TaskFilters />

      <TaskList
        tasks={tasks}
        loading={loading}
        onEdit={handleEdit}
        onDelete={() => {}}
      />
    </div>
  );
};

export default Tasks;