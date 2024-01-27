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

function createUser(req, res) {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: "An Error Occurred" });
    });
}

module.exports = { getUsers, createUser };
