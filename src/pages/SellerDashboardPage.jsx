import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import Button from "../components/common/Button";

export default function SellerDashboardPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchMyProducts() {
      try {
        const res = await axiosInstance.get("/seller/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Không thể tải sản phẩm của người bán:", err);
      }
    }
    fetchMyProducts();
  }, []);

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-shop me-2"></i> Quản lý sản phẩm
      </h4>

      <Button label="➕ Thêm sản phẩm mới" onClick={() => alert("Tính năng thêm sản phẩm")} />

      <div className="table-responsive mt-3 bg-white rounded shadow-sm">
        <table className="table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString("vi-VN")} ₫</td>
                <td>{p.stock}</td>
                <td>{p.active ? "Hiển thị" : "Ẩn"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
