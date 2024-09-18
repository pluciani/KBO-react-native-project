const express = require('express');
const { upload, uploadCSV } = require('../controllers/uploadController');

const router = express.Router();

/**
 * @swagger
 * /api/upload-csv:
 *   post:
 *     summary: Upload a CSV file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The CSV file to upload
 *     responses:
 *       200:
 *         description: Successfully uploaded and parsed the CSV file
 */
router.post('/upload-csv', upload.single('file'), uploadCSV);

module.exports = router;