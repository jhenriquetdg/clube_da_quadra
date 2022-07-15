const { Router } = require('express');
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controller/UserController');
const { addCourt, getAllCourts, getCourtByID, deleteCourt, updateCourt } = require('../controller/CourtController.js');
const { insertSport, getAllSports, deleteSport, updateSport } = require('../controller/SportController.js');

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "Server is Running!",
  });
});

// User CRUD
router.get("/getuser", getUser);
router.get("/getallusers", getAllUsers);
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

module.exports = router;