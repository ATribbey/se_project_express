const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose.set("strictQuery", true);

/* Steps for Running Server:
- Use Bash to run mongod.exe using: 'C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe' --dbpath='c:\data\db'
- Use Mongosh to access server using: 'mongodb://127.0.0.1:27017/wtwr_db'
- Use terminal in project to run express application using either of the following:
  - npm run dev
  - npm run start
*/

/*
- Trace through: schema -> model -> controller -> route -> entry flow on platform
  - Schema: The predetermined structure by which each resource in a given DB must be formatted.
  - Model: A wrapper / constructor of the afforementioned schema.
    - https://mongoosejs.com/docs/models.html
    - Because of this, it allows the user to read, add, update, and delete documents (instances of a model) on the DB.
    - Created by: mongoose.model('SINGULAR-name-of-collection', schema-name)
      - Reason for singular name: Mongoose automatically looks for plural lowercase version of name.
        - 'User' -> Mongoose looks for 'users'
  - Controller: Collection of request handlers for a given model (in this case, either clothingItem or user).
    - These handlers are passed as callbacks to Router requests (ie. router.get('/', controllerExample))
    - After getting to a route, controllers are the things that manipulate info.
  - Router: Determines how an application responds to a client request to a particular endpoint,
    which is a Url (or path) and a specific HTTP request method.
    - https://expressjs.com/en/starter/basic-routing.html
    - https://expressjs.com/en/guide/routing.html
    - Created by: expressApplication.httpRequest('path', handler)
      - expressApplication corresponsds to the entry point upon which express(); was called. See line 3.
      - httpRequest corresponds to HTTP request method in lowercase (ie. get, post, delete, etc.)
      - 'path' corresponds to path (ie. '/user' '/items')
      - handler corresponds to the controller that will be passed to the router
*/

/*
- Model Methods
  - Create: create()
  - Read: findById(), findOne(), find()
  - Update: findByIdAndUpdate(), findOneAndUpdate(), updateOne(), updateMany()
  - Delete: findByIdAndRemove(), findOneAndRemove(), delete(), deleteMany()
*/

/*
- General Flow
  - Schema / Model is created in order to create uniform DB
    - Model is passed to Controllers
      - Controller handlers are defined
        - Controllers are passed to Router
          - Router is exported
            - Import Router to Index.js
              - Tie Router to proper path
                - Export Router from Index.js
                  - Define Routes
                  - Tie router to entry point by app.use(routes);
*/

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

app.use(routes);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
