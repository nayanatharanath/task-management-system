import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import Analytics from "./pages/Analytics/Analytics";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { ROUTES } from "./utils/constants";
import { TaskProvider } from "./pages/Tasks/TaskContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 768
  );
  // memoized callback to toggle sidebar
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const isLoggedIn = false;
  const user = null;
  return (
    <BrowserRouter>
      <TaskProvider>
        <div className="app">
          <Header
            onSidebarToggle={handleSidebarToggle}
            isLoggedIn={isLoggedIn}
            user={user}
          />
          <div className={`app-container ${sidebarOpen ? "sidebar-open" : ""}`}>
            <Sidebar isOpen={sidebarOpen} />
            <main className="main-content">
              <Routes>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.TASKS} element={<Tasks />} />
                <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
                <Route path={ROUTES.PROFILE} element={<Profile />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.DASHBOARD} replace />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
