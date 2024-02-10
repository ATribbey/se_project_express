const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

// router.get("/", getUsers);

// router.get("/:id", getUser);

router.get("/users/me", getCurrentUser);

module.exports = router;
