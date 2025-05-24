const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Output API',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./routes/artworks.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

//swaggerAutogen(outputFile, routes, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./app.js'); 
  });