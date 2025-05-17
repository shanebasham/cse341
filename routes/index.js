const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))

module.exports = router;

// const { MongoClient } = require('mongodb');
// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri);

// async function connectToDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error(err);
//   }
// }

// connectToDB();

// mongodb.getDb()
//     .db()
//     .collection('test');


