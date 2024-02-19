const { ObjectId } = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(
    title,
    price,
    description,
    image_url,
    material,
    color,
    approved,
    category,
    manufacturer,
    id
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image_url = image_url;
    this.material = material;
    this.color = color;
    this.approved = approved;
    this.category = category;
    this.manufacturer = manufacturer;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbCopy;
    if (this._id) {
      dbCopy = db
        .collection("products")
        .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
    } else {
      dbCopy = db.collection("products").insertOne(this);
    }
    return dbCopy
      .then((result) => console.log(result, "Result"))
      .catch((err) => console.log(err, "err"));
  }

  static getAllProducts() {
    const db = getDb();
    return db
      .collection("products")
      .find({ approved: true })
      .toArray()
      .then((data) => {
        return data;
      });
  }

  static getProductById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then((data) => {
        console.log(data, "result");
        return data;
      });
  }

  static deleteProductById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) })
      .then(() => console.log("Deleted"))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
