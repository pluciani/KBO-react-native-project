const csvParser = require('csv-parser');
const fs = require('fs');
const { setInMemoryData } = require('../memoryCache');
const { insertAllData } = require('./insertAllController');

// Contrôleur pour l'upload de plusieurs fichiers CSV
const uploadCSV = (req, res) => {
    console.log('Uploading CSV files...');
    console.time('Uploading CSV files');
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Aucun fichier n\'a été téléversé');
    }

    // Fonction pour parser un fichier CSV
    const parseCSVFile = (file) => {
        console.log('Parsing file:', file.originalname);
        console.time(file.originalname);
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    console.timeEnd(file.originalname);

                    // Supprimez le fichier après parsing
                    fs.unlinkSync(file.path);

                    console.time('Set in-memory data ' + file.originalname);
                    await setInMemoryData(file.originalname.replace(/\.[^/.]+$/, ""), results);
                    console.timeEnd('Set in-memory data ' + file.originalname);

                    resolve({ message: 'Fichier ' + file.originalname + ' téléversé et traité avec succès' })
                })
                .on('error', (error) => reject(error));
        });
    };

    // Parse chaque fichier de manière asynchrone
    Promise.all(req.files.map(parseCSVFile))
        .then((parsedFiles) => {
            console.timeEnd('Uploading CSV files');

            // Insérer toutes les données en mémoire dans la base de données
            insertAllData(req, res);
            
            // res.status(200).json({ message: 'Fichiers CSV téléversés et traités avec succès' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Erreur lors du traitement des fichiers', error: error.message });
            console.error(error.stack);
        });
};

module.exports = { uploadCSV };
