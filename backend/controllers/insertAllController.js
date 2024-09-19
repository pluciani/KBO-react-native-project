const EnterpriseModel = require('../models/enterpriseModel');
// const ActivityModel = require('../models/ActivityModel');
// const AddressModel = require('../models/AddressModel');
const { getAllInMemoryData } = require('../memoryCache');

const insertAllData = async (req, res) => {
    try {
        const { enterprise, activity, address } = getAllInMemoryData();

        // Insérer les données dans la base de données
        if (enterprise.length > 0) {
            await EnterpriseModel.insertMany(enterprise);
        }
        if (activity.length > 0) {
            await ActivityModel.insertMany(activity);
        }
        if (address.length > 0) {
            await AddressModel.insertMany(address);
        }

        res.json({ message: 'Toutes les données ont été insérées avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
    }
};

module.exports = { insertAllData };