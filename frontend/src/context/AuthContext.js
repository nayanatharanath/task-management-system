import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // initialize from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (email, password, name) => {
    try {
      setError(null);
      const response = await api.post("/auth/register", {
        email,
        password,
        name,
      });
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Registeration Failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      if (!token) {
        throw new Error("No token received from server");
      }
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Login Failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
