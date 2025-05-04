// const path = require('path');

// const getFrontend = (req, res, next) => {
//     res.json('Test');
//     // res.sendFile('/frontend/index.html');
//     // req.get(index.html)
//     // const filePath = path.join(__dirname, '../frontend/index.html');
//     // res.sendFile(filePath);
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// }

// const getProfessional = (req, res, next) => {
//     res.json('Test');
//     res.sendFile(path.join(__dirname, '../frontend/index.html'));
// }


const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

module.exports = { getData };