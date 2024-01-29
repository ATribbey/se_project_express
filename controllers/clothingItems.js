const clothingItem = require("../models/clothingItem");
const {
  invalidDataError,
  notFoundError,
  serverError,
} = require("../utils/errors");

function getItems(req, res) {
  clothingItem
    .find({})
    .orFail()
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error(e);

      res.status(serverError).send({ message: e.message });
    });
}

function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      console.log(e);

      if (e.name === "ValidationError" || "CastError") {
        res.status(invalidDataError).send({ message: "Bad Request" });
      } else {
        res.status(serverError).send({ message: e.message });
      }
    });
}

function deleteItem(req, res) {
  clothingItem
    .findByIdAndDelete(req.params.id)
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError" || "CastError") {
        res.status(invalidDataError).send({ message: "Bad Request" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested document not found" });
      } else {
        res.status(serverError).send({ message: e.message });
      }
    });
}

function likeItem(req, res) {
  clothingItem.findByIdAndUpdate();
}

function dislikeItem(req, res) {}

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
