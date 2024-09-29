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

const parsedContactSchema = new mongoose.Schema({
    EntityNumber: {
        type: String,
        required: true,
    },
    EntityContact: Code,
    ContactType: Code,
    Value: String,
});

const parsedContactModel = mongoose.model('parsedContact', parsedContactSchema);

module.exports = parsedContactModel;