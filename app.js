const mongoose = require("mongoose");
const express = require("express");
const app = express();

/* Steps for Running Server:
- Use Bash to run mongod.exe using: "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="c:\data\db"
- Use Mongosh to access server using: "mongodb://127.0.0.1:27017/wtwr_db"
- Use terminal in project to run server using either of the following:
  - npm run dev
  - npm run start
*/

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
