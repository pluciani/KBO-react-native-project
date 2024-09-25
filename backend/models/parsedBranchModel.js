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

const Address = new mongoose.Schema({
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

const Activity = new mongoose.Schema({
    ActivityGroup: Code,
    NaceVersion: String,
    Nace: Code,
    Classification: Code,
});

const Contact = new mongoose.Schema({
    EntityContact: Code,
    ContactType: Code,
    Value: String,
});

const Denomination = new mongoose.Schema({
    Language: Code,
    TypeOfDenomination: Code,
    Denomination: String,
});

const parsedBranchSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
    },
    StartDate: {
        type: Date,
        required: true,
    },
    EnterpriseNumber: {
        type: String,
        required: true,
    },
    Address: {
        type: Address,
        required: true,
    },
    Activities: {
        type: [Activity],
        required: true,
        default: [],
    },
    Contacts: {
        type: [Contact],
        required: true,
        default: [],
    },
    Denominations: {
        type: [Denomination],
        required: true,
        default: [],
    },
});

const parsedBranchModel = mongoose.model('ParsedBranch', parsedBranchSchema);

module.exports = parsedBranchModel;