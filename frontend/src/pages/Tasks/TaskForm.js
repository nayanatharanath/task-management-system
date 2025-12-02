import React, { useState, useEffect } from 'react';
import { TASK_PRIORITY, TASK_STATE, PRIORITY_CONFIG, STATE_CONFIG } from '../../utils/tasks';
import { useTasks } from '../../context/TaskContext';
import './TaskForm.css';

const TaskForm = ({ task, onSubmitSuccess, onCancel }) => {
  const { addTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TASK_PRIORITY.MEDIUM,
    state: TASK_STATE.NEW
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || TASK_PRIORITY.MEDIUM,
        state: task.state || TASK_STATE.NEW
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    let result;
    if (task) {
      result = await updateTask(task.id, formData);
    } else {
      result = await addTask(formData);
    }

    setLoading(false);

    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: TASK_PRIORITY.MEDIUM,
        state: TASK_STATE.NEW
      });
      if (onSubmitSuccess) onSubmitSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description..."
            disabled={loading}
            rows="3"
          />
        </div>
      </div>

      <div className="form-row three-col">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            disabled={loading}
          >
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state">Status</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={loading}
          >
            {Object.entries(STATE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group button-group">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Saving...' : (task ? 'Update Task' : 'Add Task')}
          </button>
          {task && (
            <button 
              type="button" 
              className="btn secondary" 
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}
    </form>
  );
};

export default TaskForm;