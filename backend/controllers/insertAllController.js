const EnterpriseModel = require('../models/enterpriseModel');
const { getInMemoryData, getParsedData } = require('../memoryCache');
const { parseCode } = require('./codeController');
const { parseAddress } = require('./addressController');
const { parseActivity } = require('./activityController');
const { parseContact } = require('./contactController');
const { parseDenomination } = require('./denominationController');
const { parseEstablishment } = require('./establishmentController');
const { parseBranch } = require('./branchController');
const { parseEnterprise } = require('./enterpriseController');

const parseData = async () => {
    await parseCode();
    await parseAddress();
    await parseActivity();
    await parseContact();
    await parseDenomination();
    await parseEstablishment();
    await parseBranch();
    await parseEnterprise();
};

const insertAllData = async (req, res) => {
    try {
        // parseData(getAllInMemoryData());
        await parseData();

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
        console.error(error.stack);
    }
};

module.exports = { insertAllData };