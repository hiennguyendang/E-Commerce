import React, { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await axiosInstance.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (err) {
      setError("Email đã tồn tại hoặc dữ liệu không hợp lệ!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <h3 className="login-heading">Đăng ký tài khoản</h3>
      <p className="login-sub">Tạo tài khoản mới để bắt đầu mua sắm!</p>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3 text-start">
        <label className="form-label">Họ và tên</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập họ tên"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Tạo mật khẩu"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Nhập lại mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-bk w-100 mt-2">
        Đăng ký
      </button>

      <div className="mt-3 text-center">
        <a href="/login" className="link-muted">
          Đã có tài khoản? Đăng nhập
        </a>
      </div>
    </form>
  );
}
