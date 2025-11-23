import React from 'react';

const Header = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  return (
    <header className="app-header">
      <div className="header-inner">
        <h1>Smart Habit Tracker</h1>
        <div className="stats">
          <span>{completed} completed</span>
          <span> / </span>
          <span>{total} total</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
