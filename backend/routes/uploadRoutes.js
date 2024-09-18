const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { uploadCSV } = require('../controllers/uploadController');
const { insertData } = require('../controllers/enterpriseController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message de confirmation
 *       example:
 *         message: Fichier CSV téléversé et traité avec succès
 */

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
 *         description: Aucun fichier n'a été téléversé ou format incorrect
 *       500:
 *         description: Erreur interne du serveur lors du traitement des données CSV
 */
router.post('/upload', upload.single('file'), uploadCSV);

/**
 * @swagger
 * /insert:
 *   post:
 *     summary: Insert parsed data into the database
 *     responses:
 *       200:
 *         description: Données insérées avec succès
 *       500:
 *         description: Erreur lors de l'insertion des données
 */
router.post('/insert', insertData);

module.exports = router;
