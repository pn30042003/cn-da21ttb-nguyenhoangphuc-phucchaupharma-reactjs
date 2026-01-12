var express = require("express");
var router = express.Router();

const addProductToCart = require("../Controllers/addProductToCart");
const getProductCart = require('../Controllers/getProductCart');
const updateProductQuantity = require('../Controllers/updateProductQuantity');
const removeProductCart = require('../Controllers/removeProductCart')
const deleteAllProductCart = require('../Controllers/deleteAllProductCart')
const getCartCount = require('../Controllers/getCartCountNumber')

router.get("/",getProductCart.getProductCart);
router.get("/getcartcount",getCartCount.getCartCount);

router.post("/addtocart",addProductToCart.addProductToCart);
router.post("/updateProductCart",updateProductQuantity.updateProductQuantity);
router.post("/removeProductCart",removeProductCart.removeProductCart)
router.post("/clearProductCart",deleteAllProductCart.deleteAllProductCart)

//addProductToCart.addProductToCart
module.exports = router;
