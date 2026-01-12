import classNames from "classnames/bind";
import styles from "./AdminPopup.module.scss";
import { VscCloseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function AdminPopup({
  product,
  isVisible,
  onClose,
  onAddProductSuccess,
  disabledInputPopup,
}) {
  const [productData, setProductData] = useState({});

  console.log(product);
  useEffect(() => {
    setProductData(product);
  }, [product]);

  if (!isVisible) {
    return null;
  }

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value !== undefined ? value : prevData[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi dữ liệu về server
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.put(
        `http://${process.env.REACT_APP_API_URL}/admin/putAdminProduct`,
        {
          ...productData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        onClose();
        onAddProductSuccess();
        // // Cập nhật UI nếu thành công
        // onUpdate({ ...productData, variants: variantsData });
        // onClose(); // Đóng popup sau khi cập nhật thành công
      } else {
        // Xử lý lỗi nếu có
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={cx("container", "container-popup")}>
      <div className={cx("grid", "grid-popup")}>
        <div className={cx("row")}>
          <div className={cx("col-11")}>
            {disabledInputPopup ? (
              <h1 className={cx("title-popup")}>XEM SẢN PHẨM</h1>
            ) : (
              <h1 className={cx("title-popup")}>SỬA SẢN PHẨM</h1>
            )}
          </div>
          <div onClick={onClose} className={cx("col-1", "close")}>
            <VscCloseAll className={cx("close-icon")} />
          </div>
        </div>
        {/*  */}
        <form onSubmit={handleSubmit}>
          {/* Form cho thông tin product */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="id">Hình ảnh</label>
            </div>
            <div className={cx("col-4", "flex-center")}>
              {productData && (
                <img className={cx("product-img")} src={productData.image1} />
              )}
            </div>
          </div>

          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="id">Mã sản phẩm (ID)</label>
            </div>
            <div className={cx("col-3")}>
              {productData && (
                <input
                  className={cx("input-form")}
                  disabled
                  value={productData.product_id}
                ></input>
              )}
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="name">Tên sản phẩm</label>
            </div>
            <div className={cx("col-9")}>
              {productData && (
                <input
                  className={cx("input-form", "input-form-name")}
                  id="name"
                  type="text"
                  name="name"
                  value={productData?.name || ""}
                  onChange={handleProductChange}
                  disabled={disabledInputPopup ? true : false}
                />
              )}
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="description">Mô tả</label>
            </div>
            <div className={cx("col-9")}>
              {productData && (
                <textarea
                  className={cx("input-form")}
                  value={productData.description}
                  onChange={handleProductChange}
                  name="description"
                  id="description"
                  disabled={disabledInputPopup ? true : false}
                ></textarea>
              )}
            </div>
          </div>
          {/* ...... */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="price">Giá</label>
            </div>
            <div className={cx("col-9")}>
              {productData && (
                <input
                  className={cx("input-form")}
                  id="price"
                  type="text"
                  name="price"
                  onChange={handleProductChange}
                  value={productData.price}
                  disabled={disabledInputPopup ? true : false}
                ></input>
              )}
            </div>
          </div>

          {/* ..... */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="category">Loại sản phẩm</label>
            </div>
            <div className={cx("col-4")}>
              {productData && (
                <select
                  className={cx("input-form")}
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleProductChange}
                  disabled={disabledInputPopup ? true : false}
                >
                  <option value="">-- Chọn loại sản phẩm --</option>
                  <option value="Vitamin & Khoáng chất">Vitamin & Khoáng chất</option>
                  <option value="Sinh lý - Nội tiết tố">Sinh lý - Nội tiết tố</option>
                  <option value="Tăng cường chức năng">Tăng cường chức năng</option>
                  <option value="Hỗ trợ điều trị">Hỗ trợ điều trị</option>
                  <option value="Hỗ trợ tiêu hóa">Hỗ trợ tiêu hóa</option>
                  <option value="Thần kinh não">Thần kinh não</option>
                </select>
              )}
            </div>
            {/*  */}
            <div className={cx("col-2", "label-div")}>
              <label htmlFor="unit">Đơn vị tính</label>
            </div>
            <div className={cx("col-3")}>
              {productData && (
                <input
                  className={cx("input-form")}
                  id="unit"
                  type="text"
                  name="unit"
                  value={productData.unit}
                  onChange={handleProductChange}
                  disabled={disabledInputPopup ? true : false}
                />
              )}
            </div>
          </div>
          {/* ..... */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Số lượng</label>
            </div>
            <div className={cx("col-3")}>
              {productData && (
                <input
                  type="number"
                  min="0"
                  className={cx("input-form")}
                  id="quantity"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleProductChange}
                  disabled={disabledInputPopup ? true : false}
                />
              )}
            </div>
          </div>

          {/* .... */}
          <div className={cx("row")}>
            {disabledInputPopup == false ? (
              <div className={cx("col-7", "btn-submit-div")}>
                <button className={cx("btn-submit")} type="submit">
                  Lưu
                </button>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPopup;
