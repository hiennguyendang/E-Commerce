import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import ProductList from "../components/product/ProductList";
import ProductFilter from "../components/product/ProductFilter";
import Spinner from "../components/common/Spinner";

export default function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get("/categories"),
        ]);

        const list = Array.isArray(prodRes.data)
          ? prodRes.data
          : (prodRes.data?.products || []);

        const mapped = list.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price || p.min_price || 0),
          image: p.primary_image || p.image || "",
          rating: p.rating_average || 0,
          reviews: p.rating_count || 0,
        }));

        setProducts(mapped);
        setFiltered(mapped);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error("Không thể tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFilter = async (type, value) => {
    if (type === "category") {
      if (!value) return setFiltered(products);
      try {
        const cat = categories.find((c) => c.name === value);
        if (!cat) return setFiltered(products);
        const res = await axiosInstance.get("/products", { params: { category: cat.id } });
        const list = res.data?.products || [];
        const mapped = list.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price || p.min_price || 0),
          image: p.primary_image || p.image || "",
          rating: p.rating_average || 0,
          reviews: p.rating_count || 0,
        }));
        setFiltered(mapped);
      } catch (e) {
        console.error("Lọc theo danh mục lỗi:", e);
        setFiltered(products);
      }
      return;
    }
    if (type === "maxPrice") {
      const max = Number(value || 0);
      if (!max) return setFiltered(products);
      setFiltered(products.filter((p) => p.price <= max));
    }
  };

  if (loading) return <Spinner message="Đang tải sản phẩm..." />;

  return (
    <div className="row g-4">
      <div className="col-lg-3">
        <ProductFilter categories={categories} onFilter={handleFilter} />
      </div>
      <div className="col-lg-9">
        <ProductList products={filtered} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}
