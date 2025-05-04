const routes = require('express').Router();

const myController = require('../controllers')

routes.get('/', myController.function1);
routes.get('/2', myController.function2);

// mongodb
const mongodb = require('./mongodb');
mongodb.getDb()
    .db()
    .collection('test');

module.exports = routes
