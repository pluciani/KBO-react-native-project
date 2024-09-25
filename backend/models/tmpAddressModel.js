const mongoose = require('mongoose');

const tmpAddressSchema = new mongoose.Schema({
    EntityNumber: String,
    TypeOfAddress: String,
    CountryNL: String,
    CountryFR: String,
    Zipcode: String,
    MunicipalityNL: String,
    MunicipalityFR: String,
    StreetNL: String,
    StreetFR: String,
    HouseNumber: String,
    Box: String,
    ExtraAddressInfo: String,
    DateStrikingOff: String,
});

const tmpAddressModel = mongoose.model('tmpAddress', tmpAddressSchema);

module.exports = tmpAddressModel;