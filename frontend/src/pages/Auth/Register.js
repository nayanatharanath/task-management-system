import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const result = await register(
      formData.email,
      formData.password,
      formData.name
    );
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error || authError);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p className="auth-subtitle">Create a new account</p>
        {error && <div className="error-message"> {error} </div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Jhon Doe"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., you@example.com"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn primary full-width"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
