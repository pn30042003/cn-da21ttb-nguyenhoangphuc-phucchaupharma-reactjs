const db = require("../../db/db");

const putAdminProduct = (req, res) => {
  const { product_id, name, description, price, category, unit, quantity } =
    req.body;

    console.log(req.body);
  db.beginTransaction((err) => {
    if (err) {
      console.error("Lỗi khi bắt đầu giao dịch: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Cập nhật thông tin trong bảng 'products'
    db.query(
      `UPDATE products SET
        name = '${name}',
        description = '${description}',
        price = ${price},
        category = '${category}',
        unit = '${unit}',
        quantity = ${quantity}
      WHERE product_id = ${product_id};`,
      (err, results) => {
        if (err) {
          db.rollback(() => {
            console.error("Lỗi khi cập nhật thông tin sản phẩm: " + err);
            res.status(500).json({ error: "Internal Server Error" });
          });
          return;
        }
        // Commit giao dịch nếu mọi thứ diễn ra suôn sẻ
        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              console.error("Lỗi khi commit giao dịch: " + err);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }
          res.status(200).json({ success: true, message: "Update successful" });
        });
      }
    );
  });
};

module.exports = {
  putAdminProduct,
};
