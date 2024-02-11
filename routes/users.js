const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// router.get("/", getUsers);

// router.get("/:id", getUser);

router.get("/me", getCurrentUser);

router.patch("/me", updateCurrentUser);

module.exports = router;
