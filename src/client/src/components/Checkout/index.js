import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import store, { updateCartItems } from "../../store";
const cx = classNames.bind(styles);

function Checkout({ products, handleGetProductsCart }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  // BEGIN: ĐẾM SẢN PHẨM TRONG GIỎ HÀNG //
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
  // END: ĐẾM SẢN PHẨM TRONG GIỎ HÀNG //

  //BEGIN:  XU LI CHON DIA CHI //
  useEffect(() => {
    // Fetch data from the provided API
    fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Cập nhật districts khi selectedProvince thay đổi
    const selectedProvinceData = provinces.find(
      (province) => province.Name === selectedProvince
    );
    setDistricts(selectedProvinceData ? selectedProvinceData.Districts : []);

    // Đặt lại district và ward
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince, provinces]);

  useEffect(() => {
    // Cập nhật wards khi selectedDistrict thay đổi
    const selectedDistrictData =
      districts.find((district) => district.Name === selectedDistrict) || {};
    setWards(selectedDistrictData.Wards || []);
    // Đặt lại ward
    setSelectedWard("");
  }, [selectedDistrict, districts]);

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
  };
  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };
  //END:  XU LI CHON DIA CHI //

  //START: Pay Method//
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  //END: pay method//

  //BEGIN: Tạo đối tượng đại diện cho đơn hàng //
  const handleSubmit = (event) => {
    event.preventDefault();

    // Tạo đối tượng đại diện cho đơn hàng
    const orderData = {
      customerInfo: {
        fullName: event.target.fullName.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
      },
      products: products.map((product) => ({
        productId: product.product_id,
        productName: product.name,
        productImage: product.image1,
        quantity: product.quantity_oder,
        unit: product.unit,
        price: product.price,
        total_amount_product: product.total_amount_product,
      })),
      total_product_cart: products[0].total_amount_cart,
      note: event.target.notecart.value,
      paymentMethod: paymentMethod,
    };
    const toastId1 = toast.loading("Vui lòng chờ...");

    const axiosCheckOut = async () => {
      await axios
        .post(`http://${process.env.REACT_APP_API_URL}/order`, orderData)
        .then((response) => {
          console.log(response.data.message);
          toast.update(toastId1, {
            render: response.data.message,
            type: "success",
            autoClose: 100000,
            isLoading: false,
          });
          ClearCart();
        })
        .catch((error) => {
          toast.update(toastId1, {
            render: error.response.data.error,
            type: "error",
            autoClose: 5000,
            isLoading: false,
          });
        });
    };

    setTimeout(() => {
      axiosCheckOut();
    }, 1000);
  };
  //END Tạo đối tượng đại diện cho đơn hàng //
  //BEGIN: CLEAR GIỎ HÀNG //
  const ClearCart = async () => {
    axios
      .post(`http://${process.env.REACT_APP_API_URL}/cart/clearProductCart`, [], {
        withCredentials: true,
      })
      .then((res) => {
        handleCountProductsCart();
        handleGetProductsCart();
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //END: CLEAR GIỎ HÀNG//
  return (
    <div className={cx("container", "container-checkout")}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "400px" }}
      />
      <div className={cx("grid", "grid-checkout")}>
        <div className={cx("row", "router-page-container")}>
          <Link className={cx("router-page", "active")} to={"/cart"}>
            Giỏ hàng
          </Link>
          <MdKeyboardArrowRight fill="#999999" />
          <Link className={cx("router-page", "active")} to={"/checkout"}>
            Thanh toán
          </Link>
        </div>
        <form action="/submit" method="post" onSubmit={handleSubmit}>
          <div className={cx("row")}>
            <div className={cx("col-7")}>
              <div className={cx("col-12", "form-title")}>
                THÔNG TIN GIAO HÀNG
              </div>
              <div>
                {/* form */}
                <div className={cx("row", "form-info")}>
                  <div className={cx("col-12", "form-input-div")}>
                    <input
                      className={cx("form-input")}
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Họ và Tên"
                      required
                    />
                  </div>
                  <div className={cx("col-8", "form-input-div")}>
                    <input
                      className={cx("form-input")}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={cx("col-4", "form-input-div")}>
                    <input
                      className={cx("form-input")}
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>
                  {/* <div className={cx("col-12", "form-input-div")}>
                    <input
                      className={cx("form-input")}
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Địa chỉ"
                      required
                    />
                  </div> */}
                  <div className={cx("col-4", "form-input-div")}>
                    <select
                      id="province"
                      name="province"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      className={cx("form-input")}
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {provinces.map((province) => {
                        return (
                          <option key={province.Id} value={province.Name}>
                            {province.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={cx("col-4", "form-input-div")}>
                    <select
                      id="district"
                      name="district"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      className={cx("form-input")}
                      required
                    >
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={cx("col-4", "form-input-div")}>
                    <select
                      id="ward"
                      name="ward"
                      value={selectedWard}
                      onChange={handleWardChange}
                      className={cx("form-input")}
                      required
                    >
                      <option value="">Chọn xã/phường</option>
                      {wards.map((ward) => (
                        <option key={ward.Id} value={ward.Name}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={cx("col-12", "form-title")}>
                    THÔNG TIN BỔ SUNG (TUỲ CHỌN)
                  </div>
                  <div className={cx("col-12", "form-input-div")}>
                    <textarea
                      className={cx("form-input", "note-cart")}
                      id="notecart"
                      name="notecart"
                      placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    />
                  </div>
                  <div
                    className={cx("col-12", "payment-methods-btn-container")}
                  >
                    <Link to={"/cart"} className={cx("back-cart")}>
                      <IoIosArrowBack />
                      Quay lại giỏ hàng
                    </Link>
                  </div>
                </div>
                {/* end form */}
              </div>
            </div>
            <div className={cx("col-5", "products-cart-container")}>
              <div className={cx("col-12", "form-title-products")}>
                ĐƠN HÀNG CỦA BẠN
              </div>

              {/* product */}
              {products.length == 0 ? (
                <h3 className={cx("col-12", "no-product-cart")}>
                  Chưa có sản phẩm nào trong giỏ hàng.
                </h3>
              ) : (
                <>
                  {products.map((product, index) => {
                    return (
                      <div key={index} className={cx("row", "products-item")}>
                        <div className={cx("col-2", "img-product")}>
                          <img src={product.image1}></img>
                          <div className={cx("quantity_oder")}>
                            {product.quantity_oder}
                          </div>
                        </div>
                        <div className={cx("col-7")}>
                          <div className={cx("row", "product-title")}>
                            {product.name}
                          </div>
                          <div className={cx("row", "product-title")}>
                            Đơn vị: {product.unit}
                          </div>
                        </div>
                        <div className={cx("col-3", "total_amount_product")}>
                          {product.total_amount_product
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          ₫
                        </div>
                      </div>
                    );
                  })}
                  <div className={cx("row", "temp-total-amount-title")}>
                    <div className={cx("col-6", "product-title-small")}>
                      Tạm tính
                    </div>
                    <div className={cx("col-6", "temp-total-amount-cart")}>
                      {" "}
                      {products[0]
                        ? products[0].total_amount_cart
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        : 0}
                      ₫
                    </div>
                  </div>
                  <div className={cx("row")}>
                    <div className={cx("col-6", "product-title-small")}>
                      Phí vận chuyển
                    </div>
                    <div className={cx("col-6", "total_amount_cart")}>---</div>
                  </div>

                  <div className={cx("row", "total_amount_cart-div")}>
                    <div className={cx("col-6", "total_amount_cart-title")}>
                      Tổng cộng
                    </div>
                    <div className={cx("col-6", "total_amount_cart")}>
                      {" "}
                      {products[0]
                        ? products[0].total_amount_cart
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        : 0}
                      ₫
                    </div>
                  </div>

                  <div className={cx("row")}>
                    <div className={cx("col-12", "payment-method")}>
                      <input
                        id="payment_method_cod"
                        name="payment_method"
                        type="radio"
                        className={cx("input-radio")}
                        value="cod"
                        onChange={handlePaymentMethodChange}
                        required
                      ></input>
                      <label
                        htmlFor="payment_method_cod"
                        className={cx("label-input-radio")}
                      >
                        Thanh toán khi nhận hàng (COD)
                      </label>
                    </div>
                  </div>
                  <div className={cx("row")}>
                    <div className={cx("col-12", "payment-method")}>
                      <input
                        id="payment_method_bacs"
                        name="payment_method"
                        type="radio"
                        className={cx("input-radio")}
                        onChange={handlePaymentMethodChange}
                        value="bacs"
                        required
                        disabled
                      ></input>
                      <label
                        htmlFor="payment_method_bacs"
                        className={cx("label-input-radio")}
                      >
                        Chuyển khoản ngân hàng (chưa hỗ trợ)
                      </label>
                    </div>
                  </div>

                  <div className={cx("row")}>
                    <button type="submit" className={cx("", "oder-btn")}>
                      ĐẶT HÀNG
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
