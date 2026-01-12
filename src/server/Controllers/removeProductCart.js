const removeProductCart = (req, res) => {
  const { productId } = req.body;

  if (!req.session.cart) {
    // Nếu không có giỏ hàng, trả về thông báo lỗi
    return res.status(400).json({ error: "Giỏ hàng không tồn tại" });
  }

  // Tìm sản phẩm trong giỏ hàng
  const indexToRemove = req.session.cart.findIndex(
    (item) => item.product_id == productId
  );

  if (indexToRemove !== -1) {
    // Nếu sản phẩm được tìm thấy, xoá nó khỏi giỏ hàng
    req.session.cart.splice(indexToRemove, 1);
    res.json({ message: "Xoá sản phẩm khỏi giỏ hàng thành công" });
  } else {
    // Nếu sản phẩm không tồn tại trong giỏ hàng, trả về thông báo lỗi
    res.status(400).json({ error: "Sản phẩm không tồn tại trong giỏ hàng" });
  }
  console.log(req.session);
};

module.exports = {
  removeProductCart,
};
