const express = require("express");
const cors = require("cors");
const { createTables, populateTables } = require("./model/DatabaseModel");

const router = require("./routes/routes.js");
const app = express();

app.use(express.json());
app.use(cors());

// createDBTables = true to create Tables / createDBTables = false if tables was already created
const createDBTables = true;
if (createDBTables) {
  // const fs = require("fs");
  // const { db_filepath } = require("./database/initDB.js");

  // if (fs.existsSync(db_filepath)) {
  //   fs.unlinkSync(db_filepath);
  // }

  createTables();

  try {
    populateTables();
  } catch (e) {
    console.log(e);
  }
}

app.use(router);

app.listen(3001, () => console.log("Server is Running!"));
