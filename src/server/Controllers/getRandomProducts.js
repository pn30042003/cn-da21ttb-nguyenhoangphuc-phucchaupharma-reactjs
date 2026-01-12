
const db = require("../db/db");

const getRandomProducts = (req, res) => {
  // Sử dụng DISTINCT và ORDER BY RAND() để lấy một sản phẩm duy nhất từ mỗi nhóm tên
  db.query("SELECT DISTINCT * FROM products ORDER BY RAND() LIMIT 12", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn listproduct: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Cập nhật đường dẫn hình ảnh sử dụng biến môi trường
      const updatedResults = results.map((result) => {
        return {
          ...result,
          image1: `http://${process.env.BASE_URL}/images${result.image1}`,
        };
      });
      res.json(updatedResults);
    }
  });
};

module.exports = {
  getRandomProducts,
};
