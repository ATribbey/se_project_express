const user = require("../models/user");

function getUsers(req, res) {
  user
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      res.status(500).send({ message: `An error occurred due to ${e}` });
    });
}

function getUserById(req, res) {
  user
    .findById(req.params.id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) =>
      res.status(500).send({ message: `An error occurred due to ${e}` }),
    );
}

function createUser(req, res) {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: `An error Occurred due to ${e}` });
    });
}

module.exports = { getUsers, getUserById, createUser };
