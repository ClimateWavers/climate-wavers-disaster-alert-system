// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config/config')

const options = {
  definition: {
    openapi: '3.0.0', // Specify OpenAPI version
    info: {
      title: 'Climate wavers', // API title
      version: '1.0.0', // API version
      description: 'Climate wavers Response system Microservice API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3004', // URL of your API
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (modify as needed)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
