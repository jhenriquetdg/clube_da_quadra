const { db_open } = require("../database/initDB");

const DB_ERROR_OBJ = (e) => {
    return {
      statusCode: 500,
      pessoa: {},
      error: e,
      message: "Could not connect to the database",
    };
  }

async function insertCourtSport(courtID, sportID){
    try {
        var db = await db_open();
        try {
          const courtSportResult = await db.run(
            "INSERT INTO QuadraModalidade (Quadra_ID, Modalidade_ID) VALUES (?,?)",
            [
              courtID,
              sportID
            ]
          );
          return courtSportResult;
        } catch (e) {
          return {
            courtSport: [courtID, sportID],
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

async function deleteCourtSport(courtID, sportID) {
    var db;
    try {
      db = await db_open();
      try {
        const courtSport = await db.get("SELECT * FROM QuadraModalidade WHERE Quadra_ID=? AND Modalidade_ID=?", [courtID, sportID]);
        await db.get("DELETE FROM QuadraModalidade WHERE Quadra_ID=? AND Modalidade_ID=?", [courtID, sportID]);
        return courtSport;
      } catch (e) {
        return courtSport;
      }
    } catch (e) {
      DB_ERROR_OBJ(e);
    } finally {
      db.close();
    }
  }

module.exports = {
    insertCourtSport,
    deleteCourtSport
}