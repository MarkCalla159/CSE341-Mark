require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();
// Define the base Swagger document
const isDev = process.env.DEV === 'true';
const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API'
  },
  host: isDev ? `localhost:${process.env.PORT}` : 'cse341-mark.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
