import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task or habit..."
      />
      <input
        className="input description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional description"
      />
      <button type="submit" className="btn primary">Add</button>
    </form>
  );
};

export default TaskForm;
