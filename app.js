const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(helmet());

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getItems);

app.use(auth);
app.use(routes);
app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
