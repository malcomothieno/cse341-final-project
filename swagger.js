const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'RESTful API for managing books and authors with full CRUD, validation, and error handling.',
    version: '1.0.0',
  },
  host: 'YOUR-RENDER-URL.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/books.js', './routes/authors.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
