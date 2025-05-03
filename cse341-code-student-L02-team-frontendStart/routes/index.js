const routes = require('express').Router();

const myController = require('../controllers')

routes.get('/', myController.getFrontend);
routes.get('/professional', myController.getProfessional);

module.exports = routes