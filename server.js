require('dotenv').config(); // Make sure dotenv is loaded

const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

//app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
const mongoose = require('mongoose'); // optional if using mongoose
const db = require('./cse341personal2/db/connect'); // path to connect.js

// netlify access
//app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   );
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
//   });

app.use('/contacts', require('./cse341personal2/routes/contacts'));
db.initDb() // initialize DB before starting server
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
    process.exit(1); // Stop if DB fails
  });


// mongoose
const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('MongoDB URI is not defined in .env');
  process.exit(1);
}
mongoose.connect(dbUri) // Connect to MongoDB using the URI from the .env file
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});


// // mongodb
// const routes = require('./routes/index');
// const { MongoClient } = require('mongodb');
// async function main() {
// 	const uri = "mongodb+srv://shanebasham:<Supermongo28>@cluster0.5cwbugw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
    
//         await listDatabases(client);
     
//     } catch (e) {
//         console.error(e);
//     }
//     finally {
//         await client.close();
//     }
// }
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
// main().catch(console.error);

// const mongodb = require('.env');
// mongodb.initDb((err, mongodb ) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(3000);
//   }
// });

