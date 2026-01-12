var express = require("express");
var router = express.Router();

const postOrder = require("../Controllers/postOrder");

router.post("/",postOrder.postOrder);

module.exports = router;