import classNames from "classnames/bind";
import styles from "./AdminLogin.module.scss";
import images from "../../../assets/images";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const cx = classNames.bind(styles);

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // Hàm để lưu trữ token vào localStorage
  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  // Hàm để đọc token từ localStorage
  const loadToken = () => {
    return localStorage.getItem("token");
  };

  // Hàm để xóa token từ localStorage
  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const handleLogin = () => {
    const axiosLogin = async () => {
      try {
        const response = await axios.post(`http://${process.env.REACT_APP_API_URL}/admin/login`, {
          email,
          password,
        });

        // Lưu cookie với tên "token"
        Cookies.set("token", response.data.token, { expires: 1 / 24 }); // Hết hạn sau 1 giờ
        alert("Đăng nhập thành công!");

        window.location.href = "/admin/dashboard";
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error.response.data.message);
      }
    };

    axiosLogin();
  };

  return (
    <div className={cx("login-container")}>
      {/* Render the list of toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <div className={cx("login-inner")}>
        <div className={cx("login-form")}>
          <div className={cx("login-form-inner")}>
            <h1 className={cx("login-form-title-1")}>PhucChau Pharma</h1>
            <h2 className={cx("login-form-title-2")}>ĐĂNG NHẬP</h2>
            <p className={cx("login-form-p")}>
              Xin chào, vui lòng nhập thông tin đăng nhập!
            </p>
            <div className={cx("login-form-input")}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
              />
            </div>
            <div className={cx("login-form-input")}>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className={cx("login-form-button")} onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
        </div>
        <div className={cx("login-img")}>
          <img src={images.login}></img>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
