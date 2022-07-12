import sqlite3 from "sqlite3";
import { open } from "sqlite";

// you would have to import / invoke this in another file
export async function db_open() {
  return open({
    filename: "./clube_da_quadra.db",
    driver: sqlite3.Database,
  });
}
