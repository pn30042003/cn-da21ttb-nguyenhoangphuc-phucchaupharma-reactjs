import { useEffect, useState } from "react";
import CartComponent from "../../components/Cart";

import axios from "axios";
function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const axiosProductsCart = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/cart`, {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        });
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
      // window.location.reload()
    };
    axiosProductsCart();
  }, []);

  const updateCartData = async () => {
    // Implement logic to update cart data
    console.log("updateCartData")
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/cart`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CartComponent products={products}  updateCart={updateCartData} />
    </div>
  );
}

export default Cart;
