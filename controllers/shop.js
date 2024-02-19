const Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
  Product.getAllProducts()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      throw { error: true, message: "Could not fetch products" };
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProductById(prodId)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      throw { message: err };
    });
};
