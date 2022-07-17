import { db_open } from "../database/initDB.js";

export async function insertSport(sport) {
  try {
    var db = await db_open();
    try {
      const sportResult = await db.run(
        "INSERT INTO Modalidade (nome, descricao, qtdJogadores) VALUES (?,?,?)",
        [sport.nome, sport.descricao, sport.qtdJogadores]
      );
      return sportResult;
    } catch (e) {
      return {
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

export async function getSport(id) {
  try {
    var db = await db_open();

    try {
      const sport = await db.get("SELECT * FROM Modalidade WHERE ID=?", [id]);
      return sport;
    } catch (e) {
      return {
        sport: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

export async function getAllSports() {
  try {
    var db = await db_open();

    try {
      const sports = await db.all("SELECT * FROM Modalidade");
      return sports;
    } catch (e) {
      return {
        sports: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

export async function deleteSport(id) {
  try {
    var db = await db_open();
    try {
      const sport = await db.get("SELECT * FROM Modalidade WHERE ID=?", [id]);
      await db.get("DELETE FROM Modalidade WHERE ID=?", [id]);
    } catch (e) {
      console.log(sport);
      return sport;
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

export async function updateSport(sport) {
  try {
    var db = await db_open();
    try {
      const sportOld = await db.get("SELECT * FROM Modalidade WHERE ID=?", [
        sport.id,
      ]);
      await db.run(
        "UPDATE Modalidade SET nome=?, descricao=?, qtdJogadores=? WHERE ID=?",
        [sport.nome, sport.descricao, sport.qtdJogadores, sport.id]
      );

      const sportNew = await db.get("SELECT * FROM Modalidade WHERE ID=?", [
        sport.id,
      ]);

      return {
        pessoa_old: sportOld,
        pessoa_new: sportNew,
      };
    } catch (e) {
      return {
        statusCode: 400,
        sport: {},
        message: "Could not update the entry in database",
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  }
}

const SportModel = {
  getSport,
  insertSport,
  getAllSports,
  deleteSport,
  updateSport,
};

export default SportModel;
