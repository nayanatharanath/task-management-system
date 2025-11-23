import React, { useState } from 'react';
import './App.css';

import Header from './comp/Header';
import TaskForm from './comp/TaskForm'
import TaskList from './comp/TaskList'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning run', description: 'Run 3km', completed: false },
    { id: 2, title: 'Read', description: "Read 20 pages", completed: true },
    { id: 3, title: 'Meditation', description: '10 minutes', completed: false },
  ]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description || '',
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="App">
      <div className="app-container">
        <Header tasks={tasks} />
        <main>
          <TaskForm onAdd={addTask} />
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} />
        </main>
      </div>
    </div>
  );
}

export default App;
