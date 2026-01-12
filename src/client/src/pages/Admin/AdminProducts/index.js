import AdminProductsComponent from "../../../components/Admin/AdminProducts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function AdminProducts() {
    const [products, setProducts] = useState([]);
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
      axiosProducts(page);
      setCurrentPage(page)
    }, [page]);
    
    const axiosProducts = async (page) => {
      try {
        const token = Cookies.get("token"); // Lấy token từ cookie
        const response = await axios.get(
          `http://${process.env.REACT_APP_API_URL}/admin/getAdminProducts/${page}`,
          {
            withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        
        setCurrentPage(page);
        setProducts(response.data);
        console.log(products);
      } catch (err) {
        console.log("err" + err);
      }
    };
  
  return <AdminProductsComponent page = {currentPage} axiosProducts={axiosProducts} products={products}/>;
}

export default AdminProducts;
