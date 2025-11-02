import React, { useState } from "react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-credit-card me-2"></i> Thanh toán
      </h4>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Họ tên người nhận</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa chỉ giao hàng</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phương thức thanh toán</label>
          <select
            className="form-select"
            name="payment"
            value={form.payment}
            onChange={handleChange}
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="bank">Chuyển khoản ngân hàng</option>
            <option value="momo">Ví MoMo</option>
          </select>
        </div>

        <Button label="Xác nhận đơn hàng" type="submit" />
      </form>

      <Modal
        title="Xác nhận đặt hàng"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      >
        <p>Bạn có chắc muốn đặt đơn hàng này không?</p>
      </Modal>
    </div>
  );
}
