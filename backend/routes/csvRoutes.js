const express = require('express');
const { getCsv } = require('../controllers/csvController');
const router = express.Router();

router.get('/', getCsv); // Le contrôleur va renvoyer "test" lorsque cette route est appelée

module.exports = router;
