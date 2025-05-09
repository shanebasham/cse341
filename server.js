require('dotenv').config(); // Make sure dotenv is loaded

var express = require('express');
var app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const mongoose = require('mongoose'); // optional if using mongoose
const db = require('./cse341personal2/db/connect'); // path to connect.js

//app.use('/', require('./routes'));
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
// app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
// });


// mongoose?
// const mongoose = require('mongoose');
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

