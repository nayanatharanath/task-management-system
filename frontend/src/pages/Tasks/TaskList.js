import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div className="task-list-loading">Loading tasks...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>📝 No tasks found</p>
        <small>Create a new task to get started</small>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;