import { PRIORITY_CONFIG, STATUS_CONFIG } from "../../utils/tasks";

// Component for displaying the list of tasks.
const TaskItem = ({ task, onEdit, onDelete }) => {
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const stateConfig = STATUS_CONFIG[task.state];
  const createdDate = new Date(task.createdDate).toLocaleDateString();

  return (
    <li className="task-item">
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title"> {task.title} </h3>
          <div className="task-badges">
            <span
              className="badge priority"
              style={{
                "--badge-color": priorityConfig.color,
                "--badge-bg": priorityConfig.bgColor,
              }}
            >
              {stateConfig.label}
            </span>
            <span
              className="badge state"
              style={{
                "--badge-color": stateConfig.color,
                "--badge-bg": stateConfig.bgColor,
              }}
            >
              {stateConfig.label}
            </span>
          </div>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-footer">
          <span className="task-date">Created: {createdDate}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
