import { db_open } from "../db.js";

const DB_ERROR_OBJ = (e) => {
  return {
    statusCode: 500,
    pessoa: {},
    error: e,
    message: "Could not connect to the database",
  };
};

export async function insertPessoa(req, res) {
  let pessoa = req.body;
  console.log(pessoa);
  try {
    var db = await db_open();
    try {
      const pessoaResult = await db.run(
        "INSERT INTO Pessoa (CPF, nome, dataNasc, endereco, genero) VALUES (?,?,?,?,?)",
        [
          pessoa.CPF,
          pessoa.nome,
          pessoa.dataNascimento,
          pessoa.endereco,
          pessoa.genero,
        ]
      );
      res.json({
        statusCode: 200,
        pessoa: pessoa,
      });
    } catch (e) {
      res.json({
        statusCode: 400,
        pessoa: pessoa,
        message: "Something went wrong, could not insert into database",
        error: e,
      });
    }
  } catch (e) {
    res.json(DB_ERROR_OBJ(e));
  } finally {
    db?.close();
  }
}

export async function selectPessoas(req, res) {
  try {
    var db = await db_open();

    try {
      const pessoas = await db.all("SELECT * FROM Pessoa");
      res.json({
        statusCode: 200,
        pessoas: pessoas,
      });
    } catch (e) {
      res.json({
        statusCode: 400,
        pessoas: [],
        error: e,
      });
    }
  } catch (e) {
    res.json(DB_ERROR_OBJ(e));
  } finally {
    db?.close();
  }
}

export async function selectPessoa(req, res) {
  const CPF = req.body.CPF;
  var db;
  try {
    db = await db_open();
    try {
      const pessoa = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [CPF]);
      res.json({
        statusCode: 200,
        pessoa: pessoa,
      });
    } catch (e) {
      res.json({
        statusCode: 400,
        pessoa: {},
      });
    }
  } catch (e) {
    res.json({
      statusCode: 500,
      pessoa: {},
      message: "Could not connect to the database",
      error: e,
    });
  } finally {
    db?.close();
  }
}

export async function updatePessoa(req, res) {
  let pessoa = req.body;
  var db;
  try {
    db = await db_open();
    try {
      const pessoaOld = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [
        pessoa.CPF,
      ]);

      db.run(
        "UPDATE Pessoa SET nome=?, dataNasc=?, endereco=?, genero=? WHERE CPF=?",
        [
          pessoa.nome,
          pessoa.dataNascimento,
          pessoa.endereco,
          pessoa.genero,
          pessoa.CPF,
        ]
      );

      const pessoaNew = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [
        pessoa.CPF,
      ]);

      res.json({
        statusCode: 200,
        pessoa_old: pessoaOld,
        pessoa_new: pessoaNew,
      });
    } catch (e) {
      res.json({
        statusCode: 400,
        pessoa: {},
        message: "Could not update the entry in database",
        error: e,
      });
    }
  } catch (e) {
    res.json(DB_ERROR_OBJ(e));
  }
}

export async function deletePessoa(req, res) {
  const CPF = req.body.CPF;
  var db;
  try {
    db = await db_open();
    try {
      const pessoa = await db.get("SELECT * FROM Pessoa WHERE CPF=?", [CPF]);
      db.get("DELETE FROM Pessoa WHERE CPF=?", [CPF]).then(
        res.json({
          statusCode: 200,
          pessoa: pessoa,
        })
      );
    } catch (e) {
      res.json({
        statusCode: 400,
        pessoa: {},
      });
    }
  } catch (e) {
    DB_ERROR_OBJ(e);
  } finally {
    db?.close();
  }
}
