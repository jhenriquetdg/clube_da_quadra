const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// you would have to import / invoke this in another file
async function db_open() {
  return open({
    filename: './src/database/clube_de_quadra.db',
    driver: sqlite3.Database,
  });
}

module.exports = {
    db_open
}