import React from 'react';
import { PRIORITY_CONFIG, STATE_CONFIG } from '../../utils/tasks';
import { useTasks } from '../../context/TaskContext';
import './TaskFilters.css';

const TaskFilters = () => {
  const { filters, setFilters } = useTasks();

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const togglePriority = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    setFilters({ ...filters, priority: newPriorities });
  };

  const toggleState = (state) => {
    const newStates = filters.state.includes(state)
      ? filters.state.filter(s => s !== state)
      : [...filters.state, state];
    setFilters({ ...filters, state: newStates });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priority: [],
      state: []
    });
  };

  return (
    <div className="task-filters">
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters-row">
        <div className="filter-section">
          <span className="filter-label">Priority:</span>
          <div className="filter-buttons">
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`filter-btn ${filters.priority.includes(key) ? 'active' : ''}`}
                style={{
                  '--btn-color': config.color,
                  '--btn-bg': config.bgColor
                }}
                onClick={() => togglePriority(key)}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <span className="filter-label">Status:</span>
          <div className="filter-buttons">
            {Object.entries(STATE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`filter-btn ${filters.state.includes(key) ? 'active' : ''}`}
                style={{
                  '--btn-color': config.color,
                  '--btn-bg': config.bgColor
                }}
                onClick={() => toggleState(key)}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(filters.search || filters.priority.length > 0 || filters.state.length > 0) && (
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default TaskFilters;