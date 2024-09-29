const mongoose = require('mongoose');

const tmpEstablishmentSchema = new mongoose.Schema({
    EstablishmentNumber: String,
    StartDate: String,
    EnterpriseNumber: String,
});

const tmpEstablishmentModel = mongoose.model('tmpEstablishment', tmpEstablishmentSchema);

module.exports = tmpEstablishmentModel;