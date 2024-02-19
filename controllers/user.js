const User = require("../models/user");
const { getDb } = require("../util/database");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const db = getDb();
  return db
    .collection("users")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.status(403).send({ message: "User Already exists" });
      } else {
        return bcrypt.hash(password, 10).then((hashedpassword) => {
          return db
            .collection("users")
            .insertOne({ username, email, password: hashedpassword })
            .then((data) => res.status(200).send(data))
            .catch((err) => console.log(err));
        });
      }
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const db = getDb();
  return db
    .collection("users")
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        return bcrypt
          .compare(password, user.password)
          .then((data) => {
            if (!data) {
              {
                return res
                  .status(401)
                  .send({ login: false, message: "Invalid Credentials" });
              }
            } else {
              return res.status(200).send({
                user: user,
                login: true,
                message: "Logged in successfullly",
              });
            }
          })
          .catch((err) =>
            res.status(401).send({ message: "Invalid Credentials" })
          );
      } else {
        return res.send({ login: false, messaeg: "User not found" });
      }
    })
    .catch((err) => res.status(404).send({ message: "Invalid user id" }));
};

exports.postOrder = async (req, res, next) => {
  const db = getDb();
  const { orderId, user, products } = req.body;
  return db
    .collection("orders")
    .insertOne({ orderId, user, products })
    .then((result) =>
      res.status(200).send({
        isCreated: true,
        data: "Order placed successfully",
      })
    )
    .catch((err) => console.log(err));
};
