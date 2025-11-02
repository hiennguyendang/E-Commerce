import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import RatingStars from "../common/RatingStars";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  return (
    <div
      className="card h-100 border-0 shadow-sm product-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/app/product/${product.id}`)}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title text-truncate">{product.name}</h6>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <span className="text-danger fw-bold">
              {product.price.toLocaleString("vi-VN")} ₫
            </span>
            <RatingStars rating={product.rating} size={14} />
          </div>
        </div>
        <div className="mt-3">
          <Button
            label="Thêm vào giỏ"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // ngăn click mở trang chi tiết
              onAddToCart(product);
            }}
          />
        </div>
      </div>
    </div>
  );
}
