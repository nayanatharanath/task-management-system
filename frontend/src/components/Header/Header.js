import React from "react";
import { headerConstants } from "../../utils/constants";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onSidebarToggle }) => {
  const { user, logout } = useAuth();
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="sidebar-toggle"
          onClick={onSidebarToggle}
          aria-label={headerConstants.SIDEBAR_TOGGLE_LABEL}
        >
          &#9776;
        </button>
        <span className="app-title">{headerConstants.APP_TITLE}</span>
      </div>
      <div className="header-right">
        {user && (
          <div className="user-menu">
            <span className="user-name">{user.name || user.email}</span>
            <button className="btn logout" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
