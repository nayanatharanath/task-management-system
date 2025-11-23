import React from "react";
import "./Dashboard.css";
import { dashboardConstants } from "../../utils/constants";

const Dashboard = () => {
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
            <span className="stat"> {dashboardConstants.ZERO_VALUE} </span>
            <span className="label"> {dashboardConstants.HABITS} </span>
          </div>
        </div>
        <div className="dashboard-card">
          <h3> {dashboardConstants.COMPLETED_TODAY}</h3>
          <div className="card-content">
            <span className="stat">{dashboardConstants.ZERO_VALUE}</span>
            <span className="label"> {dashboardConstants.TASKS} </span>
          </div>
        </div>
        <div className="dashboard-card">
          <h3> {dashboardConstants.CURRENT_STREAK}</h3>
          <div className="card-content">
            <span className="stat">{dashboardConstants.ZERO_VALUE}</span>
            <span className="label"> {dashboardConstants.DAYS} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
