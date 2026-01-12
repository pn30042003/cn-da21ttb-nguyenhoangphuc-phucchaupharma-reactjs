import CheckoutComponent from "../../components/Checkout";
import { useState, useEffect } from "react";
import axios from "axios";
function Checkout() {
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
    };
    axiosProductsCart();
  }, []);

  const handleGetProductsCart = () => {
    const callAPI = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/cart`, {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        });
        setProducts(response.data);
        console.log("render lạii");
      } catch (err) {
        console.log(err);
      }
    };

    callAPI();
  };

  return (
    <CheckoutComponent
      handleGetProductsCart={handleGetProductsCart}
      products={products}
    />
  );
}

export default Checkout;
