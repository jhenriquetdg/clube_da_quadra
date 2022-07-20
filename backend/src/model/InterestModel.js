const { db_open } = require("../database/initDB");

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

async function insertInterest(interest) {
  try {
    var db = await db_open();
    try {
      const interestResult = await db.run(
        "INSERT INTO Interesse (CPF_pessoa, id_horario, id_modalidade) VALUES (?,?,?)",
        [interest.CPF, interest.horario_id, interest.modalidade_id]
      );
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
      const interestResult = await db.get(
        "SELECT * FROM Interesse WHERE CPF_pessoa=? AND id_horario=? AND id_modalidade=?",
        [interest.cpf, interest.horario_id, interest.modalidade_id]
      );
      await db.get(
        "DELETE FROM Interesse WHERE CPF_pessoa=? AND id_horario=? AND id_modalidade=?",
        [interest.cpf, interest.horario_id, interest.modalidade_id]
      );
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
      const interestsResult = await db.get(
        "SELECT * FROM Interesse WHERE CPF_pessoa=?",
        [interest.cpf]
      );
      return interestsResult;
    } catch (e) {
      return {
        statusCode: 400,
        interest: {},
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      interest: {},
      message: "Could not connect to the database",
      error: e,
    };
  } finally {
    db.close();
  }
}

async function getAllInterested(interest) {
  try {
    var db = await db_open();
    try {
      const peopleInterest = await db.all(
        "SELECT " +
          "   Pessoa.CPF, " +
          "   Pessoa.nome, " +
          "   Modalidade.id as id_modalidade, " +
          "   Modalidade.nome as nome_modalidade, " +
          "   Modalidade.qtdJogadores, " +
          "   Horario.id as Horario_ID, " +
          "   Horario.dataHoraInicio, " +
          "   Horario.dataHoraFim " +
          "FROM " +
          "   Pessoa, " +
          "   Interesse, " +
          "   Horario, " +
          "   Modalidade " +
          "WHERE " +
          "   Horario.id=? AND " +
          "   Modalidade.id=?",
        [interest.horario_id, interest.modalidade_id]
      );
      return peopleInterest;
    } catch (e) {
      return {
        statusCode: 400,
        error: e,
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      interest: {},
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
  getInterestByCPF,
  getAllInterested,
};
