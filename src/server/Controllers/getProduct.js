const db = require("../db/db");

const getProduct = (req, res) => {
  const name = req.params.name.replace(/-/g, " "); // Thay thế tất cả các dấu '-' bằng khoảng trắng
  db.query(
    `SELECT
    product_id,
    name,
    description,
    price,
    CONCAT('http://${process.env.BASE_URL}/images/', image1) AS image1,
    category,
    unit,
    quantity
  FROM products
  WHERE name =  '${name}'`,
    (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn product: " + err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (results.length == 0) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      } else {
        const listProducts = results.map((result) => {
          return result;
        });
        res.json(listProducts);
        console.log(listProducts);
      }
    }
  );
};

module.exports = {
  getProduct,
};
