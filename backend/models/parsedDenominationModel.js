const mongoose = require('mongoose');

const Translation = new mongoose.Schema({
    Language: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
});

const Code = new mongoose.Schema({
    Code: {
        type: String,
        required: true,
    },
    Translations : {
        type: [Translation],
        required: true,
    },
});

const parsedDenominationSchema = new mongoose.Schema({
    EntityNumber: {
        type: String,
        required: true,
    },
    Language: Code,
    TypeOfDenomination: Code,
    Denomination: String,
});

const parsedDenominationModel = mongoose.model('parsedDenomination', parsedDenominationSchema);

module.exports = parsedDenominationModel;