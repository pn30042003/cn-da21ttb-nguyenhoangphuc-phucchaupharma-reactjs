import { useEffect, useState } from "react";
import ProductDetailComponent from "../../components/ProductDetail";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState([]);
  const { name } = useParams();

  console.log(product)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/products/${name}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log("err" + err);
      }
    };
    fetchProduct();
  }, [name]);
  return <ProductDetailComponent product={product} />;
}

export default Product;




