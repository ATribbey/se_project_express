const router = require("express").Router();
const {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserLocation,
} = require("../controllers/users");
const { validateUserUpdate } = require("../middleware/validation");

router.get("/me", getCurrentUser);

router.patch(
  "/me",
  validateUserUpdate,
  updateCurrentUser,
  updateCurrentUserLocation,
);

module.exports = router;
