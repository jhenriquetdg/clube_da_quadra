// const express = require("express");
// const cors = require("cors");
// const { createTables } = require("./model/DatabaseModel");

import express from "express";
import cors from "cors";

import { createTables } from "./model/DatabaseModel.js";

const app = express();
app.use(express.json());
app.use(cors());

// createDBTables = true to create Tables / createDBTables = false if tables was already created
const createDBTables = true;
if (createDBTables) {
  createTables();
}

// const router = require("./routes/routes.js");
import { router } from "./routes/routes.js";
app.use(router);

app.listen(3001, () => console.log("Server is Running!"));
