const SportModel = require('../model/SportModel.js');

async function insertSport(req, res) {
    const sportReturn = await SportModel.insertSport(req.body);
    return res.json({
        statusCode: 200,
        sport: sportReturn
    });
}

async function getSport(req, res) {
    return null;
}

async function getAllSports(req, res) {
    const sports = await SportModel.getAllSports();
    return res.json({
        statusCode: 200,
        sports: sports
    });
}

async function updateSport(req, res) {
    return null;
}

async function deleteSport(req, res) {
    const sport = await SportModel.deleteSport(req.body.nome);
    return res.json({
        statusCode: 200,
        sport: sport
    });
}

async function updateSport(req, res) {
    const sport = await SportModel.updateSport(req.body);
    return res.json({
        statusCode: 200,
        sport: sport
    });
}

module.exports = {
    insertSport,
    getSport,
    getAllSports,
    updateSport,
    deleteSport
}