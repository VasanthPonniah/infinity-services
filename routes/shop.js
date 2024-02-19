const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getAllProducts);

router.get("/:productId", shopController.getProduct);

module.exports = router;
