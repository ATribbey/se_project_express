const user = require("../models/user");
const {
  invalidDataError,
  notFoundError,
  serverError,
} = require("../utils/errors");

function getUsers(req, res) {
  user
    .find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((e) => {
      console.error(e);

      res.status(serverError).send({ message: e.message });
    });
}

function getUser(req, res) {
  user
    .findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError" || "CastError") {
        res.status(invalidDataError).send({ message: e.message });
      } else if (e.name === "DocumentNotFoundError") {
        res.status(notFoundError).send({ message: e.message });
      } else {
        res.status(serverError).send({ message: e.message });
      }
    });
}

function createUser(req, res) {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => {
      res.stats(200).send({ data: user });
    })
    .catch((e) => {
      console.error(e);

      if (e.name === "ValidationError" || "CastError") {
        res.status(invalidDataError).send({ message: e.message });
      } else {
        res.status(serverError).send({ message: e.message });
      }
    });
}

module.exports = { getUsers, getUser, createUser };
