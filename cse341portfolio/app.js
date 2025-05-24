require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// graphql
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
  .use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
    }));

app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8080;
const mongoose = require('mongoose'); 
const db = require('./db/connect'); 

// netlify access
//app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
  });

app.use('/artworks', require('./routes/artworks'));
db.initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  });


// mongoose
const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('MongoDB URI is not defined in .env');
  process.exit(1);
}
mongoose.connect(dbUri)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
