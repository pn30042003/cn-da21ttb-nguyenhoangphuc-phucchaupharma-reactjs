var express = require("express");
var router = express.Router();
const getHotProducts = require("../Controllers/getHotProducts");
const getProduct = require("../Controllers/getProduct");
const addProductToCart = require("../Controllers/addProductToCart");
const getProductFilter = require("../Controllers/getProductFilter");
const getRandomProducts = require("../Controllers/getRandomProducts")

router.get("/hot", getHotProducts.getHotProducts);
router.get("/random", getRandomProducts.getRandomProducts)
router.get("/filter", getProductFilter.getProductFilter);
router.get("/:name", getProduct.getProduct);

module.exports = router;

