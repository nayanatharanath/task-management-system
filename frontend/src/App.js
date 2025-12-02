import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import { ROUTES } from "./utils/constants";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 768
  );
  const { isAuthenticated } = useAuth();
  // memoized callback to toggle sidebar
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Header onSidebarToggle={handleSidebarToggle} />
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.TASKS} element={<Tasks />} />
            <Route
              path="*"
              element={<Navigate to={ROUTES.DASHBOARD} replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
