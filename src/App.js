// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout & pages
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function App() {
  // Lấy user từ localStorage (nếu có phiên trước)
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Giỏ hàng front-end (cơ bản)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Lưu cart khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Hàm thêm vào giỏ (dùng chung)
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((it) => it.id === product.id);
      if (exist) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, quantity: it.quantity + (product.quantity || 1) } : it
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
    // Có thể thay bằng toast thay vì alert
    alert(`Đã thêm "${product.name}" vào giỏ hàng.`);
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch {}
  };

  // Hàm xử lý login từ LoginForm
  const handleLogin = (userObj) => {
    setUser(userObj);
    // localStorage đã được ghi trong LoginForm nhưng đảm bảo lại
    try {
      localStorage.setItem("user", JSON.stringify(userObj));
    } catch {}
  };

  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/app" element={<AppLayout user={user} onLogout={handleLogout} />}>
            <Route index element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
            <Route path="cart" element={<CartPage items={cartItems} />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="profile" element={<ProfilePage user={user} />} />

            {user.role === "Seller" && <Route path="seller" element={<SellerDashboardPage />} />}
            {user.role === "Admin" && <Route path="admin" element={<AdminDashboardPage />} />}
          </Route>

          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
