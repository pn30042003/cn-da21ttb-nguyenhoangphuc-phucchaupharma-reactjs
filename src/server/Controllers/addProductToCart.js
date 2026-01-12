// const session = require("express-session");

const addProductToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingProduct = req.session.cart.find(
    (item) => item.product_id == product_id
  );

  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng
    existingProduct.quantity += quantity;
    res.json({ message: "Cập nhật giỏ hàng thành công!" });
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng

    req.session.cart.push({ product_id, quantity });
    res.json({ message: "Thêm vào giỏ hàng thành công!" });
  }
  console.log(req.session);
};

module.exports = {
  addProductToCart,
};
