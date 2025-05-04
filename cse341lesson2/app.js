// var express = require('express');
// var app = express();

// const port = process.env.PORT || 8080;

const express = require('express');
const connectDB = require('./backend/db/connect');

// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const mongodb = require('./backend/db/connect');
// const professionalRoutes = require('./backend/routes/professional');

const port = process.env.PORT || 8080;
const app = express();

connectDB();

app.use('/api/newUser', require('./backend/api/user'));
app.use(express.json({ extended: false}));

// app.use(express.static('frontend'));
// app.use('/', require('./routes/professional'));

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/professional', professionalRoutes);

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });