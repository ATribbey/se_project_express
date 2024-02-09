const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const JWT_SECRET = require("../utils/config");

const {
  invalidDataError,
  notFoundError,
  serverError,
  unauthorizedError,
} = require("../utils/errors");

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((e) => {
      console.error(e);

      res
        .status(serverError)
        .send({ message: "An error occurred on the server" });
    });
}

function getUser(req, res) {
  User.findById(req.params.id)
    .orFail()
    .then((specifiedUser) => {
      res.status(200).send({ data: specifiedUser });
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

function createUser(req, res) {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      throw new Error("Email already in use");
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((newUser) => {
        res.status(200).send({ data: newUser });
      })
      .catch((e) => {
        console.error(e);

        if (e.name === "ValidationError") {
          res.status(invalidDataError).send({ message: "Invalid data" });
        } else if (e.name === "CastError") {
          res.status(invalidDataError).send({ message: "Invalid data" });
        } else if (e.name === "Email already in use") {
          res
            .status(serverError)
            .send({ message: "An account with this email already exists" });
        } else {
          res
            .status(serverError)
            .send({ message: "An error occurred on the server" });
        }
      });
  });
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findOne({ email }).then((existingUser) => {
    if (!existingUser) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt
      .compare(password, existingUser.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        const token = jwt.sign({ _id: existingUser._id }, String(JWT_SECRET), {
          expiresIn: "7d",
        });
        res.status(200).send({ data: token });
        return existingUser;
      })
      .catch((e) => {
        console.error(e);

        if (e.message === "Incorrect email or password") {
          res
            .status(unauthorizedError)
            .send({ message: "Incorrect email or password" });
        } else {
          res
            .status(serverError)
            .send({ message: "An error occurred on the server" });
        }
      });
  });
}

module.exports = { getUsers, getUser, createUser, login };
