const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'API documentation for Express.js backend template',
      contact: {
        name: 'API Support',
        url: 'http://example.com',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;
