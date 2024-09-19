const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
// const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const uploadRoutes = require('./routes/uploadRoutes');
const searchEntrepriseRoutes = require('./routes/searchEntrepriseRoutes');

// Initialisation de l'app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
// app.use('/api/users', userRoutes);
app.use('/api', uploadRoutes);
app.use('/api/searchEntreprise', searchEntrepriseRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware de gestion des erreurs
app.use(errorHandler);

module.exports = app;