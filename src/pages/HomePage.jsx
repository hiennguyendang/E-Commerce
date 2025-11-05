import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import ProductList from "../components/product/ProductList";
import ProductFilter from "../components/product/ProductFilter";
// import Spinner from "../components/common/Spinner";

export default function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get("/categories"),
        ]);
        setProducts(prodRes.data);
        setFiltered(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Không thể tải dữ liệu:", err);
      } finally {
        // setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFilter = (type, value) => {
    let result = [...products];
    if (type === "category" && value) result = result.filter(p => p.category === value);
    if (type === "maxPrice" && value) result = result.filter(p => p.price <= value);
    setFiltered(result);
  };

  // if (loading) return <Spinner message="Đang tải sản phẩm..." />;

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
