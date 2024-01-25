const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
