const db = require("../../db/db");

const getCustomer = (req, res) => {
  const page = req.params.page || 1; // Trang mặc định là 1
  const itemsPerPage = 7; // Số đơn hàng trên mỗi trang

  const startIndex = (page - 1) * itemsPerPage;

  db.query(
    `SELECT *,
    COUNT(*) OVER() AS total_number_customer
    FROM customer
    ORDER BY customer_id DESC 
    LIMIT ?, ?;`,
    [startIndex, itemsPerPage],
    (err, result) => {
      if (err) {
        console.error("Lỗi truy vấn Custommer: " + err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (result.length === 0) {
        return res.status(404).json({ error: "Không có khách hàng nào" });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = {
  getCustomer,
};
