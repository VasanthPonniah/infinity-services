const path = require("path");

const express = require("express");

const mongoConnect = require("./util/database").mongoConnect;
const getDb = require("./util/database").getDb;
const User = require("./models/user");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/products", shopRoutes);

mongoConnect((client) => {
  console.log("Listening...");
  app.listen(8080);
});
