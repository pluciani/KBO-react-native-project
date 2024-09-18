const csvParser = require('csv-parser');
const fs = require('fs');
const { setInMemoryData } = require('../memoryCache');

const uploadCSV = (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier n\'a été téléversé');
    }

    const results = [];

    // Lire le fichier CSV et le parser
    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Supprimez le fichier après le parsing
                fs.unlinkSync(req.file.path);

                // Stocker les données en mémoire
                setInMemoryData(results);

                res.json({ message: 'Données parsées et stockées en mémoire', data: results });
            } catch (error) {
                res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
            }
        });
};

module.exports = { uploadCSV };
