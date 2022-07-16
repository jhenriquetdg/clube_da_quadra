import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";

import {
  addCourt,
  getAllCourts,
  getCourtByID,
  deleteCourt,
  updateCourt,
} from "../controller/CourtController.js";
import {
  insertSport,
  getAllSports,
  deleteSport,
  updateSport,
} from "../controller/SportController.js";

export const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "Server is Running!",
  });
});

// User CRUD
router.get("/user", getUser);
router.get("/users", getAllUsers);
router.post("/createuser", createUser);
router.put("/updateuser", updateUser);
router.delete("/deleteuser", deleteUser);

// Court CRUD
router.post("/insertcourt", addCourt);
router.get("/getallcourts", getAllCourts);
router.get("/getcourt", getCourtByID);
router.delete("/deletecourt", deleteCourt);
router.put("/updatecourt", updateCourt);

// Sport CRUD
router.post("/insertsport", insertSport);
router.get("/getallsports", getAllSports);
router.delete("/deletesport", deleteSport);
router.put("/updatesport", updateSport);
