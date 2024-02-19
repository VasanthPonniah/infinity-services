const { ObjectId } = require("mongodb");
const Product = require("../models/product");
const { getDb } = require("../util/database");
const bcrypt = require("bcryptjs");

exports.postAddProduct = (req, res, next) => {
  const {
    title,
    imageurl,
    description,
    price,
    material,
    color,
    category,
    approved,
    manufacturer,
  } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageurl,
    material,
    color,
    approved,
    category,
    manufacturer
  );
  product
    .save()
    .then((data) => {
      res.status(200).send(data);
      console.log("Created");
    })
    .catch((err) => console.log(err));
};

exports.newAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;
  const db = getDb();
  return db
    .collection("admin")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(403)
          .send({ isCreated: false, message: "Admin Already exists" });
      } else {
        return bcrypt.hash(password, 10).then((hashedPassword) => {
          return db
            .collection("admin")
            .insertOne({ username, email, password: hashedPassword })
            .then((data) =>
              res.status(200).send({
                data: data,
                message: "Successfully Created",
                isCreated: true,
              })
            )
            .catch((err) => console.log(err));
        });
      }
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const db = getDb();
  return db
    .collection("admin")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((data) => {
          if (!data) {
            {
              return res
                .status(401)
                .send({ login: false, message: "Invalid Credentials" });
            }
          } else {
            return res
              .status(200)
              .send({ login: true, message: "Logged in successfully" });
          }
        });
      } else {
        return res.send({ login: false, message: "User not found" });
      }
    })
    .catch((err) => res.status(404).send({ message: "Invalid user id" }));
};

exports.pendingProducts = (req, res, next) => {
  const db = getDb();
  return db
    .collection("products")
    .find({ approved: false })
    .toArray()
    .then((data) => {
      if (!data.length) {
        res.status(200).send({ data: data, message: "No data" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editProduct = async (req, res, next) => {
  const {
    title,
    imageurl,
    description,
    price,
    material,
    color,
    category,
    approved,
    manufacturer,
    productId,
  } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageurl,
    material,
    color,
    approved,
    category,
    manufacturer,
    new ObjectId(productId)
  );
  product
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProductById(prodId)
    .then((data) => {
      res.send(200).send(data);
    })
    .catch((err) => console.log(err));
};
