const mongoose = require('mongoose');

const tmpActivitySchema = new mongoose.Schema({
    EntityNumber: String,
    ActivityGroup: String,
    NaceVersion: String,
    NaceCode: String,
    Classification: String,
});

const tmpActivityModel = mongoose.model('tmpActivity', tmpActivitySchema);

module.exports = tmpActivityModel;