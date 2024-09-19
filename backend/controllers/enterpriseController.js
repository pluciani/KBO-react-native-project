const EnterpriseModel = require('../models/enterpriseModel');
const { getInMemoryData } = require('../memoryCache');

const insertData = async (req, res) => {
    try {
        // Récupérer les données en mémoire
        const data = getInMemoryData("enterprise");
        if (!data || data.length === 0) {
            return res.status(400).json({ message: 'Aucune donnée à insérer' });
        }

        // Manipuler les données en mémoire si nécessaire
        const manipulatedData = data.map(item => {
            // Exemple de manipulation : ajouter un champ timestamp
            return { ...item, timestamp: new Date() };
        });

        // Insérer les données manipulées dans la base de données
        await EnterpriseModel.bulkWrite(manipulatedData.map((result) => ({
            updateOne: {
                filter: { EnterpriseNumber: result.EnterpriseNumber },
                update: result,
                upsert: true,
            },
        })));

        res.json({ message: 'Données insérées avec succès', data: manipulatedData, inMemoryData: data });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'insertion des données', error: error.message });
    }
};

module.exports = { insertData };