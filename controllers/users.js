const user = require("../models/user");

function getUsers(req, res) {
  user
    .find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((e) => {
      res.status(500).send({ message: `An error occurred due to${e}` });
    });
}

module.exports = { getUsers };
