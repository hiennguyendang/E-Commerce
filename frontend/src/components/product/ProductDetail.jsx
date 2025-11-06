import React, { useState } from "react";
import Button from "../common/Button";
import RatingStars from "../common/RatingStars";

export default function ProductDetail({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <h4 className="fw-bold">{product.name}</h4>
        <div className="d-flex align-items-center mb-3">
          <RatingStars rating={product.rating} />
          <span className="text-muted small ms-2">{product.reviews} đánh giá</span>
        </div>
        <h5 className="text-danger mb-3">
          {product.price.toLocaleString("vi-VN")} ₫
        </h5>
        <p className="text-muted">{product.description}</p>

        <div className="d-flex align-items-center gap-3 mb-3">
          <label className="fw-bold">Số lượng:</label>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <Button
          label="Thêm vào giỏ hàng"
          onClick={() => onAddToCart({ ...product, quantity })}
        />
      </div>
    </div>
  );
}
