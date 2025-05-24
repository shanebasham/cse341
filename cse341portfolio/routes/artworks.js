console.log('Artworks route loaded');  // Added for debugging

const express = require('express');
const router = express.Router();

const artworksController = require('../controllers/artworks');

router.get('/', artworksController.getAll);
router.get('/:id', artworksController.getSingle);
router.post('/', artworksController.createArtwork);
router.put('/:id', artworksController.updateArtwork);
router.delete('/:id', artworksController.deleteArtwork);

module.exports = router;