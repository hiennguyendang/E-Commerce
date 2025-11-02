// src/components/auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Tài khoản test mặc định
const TEST_USERS = [
  { username: "buyer", password: "123456", name: "Hoàng", role: "Buyer" },
  { username: "seller", password: "123456", name: "Hiên", role: "Seller" },
  { username: "admin", password: "123456", name: "Dũng", role: "Admin" },
];

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ===== 1️⃣ Kiểm tra tài khoản test mặc định =====
    const testUser = TEST_USERS.find(
      (u) => u.username === username && u.password === password
    );

    // ===== 2️⃣ Lấy danh sách user đã đăng ký từ localStorage =====
    let registeredUsers = [];
    try {
      registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    } catch (err) {
      console.warn("Không đọc được registeredUsers:", err);
    }

    // ===== 3️⃣ Kiểm tra trong danh sách đã đăng ký =====
    const localUser = registeredUsers.find(
      (u) => u.username === username && u.password === password
    );

    // ===== 4️⃣ Nếu không tồn tại user =====
    if (!testUser && !localUser) {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
      return;
    }

    // ===== 5️⃣ Gộp thông tin user =====
    const user = testUser || {
      username: localUser.username,
      name: localUser.name,
      role: localUser.role || "Buyer",
      avatar: "/default-avatar.jpg",
    };

    // ===== 6️⃣ Lưu user vào localStorage và gọi callback =====
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.warn("Không lưu được user:", err);
    }

    onLogin(user);
    navigate("/app", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="login-card">
      <h3 className="login-heading">Login</h3>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3 text-start">
        <label className="form-label">Tên đăng nhập</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập username (ví dụ: buyer)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
        />
      </div>

      <button type="submit" className="btn btn-bk w-100 mt-2">
        Đăng nhập
      </button>

      <div className="mt-3 text-center">
        <small className="text-muted">
          Tài khoản: <b>buyer</b>, <b>seller</b>, <b>admin</b> (mật khẩu:{" "}
          <b>123456</b>)
        </small>
      </div>
    </form>
  );
}
