const express = require('express');
const router = express.Router();

router.use('/artworks', require('./artworks'))

module.exports = router;