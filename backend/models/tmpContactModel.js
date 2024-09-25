const mongoose = require('mongoose');

const tmpContactSchema = new mongoose.Schema({
    EntityNumber: String,
    EntityContact: String,
    ContactType: String,
    Value: String,
});

const tmpContactModel = mongoose.model('tmpContact', tmpContactSchema);

module.exports = tmpContactModel;