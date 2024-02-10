const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.delete("/:id", deleteItem);

router.put("/:id/likes", likeItem);

router.delete("/:id/likes", dislikeItem);

module.exports = router;
