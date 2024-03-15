const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecret } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnathorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : devSecret,
    );
  } catch (e) {
    next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;

  return next();
};
