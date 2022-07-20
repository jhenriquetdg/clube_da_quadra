const { db_open } = require("../database/initDB");

async function createTablePessoa() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Pessoa` (" +
        " `CPF` CHAR(11) NOT NULL," +
        " `nome` VARCHAR(45) NULL," +
        " `dataNasc` DATE NULL," +
        " `genero` CHAR(1) NULL," +
        " `altura` INT(3) NULL," +
        " `peso` DECIMAL(3,2) NULL," +
        " `email` VARCHAR(45) NULL," +
        " `senha` VARCHAR(12) NULL," +
        " `ladoDominante` CHAR(1) NULL," +
        "PRIMARY KEY (`CPF`))"
    );
  });
}

async function createTableEndereco() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Endereco` (" +
        " `id` INT NOT NULL," +
        " `CEP` VARCHAR(8) NULL," +
        " `numero` VARCHAR(9) NULL," +
        " `complemento` VARCHAR(45) NULL," +
        " `UF` CHAR(2) NULL," +
        " `logradouro` VARCHAR(45) NULL," +
        " `bairro` VARCHAR(45) NULL," +
        " `localidade` VARCHAR(45) NULL," +
        " `latitude` DECIMAL(4,4) NULL," +
        " `longitude` DECIMAL(4,4) NULL," +
        " PRIMARY KEY (`id`))"
    );
  });
}

async function createTableQuadra() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Quadra` (" +
        " `id` INT NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `id_endreco` INT NOT NULL," +
        " PRIMARY KEY (`id`, `id_endreco`)," +
        " CONSTRAINT `fk_Quadra_Endreco1`" +
        "   FOREIGN KEY (`id_endreco`)" +
        "   REFERENCES `Endreco` (`id`)" +
        "   ON DELETE CASCADE" +
        "   ON UPDATE NO ACTION)"
    );
  });
}

async function createTableModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Modalidade` (" +
        " `id` INTEGER NOT NULL," +
        " `nome` VARCHAR(32) NOT NULL," +
        " `descricao` VARCHAR(280) NULL," +
        " `qtdJogadores` INT NULL," +
        " PRIMARY KEY (`id`))"
    );
  });
}

async function createTableHorario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Horario` (" +
        " `id` INTEGER PRIMARY KEY NOT NULL," +
        " `dataHoraInicio` VARCHAR(19) NULL," + //"YYYY-MM-DD HH:MM:SS"
        " `dataHoraFim` VARCHAR(19) NULL)" //"YYYY-MM-DD HH:MM:SS"
    );
  });
}

async function createTablePartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Partida` (" +
        " `id` INT NOT NULL," +
        " `id_horario` INT NOT NULL," +
        " `id_quadra` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        "PRIMARY KEY (`id`)," +
        "CONSTRAINT `fk_Partida_Horario1`" +
        "    FOREIGN KEY (`id_horario`)" +
        "    REFERENCES `Horario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Quadra1`" +
        "    FOREIGN KEY (`id_quadra`)" +
        "    REFERENCES `Quadra` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Partida_Modalidade1`" +
        "    FOREIGN KEY (`id_modalidade`)" +
        "    REFERENCES `Modalidade` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableInteresse() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `Interesse` (" +
        " `id` INT NOT NULL," +
        " `id_horario` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        " `CPF_pessoa` CHAR(11) NOT NULL," +
        " PRIMARY KEY (`id`, `id_horario`, `id_modalidade`, `CPF_pessoa`)," +
        " CONSTRAINT `fk_Interesse_Horario1`" +
        "   FOREIGN KEY (`id_horario`)" +
        "   REFERENCES `Horario` (`id`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION," +
        " CONSTRAINT `fk_Interesse_Modalidade1`" +
        "   FOREIGN KEY (`id_modalidade`)" +
        "   REFERENCES `Modalidade` (`id`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION," +
        " CONSTRAINT `fk_Interesse_Pessoa1`" +
        "   FOREIGN KEY (`CPF_pessoa`)" +
        "   REFERENCES `Pessoa` (`CPF`)" +
        "   ON DELETE NO ACTION" +
        "   ON UPDATE NO ACTION)"
    );
  });
}

