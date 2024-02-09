const router = require("express").Router();
const user = require("./users");
const clothingItem = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { notFoundError } = require("../utils/errors");

router.use("/users", user);

router.use("/items", clothingItem);

router.post("/signup", createUser);

router.post("/signin", login);

router.use((req, res) => {
  res.status(notFoundError).send({ message: "Requested router not found" });
});

module.exports = router;
