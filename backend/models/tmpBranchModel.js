const mongoose = require('mongoose');

const tmpBranchSchema = new mongoose.Schema({
    Id: String,
    StartDate: String,
    EnterpriseNumber: String,
});

const tmpBranchModel = mongoose.model('tmpBranch', tmpBranchSchema);

module.exports = tmpBranchModel;