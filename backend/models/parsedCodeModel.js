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

const parsedCodeSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true,
    },
    Translations : {
        type: [Translation],
        required: true,
    },
});

const parsedCodeModel = mongoose.model('parsedCode', parsedCodeSchema);

module.exports = parsedCodeModel;