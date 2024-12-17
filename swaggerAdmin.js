const swaggerJsdoc = require('swagger-jsdoc');

const adminSwaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API Documentation',
      version: '1.0.0',
      description: 'Admin-related API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Adjust the URL accordingly
      },
    ],
  },
  apis: ['./src/routes/v1/Admin.routes.js'], // Only Admin routes
};

const adminSpecs = swaggerJsdoc(adminSwaggerOptions);

module.exports = adminSpecs;
