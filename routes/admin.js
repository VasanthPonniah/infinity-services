const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/pending-products", adminController.pendingProducts);

router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.editProduct);

router.post("/delete-product", adminController.deleteProduct);

router.post("/signup", adminController.newAdmin);

router.post("/login", adminController.login);

module.exports = router;
