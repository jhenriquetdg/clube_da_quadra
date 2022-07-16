import CourtModel from "../model/CourtModel.js";

export async function addCourt(req, res) {
  const court = await CourtModel.insertCourt(req.body);
  return res.json({
    statusCode: 200,
    court: court,
  });
}

export async function getCourtByID(req, res) {
  const court = await CourtModel.getCourt(req.body.ID);
  return res.json({
    statusCode: 200,
    court: court,
  });
}

export async function getAllCourts(req, res) {
  const courts = await CourtModel.getAllCourts();
  return res.json({
    statusCode: 200,
    courts: courts,
  });
}

export async function getAllCourtsByCity(req, res) {
  return null;
}

export async function deleteCourt(req, res) {
  const returnCourt = await CourtModel.deleteCourt(req.body.ID);
  return res.json({
    statusCode: 200,
    court: returnCourt,
  });
}

export async function updateCourt(req, res) {
  const returnCourt = await CourtModel.updateCourt(req.body);
  return res.json({
    statusCode: 200,
    court: returnCourt,
  });
}

const CourtController = {
  addCourt,
  getCourtByID,
  getAllCourts,
  deleteCourt,
  updateCourt,
};

export default CourtController;
