import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminNavigation.module.scss";
import { Link, Router } from "react-router-dom";
import { CiIndent } from "react-icons/ci";
import { CiSquareMore } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const cx = classNames.bind(styles);

function AdminDashboard() {
  const location = useLocation();
  const currentPath = location.pathname;


  function handleLogout() {
    // Xóa token khỏi cookie
    Cookies.remove("token");
  
    alert("Đăng xuất thành công!");
    window.location.href = "/admin"; // Chuyển hướng đến trang đăng nhập
  }

  return (
    <div className={cx("container-dashboard")}>
      <div className={cx("grid-dashboard")}>
        <div className={cx("row")}>
          <div className={cx("col-12", "brand-title")}>
            <Link className={cx("brand-title-link")}>PHUC CHAU PHARMA</Link>
          </div>
          <div className={cx("col-12")}>
            <Link
              to="/admin/dashboard"
              className={cx(
                "nav-item",
                currentPath == "/admin/dashboard" ? "nav-active" : null
              )}
            >
              <CiIndent className={cx("nav-item-icon")} />
              <h2 className={cx("nav-item-title")}>Tổng Quan</h2>
            </Link>
          </div>
          <div className={cx("col-12")}>
            <Link
              to="/admin/dashboard/products/1"
              className={cx(
                "nav-item",
                currentPath.indexOf("/admin/dashboard/products") !== -1
                  ? "nav-active"
                  : null
              )}
            >
              <CiSquareMore className={cx("nav-item-icon")} />
              <h2 className={cx("nav-item-title")}>Sản Phẩm</h2>
            </Link>
          </div>
          <div className={cx("col-12")}>
            <Link
              to="/admin/dashboard/customer/1"
              className={cx(
                "nav-item",
                currentPath.indexOf("/admin/dashboard/customer/") !== -1
                  ? "nav-active"
                  : null
              )}
            >
              <CiUser className={cx("nav-item-icon")} />
              <h2 className={cx("nav-item-title")}>Khách Hàng</h2>
            </Link>
          </div>
          <div className={cx("col-12")}>
            <Link
              to="/admin/dashboard/order/1"
              className={cx(
                "nav-item",
                currentPath.indexOf("/admin/dashboard/order/") !== -1
                  ? "nav-active"
                  : null
              )}
            >
              <CiShoppingCart className={cx("nav-item-icon")} />
              <h2 className={cx("nav-item-title")}>Đơn Hàng</h2>
            </Link>
          </div>

          <div className={cx("col-12", "logout-btn-div")}>
            <button onClick={handleLogout} className={cx("logout-btn")}>
              <CiLogout className={cx("nav-item-icon")} />
              <h2 className={cx("nav-item-title")}>Đăng Xuất</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
