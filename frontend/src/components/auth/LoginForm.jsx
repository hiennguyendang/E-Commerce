// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi API login
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Lưu token và user vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Gọi callback
      onLogin(user);
      navigate("/app", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <h3 className="login-heading">Đăng nhập</h3>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3 text-start">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email (ví dụ: seller1@demo.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <button type="submit" className="btn btn-bk w-100 mt-2" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <div className="mt-3 text-center">
        <small className="text-muted">
          Tài khoản test: <b>seller1@demo.com</b> / <b>password123</b>
          <br />
          Hoặc đăng ký tài khoản buyer mới
        </small>
      </div>
    </form>
  );
}

