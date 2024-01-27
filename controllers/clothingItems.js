const clothingItem = require("../models/clothingItem");

function getItems(req, res) {
  clothingItem
    .find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: `An error occurred due to the following ${e}` });
    });
}

function createItem(req, res) {}

function deleteItem(req, res) {}

module.exports = { getItems, createItem, deleteItem };
