require('dotenv').config(); // Make sure dotenv is loaded

var express = require('express');
var app = express();

const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use('/', require('./routes'));
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});


// mongoose?
const mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;
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

