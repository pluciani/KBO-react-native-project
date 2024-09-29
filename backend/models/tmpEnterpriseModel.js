const mongoose = require('mongoose');

const tmpEnterpriseSchema = new mongoose.Schema({
    EnterpriseNumber: String,
    Status: String,
    JuridicalSituation: String,
    TypeOfEnterprise: String,
    JuridicalForm: String,
    JuridicalFormCAC: String,
    StartDate: String,
});

const tmpenterpriseModel = mongoose.model('tmpenterprise', tmpEnterpriseSchema);

module.exports = tmpenterpriseModel;