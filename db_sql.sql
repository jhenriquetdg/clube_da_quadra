-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Pessoa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Pessoa` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Pessoa` (
  `CPF` CHAR(11) NOT NULL,
  `nome` VARCHAR(45) NULL,
  `dataNasc` DATE NULL,
  `genero` CHAR(1) NULL,
  `altura` INT(3) NULL,
  `peso` DECIMAL(3,2) NULL,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(12) NULL,
  `ladoDominante` CHAR(1) NULL,
  PRIMARY KEY (`CPF`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Endreco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Endreco` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Endreco` (
  `idEndreco` INT NOT NULL,
  `CEP` VARCHAR(8) NULL,
  `numero` VARCHAR(9) NULL,
  `complemento` VARCHAR(45) NULL,
  `UF` CHAR(2) NULL,
  `logradouro` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  `localidade` VARCHAR(45) NULL,
  `latitude` DECIMAL(4,4) NULL,
  `longitude` DECIMAL(4,4) NULL,
  PRIMARY KEY (`idEndreco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Quadra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Quadra` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Quadra` (
  `ID` INT NOT NULL,
  `descricao` VARCHAR(280) NULL,
  `Endreco_idEndreco` INT NOT NULL,
  PRIMARY KEY (`ID`, `Endreco_idEndreco`),
  CONSTRAINT `fk_Quadra_Endreco1`
    FOREIGN KEY (`Endreco_idEndreco`)
    REFERENCES `mydb`.`Endreco` (`idEndreco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Quadra_Endreco1_idx` ON `mydb`.`Quadra` (`Endreco_idEndreco` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Modalidade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Modalidade` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Modalidade` (
  `ID` INT NOT NULL,
  `descricao` VARCHAR(280) NULL,
  `qtdJogadores` INT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Horario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Horario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Horario` (
  `ID` INT NOT NULL,
  `dataHoraInicio` DATETIME NULL,
  `dataHoraFim` DATETIME NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Partida`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Partida` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Partida` (
  `ID` INT NOT NULL,
  `Horario_ID` INT NOT NULL,
  `Quadra_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  `status` INT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_Partida_Horario1`
    FOREIGN KEY (`Horario_ID`)
    REFERENCES `mydb`.`Horario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partida_Quadra1`
    FOREIGN KEY (`Quadra_ID`)
    REFERENCES `mydb`.`Quadra` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Partida_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Partida_Horario1_idx` ON `mydb`.`Partida` (`Horario_ID` ASC) VISIBLE;

CREATE INDEX `fk_Partida_Quadra1_idx` ON `mydb`.`Partida` (`Quadra_ID` ASC) VISIBLE;

CREATE INDEX `fk_Partida_Modalidade1_idx` ON `mydb`.`Partida` (`Modalidade_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Interesse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Interesse` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Interesse` (
  `ID` INT NOT NULL,
  `Horario_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  `Pessoa_CPF` CHAR(11) NOT NULL,
  PRIMARY KEY (`ID`, `Horario_ID`, `Modalidade_ID`, `Pessoa_CPF`),
  CONSTRAINT `fk_Interesse_Horario1`
    FOREIGN KEY (`Horario_ID`)
    REFERENCES `mydb`.`Horario` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Interesse_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Interesse_Pessoa1`
    FOREIGN KEY (`Pessoa_CPF`)
    REFERENCES `mydb`.`Pessoa` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Interesse_Horario1_idx` ON `mydb`.`Interesse` (`Horario_ID` ASC) VISIBLE;

CREATE INDEX `fk_Interesse_Modalidade1_idx` ON `mydb`.`Interesse` (`Modalidade_ID` ASC) VISIBLE;

CREATE INDEX `fk_Interesse_Pessoa1_idx` ON `mydb`.`Interesse` (`Pessoa_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`ModalidadeQuadra`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ModalidadeQuadra` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ModalidadeQuadra` (
  `Quadra_ID` INT NOT NULL,
  `Modalidade_ID` INT NOT NULL,
  PRIMARY KEY (`Quadra_ID`, `Modalidade_ID`),
  CONSTRAINT `fk_Quadra_has_Modalidade_Quadra1`
    FOREIGN KEY (`Quadra_ID`)
    REFERENCES `mydb`.`Quadra` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Quadra_has_Modalidade_Modalidade1`
    FOREIGN KEY (`Modalidade_ID`)
    REFERENCES `mydb`.`Modalidade` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Quadra_has_Modalidade_Modalidade1_idx` ON `mydb`.`ModalidadeQuadra` (`Modalidade_ID` ASC) VISIBLE;

CREATE INDEX `fk_Quadra_has_Modalidade_Quadra1_idx` ON `mydb`.`ModalidadeQuadra` (`Quadra_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Comentario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Comentario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Comentario` (
  `id` INT NOT NULL,
  `mensagem` VARCHAR(280) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ComentarioPartida`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ComentarioPartida` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ComentarioPartida` (
  `Pessoa_CPF` CHAR(11) NOT NULL,
  `Comentario_id` INT NOT NULL,
  `Partida_ID` INT NOT NULL,
  PRIMARY KEY (`Pessoa_CPF`, `Comentario_id`),
  CONSTRAINT `fk_ComentarioPartida_Comentario1`
    FOREIGN KEY (`Comentario_id`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ComentarioPartida_Partida1`
    FOREIGN KEY (`Partida_ID`)
    REFERENCES `mydb`.`Partida` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ComentarioPartida_Pessoa1`
    FOREIGN KEY (`Pessoa_CPF`)
    REFERENCES `mydb`.`Pessoa` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ComentarioPartida_Partida1_idx` ON `mydb`.`ComentarioPartida` (`Partida_ID` ASC) VISIBLE;

CREATE INDEX `fk_ComentarioPartida_Pessoa1_idx` ON `mydb`.`ComentarioPartida` (`Pessoa_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`ComentarioComentario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ComentarioComentario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ComentarioComentario` (
  `Comentario_id` INT NOT NULL,
  `Comentario_id1` INT NOT NULL,
  PRIMARY KEY (`Comentario_id`, `Comentario_id1`),
  CONSTRAINT `fk_Comentario_has_Comentario_Comentario1`
    FOREIGN KEY (`Comentario_id`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_has_Comentario_Comentario2`
    FOREIGN KEY (`Comentario_id1`)
    REFERENCES `mydb`.`Comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Comentario_has_Comentario_Comentario2_idx` ON `mydb`.`ComentarioComentario` (`Comentario_id1` ASC) VISIBLE;

CREATE INDEX `fk_Comentario_has_Comentario_Comentario1_idx` ON `mydb`.`ComentarioComentario` (`Comentario_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`EndrecoPessoa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`EndrecoPessoa` ;

CREATE TABLE IF NOT EXISTS `mydb`.`EndrecoPessoa` (
  `Pessoa_CPF` CHAR(11) NOT NULL,
  `Endreco_idEndreco` INT NOT NULL,
  PRIMARY KEY (`Pessoa_CPF`, `Endreco_idEndreco`),
  CONSTRAINT `fk_Pessoa_has_Endreco_Pessoa1`
    FOREIGN KEY (`Pessoa_CPF`)
    REFERENCES `mydb`.`Pessoa` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pessoa_has_Endreco_Endreco1`
    FOREIGN KEY (`Endreco_idEndreco`)
    REFERENCES `mydb`.`Endreco` (`idEndreco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Pessoa_has_Endreco_Endreco1_idx` ON `mydb`.`EndrecoPessoa` (`Endreco_idEndreco` ASC) VISIBLE;

CREATE INDEX `fk_Pessoa_has_Endreco_Pessoa1_idx` ON `mydb`.`EndrecoPessoa` (`Pessoa_CPF` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`PessoaPartida`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PessoaPartida` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PessoaPartida` (
  `Pessoa_CPF` CHAR(11) NOT NULL,
  `Partida_ID` INT NOT NULL,
  PRIMARY KEY (`Pessoa_CPF`, `Partida_ID`),
  CONSTRAINT `fk_Pessoa_has_Partida_Pessoa1`
    FOREIGN KEY (`Pessoa_CPF`)
    REFERENCES `mydb`.`Pessoa` (`CPF`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pessoa_has_Partida_Partida1`
    FOREIGN KEY (`Partida_ID`)
    REFERENCES `mydb`.`Partida` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Pessoa_has_Partida_Partida1_idx` ON `mydb`.`PessoaPartida` (`Partida_ID` ASC) VISIBLE;

CREATE INDEX `fk_Pessoa_has_Partida_Pessoa1_idx` ON `mydb`.`PessoaPartida` (`Pessoa_CPF` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
