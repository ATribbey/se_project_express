const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateNewItem, validateId } = require("../middleware/validation");

router.post("/", validateNewItem, createItem);

router.delete("/:id", validateId, deleteItem);

router.put("/:id/likes", validateId, likeItem);

router.delete("/:id/likes", validateId, dislikeItem);

module.exports = router;
