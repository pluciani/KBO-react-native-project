const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
    EnterpriseNumber: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    JuridicalSituation: {
        type: String,
        required: true,
    },
    TypeOfEnterprise: {
        type: String,
        required: true,
    },
    JuridicalForm: {
        type: String,
    },
    JuridicalFormCAC: {
        type: String,
    },
    StartDate: {
        type: String,
        required: true,
    },
    establishments: {
        type: Array,
        required: true,
        default: [],
    },
    branches: {
        type: Array,
        required: true,
        default: [],
    },
    address: {
        type: Object,
        required: true,
        default: {},
    },
    activities: {
        type: Array,
        required: true,
        default: [],
    },
    contacts: {
        type: Array,
        required: true,
        default: [],
    },
    denominations: {
        type: Array,
        required: true,
        default: [],
    },
});

const EnterpriseModel = mongoose.model('Enterprise', enterpriseSchema);

module.exports = EnterpriseModel;