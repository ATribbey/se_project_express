const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/users", user);

router.use("/items", clothingItem);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
