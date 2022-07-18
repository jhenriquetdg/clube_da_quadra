const InterestModel = require("../model/InterestModel");
const PersonGameModel = require("../model/PersonGameModel.js");

async function insertInterest(req, res) {

    const interestReturn = await InterestModel.insertInterest(req.body);

    if(!interestReturn.error){

        // await InterestModel.getAllInterested(req.body);

        return res.json({
            statusCode: 200,
            interestReturn
        });
    } else {
        return res.json ({
            statusCode: 400,
            message: "The operation could not be completed!"
        });
    }
}

async function deleteInterest(req, res) {

    const interestReturn = await InterestModel.deleteInterest(req.body);
    return res.json({
        statusCode: 200,
        interestReturn
    });

}

async function getInterestByCPF(req, res) {

    const interestReturn = await InterestModel.getInterestByCPF(req.body);
    return res.json({
        statusCode: 200,
        interestReturn
    });

}

async function getAllInterested(req, res) {
    const allInterested = await InterestModel.getAllInterested(req.body);
    return res.json({
        statusCode: 200,
        allInterested
    });
}

module.exports = {
    insertInterest,
    deleteInterest,
    getInterestByCPF,
    getAllInterested
    
}