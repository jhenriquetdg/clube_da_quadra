// const SportModel = require('../model/SportModel.js');
import SportModel from "../model/SportModel.js";

export async function insertSport(req, res) {
  const sportReturn = await SportModel.insertSport(req.body);
  return res.json({
    statusCode: 200,
    sport: sportReturn,
  });
}

export async function getSport(req, res) {
  return null;
}

export async function getAllSports(req, res) {
  const sports = await SportModel.getAllSports();
  return res.json({
    statusCode: 200,
    sports: sports,
  });
}

export async function deleteSport(req, res) {
  const sport = await SportModel.deleteSport(req.body.nome);
  return res.json({
    statusCode: 200,
    sport: sport,
  });
}

export async function updateSport(req, res) {
  const sport = await SportModel.updateSport(req.body);
  return res.json({
    statusCode: 200,
    sport: sport,
  });
}
