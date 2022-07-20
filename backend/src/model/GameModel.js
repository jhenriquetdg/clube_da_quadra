const { db_open } = require("../database/initDB.js");

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

async function createGame(game) {
  try {
    var db = await db_open();
    try {
      const gameResult = await db.run(
        "INSERT INTO Partida (id_horario, id_quadra, id_modalidade) VALUES (?,?,?)",
        [game.horario_id, game.quadra_id, game.modalidade_id]
      );
      return {
        game: gameResult,
      };
    } catch (e) {
      return {
        game: game,
        message: "Something went wrong, could not insert into database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function deleteGame(game) {
  try {
    var db = await db_open();
    try {
      const gameResult = await db.get(
        "SELECT * FROM Partida WHERE id_horario=? AND id_quadra=? AND id_modalidade=?",
        [game.horario_id, game.quadra_id, game.modalidade_id]
      );
      await db.get(
        "DELETE FROM Partida WHERE id_horario=? AND id_quadra=? AND id_modalidade=?",
        [game.horario_id, game.quadra_id, game.modalidade_id]
      );
    } catch (e) {
      return pessoa;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getAllGames() {
  try {
    var db = await db_open();
    try {
      const games = await db.all("SELECT * FROM Partida");
      return games;
    } catch (e) {
      return {
        games: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

module.exports = {
  createGame,
  deleteGame,
  getAllGames,
};
