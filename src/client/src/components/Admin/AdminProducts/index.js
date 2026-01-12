import classNames from "classnames/bind";
import styles from "./AdminProducts.module.scss";
import images from "../../../assets/images";
import { FcDataConfiguration } from "react-icons/fc";
import { FcDeleteDatabase } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcDatabase } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import AdminPopup from "../AdminPopup";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AdminAddProduct from "../AdminAddProduct";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function AdminProducts({ axiosProducts, page, products }) {
  const navigate = useNavigate();
  const [addProductSuccess, setAddProductSuccess] = useState(false);

  //Phân trang
  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (products[0]) {
      setAmountPage(Math.ceil(products[0].total_number_products / 6));
    }
    setCurrentPage(page);
  }, [products, page]);

  useEffect(() => {
    if (currentPage !== page) {
      navigate(`/admin/dashboard/products/${currentPage}`);
      axiosProducts(currentPage);
    }
  }, [currentPage]);

  //Sau khi xoá sản phẩm hay thêm
  const handleAddProductSuccess = () => {
    setAddProductSuccess(true);
  };

  useEffect(() => {
    if (addProductSuccess) {
      setCurrentPage(1);
      navigate(`/admin/dashboard/products/${1}`);
      setAddProductSuccess(false);
    }
  }, [addProductSuccess]);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  //POPUP sửa sản phẩm //
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const [disabledInputPopup, setDisabledInputPopup] = useState(false);

  const togglePopup = (product) => {
    setPopupVisible((prevState) => !prevState);
    setSelectProduct(product);
  };
  //
  const [isPopupVisible1, setPopupVisible1] = useState(false);

  const togglePopupAddProduct = (product) => {
    setPopupVisible1((prevState) => !prevState);
    // setSelectProduct(product);
  };
  //POPUP sửa sản phẩm //

  //BEGIN: XOÁ SẢN PHẨM//
  const handleDeleteProduct = async (productId) => {
    const userConfirmed = window.confirm("Bạn có chắc chắn muốn xoá?");
    if (userConfirmed) {
      // Xử lý khi người dùng xác nhận
      try {
        const token = Cookies.get("token"); // Lấy token từ cookie
        const response = await axios.delete(
          `http://${process.env.REACT_APP_API_URL}/admin/delete/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          axiosProducts(1);
          console.log("Xoá thành công!");
        } else {
          console.error("Xoá thất bại ", response.statusText);
        }
      } catch (error) {
        console.error("Xoá thất bại:", error);
      }
    } else {
      return;
      // Xử lý khi người dùng hủy bỏ
    }
  };
  //END: XOÁ SẢN PHẨM//
  return (
    <>
      <div className={cx("container", "container-admin", "admin-order")}>
        <div className={cx("grid", "grid-admin")}>
          <div className={cx("row", "row-admin", "admin-header")}>
            <div className={cx("col-10")}>
              <h2 className={cx("title-page")}>SẢN PHẨM</h2>
            </div>
            <div className={cx("col-2", "admin-header-img")}>
              <div className={cx("name-admin")}>Admin</div>
              <div className={cx("admin-img-container")}>
                <img className={cx("img-admin")} src={images.user} />
              </div>
            </div>
          </div>

          <div className={cx("row", "row-admin", "title-product-container")}>
            <div className={cx("col-1", "flex-center", "flex-center")}>ID</div>
            <div className={cx("col-1", "flex-center")}>Hình ảnh</div>
            <div className={cx("col-3", "flex-center")}>Tên Sản phẩm</div>
            <div className={cx("col-1", "flex-center")}>Loại</div>
            <div className={cx("col-1", "flex-center")}>Đơn vị</div>
            <div className={cx("col-1", "flex-center")}>Số lượng</div>
            <div className={cx("col-2", "flex-center")}>Giá</div>
            <div className={cx("col-2", "flex-center")}>Xử lý</div>
          </div>

          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={cx("row", "row-admin", "product-item")}
              >
                <div
                  className={cx(
                    "col-1",
                    "product-item-text",
                    "product-id",
                    "flex-center"
                  )}
                >
                  {product.product_id}
                </div>
                <div
                  className={cx(
                    "col-1",
                    "flex-center",
                    "product-item-text",
                    "flex-center"
                  )}
                >
                  <img className={cx("product-img")} src={product.image1} />
                </div>
                <div
                  className={cx("col-3", "flex-center", "product-item-text")}
                >
                  {product.name}
                </div>
                <div
                  className={cx("col-1", "flex-center", "product-item-text")}
                >
                  {product.category}
                </div>
                <div className={cx("col-1", "flex-center", "order-item-text")}>
                  {product.unit}
                </div>
                <div
                  className={cx("col-1", "flex-center", "product-item-text")}
                >
                  {product.quantity}
                </div>
                <div
                  className={cx("col-2", "flex-center", "product-item-text")}
                >
                  {product.price}₫
                </div>

                <div className={cx("col-2", "flex-center", "order-item-text")}>
                  <button
                    onClick={() => {
                      togglePopup(product);
                      setDisabledInputPopup(true);
                    }}
                    className={cx("icon-product-handle-div")}
                    title="Xem chi tiết"
                  >
                    <FcDatabase className={cx("icon-product-handle")} />
                  </button>
                  <button
                    onClick={() => {
                      togglePopup(product);
                      setDisabledInputPopup(false);
                    }}
                    className={cx("icon-product-handle-div")}
                    title="Sửa"
                  >
                    <FcDataConfiguration
                      className={cx("icon-product-handle")}
                    />
                  </button>
                  <button
                    to={"#"}
                    className={cx("icon-product-handle-div")}
                    title="Xoá"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    <FcDeleteDatabase className={cx("icon-product-handle")} />
                  </button>
                </div>
              </div>
            );
          })}
          {/* Thanh phân trang */}
          <div className={cx("row", "row-admin")}>
            <div className={cx("col-3", "page-container", "btn-add-container")}>
              <button
                className={cx("btn-add-product")}
                onClick={() => {
                  togglePopupAddProduct();
                }}
              >
                <FcAddDatabase
                  fontSize={"20"}
                  className={cx("icon-add-product")}
                />
                <span>THÊM SẢN PHẨM MỚI</span>
              </button>
              <AdminAddProduct
                isVisible={isPopupVisible1}
                onClose={togglePopupAddProduct}
                onAddProductSuccess={handleAddProductSuccess}
              />
            </div>
            <div className={cx("col-9", "page-container")}>
              <ReactPaginate
                forcePage={currentPage - 1}
                previousLabel={<BsChevronLeft />}
                nextLabel={<BsChevronRight />}
                breakLabel={"..."}
                pageCount={amountPage}
                marginPagesDisplayed={1} //có bao nhiêu trang sẽ xuất hiện ở phía trước và sau nút "trước" và "sau".
                pageRangeDisplayed={3} //có bao nhiêu trang sẽ xuất hiện giữa các nút "previous" và "next".
                onPageChange={handlePageChange} //hàm xử lý được gọi khi người dùng chuyển trang.  Prop này nhận một đối số là đối tượng { selected }, trong đó selected là số trang đã chọn (đếm từ 0).
                containerClassName={cx("pagination")} // thẻ ul
                pageClassName={cx("pagination-item")} // thẻ li
                pageLinkClassName={cx("pagination-item-a")} //thẻ a
                activeClassName={cx("pagination-item-a", "active")} //a active
                previousClassName={cx("pagination-item-a")} //lui
                nextClassName={cx("pagination-item-a", "next")} //tới
                breakClassName={cx("pagination-item-a", "previous")} //dấu ...
              />
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      {/* popup */}
      <AdminPopup
        disabledInputPopup={disabledInputPopup}
        product={selectProduct}
        isVisible={isPopupVisible}
        onClose={togglePopup}
        onAddProductSuccess={handleAddProductSuccess}
      />
    </>
  );
}

export default AdminProducts;
