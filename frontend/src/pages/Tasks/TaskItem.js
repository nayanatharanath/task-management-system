import React, { useState } from 'react';
import { PRIORITY_CONFIG, STATE_CONFIG } from '../../utils/tasks';
import { useTasks } from '../../context/TaskContext';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { deleteTask } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const stateConfig = STATE_CONFIG[task.state];

  if (!priorityConfig || !stateConfig) {
    return null;
  }

  const createdDate = new Date(task.created_date).toLocaleDateString();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeleting(true);
      await deleteTask(task.id);
      setDeleting(false);
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="task-item">
      <div className="task-main">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className="task-date">{createdDate}</span>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-badges">
          <span
            className="badge"
            style={{
              backgroundColor: priorityConfig.bgColor,
              color: priorityConfig.color,
            }}
          >
            {priorityConfig.label}
          </span>
          <span
            className="badge"
            style={{
              backgroundColor: stateConfig.bgColor,
              color: stateConfig.color,
            }}
          >
            {stateConfig.label}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          title="Delete task"
        >
          {deleting ? '...' : '🗑️'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;