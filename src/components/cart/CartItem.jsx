import React from "react";
import { Trash } from "react-bootstrap-icons";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value, 10);
    if (newQty >= 1) onQuantityChange(item.id, newQty);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-3 border-bottom bg-white rounded-3 shadow-sm mb-2">
      {/* Ảnh sản phẩm */}
      <div className="d-flex align-items-center" style={{ flex: "1" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }}
          className="me-3"
        />
        <div>
          <h6 className="mb-1">{item.name}</h6>
          <p className="text-muted small mb-0">
            {item.variant || "Phiên bản mặc định"}
          </p>
        </div>
      </div>

      {/* Giá & Số lượng */}
      <div className="d-flex align-items-center gap-3">
        <div className="text-end">
          <span className="fw-bold text-danger">
            {item.price.toLocaleString("vi-VN")} ₫
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          style={{ width: "70px" }}
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(item.id)}
          title="Xóa sản phẩm"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
