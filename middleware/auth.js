const jwt = require("jsonwebtoken");
const { unauthorizedError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(unauthorizedError)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
};
