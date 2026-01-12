import classNames from "classnames/bind";
import styles from "./AdminPopup.module.scss";
import { VscCloseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function AdminPopup({ isVisible, onClose, onAddProductSuccess }) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    unit: "",
    quantity: "",
  });

  if (!isVisible) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Kiểm tra xem có file được chọn hay không
    if (file) {
      // Kiểm tra định dạng file
      if (file.type.startsWith("image/")) {
        // Nếu là file ảnh, tiến hành xử lý
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Nếu không phải là file ảnh, thông báo và đặt giá trị của input về null
        alert("Vui lòng chọn một file ảnh.");
        e.target.value = null; // Đặt giá trị của input về null để yêu cầu người dùng nhập lại
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("unit", productData.unit);
    formData.append("quantity", productData.quantity);
    formData.append("image1", imageFile);

    try {
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.post(
        `http://${process.env.REACT_APP_API_URL}/admin/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          
          },
        }
      );

      if (response.status === 201) {
        console.log("Product added successfully");
        setProductData({
          name: "",
          description: "",
          price: "",
          category: "",
          unit: "",
          quantity: "",
        });
        setImagePreview(null);
        onAddProductSuccess();
        onClose();
        navigate(`/admin/dashboard/products/${1}`);
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={cx("container", "container-popup")}>
      <div className={cx("grid", "grid-popup")}>
        <div className={cx("row")}>
          <div className={cx("col-11")}>
            <h1 className={cx("title-popup")}>THÊM SẢN PHẨM</h1>
          </div>
          <div onClick={onClose} className={cx("col-1", "close")}>
            <VscCloseAll className={cx("close-icon")} />
          </div>
        </div>
        {/*  */}
        <form onSubmit={handleAddProduct} encType="multipart/form-data">
          {/* Form cho thông tin product */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Ảnh</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="image1"
                type="file"
                name="image1"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-3")}></div>
            {imagePreview && (
              <div className={cx("col-9", "imagePreview-div")}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={cx("imagePreview")}
                />
              </div>
            )}
          </div>

          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="id">Mã sản phẩm (ID)</label>
            </div>
            <div className={cx("col-9")}>
              <span>Tự động</span>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="name">Tên sản phẩm</label>
            </div>
            <div className={cx("col-9")}>
              <input
                className={cx("input-form", "input-form-name")}
                id="name"
                type="text"
                name="name"
                value={productData.name}
                required
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="description">Mô tả</label>
            </div>
            <div className={cx("col-9")}>
              <textarea
                className={cx("input-form")}
                val
                name="description"
                id="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="price">Giá</label>
            </div>
            <div className={cx("col-9")}>
              <input
                className={cx("input-form")}
                id="price"
                type="number"
                name="price"
                value={productData.price}
                required
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          {/* .... */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="category">Loại sản phẩm</label>
            </div>
            <div className={cx("col-4")}>
              <select
                className={cx("input-form")}
                id="category"
                name="category"
                value={productData.category}
                required
                onChange={handleInputChange}
              >
                <option value="">-- Chọn loại sản phẩm --</option>
                <option value="Vitamin & Khoáng chất">Vitamin & Khoáng chất</option>
                <option value="Sinh lý - Nội tiết tố">Sinh lý - Nội tiết tố</option>
                <option value="Tăng cường chức năng">Tăng cường chức năng</option>
                <option value="Hỗ trợ điều trị">Hỗ trợ điều trị</option>
                <option value="Hỗ trợ tiêu hóa">Hỗ trợ tiêu hóa</option>
                <option value="Thần kinh não">Thần kinh não</option>
              </select>
            </div>
            {/*  */}
            <div className={cx("col-2", "label-div")}>
              <label htmlFor="unit">Đơn vị tính</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="unit"
                type="text"
                name="unit"
                value={productData.unit}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Số lượng</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="quantity"
                type="number"
                name="quantity"
                value={productData.quantity}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/*  */}

          <div className={cx("row")}>
            <div className={cx("col-12", "btn-submit-div")}>
              <button className={cx("btn-submit")} type="submit">
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPopup;
