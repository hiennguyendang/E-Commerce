import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
// import Spinner from "../components/common/Spinner";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axiosInstance.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Không thể tải đơn hàng:", err);
      } finally {
        // setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // if (loading) return <Spinner message="Đang tải đơn hàng..." />;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-bag-check me-2"></i> Đơn hàng của bạn
      </h4>

      {orders.length === 0 ? (
        <div className="alert alert-info">Bạn chưa có đơn hàng nào.</div>
      ) : (
        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.code}</td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                  <td>{o.total.toLocaleString("vi-VN")} ₫</td>
                  <td>
                    <span className={`badge bg-${o.status === "Đã giao" ? "success" : "warning"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
