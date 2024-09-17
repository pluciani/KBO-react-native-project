const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json()); // Pour parser les requêtes JSON
app.use(morgan('dev')); // Logger des requêtes
app.use(cors()); // Activer CORS

// Routes
app.use('/api/users', userRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

module.exports = app;