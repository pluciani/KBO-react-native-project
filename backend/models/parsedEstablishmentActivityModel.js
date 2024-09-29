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

const parsedEstablishmentActivitySchema = new mongoose.Schema({
    EntityNumber: {
        type: String,
        required: true,
    },
    ActivityGroup: Code,
    NaceVersion: String,
    Nace: Code,
    Classification: Code,
});

const parsedEstablishmentActivityModel = mongoose.model('parsedEstablishmentActivity', parsedEstablishmentActivitySchema);

module.exports = parsedEstablishmentActivityModel;