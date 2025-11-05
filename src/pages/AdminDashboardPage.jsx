import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
// import Spinner from "../components/common/Spinner";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axiosInstance.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Không thể tải thống kê:", err);
      } finally {
        // setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // if (loading) return <Spinner message="Đang tải thống kê..." />;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-bar-chart me-2"></i> Bảng điều khiển quản trị
      </h4>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h5>👥 Người dùng</h5>
            <h3>{stats.users}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h5>🛍️ Sản phẩm</h5>
            <h3>{stats.products}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <h5>📦 Đơn hàng</h5>
            <h3>{stats.orders}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
