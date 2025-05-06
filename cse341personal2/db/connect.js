const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = () => {
  if (_db) {
    console.log('DB already initialized');
    return Promise.resolve(_db);
  }

  return MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db(); // NOTE: use `.db()` here
      console.log('MongoDB connected');
      return _db;
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };

// const dotenv = require('dotenv');
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
// const MongoClient = require('mongodb').MongoClient;

// let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log('Db is already initialized!');
//     // return callback(null, _db);
//     return Promise.resolve(_db); // Return the existing connection if it's already initialized
//   }
//   MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//       // _db = client;
//       _db = client.db();
//       // callback(null, _db);
//       return _db;
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };

// const getDb = () => {
//   if (!_db) {
//     throw Error('Db not initialized');
//   }
//   return _db;
// };

// module.exports = { initDb, getDb };