// const routes = require('express').Router();

// const myController = require('../controllers/professional')

// routes.get('/', myController.getFrontend);
// routes.get('/professional', myController.getProfessional);


const express = require('express');
const professionalController = require('../controllers/professional');
const router = express.Router();

// GET /feed/posts
router.get('/', professionalController.getData);
// localhost:8080/professional/
module.exports = router;