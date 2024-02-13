const clothingItem = require("../models/clothingItem");
const {
  invalidDataError,
  notFoundError,
  serverError,
  forbiddenError,
} = require("../utils/errors");

function getItems(req, res) {
  clothingItem
    .find({})
    .then((items) => {
      res.status(200).send({ data: items });
    })
    .catch((e) => {
      console.error(e);

      res
        .status(serverError)
        .send({ message: "An error occurred on the server" });
    });
}

function createItem(req, res) {
  const { name, weather, imageUrl } = req.body;

  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      console.log(e);

      if (e.name === "ValidationError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else {
        res
          .status(serverError)
          .send({ message: "An error occured on the server" });
      }
    });
}

function deleteItem(req, res) {
  return clothingItem
    .findByIdAndDelete(req.params.id)
    .orFail()
    .then((item) => {
      if (item.owner !== req.user._id) {
        Promise.reject(new Error("You are not authorized to delete this item"));
      }
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else if (e.message === "You are not authorized to delete this item") {
        res
          .status(forbiddenError)
          .send({ message: "You are not authorized to delete this item" });
      } else {
        res
          .status(serverError)
          .send({ message: "An error occurred on the server" });
      }
    });
}

function likeItem(req, res) {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else {
        res
          .status(serverError)
          .send({ message: "An error occurred on the server" });
      }
    });
}

function dislikeItem(req, res) {
  clothingItem
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "CastError") {
        res.status(invalidDataError).send({ message: "Invalid data" });
      } else if (e.name === "DocumentNotFoundError") {
        res
          .status(notFoundError)
          .send({ message: "Requested resource not found" });
      } else {
        res
          .status(serverError)
          .send({ message: "An error occurred on the server" });
      }
    });
}

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
