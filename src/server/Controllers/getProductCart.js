const db = require("../db/db");

function getProductCart(req, res) {
  const cart = req.session.cart || [];
  // Tạo mảng các điều kiện cho mỗi sản phẩm trong giỏ hàng
  console.log(cart)
  const conditions = cart.map((item) => {
    return ` (product_id = ${item.product_id}) `;
  });
  const whereClause = conditions.join(" OR ");

  if (cart.length == 0) {
    res.json([]);
  } else {
    db.query(
      `SELECT
        product_id,
        name,
        description,
        price,
        CONCAT('http://${process.env.BASE_URL}/images', image1) AS image1,
        category,
        unit,
        quantity
      FROM products
      WHERE ${whereClause}`,
      (err, results) => {
        if (err) {
          console.log("Lỗi truy vấn hoặc mảng session cart đã rỗng" + err);
          res.json([]);
        } else {
          // Tính tổng tiền cả giỏ hàng
          var total_amount_cart = 0;
          results.forEach(function (result, index) {
            total_amount_cart +=
              parseInt(cart[index].quantity) * parseInt(result.price);
          });
          //Số lượng
          const newResults = results.map((result) => {
            const existingProduct = req.session.cart.find((item) => {
              return (
                item.product_id == result.product_id
              );
            });
            const quantity_oder = existingProduct.quantity;
            const total_amount_product =
              parseInt(existingProduct.quantity) * parseInt(result.price);
            return {
              ...result,
              quantity_oder,
              total_amount_product,
              total_amount_cart,
            };
          });
          res.json(newResults);
        }
      }
    );
  }
}

module.exports = {
  getProductCart,
};
