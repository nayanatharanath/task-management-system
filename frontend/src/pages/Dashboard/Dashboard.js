import React, { useMemo } from "react";
import "./Dashboard.css";
import { dashboardConstants } from "../../utils/constants";
import { useTasks } from "../../context/TaskContext";
import { TASK_STATE } from "../../utils/tasks";

const Dashboard = () => {
  const { tasks, loading } = useTasks();

  const status = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        newTasks: 0,
        completionRate: 0,
      };
    }

    const total = tasks.length;
    const completed = tasks.filter((t) => t.state === TASK_STATE.DONE).length;
    const inProgress = tasks.filter(
      (t) => t.state === TASK_STATE.IN_PROGRESS
    ).length;
    const newTask = tasks.filter((t) => t.state === TASK_STATE.NEW).length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: inProgress,
      newTasks: newTask,
      completionRate: completionRate,
    };
  }, [tasks]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading dashboard</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>{dashboardConstants.HEADER}</h1>
        <p className="subtitle"> {dashboardConstants.SUBTITLE} </p>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3> {dashboardConstants.ACTIVE_HABITS}</h3>
          <div className="card-content">
            <span className="stat"> {status.totalTasks} </span>
            <span className="label"> {dashboardConstants.HABITS} </span>
          </div>
        </div>
        <div className="dashboard-card">
          <h3> {dashboardConstants.COMPLETED_TODAY}</h3>
          <div className="card-content">
            <span className="stat"> {status.completedTasks} </span>
            <span className="label"> {dashboardConstants.TASKS} </span>
          </div>
        </div>
        <div className="dashboard-card">
          <h3> {dashboardConstants.CURRENT_STREAK}</h3>
          <div className="card-content">
            <span className="stat">{status.completionRate}</span>
            <span className="label"> {dashboardConstants.DAYS} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
