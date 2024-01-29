const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.post("/", createItem);

router.delete("/:id", deleteItem);

router.put("/:id/likes", likeItem);

router.delete("/:id/likes", dislikeItem);

module.exports = router;
