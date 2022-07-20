const CourtModel = require("../model/CourtModel.js");

async function addCourt(req, res) {
  const court = await CourtModel.insertCourt(req.body);
  return res.json({
    statusCode: 200,
    court: court,
  });
}

async function getCourtById(req, res) {
  const court = await CourtModel.getCourt(req.body.id);
  return res.json({
    statusCode: 200,
    court: court,
  });
}

async function getAllCourts(req, res) {
  const courts = await CourtModel.getAllCourts();
  return res.json({
    statusCode: 200,
    courts: courts,
  });
}

async function getAllCourtsByCity(req, res) {
  return null;
}

async function deleteCourt(req, res) {
  const returnCourt = await CourtModel.deleteCourt(req.body.id);
  return res.json({
    statusCode: 200,
    court: returnCourt,
  });
}

async function updateCourt(req, res) {
  const returnCourt = await CourtModel.updateCourt(req.body);
  return res.json({
    statusCode: 200,
    court: returnCourt,
  });
}

module.exports = {
  addCourt,
  getCourtById,
  getAllCourts,
  deleteCourt,
  updateCourt,
};
