import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminCustomerComponent from "../../../components/Admin/AdminCustomer";
import Cookies from "js-cookie";

function AdminCustomer() {
  const [customer, setCustomer] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    axiosProduct(page);
  }, []);

  const axiosProduct = async (page) => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/admin/getCustomer/${page}`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      
      setCustomer(response.data);
    } catch (err) {
      console.log("err" + err);
    }
  };

  return (
    <AdminCustomerComponent
      page={page}
      axiosProduct={axiosProduct}
      customer={customer}
    />
  );
}

export default AdminCustomer;
