const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateId } = require("../middleware/validation");

router.get("/me", validateId, getCurrentUser);

router.patch("/me", validateId, updateCurrentUser);

module.exports = router;
