const { Router } = require("express");

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/PersonController.js");

const {
  addCourt,
  getAllCourts,
  getCourtByID,
  deleteCourt,
  updateCourt,
} = require("../controller/CourtController.js");
const {
  getSport,
  insertSport,
  getAllSports,
  deleteSport,
  updateSport,
} = require("../controller/SportController.js");
const {
  insertCourtSport,
  deleteCourtSport
} = require("../controller/CourtSportController.js");
const {
  insertSchedule,
  deleteSchedule,
  getAllSchedules
} = require("../controller/ScheduleController.js");
const {
  insertInterest,
  deleteInterest,
  getInterestByCPF
} = require("../controller/InterestController");
const {
  createGame,
  deleteGame,
  getAllGames
} = require("../controller/GameController.js");
const {
  insertPersonGame,
  deletePersonGame
} = require("../controller/PersonGameController.js");

const router = Router();

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

// CourtSports CRUD
router.post("/courtsport", insertCourtSport);
router.delete("/courtsport", deleteCourtSport);

// Schedule CRUD
router.post("/schedule", insertSchedule);
router.delete("/schedule", deleteSchedule);
router.get("/schedules", getAllSchedules);

// Interest CRUD
router.post("/interest", insertInterest);
router.delete("/interest", deleteInterest);
router.get("/interestbycpf", getInterestByCPF);

// Game CRUD
router.post("/game", createGame);
router.delete("/game", deleteGame);
router.get("/games", getAllGames);

// PersonGame CRUD
router.post("/persongame", insertPersonGame);
router.delete("/persongame", deletePersonGame);

module.exports = router;
