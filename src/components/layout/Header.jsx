import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import shopeeWhite from "../../assets/imgs/shopee-white.png";


export default function Header({ user, onLogout  }) {
  return (
    <header className="bk-topbar shadow-sm sticky-top">
      <div className="inner">
        <div className="topbar-rail">
          {/* Cột trái: logo + tiêu đề */}
          <div className="left-rail">
            <Link to="/app" className="d-flex align-items-center text-white text-decoration-none">
              <img src={shopeeWhite} alt="logo" className="bk-logo me-2" />
              <span className="bk-title">Shopee Clone</span>
            </Link>
          </div>

          {/* Cột giữa: thanh tìm kiếm */}
          <div className="flex-grow-1 mx-4 d-none d-md-block">
            <SearchBar
              placeholder="Tìm sản phẩm, danh mục hoặc shop..."
              onSearch={(kw) => console.log("Từ khóa:", kw)}
            />
          </div>

          {/* Cột phải: giỏ hàng + tài khoản */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/app/cart" className="text-white fs-5 text-decoration-none">
              <i className="bi bi-cart3"></i>
            </Link>

            {user ? (
                <div className="dropdown">
                    <button
                    className="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown"
                    >
                    {user.name}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="/app/profile">Tài khoản</a></li>
                    <li><a className="dropdown-item" href="/app/orders">Đơn hàng</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={onLogout}>
                        Đăng xuất
                        </button>
                    </li>
                    </ul>
                </div>
                ) : (
                <Link to="/" className="btn btn-light btn-sm fw-bold">
                    Đăng nhập
                </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
