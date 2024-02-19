const jwt = require("jsonwebtoken");
const generateWebToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    "Secret-Keee",
    { expiresIn: "1d" }
  );
};

module.exports = generateWebToken;
