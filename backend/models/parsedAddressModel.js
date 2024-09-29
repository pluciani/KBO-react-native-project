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

const parsedAddressSchema = new mongoose.Schema({
    EntityNumber: {
        type: String,
        required: true,
    },
    TypeOfAddress: {
        type: Code,
        required: true,
    },
    CountryFR: String,
    CountryNL: String,
    Zipcode: String,
    MunicipalityFR: String,
    MunicipalityNL: String,
    StreetFR: String,
    StreetNL: String,
    HouseNumber: String,
    Box: String,
    ExtraAddressInfo: String,
    DateStrikingOff: Date,
});

const parsedAddressModel = mongoose.model('ParsedAddress', parsedAddressSchema);

module.exports = parsedAddressModel;
