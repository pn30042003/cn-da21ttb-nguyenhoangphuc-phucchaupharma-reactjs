import classNames from "classnames/bind";
import styles from "./AdminOverview.module.scss";
import { FcApproval } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import images from "../../../assets/images";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const cx = classNames.bind(styles);

function AdminOverview({ overViewData }) {
  const [currentMonth, setCurrentMonth] = useState("");
  useEffect(() => {
    // Tạo một hàm để lấy tháng hiện tại
    const getCurrentMonth = () => {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1; // Lưu ý: getMonth trả về giá trị từ 0 đến 11
      return month;
    };

    // Cập nhật state với giá trị tháng hiện tại
    setCurrentMonth(getCurrentMonth());
  }, []);
  //BEGIN: CHART//

  // Lấy ngày hiện tại
  const currentDate = new Date();
  // Lấy số ngày trong tháng hiện tại
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  // Tạo mảng chứa tất cả các ngày của tháng hiện tại
  const labels = Array.from(
    { length: daysInMonth },
    (_, index) => `Ngày: ${index + 1}`
  );
    //đọc data chart
  var arraydailyRevenue;
  if (overViewData.dailyRevenue) {
    arraydailyRevenue = overViewData.dailyRevenue.map((data) => {
      return data.revenue;
    });
  } else {
    arraydailyRevenue = [];
  }
  const dataChart = arraydailyRevenue;
  //cấu hình chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "DANH THU / NGÀY",
      },
    },

    maintainAspectRatio: false,
  };
  const data = {
    labels,
    datasets: [
      {
        labels: labels,
        label: "Số tiền",
        // data: labels.map(() => faker.datatype.number({ min: 0})),
        data: dataChart,
        // borderColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
    scales: {
      y: {
        min: 10,
      },
    },
  };

  //END: CHART//

  return (
    <div className={cx("container", "container-admin")}>
      <div className={cx("grid", "grid-admin")}>
        <div className={cx("row", "row-admin", "admin-header")}>
          <div className={cx("col-10")}>
            <h2 className={cx("title-page")}>
              TỔNG QUAN WEBSITE THÁNG {currentMonth && currentMonth}
            </h2>
          </div>
          <div className={cx("col-2", "admin-header-img")}>
            <div className={cx("name-admin")}>Admin</div>
            <div className={cx("admin-img-container")}>
              <img className={cx("img-admin")} src={images.user} />
            </div>
          </div>
        </div>

        <div className={cx("row", "row-admin")}>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcApproval className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Số đơn hàng</h3>
                <p className={cx("overview-inner-number")}>
                  {overViewData.orderCount && overViewData.orderCount}
                </p>
              </div>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcMoneyTransfer className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Tổng danh thu</h3>
                <p className={cx("overview-inner-number")}>
                  {overViewData.totalRevenue &&
                    overViewData.totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
                </p>
              </div>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcConferenceCall className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Lượng khách hàng</h3>
                <p className={cx("overview-inner-number")}>
                  {overViewData.customerCount && overViewData.customerCount}
                </p>
              </div>
            </div>
          </div>
          {/* <div className={cx("col-3")}>
            <div className={cx("overview-container")}>
              <FcDeleteColumn  className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Đơn thất bại</h3>
                <p className={cx("overview-inner-number")}>100</p>
              </div>
            </div>
          </div> */}
        </div>
        <div className={cx("row", "row-admin")}>
          <div className={cx("col-12")}>
            <h2 className={cx("title-page")}>BIỂU ĐỒ DANH THU THEO NGÀY</h2>
          </div>
          <div id="abc" className={cx("col-12", "chart")}>
            {overViewData && <Line options={options} data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
