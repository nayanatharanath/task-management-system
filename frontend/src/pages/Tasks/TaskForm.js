import React, { useState } from "react";
import {
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  TASK_PRIORITY,
  TASK_STATUS,
} from "../../utils/tasks";

// Component for adding or editing a task.

const TaskFrom = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    priority: task ? task.priority : TASK_PRIORITY.MEDIUM,
    state: task ? task.state : TASK_STATUS.NEW,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
    if (!task) {
      setFormData({
        title: "",
        description: "",
        priority: TASK_PRIORITY.MEDIUM,
        state: TASK_STATUS.NEW,
      });
    }
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input-title"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Taks title..."
        required
      />

      <input
        className="input-description"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Description (optional)"
      />

      <select
        className="input-select"
        value={formData.priority}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, priority: e.target.value }))
        }
      >
        {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
          <option key={key} value={key}>
            {config.label}
          </option>
        ))}
      </select>

      <select
        className="input-select"
        value={formData.state}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, state: e.target.value }))
        }
      >
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <option key={key} value={key}>
            {config.label}
          </option>
        ))}
      </select>

      <button type="submit" className="btn primary">
        {task ? "Update" : "Add"} Task
      </button>

      {task && (
        <button type="button" className="btn secondary" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskFrom;
