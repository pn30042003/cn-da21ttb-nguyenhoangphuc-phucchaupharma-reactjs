const deleteAllProductCart = (req, res) => {
    req.session.cart = [];
    console.log(req.session);
    res.json({ message: 'Cart cleared successfully'});
}

module.exports = {
    deleteAllProductCart,
}