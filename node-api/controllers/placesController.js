const {TransactionModel} = require('../models/TransactionModel');
const  Branch = require('../models/PlaceModel');

const getPlaces = async (req, res) => {
    res.status(200).json(await Branch.find({}).sort({country: -1}))
}

module.exports = {getPlaces};