import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import store, { updateCartItems } from "../../store";
import SlideShowProducts from "../Other/SlideProducts";

const cx = classNames.bind(styles);

function ProductDetail({ product }) {
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct_id, setSelectedProduct_id] = useState(0);
  const [quantityStock, setSelectedQuantityStock] = useState(0);
  
  // Auto-select first product when component loads
  useEffect(() => {
    if (product && product.length > 0) {
      setSelectedProduct_id(product[0].product_id);
      setSelectedQuantityStock(product[0].quantity);
    }
  }, [product]);
  
  //handle
  const handleDecreaseQuantity = () => {
    if (quantity < quantityStock) {
      setQuantity(quantity + 1);
    }
  };
  const handleIncreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // START: ĐÉM SẢN PHẨM TRONG GIỎ HÀNG //
  const handleCountProductsCart = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy số lượng sản phẩm trong giỏ hàng
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/cart/getcartcount`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      // Sau khi lấy số lượng từ server, gửi action để cập nhật số lượng trong Redux store
      const cartCount = response.data.cartCount;
      store.dispatch(updateCartItems(cartCount));
    } catch (error) {
      console.error("Error getting cart count:", error);
    }
  };
  // END: ĐÉM SẢN PHẨM TRONG GIỎ HÀNG //
  //select Size
  const handleSelectedProduct_id = (item, product_id) => {
    setQuantity(1);
    setSelectedProduct_id(product_id);
    setSelectedQuantityStock(item.quantity);
  };
  //handle addtocart
  const handleAddToCart = async () => {
    if (selectedProduct_id != 0) {
      try {
        // Gửi yêu cầu POST đến API để thêm sản phẩm vào giỏ hàng
        const response = await axios.post(
          `http://${process.env.REACT_APP_API_URL}/cart/addtocart`,
          {
            product_id: selectedProduct_id,
            quantity: quantity,
          },
          {
            withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          }
        );
        console.log(response.data.message);
        const mess = response.data.message;
        toast.success(`${mess}`);
        // Sau khi thêm vào giỏ hàng thành công, cập nhật số lượng sản phẩm trong Redux store
        handleCountProductsCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error(`Vui lòng chọn sản phẩm`);
    }
  };

  return (
    <div className={cx("container", "container-ProductDetail")}>
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
      <div className={cx("grid", "product-detail-row")}>
        <div className={cx("row")}>
          <div className={cx("col-12", "router-page-container")}>
            <Link
              className={cx("router-page", "active-router")}
              to={"/products"}
            >
              Sản phẩm
            </Link>
            <MdKeyboardArrowRight
              fill="#999999"
              className={cx("icon-router")}
            />
            <Link className={cx("router-page", "active-router")} to={"#"}>
              Chi tiết sản phẩm
              {/* {product.name} */}
            </Link>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-6", "product-img")}>
            <img src={product[0] && product[0].image1} />
          </div>
          <div className={cx("col-6", "product-des")}>
            <h1 className={cx("product-title")}>
              {product[0] && product[0].name}
            </h1>
            <h2 className={cx("product-price")}>
              {product[0] &&
                Math.round(product[0].price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </h2>
            <h4 className={cx("brand-title")}>Loại: 
                <span className={cx("brand-title-text")}>{product[0] && product[0].category} </span>
            </h4>
            <h4 className={cx("brand-title")}>Đơn vị tính: 
                <span className={cx("brand-title-text")}>{product[0] && product[0].unit} </span>
            </h4>

            <div className={cx("product-quantity")}>
              <h4 className={cx("quantity-title")}>Số lượng:</h4>
              <div className={cx("quantity")}>
                <button
                  onClick={handleIncreaseQuantity}
                  className={cx("quantity-Div")}
                >
                  -
                </button>
                <div className={cx("quantity-display")}>{quantity}</div>
                <button
                  onClick={handleDecreaseQuantity}
                  className={cx("quantity-Sum")}
                >
                  +
                </button>
              </div>
              <div>
                {product[0] && quantityStock > 0 ? (
                  <div className={cx("quantity-stock")}>
                    {quantityStock} sản phẩm có sẵn
                  </div>
                ) : product[0] && quantityStock === 0 ? (
                  <div className={cx("quantity-stock", "out-of-stock")}>
                    Hết hàng
                  </div>
                ) : null}
              </div>
            </div>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className={cx("add-to-cart-btn")}
            >
              THÊM VÀO GIỎ
            </button>

            <p className={cx("product-infomation")}>
              {product[0] && product[0].description}
            </p>
          </div>
        </div>

        <SlideShowProducts />
      </div>
    </div>
  );
}

export default ProductDetail;
