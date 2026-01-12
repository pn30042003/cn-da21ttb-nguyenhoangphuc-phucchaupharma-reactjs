import BannerHome from "../../components/BannerHome";
import BodyHome from "../../components/BodyHome";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/products/random`);
        setProducts(response.data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <BannerHome />
      <BodyHome products={products} />
    </div>
  );
}

export default Home;


