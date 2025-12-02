import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { sidebarConstants } from "../../utils/constants";

const Sidebar = ({ isOpen, onClose }) => {
  const handleNavClick = () => {
    if (window.innerWidth < 768 && onClose) onClose();
  };
  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="nav-links">
          {sidebarConstants.NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={handleNavClick}
            >
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
