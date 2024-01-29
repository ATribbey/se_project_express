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

router.put("/:id/likes");

router.delete("/:id/likes");

module.exports = router;
