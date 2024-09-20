const EnterpriseModel = require('../models/enterpriseModel');
const { getAllInMemoryData, getParsedData } = require('../memoryCache');
const { parseCode } = require('./codeController');
const { parseAddress } = require('./addressController');
const { parseActivity } = require('./activityController');
const { parseContact } = require('./contactController');
const { parseDenomination } = require('./denominationController');
const { parseEstablishment } = require('./establishmentController');
const { parseBranch } = require('./branchController');
const { parseEnterprise } = require('./enterpriseController');

const parseData = (data) => {
    parseCode(data.code);
    parseAddress(data.address);
    parseActivity(data.activity);
    parseContact(data.contact);
    parseDenomination(data.denomination);
    parseEstablishment(data.establishment);
    parseBranch(data.branch);
    parseEnterprise(data.enterprise);
};

const insertAllData = async (req, res) => {
    try {
        parseData(getAllInMemoryData());

        enterprise = getParsedData("enterprise");

        // Insérer les données dans la base de données
        if (enterprise.length > 0) {
            await EnterpriseModel.insertMany(enterprise);
        } else {
            throw new Error('Aucune donnée à insérer');
        }

        res.json({ message: 'Toutes les données ont été insérées avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
    }
};

module.exports = { insertAllData };