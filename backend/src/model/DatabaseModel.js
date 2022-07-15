
const { db_open } = require('../database/initDB');

async function createTablePessoa() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Pessoa` (" +
        "`CPF` CHAR(11) NOT NULL," +
        "`nome` VARCHAR(45) NULL," +
        "`dataNasc` DATE NULL," +
        "`endereco` VARCHAR(45) NULL," +
        "`genero` CHAR(1) NULL," +
        "PRIMARY KEY (`CPF`))"
    );
  });
}

async function createTableJogador() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Jogador` (" +
        " `altura` INT(3) NULL," +
        " `Pessoa_CPF` CHAR(11) NOT NULL," +
        " `peso` DECIMAL(3,2) NULL," +
        "PRIMARY KEY (`Pessoa_CPF`)," +
        "CONSTRAINT `fk_Jogador_Pessoa`" +
        " FOREIGN KEY (`Pessoa_CPF`)" +
        " REFERENCES `Pessoa` (`CPF`)" +
        " ON DELETE NO ACTION" +
        " ON UPDATE NO ACTION)"
    );
  });
}

async function createTableQuadra() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Quadra` (" +
        " `ID` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `endereco` VARCHAR(70) NULL)"
    );
  });
}

async function createTableModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Modalidade` (" +
        " `ID` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        " `nome` VARCHAR(32) NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `qtdJogadores` INT NULL)"
    );
  });
}

async function createTableHorario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Horario` (",
      " `ID` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,",
      " `dataHoraInicio` DATETIME NULL,",
      " `dataHoraFim` DATETIME NULL)"
    );
  });
}

async function createTablePartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Partida` (" +
        " `ID` INT NOT NULL," +
        " `Horario_ID` INT NOT NULL," +
        " `Quadra_ID` INT NOT NULL," +
        " `Modalidade_ID` INT NOT NULL," +
        "PRIMARY KEY (`ID`)," +
        "CONSTRAINT `fk_Partida_Horario1`" +
        "    FOREIGN KEY (`Horario_ID`)" +
        "    REFERENCES `Horario` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Quadra1`" +
        "    FOREIGN KEY (`Quadra_ID`)" +
        "    REFERENCES `Quadra` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Modalidade1`" +
        "    FOREIGN KEY (`Modalidade_ID`)" +
        "    REFERENCES `Modalidade` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableInteresse() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Interesse` (" +
        " `ID` INT NOT NULL," +
        " `Jogador_Pessoa_CPF` CHAR(11) NOT NULL," +
        " `Horario_ID` INT NOT NULL," +
        " `Modalidade_ID` INT NOT NULL," +
        "PRIMARY KEY (`ID`, `Jogador_Pessoa_CPF`, `Horario_ID`, `Modalidade_ID`)," +
        "CONSTRAINT `fk_Interesse_Jogador1`" +
        "    FOREIGN KEY (`Jogador_Pessoa_CPF`)" +
        "    REFERENCES `Jogador` (`Pessoa_CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Interesse_Horario1`" +
        "    FOREIGN KEY (`Horario_ID`)" +
        "    REFERENCES `Horario` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Interesse_Modalidade1`" +
        "    FOREIGN KEY (`Modalidade_ID`)" +
        "    REFERENCES `Modalidade` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableQuadraModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `QuadraModalidade` (" +
        " `Quadra_ID` INT NOT NULL," +
        " `Modalidade_ID` INT NOT NULL," +
        "PRIMARY KEY (`Quadra_ID`, `Modalidade_ID`)," +
        "CONSTRAINT `fk_QuadraModalidade_Quadra1`" +
        "    FOREIGN KEY (`Quadra_ID`)" +
        "    REFERENCES `Quadra` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_QuadraModalidade_Modalidade1`" +
        "    FOREIGN KEY (`Modalidade_ID`)" +
        "    REFERENCES `Modalidade` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableComentario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Comentario` (" +
        " `id` INT NOT NULL," +
        " `mensagem` VARCHAR(280) NULL," +
        "PRIMARY KEY (`id`))"
    );
  });
}

async function createTableComentarioPartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `ComentarioPartida` (" +
        " `Comentario_id` INT NOT NULL," +
        " `Jogador_Pessoa_CPF` CHAR(11) NOT NULL," +
        " `Partida_ID` INT NOT NULL," +
        "PRIMARY KEY (`Comentario_id`, `Jogador_Pessoa_CPF`)," +
        "CONSTRAINT `fk_ComentarioPartida_Comentario1`" +
        "    FOREIGN KEY (`Comentario_id`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_ComentarioPartida_Jogador1`" +
        "    FOREIGN KEY (`Jogador_Pessoa_CPF`)" +
        "    REFERENCES `Jogador` (`Pessoa_CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_ComentarioPartida_Partida1`" +
        "    FOREIGN KEY (`Partida_ID`)" +
        "    REFERENCES `Partida` (`ID`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableComentarioComentario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `ComentarioComentario` (" +
        " `Comentario_id` INT NOT NULL," +
        " `Comentario_id1` INT NOT NULL," +
        "PRIMARY KEY (`Comentario_id`, `Comentario_id1`)," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario1`" +
        "    FOREIGN KEY (`Comentario_id`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario2`" +
        "    FOREIGN KEY (`Comentario_id1`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function selectTables(req, res) {
  console.log("Listing tables...");
  db_open()
    .then((db) => {
      db.all("SELECT * FROM Comentario");
    })
    .then((tables) => res.json(tables));
  console.log(" done.");
}

async function createTables(req, res) {
  createTablePessoa();
  createTableJogador();
  // createTableHorario();
  createTableQuadra();
  createTableModalidade();
  createTablePartida();
  createTableInteresse();
  createTableQuadraModalidade();
  createTableComentario();
  createTableComentarioPartida();
  createTableComentarioComentario();
  console.log("Database tables was successfully created.");
}

module.exports = {
  createTables
}
