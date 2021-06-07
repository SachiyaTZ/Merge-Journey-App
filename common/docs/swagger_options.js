const dotenv = require('dotenv');
dotenv.config();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'All the details for fleet Management Admin Panel',
      version: '1.0.0',
      description:
        'MERN - Journey App',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Tharindu De Zoysa',
        url: 'https://xdigital.solutions',
        email: 'sachintha123@hotmial.com'
      }
    },
    servers: [
      {
        url: process.env.BASE_URL
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./schema.js', './paths.js']
};

module.exports = options;
