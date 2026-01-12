const db = require("../../db/db");

const getAdminProducts = (req, res) => {
  const page = req.params.page || 1; // Trang mặc định là 1
  const itemsPerPage = 6; // Số đơn hàng trên mỗi trang

  const startIndex = (page - 1) * itemsPerPage;

  db.query(
    `SELECT
        p.*,
        CONCAT('http://${process.env.BASE_URL}/images/', p.image1) AS image1,
        COUNT(*) OVER() AS total_number_products
    FROM products p
    LIMIT ${startIndex}, ${itemsPerPage};`,
    (errProduct, resultProduct) => {
      if (errProduct) {
        console.error("Lỗi truy vấn sản phẩm: " + errProduct);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(resultProduct);
      }
    }
  );
};

module.exports = {
  getAdminProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
