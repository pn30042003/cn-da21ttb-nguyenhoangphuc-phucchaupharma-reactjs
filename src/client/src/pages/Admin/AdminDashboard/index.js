import { useEffect, useState } from "react";
import AdminOverview from "../../../components/Admin/AdminOverview";
import axios from "axios";
import Cookies from "js-cookie";

function AdminDashboard() {
  const [overViewData, setOverViewData] = useState({});
  useEffect(() => {
    axiosApi();
  }, []);
  const axiosApi = async () => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/admin/gettotalrevenue`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setOverViewData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return <AdminOverview overViewData={overViewData} />;
}

export default AdminDashboard;
