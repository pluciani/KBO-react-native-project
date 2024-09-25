const mongoose = require('mongoose');

const tmpDenominationSchema = new mongoose.Schema({
    EntityNumber: String,
    Language: String,
    TypeOfDenomination: String,
    Denomination: String,
});

const tmpDenominationModel = mongoose.model('tmpDenomination', tmpDenominationSchema);

module.exports = tmpDenominationModel;