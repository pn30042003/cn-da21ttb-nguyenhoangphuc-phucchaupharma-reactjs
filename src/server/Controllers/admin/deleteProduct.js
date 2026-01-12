const db = require("../../db/db");

const deleteProduct = (req, res) => {
  const product_id = req.params.product_id;

  db.query(
    `DELETE FROM products WHERE product_id = ${product_id};`,
    (errDelete, resultDelete) => {
      if (errDelete) {
        console.error("Lỗi xoá sản phẩm: " + errDelete);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Kiểm tra xem có sản phẩm nào được xoá hay không
        if (resultDelete.affectedRows === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
      }
    }
  );
};

module.exports = {
  deleteProduct,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
