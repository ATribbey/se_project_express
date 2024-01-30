const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");

const app = express();

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// TEMPORARY WORKAROUND FOR OWNER PROPERTY
app.use((req, res, next) => {
  req.user = {
    _id: "65b581c3a6b301d47eb626d1",
  };
  next();
});

const routes = require("./routes");

app.use(express.json());

app.use(helmet());

app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
