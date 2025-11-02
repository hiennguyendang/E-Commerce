import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import ProductDetail from "../components/product/ProductDetail";

export default function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Không thể tải sản phẩm:", err);
      }
    }
    fetchProduct();
  }, [id]);

  return (
    <div className="container py-4">
      <ProductDetail product={product} onAddToCart={onAddToCart} />
    </div>
  );
}
