const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();
const csvParser = require('csv-parser');
const fs = require('fs');
const User = require('../models/userModel');

// Téléverser et traiter le fichier CSV
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Téléverser un fichier CSV
 *     description: Téléverse un fichier CSV contenant des informations sur les entreprises et insère les données dans la base de données.
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Le fichier CSV à téléverser
 *     responses:
 *       200:
 *         description: Fichier CSV téléversé et traité avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: Aucun fichier n’a été téléversé ou format incorrect
 *       500:
 *         description: Erreur interne du serveur lors du traitement des données CSV
 */
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier n’a été téléversé');
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
        // Traitez les données parsées ici
        res.json(results);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données', error: error.message });
      }
    });
});

module.exports = router;
