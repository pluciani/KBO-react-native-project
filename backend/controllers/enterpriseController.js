const EnterpriseModel = require('../models/enterpriseModel');
const { getInMemoryData } = require('../memoryCache');

const insertData = async (req, res) => {
    try {
        // Récupérer les données en mémoire
        const inMemoryData = getInMemoryData();

        // Manipuler les données en mémoire si nécessaire
        const manipulatedData = inMemoryData.map(data => {
            // Exemple de manipulation : ajouter un champ timestamp
            return { ...data, timestamp: new Date() };
        });

        // Insérer les données manipulées dans la base de données
        await EnterpriseModel.bulkWrite(manipulatedData.map((result) => ({
            updateOne: {
                filter: { EnterpriseNumber: result.EnterpriseNumber },
                update: result,
                upsert: true,
            },
        })));

        res.json({ message: 'Données insérées avec succès', data: manipulatedData, inMemoryData: inMemoryData });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
    }
};

module.exports = { insertData };