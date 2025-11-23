import React from "react";
import { headerConstants } from "../../utils/constants";
import "./Header.css";

const Header = ({ onSidebarToggle, isLoggedIn, user }) => {
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
        {isLoggedIn ? (
          <div className="user-info">
            <span>{user?.name || "User"}</span>
            {/* Need to add dropdown for logout and profile */}
          </div>
        ) : (
          <div className="auth-links">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
