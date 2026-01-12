var express = require("express");
var router = express.Router();
const { authenticateToken } = require("../authMiddleware");

var postAdminLogin = require("../Controllers/admin/postAdminLogin");
var getAdminOrder = require("../Controllers/admin/getAdminOrder");
var getOverviewData = require("../Controllers/admin/getOverviewData");
var getAdminProducts = require("../Controllers/admin/getAdminProducts");
var putAdminProduct = require("../Controllers/admin/putAdminProduct");
var getCustomer = require("../Controllers/admin/getCustomer");
const addProduct = require("../Controllers/admin/addProducts")
const deleteProduct = require("../Controllers/admin/deleteProduct");

// Route không yêu cầu xác thực token

// Các route dưới đây yêu cầu xác thực token

router.post("/login", postAdminLogin.postAdminLogin);
router.post("/addProduct", authenticateToken, addProduct.addProduct);
router.get("/getOrder/:page", authenticateToken, getAdminOrder.getAdminOrder);
router.get("/getCustomer/:page", authenticateToken, getCustomer.getCustomer);
router.get("/gettotalrevenue", authenticateToken, getOverviewData.getOverviewData);
router.get("/getAdminProducts/:page", authenticateToken, getAdminProducts.getAdminProducts);
router.put("/putAdminProduct", authenticateToken, putAdminProduct.putAdminProduct);
router.delete("/delete/:product_id", authenticateToken, deleteProduct.deleteProduct);

module.exports = router;
