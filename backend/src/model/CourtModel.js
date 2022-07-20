const { db_open } = require("../database/initDB.js");

async function insertCourt(court) {
  try {
    var db = await db_open();
    try {
      const courtResult = await db.run(
        "INSERT INTO Quadra (descricao, endereco, longitude, latitude) VALUES (?,?,?,?)",
        [court.descricao, court.endereco, court.longitude, court.latitude]
      );
      return courtResult;
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

async function getAllCourts() {
  try {
    var db = await db_open();
    try {
      const courts = await db.all("SELECT * FROM Quadra");
      return courts;
    } catch (e) {
      return {
        courts: [],
        error: e,
      };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function getCourt(id) {
  try {
    var db = await db_open();
    try {
      return await db.get("SELECT * FROM Quadra WHERE id=?", [id]);
    } catch (e) {
      return { error: e };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function deleteCourt(id) {
  try {
    var db = await db_open();
    try {
      return await db.get("DELETE FROM Quadra WHERE id=?", [id]);
    } catch (e) {
      return { error: e };
    }
  } catch (e) {
    return DB_ERROR_OBJ(e);
  } finally {
    db.close();
  }
}

async function updateCourt(court) {
  try {
    var db = await db_open();
    try {
      const oldCourt = await db.get("SELECT * FROM Quadra WHERE id=?", [
        court.id,
      ]);
      await db.run(
        "UPDATE Quadra SET descricao=?, endereco=?, longitude=?, latitude=? WHERE id=?",
        [
          court.descricao,
          court.endereco,
          court.longitude,
          court.latitude,
          court.id,
        ]
      );
      const newCourt = await db.get("SELECT * FROM Quadra WHERE id=?", [
        court.id,
      ]);
      return {
        oldCourt,
        newCourt,
      };
    } catch (e) {
      return DB_ERROR_OBJ(e);
    }
  } catch (e) {
    return { error: e };
  } finally {
    db.close();
  }
}

module.exports = {
  insertCourt,
  getAllCourts,
  getCourt,
  deleteCourt,
  updateCourt,
};
