const updateProductQuantity = (req, res) => {
  const { product_id, quantity } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart not found" });
  }

  const existingProduct = req.session.cart.find((item) => {
    return item.product_id == product_id;
  });

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  existingProduct.quantity = quantity;
  console.log(req.session);
  res.json({ message: "Cập nhật giỏ hàng thành công!" });
};

module.exports = {
  updateProductQuantity,
};

