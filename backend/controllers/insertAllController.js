const EnterpriseModel = require('../models/enterpriseModel');
const { getAllInMemoryData } = require('../memoryCache');

const parseData = (data) => {
    
}

const insertAllData = async (req, res) => {
    try {
        const { activity, address, branch, code, contact, denomination, enterprise, establishment } = getAllInMemoryData();

        // Insérer les données dans la base de données
        if (enterprise.length > 0) {
            await EnterpriseModel.insertMany(enterprise);
        }

        res.json({ message: 'Toutes les données ont été insérées avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
    }
};

module.exports = { insertAllData };