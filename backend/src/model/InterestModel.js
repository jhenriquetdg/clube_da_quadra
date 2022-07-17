const { db_open } = require("../database/initDB");

const DB_ERROR_OBJ = (e) => {
    return {
      statusCode: 500,
      pessoa: {},
      error: e,
      message: "Could not connect to the database",
    };
}

async function insertInterest(interest) {
    try {
        var db = await db_open();
        try {
          const interestResult = await db.run(
            "INSERT INTO Interesse (Pessoa_CPF, Horario_ID, Modalidade_ID) VALUES (?,?,?)",
            [
                interest.CPF,
                interest.horario_id,
                interest.modalidade_id
            ]
          );
          console.log(interestResult);
          return {
            interest: interestResult,
          };
        } catch (e) {
          return {
            interest: interest,
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

async function deleteInterest(interest) {
    try {
      var db = await db_open();
      try {
        const interestResult = await db.get("SELECT * FROM Interesse WHERE Pessoa_CPF=? AND Horario_ID=? AND Modalidade_ID=?",
            [
                interest.cpf,
                interest.horario_id,
                interest.modalidade_id
            ]);
        await db.get("DELETE FROM Interesse WHERE Pessoa_CPF=? AND Horario_ID=? AND Modalidade_ID=?",
        [
            interest.cpf,
            interest.horario_id,
            interest.modalidade_id
        ]);
        return interestResult;
      } catch (e) {
        return interest;
      }
    } catch (e) {
      DB_ERROR_OBJ(e);
    } finally {
      db.close();
    }
}

async function getInterestByCPF(interest) {
    try {
        var db = await db_open();
        try {
            const interestsResult = await db.get("SELECT * FROM Interesse WHERE Pessoa_CPF=?", [interest.cpf]);
            return interestsResult;
        } catch (e) {
            return {
            statusCode: 400,
            pessoa: {},
            };
        }
    } catch (e) {
    return {
        statusCode: 500,
        pessoa: {},
        message: "Could not connect to the database",
        error: e,
    };
    } finally {
    db.close();
    }
}

module.exports = {
    insertInterest,
    deleteInterest,
    getInterestByCPF
}