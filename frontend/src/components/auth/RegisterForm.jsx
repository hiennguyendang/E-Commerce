import React, { useState } from "react";import React, { useState } from "react";

import axiosInstance from "../../utils/axiosConfig";import axiosInstance from "../../utils/axiosConfig";

import { useNavigate } from "react-router-dom";import { useNavigate } from "react-router-dom";



export default function RegisterForm() {export default function RegisterForm() {

  const [form, setForm] = useState({  const [form, setForm] = useState({

    userName: "",    userName: "",

    displayName: "",    displayName: "",

    email: "",    email: "",

    password: "",    password: "",

    confirmPassword: "",    confirmPassword: "",

    phoneNumber: "",    phoneNumber: "",

    role: "Buyer",    role: "Buyer", // Buyer hoặc Seller

    shopName: "",    shopName: "",

    businessEmail: "",    businessEmail: "",

    businessPhone: "",    businessPhone: "",

    taxId: "",    taxId: "",

    businessLicenseNumber: ""    businessLicenseNumber: ""

  });  });

  const [error, setError] = useState("");  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  const navigate = useNavigate();



  const handleChange = (e) => {  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });    setForm({ ...form, [e.target.name]: e.target.value });

  };  };



  const handleSubmit = async (e) => {  const handleSubmit = async (e) => {

    e.preventDefault();    e.preventDefault();

    setError("");    setError("");



    if (form.password !== form.confirmPassword) {    if (form.password !== form.confirmPassword) {

      setError("Mật khẩu xác nhận không khớp!");      setError("Mật khẩu xác nhận không khớp!");

      return;      return;

    }    }



    if (form.password.length < 6) {    if (form.password.length < 6) {

      setError("Mật khẩu phải có ít nhất 6 ký tự!");      setError("Mật khẩu phải có ít nhất 6 ký tự!");

      return;      return;

    }    }



    if (form.role === "Seller" && !form.shopName) {    if (form.role === "Seller" && !form.shopName) {

      setError("Vui lòng nhập tên shop!");      setError("Vui lòng nhập tên shop!");

      return;      return;

    }    }



    setLoading(true);    setLoading(true);



    try {    try {

      const payload = {      const payload = {

        userName: form.userName,        userName: form.userName,

        displayName: form.displayName,        displayName: form.displayName,

        email: form.email,        email: form.email,

        password: form.password,        password: form.password,

        phoneNumber: form.phoneNumber,        phoneNumber: form.phoneNumber,

        role: form.role        role: form.role

      };      };



      if (form.role === "Seller") {      // Nếu là seller, thêm thông tin shop

        payload.shopName = form.shopName;      if (form.role === "Seller") {

        payload.businessEmail = form.businessEmail || form.email;        payload.shopName = form.shopName;

        payload.businessPhone = form.businessPhone || form.phoneNumber;        payload.businessEmail = form.businessEmail || form.email;

        payload.taxId = form.taxId;        payload.businessPhone = form.businessPhone || form.phoneNumber;

        payload.businessLicenseNumber = form.businessLicenseNumber;        payload.taxId = form.taxId;

      }        payload.businessLicenseNumber = form.businessLicenseNumber;

      }

      await axiosInstance.post("/auth/register", payload);

            await axiosInstance.post("/auth/register", payload);

      alert(`Đăng ký ${form.role === 'Seller' ? 'shop' : 'tài khoản'} thành công! Hãy đăng nhập.`);      

      navigate("/login");      alert(`Đăng ký ${form.role === 'Seller' ? 'shop' : 'tài khoản'} thành công! Hãy đăng nhập.`);

    } catch (err) {      navigate("/login");

      console.error("Register error:", err);    } catch (err) {

      setError(err.response?.data?.error || "Email đã tồn tại hoặc dữ liệu không hợp lệ!");      console.error("Register error:", err);

    } finally {      setError(err.response?.data?.error || "Email đã tồn tại hoặc dữ liệu không hợp lệ!");

      setLoading(false);    } finally {

    }      setLoading(false);

  };    }

  };

  return (

    <form onSubmit={handleSubmit} className="login-card" style={{ maxWidth: '600px' }}>  return (

      <h3 className="login-heading">Đăng ký tài khoản</h3>    <form onSubmit={handleSubmit} className="login-card" style={{ maxWidth: '600px' }}>

      <p className="login-sub">Tạo tài khoản mới để bắt đầu {form.role === 'Seller' ? 'bán hàng' : 'mua sắm'}!</p>      <h3 className="login-heading">Đăng ký tài khoản</h3>

      <p className="login-sub">Tạo tài khoản mới để bắt đầu {form.role === 'Seller' ? 'bán hàng' : 'mua sắm'}!</p>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3 text-start">

        <label className="form-label">Loại tài khoản *</label>      {/* Chọn loại tài khoản */}

        <div className="d-flex gap-3">      <div className="mb-3 text-start">

          <div className="form-check">        <label className="form-label">Loại tài khoản *</label>

            <input className="form-check-input" type="radio" name="role" value="Buyer" checked={form.role === "Buyer"} onChange={handleChange} />        <div className="d-flex gap-3">

            <label className="form-check-label">👤 Người mua</label>          <div className="form-check">

          </div>            <input

          <div className="form-check">              className="form-check-input"

            <input className="form-check-input" type="radio" name="role" value="Seller" checked={form.role === "Seller"} onChange={handleChange} />              type="radio"

            <label className="form-check-label">🏪 Người bán (Seller)</label>              name="role"

          </div>              value="Buyer"

        </div>              checked={form.role === "Buyer"}

      </div>              onChange={handleChange}

            />

      <div className="row">            <label className="form-check-label">

        <div className="col-md-6 mb-3 text-start">              👤 Người mua

          <label className="form-label">Tên đăng nhập *</label>            </label>

          <input type="text" className="form-control" name="userName" placeholder="username123" value={form.userName} onChange={handleChange} required disabled={loading} />          </div>

        </div>          <div className="form-check">

        <div className="col-md-6 mb-3 text-start">            <input

          <label className="form-label">Tên hiển thị *</label>              className="form-check-input"

          <input type="text" className="form-control" name="displayName" placeholder="Nguyễn Văn A" value={form.displayName} onChange={handleChange} required disabled={loading} />              type="radio"

        </div>              name="role"

      </div>              value="Seller"

              checked={form.role === "Seller"}

      <div className="mb-3 text-start">              onChange={handleChange}

        <label className="form-label">Email *</label>            />

        <input type="email" className="form-control" name="email" placeholder="email@example.com" value={form.email} onChange={handleChange} required disabled={loading} />            <label className="form-check-label">

      </div>              🏪 Người bán (Seller)

            </label>

      <div className="mb-3 text-start">          </div>

        <label className="form-label">Số điện thoại</label>        </div>

        <input type="tel" className="form-control" name="phoneNumber" placeholder="0123456789" value={form.phoneNumber} onChange={handleChange} disabled={loading} />      </div>

      </div>

      <div className="row">

      <div className="row">        <div className="col-md-6 mb-3 text-start">

        <div className="col-md-6 mb-3 text-start">          <label className="form-label">Tên đăng nhập *</label>

          <label className="form-label">Mật khẩu *</label>          <input

          <input type="password" className="form-control" name="password" placeholder="Tối thiểu 6 ký tự" value={form.password} onChange={handleChange} required disabled={loading} />            type="text"

        </div>            className="form-control"

        <div className="col-md-6 mb-3 text-start">            name="userName"

          <label className="form-label">Xác nhận mật khẩu *</label>            placeholder="username123"

          <input type="password" className="form-control" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />            value={form.userName}

        </div>            onChange={handleChange}

      </div>            required

            disabled={loading}

      {form.role === "Seller" && (          />

        <div className="border rounded p-3 mb-3 bg-light">        </div>

          <h6 className="mb-3 text-primary"><i className="bi bi-shop me-2"></i>Thông tin Shop</h6>

          <div className="mb-3 text-start">        <div className="col-md-6 mb-3 text-start">

            <label className="form-label">Tên Shop *</label>          <label className="form-label">Tên hiển thị *</label>

            <input type="text" className="form-control" name="shopName" placeholder="VD: TechStore Official" value={form.shopName} onChange={handleChange} required={form.role === "Seller"} disabled={loading} />          <input

          </div>            type="text"

          <div className="row">            className="form-control"

            <div className="col-md-6 mb-3 text-start">            name="displayName"

              <label className="form-label">Email kinh doanh</label>            placeholder="Nguyễn Văn A"

              <input type="email" className="form-control" name="businessEmail" placeholder="Để trống dùng email chính" value={form.businessEmail} onChange={handleChange} disabled={loading} />            value={form.displayName}

              <small className="text-muted">Mặc định dùng email đăng ký</small>            onChange={handleChange}

            </div>            required

            <div className="col-md-6 mb-3 text-start">            disabled={loading}

              <label className="form-label">SĐT kinh doanh</label>          />

              <input type="tel" className="form-control" name="businessPhone" placeholder="Để trống dùng SĐT chính" value={form.businessPhone} onChange={handleChange} disabled={loading} />        </div>

              <small className="text-muted">Mặc định dùng SĐT đăng ký</small>      </div>

            </div>

          </div>      <div className="mb-3 text-start">

          <div className="row">        <label className="form-label">Email *</label>

            <div className="col-md-6 mb-3 text-start">        <input

              <label className="form-label">Mã số thuế</label>          type="email"

              <input type="text" className="form-control" name="taxId" placeholder="VD: 0123456789" value={form.taxId} onChange={handleChange} disabled={loading} />          className="form-control"

            </div>          name="email"

            <div className="col-md-6 mb-3 text-start">          placeholder="email@example.com"

              <label className="form-label">Số GPKD</label>          value={form.email}

              <input type="text" className="form-control" name="businessLicenseNumber" placeholder="Giấy phép kinh doanh" value={form.businessLicenseNumber} onChange={handleChange} disabled={loading} />          onChange={handleChange}

            </div>          required

          </div>          disabled={loading}

        </div>        />

      )}      </div>



      <button type="submit" className="btn btn-bk w-100 mt-2" disabled={loading}>      <div className="mb-3 text-start">

        {loading ? "Đang xử lý..." : "Đăng ký"}        <label className="form-label">Số điện thoại</label>

      </button>        <input

          type="tel"

      <div className="mt-3 text-center">          className="form-control"

        <small className="text-muted">Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></small>          name="phoneNumber"

      </div>          placeholder="0123456789"

    </form>          value={form.phoneNumber}

  );          onChange={handleChange}

}          disabled={loading}

        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3 text-start">
          <label className="form-label">Mật khẩu *</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Tối thiểu 6 ký tự"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="col-md-6 mb-3 text-start">
          <label className="form-label">Xác nhận mật khẩu *</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
      </div>

      {/* Seller-specific fields */}
      {form.role === "Seller" && (
        <div className="border rounded p-3 mb-3 bg-light">
          <h6 className="mb-3 text-primary">
            <i className="bi bi-shop me-2"></i>Thông tin Shop
          </h6>

          <div className="mb-3 text-start">
            <label className="form-label">Tên Shop *</label>
            <input
              type="text"
              className="form-control"
              name="shopName"
              placeholder="VD: TechStore Official"
              value={form.shopName}
              onChange={handleChange}
              required={form.role === "Seller"}
              disabled={loading}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">Email kinh doanh</label>
              <input
                type="email"
                className="form-control"
                name="businessEmail"
                placeholder="Để trống dùng email chính"
                value={form.businessEmail}
                onChange={handleChange}
                disabled={loading}
              />
              <small className="text-muted">Mặc định dùng email đăng ký</small>
            </div>

            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">SĐT kinh doanh</label>
              <input
                type="tel"
                className="form-control"
                name="businessPhone"
                placeholder="Để trống dùng SĐT chính"
                value={form.businessPhone}
                onChange={handleChange}
                disabled={loading}
              />
              <small className="text-muted">Mặc định dùng SĐT đăng ký</small>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">Mã số thuế</label>
              <input
                type="text"
                className="form-control"
                name="taxId"
                placeholder="VD: 0123456789"
                value={form.taxId}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="col-md-6 mb-3 text-start">
              <label className="form-label">Số GPKD</label>
              <input
                type="text"
                className="form-control"
                name="businessLicenseNumber"
                placeholder="Giấy phép kinh doanh"
                value={form.businessLicenseNumber}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-bk w-100 mt-2" disabled={loading}>
        {loading ? "Đang xử lý..." : "Đăng ký"}
      </button>

      <div className="mt-3 text-center">
        <small className="text-muted">
          Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </small>
      </div>
    </form>
  );
}
          type="text"
          className="form-control"
          placeholder="Nhập họ tên"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Tạo mật khẩu"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Nhập lại mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-bk w-100 mt-2">
        Đăng ký
      </button>

      <div className="mt-3 text-center">
        <a href="/login" className="link-muted">
          Đã có tài khoản? Đăng nhập
        </a>
      </div>
    </form>
  );
}
