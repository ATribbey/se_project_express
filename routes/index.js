const router = require("express").Router();
const user = require("./users");

router.use("/users", user);

router.use((req, res) => {
  res.status(500).send({ message: "Router not Found" });
});

module.exports = router;
