const { parseCode } = require('./codeController');
const { parseAddress } = require('./addressController');
const { parseActivity } = require('./activityController');
const { parseContact } = require('./contactController');
const { parseDenomination } = require('./denominationController');
const { parseEstablishment } = require('./establishmentController');
const { parseBranch } = require('./branchController');
const { parseEnterprise } = require('./enterpriseController');

const parseData = async () => {
    console.log(new Date() + ' : Parsing all data...');
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
    console.log(new Date() + ' : Inserting all data...');
    console.time('Inserting all data...');
    try {
        await parseData();

        console.timeEnd('Inserting all data...');
        console.log(new Date() + ' : Toutes les données ont été insérées avec succès');

        res.json({ message: 'Toutes les données ont été insérées avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
        console.error(error.stack);
    }
};

module.exports = { insertAllData };