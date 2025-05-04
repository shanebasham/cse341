const routes = require('express').Router();
const myController = require('../controllers')

const express = require('express'); // Import Express
const router = express.Router(); // Create the router

routes.get('/', myController.function1);
routes.get('/2', myController.function2);

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

module.exports = router;

module.exports = routes
