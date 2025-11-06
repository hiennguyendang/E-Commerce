import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Spinner from "../components/common/Spinner";

export default function SellerDashboardPage() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    category_ids: [],
    variants: [{ variant_name: "DEFAULT", price: 0, stock_quantity: 0 }],
    images: []
  });

  useEffect(() => {
    console.log('🔍 SellerDashboard mounted');
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      console.log('📡 Fetching seller data...');
      setLoading(true);
      const [productsRes, statsRes] = await Promise.all([
        axiosInstance.get("/seller/products"),
        axiosInstance.get("/seller/stats")
      ]);
      console.log('✅ Products:', productsRes.data);
      console.log('✅ Stats:', statsRes.data);
      setProducts(productsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("❌ Lỗi tải dữ liệu:", err);
      setMessage({ text: "Không thể tải dữ liệu seller", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi tải categories:", err);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        product_name: product.product_name,
        description: product.description || "",
        category_ids: [],
        variants: product.variants || [{ variant_name: "DEFAULT", price: product.min_price || 0, stock_quantity: product.total_stock || 0 }],
        images: []
      });
    } else {
      setEditingProduct(null);
      setFormData({
        product_name: "",
        description: "",
        category_ids: [],
        variants: [{ variant_name: "DEFAULT", price: 0, stock_quantity: 0 }],
        images: []
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Update product
        await axiosInstance.put(`/seller/products/${editingProduct.product_id}`, {
          product_name: formData.product_name,
          description: formData.description
        });
        setMessage({ text: "Cập nhật sản phẩm thành công!", type: "success" });
      } else {
        // Create product
        await axiosInstance.post("/seller/products", formData);
        setMessage({ text: "Tạo sản phẩm thành công!", type: "success" });
      }
      
      handleCloseModal();
      fetchData();
    } catch (err) {
      console.error("Lỗi lưu sản phẩm:", err);
      setMessage({ text: err.response?.data?.error || "Không thể lưu sản phẩm", type: "error" });
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await axiosInstance.delete(`/seller/products/${productId}`);
      setMessage({ text: "Xóa sản phẩm thành công!", type: "success" });
      fetchData();
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      setMessage({ text: "Không thể xóa sản phẩm", type: "error" });
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await axiosInstance.put(`/seller/products/${product.product_id}`, {
        is_active: !product.is_active
      });
      setMessage({ text: product.is_active ? "Đã ẩn sản phẩm" : "Đã hiển thị sản phẩm", type: "success" });
      fetchData();
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      setMessage({ text: "Không thể cập nhật trạng thái", type: "error" });
    }
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { variant_name: "", price: 0, stock_quantity: 0 }]
    });
  };

  const updateVariant = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const removeVariant = (index) => {
    if (formData.variants.length === 1) {
      setMessage({ text: "Phải có ít nhất 1 biến thể!", type: "error" });
      return;
    }
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  if (loading) return <Spinner message="Đang tải dữ liệu seller..." />;

  return (
    <div className="container py-4">
      {/* Message notification */}
      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h5>📦 Sản phẩm</h5>
                <h2>{stats.products}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h5>🛍️ Đơn hàng</h5>
                <h2>{stats.orders}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h5>💰 Doanh thu</h5>
                <h2>{(stats.revenue || 0).toLocaleString("vi-VN")}đ</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h5>⭐ Đánh giá</h5>
                <h2>4.5</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Management */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">
          <i className="bi bi-shop me-2"></i> Quản lý sản phẩm
        </h4>
        <Button label="➕ Thêm sản phẩm mới" onClick={() => handleOpenModal()} />
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Biến thể</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                  Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.product_id}>
                  <td>
                    <img 
                      src={p.image_url || "https://via.placeholder.com/80"} 
                      alt={p.product_name}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      className="rounded"
                    />
                  </td>
                  <td>
                    <strong>{p.product_name}</strong>
                    <br />
                    <small className="text-muted">{p.description?.substring(0, 50)}...</small>
                  </td>
                  <td>
                    {p.min_price === p.max_price 
                      ? `${(p.min_price || 0).toLocaleString("vi-VN")}đ`
                      : `${(p.min_price || 0).toLocaleString("vi-VN")}đ - ${(p.max_price || 0).toLocaleString("vi-VN")}đ`
                    }
                  </td>
                  <td>{p.total_stock || 0}</td>
                  <td>
                    <span className="badge bg-secondary">{p.variant_count} biến thể</span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${p.is_active ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleToggleActive(p)}
                    >
                      {p.is_active ? "Hiển thị" : "Ẩn"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => handleOpenModal(p)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p.product_id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal show={showModal} onClose={handleCloseModal} title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"} hideFooter={true}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm *</label>
            <input
              type="text"
              className="form-control"
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Danh mục</label>
            <select 
              multiple
              className="form-control"
              value={formData.category_ids}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                setFormData({ ...formData, category_ids: selected });
              }}
            >
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <small className="text-muted">Giữ Ctrl để chọn nhiều danh mục</small>
          </div>

          {!editingProduct && (
            <>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">Biến thể sản phẩm</label>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={addVariant}>
                    + Thêm biến thể
                  </button>
                </div>

                {formData.variants.map((variant, index) => (
                  <div key={index} className="border rounded p-2 p-md-3 mb-2 bg-light">
                    <div className="row g-2">
                      <div className="col-12 col-md-4">
                        <label className="form-label small mb-1">Tên biến thể</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="VD: Đỏ, Size M"
                          value={variant.variant_name}
                          onChange={(e) => updateVariant(index, 'variant_name', e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-md-3">
                        <label className="form-label small mb-1">Giá (VNĐ) *</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="199000"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value))}
                          required
                          min="0"
                        />
                      </div>
                      <div className="col-6 col-md-3">
                        <label className="form-label small mb-1">Số lượng *</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="100"
                          value={variant.stock_quantity}
                          onChange={(e) => updateVariant(index, 'stock_quantity', parseInt(e.target.value))}
                          required
                          min="0"
                        />
                      </div>
                      <div className="col-12 col-md-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm w-100"
                          onClick={() => removeVariant(index)}
                          disabled={formData.variants.length === 1}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label className="form-label">URL hình ảnh (mỗi URL một dòng)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  onChange={(e) => {
                    const urls = e.target.value.split('\n').filter(url => url.trim());
                    setFormData({ 
                      ...formData, 
                      images: urls.map(url => ({ image_url: url.trim() }))
                    });
                  }}
                />
                <small className="text-muted">Nhập mỗi URL trên một dòng</small>
              </div>
            </>
          )}

          <div className="d-flex flex-column flex-sm-row gap-2 mt-3 pt-3 border-top">
            <button type="submit" className="btn btn-primary flex-fill">
              <i className="bi bi-check-circle me-1"></i>
              {editingProduct ? "Cập nhật" : "Tạo sản phẩm"}
            </button>
            <button type="button" className="btn btn-secondary flex-fill flex-sm-grow-0" onClick={handleCloseModal}>
              <i className="bi bi-x-circle me-1"></i>
              Hủy
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
