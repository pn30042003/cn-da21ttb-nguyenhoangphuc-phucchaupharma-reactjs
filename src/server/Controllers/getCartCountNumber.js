const getCartCount = (req, res) => {
  const cart = req.session.cart || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  res.json({ cartCount });
};

module.exports = {
  getCartCount,
};
