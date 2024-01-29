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

function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res
        .status(500)
        .send({ message: `An error occurred due to the following ${e}` });
    });
}

function deleteItem(req, res) {
  clothingItem
    .findByIdAndDelete(req.params.id)
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) =>
      res
        .status(500)
        .send({ message: `An error occurred due to the following ${e}` }),
    );
}

module.exports = { getItems, createItem, deleteItem };
