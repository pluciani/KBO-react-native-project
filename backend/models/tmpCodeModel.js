const mongoose = require('mongoose');

const tmpCodeSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true,
    },
    Language: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
});

const tmpCodeModel = mongoose.model('tmpCode', tmpCodeSchema);

module.exports = tmpCodeModel;