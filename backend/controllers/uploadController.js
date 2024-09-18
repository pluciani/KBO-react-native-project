const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Configuration de multer pour gérer les uploads de fichiers
const upload = multer({ dest: 'uploads/' });

const uploadCSV = (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Supprimez le fichier après le parsing
            fs.unlinkSync(req.file.path);
            // Traitez les données parsées ici
            res.json(results);
        });
};

module.exports = { upload, uploadCSV };