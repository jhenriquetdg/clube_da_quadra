// const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');

import sqlite3 from "sqlite3";
import { open } from "sqlite";

// you would have to import / invoke this in another file
export async function db_open() {
  return open({
    filename: "./src/database/clube_de_quadra.db",
    driver: sqlite3.Database,
  });
}
