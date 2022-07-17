const InterestModel = require("../model/InterestModel");

async function insertInterest(req, res) {

    const interestReturn = await InterestModel.insertInterest(req.body);
    return res.json({
        statusCode: 200,
        interestReturn
    });

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

module.exports = {
    insertInterest,
    deleteInterest,
    getInterestByCPF
    
}