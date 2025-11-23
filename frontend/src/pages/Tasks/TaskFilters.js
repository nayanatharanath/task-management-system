import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../utils/tasks";

// Component for filtering tasks based on search, priority, and state.
const TaskFilters = ({ filters, onFilterChange }) => {
  const handleSearchChange = (search) => {
    onFilterChange({ ...filters, search: search.target.value });
  };

  const togglePriority = (priority) => {
    const newProiority = filters.priority.includes(priority)
      ? filters.priority.filter((p) => p !== priority)
      : [...filters.priority, priority];
    onFilterChange({ ...filters, priority: newProiority });
  };

  const toggleState = (state) => {
    const newState = filters.state.includes(state)
      ? filters.state.filter((s) => s !== state)
      : [...filters.state, state];
    onFilterChange({ ...filters, state: newState });
  };

  return (
    <div className="task-filters">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-section">
        <span className="filter-label">Priority:</span>
        <div className="filter-buttons">
          {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
            <button
              key={key}
              className={`filter=btn ${filters.priority.includes(key)}`}
              style={{
                "--btn-color": config.color,
                "--btn-bg": config.bgColor,
              }}
              onClick={() => togglePriority(key)}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <span className="filter-label">State:</span>
        <div className="filter-buttons">
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <button
              key={key}
              className={`filter=btn ${filters.state.includes(key)}`}
              style={{
                "--btn-color": config.color,
                "--btn-bg": config.bgColor,
              }}
              onClick={() => toggleState(key)}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
