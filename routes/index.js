const express = require('express'); // Import Express
const router = express.Router(); // Import Router
const myController = require('../controllers');

router.get('/', myController.function1);
router.get('/2', myController.function2);
router.get('/contacts', (req, res) => {
    res.send('Contacts route is working');
});

// Export the router
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


