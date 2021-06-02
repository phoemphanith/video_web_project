const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "123456ABC", {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
