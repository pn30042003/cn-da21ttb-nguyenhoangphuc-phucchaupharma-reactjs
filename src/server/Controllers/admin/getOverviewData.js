const db = require("../../db/db");

const getOverviewData = (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  // Query để lấy tổng doanh thu, số lượng khách hàng, và số lượng đơn hàng trong tháng
  const combinedQuery = `
    SELECT 
      SUM(total) AS total_revenue,
      COUNT(DISTINCT customer_id) AS customer_count,
      COUNT(*) AS order_count
    FROM 
      orders
    WHERE 
      MONTH(order_date) = ? AND YEAR(order_date) = ?
  `;

  // Query để lấy danh thu mỗi ngày trong tháng
  const dailyRevenueQuery = `
    SELECT 
      DAY(order_date) AS day,
      SUM(total) AS daily_revenue
    FROM 
      orders
    WHERE 
      MONTH(order_date) = ? AND YEAR(order_date) = ?
    GROUP BY 
      DAY(order_date)
  `;

  // Thực hiện cả hai truy vấn bất đồng bộ
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(combinedQuery, [currentMonth, currentYear], (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          res.status(404).json({ error: "Không có dữ liệu" });
        } else {
          const totalRevenue = result[0]?.total_revenue || 0;
          const customerCount = result[0]?.customer_count || 0;
          const orderCount = result[0]?.order_count || 0;
          // Làm tròn lên và chuyển đổi thành số thực
          const roundedTotalRevenue = parseFloat(Math.ceil(totalRevenue));

          resolve({
            totalRevenue: roundedTotalRevenue,
            customerCount,
            orderCount,
          });
        }
      });
    }),
    new Promise((resolve, reject) => {
      db.query(
        dailyRevenueQuery,
        [currentMonth, currentYear],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            // Tạo một đối tượng Map để theo dõi doanh thu hàng ngày theo ngày
            const dailyRevenueMap = new Map();

            // Đổ dữ liệu từ kết quả vào Map
            result.forEach((day) => {
              dailyRevenueMap.set(day.day, day.daily_revenue);
            });

            // Xây dựng mảng kết quả cuối cùng, bao gồm cả ngày không có doanh thu
            const dailyRevenue = Array.from(
              { length: currentDay },
              (_, index) => ({
                day: index + 1, // Thêm 1 để bắt đầu từ ngày 1
                revenue: parseFloat(
                  Math.ceil(dailyRevenueMap.get(index + 1) || 0)
                ),
              })
            );
            resolve(dailyRevenue);
          }
        }
      );
    }),
  ])
    .then(([overviewData, dailyRevenue]) => {
      res.json({ ...overviewData, dailyRevenue });
    })
    .catch((err) => {
      console.error("Lỗi truy vấn: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  getOverviewData,
};
