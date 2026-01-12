const db = require("../../db/db");

const getAdminOrder = (req, res) => {
  const page = req.params.page || 1; // Trang mặc định là 1
  const itemsPerPage = 7; // Số đơn hàng trên mỗi trang

  const startIndex = (page - 1) * itemsPerPage;

  db.query(
    `SELECT
        o.order_id AS order_id,
        c.fullname AS customer_name,
        o.customer_id AS customer_id,
        o.order_status AS order_status,
        o.total AS total_amount,
        o.order_note AS order_note,
        DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i:%s') AS order_date,
        COUNT(*) OVER() AS total_orders
    FROM
        orders o
    JOIN
        customer c ON o.customer_id = c.customer_id
    ORDER BY
        o.order_date DESC
    LIMIT ?, ?;`,
    [startIndex, itemsPerPage],
    (err, result) => {
      if (err) {
        console.error("Lỗi truy vấn OrderAdmin: " + err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (result.length === 0) {
        return res.status(404).json({ error: "Không có đơn hàng nào" });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = {
  getAdminOrder,
};