const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .next()
      .then((data) => console.log(data, "data"))
      .catch((err) => console.log(err));
  }
}
