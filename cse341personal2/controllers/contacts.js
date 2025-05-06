const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().collection('contacts').find();
  const db = mongodb.getDb(); 
  // const db = await mongodb.initDb(); // Ensure DB is connected
  console.log("Using DB: cse341"); 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    console.log("All contacts from DB sent successfully.");
  });
};

const getSingle = async (req, res, next) => {
  // const db = await mongodb.initDb(); // Ensure DB is connected
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .collection('contacts')
    .find({ _id: userId });
    console.log("Using DB: cse341"); 
    console.log("User found: " + userId); 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    console.log(`Single contact from DB sent successfully.`);
  });
};

module.exports = { getAll, getSingle };