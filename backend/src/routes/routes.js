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
  getSport,
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
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

// Court CRUD
router.post("/court", addCourt);
router.get("/courts", getAllCourts);
router.get("/court", getCourtByID);
router.delete("/court", deleteCourt);
router.put("/court", updateCourt);

// Sport CRUD
router.get("/sport", getSport);
router.post("/sport", insertSport);
router.get("/sports", getAllSports);
router.delete("/sport", deleteSport);
router.put("/sport", updateSport);