async function createTableQuadraModalidade() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `QuadraModalidade` (" +
        " `id_quadra` INT NOT NULL," +
        " `id_modalidade` INT NOT NULL," +
        "PRIMARY KEY (`id_quadra`, `id_modalidade`)," +
        "CONSTRAINT `fk_QuadraModalidade_Quadra1`" +
        "    FOREIGN KEY (`id_quadra`)" +
        "    REFERENCES `Quadra` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_QuadraModalidade_Modalidade1`" +
        "    FOREIGN KEY (`id_modalidade`)" +
        "    REFERENCES `Modalidade` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTablePessoaPartida() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `PessoaPartida` (" +
        " `CPF_pessoa` CHAR(11) NOT NULL," +
        " `id_partida` INT NOT NULL," +
        "PRIMARY KEY (`CPF_pessoa`, `id_partida`)," +
        "CONSTRAINT `fk_PessoaPartida_Pessoa1`" +
        "    FOREIGN KEY (`CPF_pessoa`)" +
        "    REFERENCES `Pessoa` (`CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_PessoaPartida_Partida1`" +
        "    FOREIGN KEY (`id_partida`)" +
        "    REFERENCES `Partida` (`id`)" +
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
        "  `cpf_pessoa` CHAR(11) NOT NULL," +
        "  `id_comentario` INT NOT NULL," +
        "  `id_partida` INT NOT NULL," +
        "  PRIMARY KEY (`cpf_pessoa`, `id_comentario`)," +
        "  CONSTRAINT `fk_ComentarioPartida_Comentario1`" +
        "    FOREIGN KEY (`id_comentario`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "  CONSTRAINT `fk_ComentarioPartida_Partida1`" +
        "    FOREIGN KEY (`id_partida`)" +
        "    REFERENCES `Partida` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "  CONSTRAINT `fk_ComentarioPartida_Pessoa1`" +
        "    FOREIGN KEY (`cpf_pessoa`)" +
        "    REFERENCES `Pessoa` (`CPF`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION)"
    );
  });
}

async function createTableComentarioComentario() {
  db_open().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS `ComentarioComentario` (" +
        " `id_comentario` INT NOT NULL," +
        " `id_comentario_reply` INT NOT NULL," +
        "PRIMARY KEY (`id_comentario`, `id_comentario_reply`)," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario1`" +
        "    FOREIGN KEY (`id_comentario`)" +
        "    REFERENCES `Comentario` (`id`)" +
        "    ON DELETE NO ACTION" +
        "    ON UPDATE NO ACTION," +
        "CONSTRAINT `fk_Comentario_has_Comentario_Comentario2`" +
        "    FOREIGN KEY (`id_comentario_reply`)" +
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

function createTables(req, res) {
  createTablePessoa();
  createTableHorario();
  createTableEndereco();
  createTableQuadra();
  createTableModalidade();
  createTablePartida();
  createTablePessoaPartida();
  createTableInteresse();
  createTableQuadraModalidade();
  createTableComentario();
  createTableComentarioPartida();
  createTableComentarioComentario();

  console.log("Database tables was successfully created.");
}

async function populatePerson() {
  db_open().then((db) => {
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('24829420842', 'Joao', '15/01/2001', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'E')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('24829420842', 'Joao', '15/01/2001', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'E')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('34822470842', 'Marcos', '26/02/1999', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('44822446842', 'Joana', '05/03/1995', 'F', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('16829400842', 'Maria', '06/04/1999', 'F', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('94829490842', 'Julio', '02/05/2002', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'E')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('14862423843', 'Tiago', '17/06/1996', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('24829420842', 'Jose', '17/07/1994', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'E')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('14829421842', 'Daniel', '13/08/2004', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('44823428842', 'Mario', '21/09/2000', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('54829020042', 'Carlos', '27/10/2003', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'E')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('14822420842', 'Bruno', '30/11/2001', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('24729420842', 'Marcelo', '15/12/2001', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
    db.exec(
      "INSERT OR REPLACE INTO Pessoa (CPF, nome, dataNasc, genero, altura, peso, email, senha, ladoDominante) VALUES ('24829421842', 'Pedro', '09/11/2002', 'M', 175, 70, 'anonymous@anon.com', '12345678', 'D')"
    );
  });
}

async function populateTables() {
  await populatePerson();
}

module.exports = {
  createTables,
  populateTables,
};
