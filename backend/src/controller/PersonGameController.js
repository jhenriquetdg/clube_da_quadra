const PersonGameModel = require("../model/PersonGameModel.js");

async function insertPersonGame(req, res) {
    const personGameReturn = await PersonGameModel.insertPersonGame(req.body);
    return res.json({
        statusCode: 200,
        personGameReturn
    });
}

async function deletePersonGame(req, res) {
    const personGameReturn = await PersonGameModel.deletePersonGame(req.body);
    return res.json({
        statusCode: 200,
        personGameReturn
    });
}

module.exports = {
    insertPersonGame,
    deletePersonGame
}
