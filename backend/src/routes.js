import { Router } from "express";
import { createTables, selectTables } from "./Controler/Database.js";
import {
  insertPessoa,
  updatePessoa,
  selectPessoas,
  selectPessoa,
  deletePessoa,
} from "./Controler/Pessoa.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "Api Rodando",
  });
});

router.get("/init", createTables);
router.get("/tables", selectTables);

router.get("/pessoas", selectPessoas);
router.get("/pessoa", selectPessoa);
router.post("/pessoa", insertPessoa);
router.put("/pessoa", updatePessoa);
router.delete("/pessoa", deletePessoa);

export default router;
