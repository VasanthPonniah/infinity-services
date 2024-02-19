const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://v1s1nth99:StephCurry30@cluster0.w4gj1ij.mongodb.net/infinitee",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) return _db;
  throw { message: "No Connection found" };
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;
