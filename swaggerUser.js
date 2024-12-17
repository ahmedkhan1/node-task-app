const swaggerJsdoc = require('swagger-jsdoc');

const userSwaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API Documentation',
      version: '1.0.0',
      description: 'User-related API documentation',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Adjust the URL accordingly
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {  // Define the name of the security scheme
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Expected format for the token
        },
      },
    },
    security: [
      {
        BearerAuth: [],  // Apply the security scheme globally
      },
    ],
  },
  apis: ['src/routes/v1/User.routes.js'], // Only User routes
};

const userSpecs = swaggerJsdoc(userSwaggerOptions);

module.exports = userSpecs;
