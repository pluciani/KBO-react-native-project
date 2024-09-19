const csvParser = require('csv-parser');
const fs = require('fs');
const { setInMemoryData } = require('../memoryCache');
const { insertAllData } = require('./insertAllController');

// Contrôleur pour l'upload de plusieurs fichiers CSV
const uploadCSV = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Aucun fichier n\'a été téléversé');
    }

    // Tableau pour stocker les résultats de tous les fichiers
    const allResults = [];

    // Fonction pour parser un fichier CSV
    const parseCSVFile = (file) => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    // Supprimez le fichier après parsing
                    fs.unlinkSync(file.path);
                    resolve({ fileType: file.originalname.replace(/\.[^/.]+$/, ""), data: results });
                })
                .on('error', (error) => reject(error));
        });
    };

    // Parse chaque fichier de manière asynchrone
    Promise.all(req.files.map(parseCSVFile))
        .then((parsedFiles) => {
            // Stocker les données de chaque fichier dans la mémoire
            parsedFiles.forEach(file => {
                setInMemoryData(file.fileType, file.data);
                allResults.push({ fileType: file.fileType, data: file.data });
            })
            
            insertAllData();

            // Répondre avec succès une fois que tous les fichiers ont été traités
            res.json({ message: 'Tous les fichiers ont été parsés et stockés en mémoire' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Erreur lors du traitement des fichiers', error: error.message });
        });
};

module.exports = { uploadCSV };
