const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb('portfolio').collection('artworks').find();
  //const db = mongodb.getDb('portfolio'); 
  const db = await mongodb.initDb('portfolio'); // Ensure DB is connected
  console.log("Using DB: portfolio"); 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    console.log("All artworks from DB sent successfully.");
  });
};

const getSingle = async (req, res, next) => {
  // const db = await mongodb.initDb(); // Ensure DB is connected
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb('portfolio')
    .collection('artworks')
    .find({ _id: userId });
    console.log("Using DB: portfolio"); 
    console.log("User found: " + userId); 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    console.log(`Single artwork from DB sent successfully.`);
  });
};

const createArtwork = async (req, res) => {
  console.log('Creating artwork...');
  try {
    const artwork = {
      img: req.body.img,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      size: req.body.size,
      date: req.body.date,
      stock: req.body.stock
    };

    const db = mongodb.getDb();
    const response = await db.collection('artworks').insertOne(artwork);

    console.log('Insert response:', response);

    if (response && response.insertedId) {
      return res.status(201).json({
        message: 'Artwork created successfully',
        artworkId: response.insertedId.toString()
        
      });
    }

    console.error('Insert failed or incomplete response:', response);
    return res.status(500).json({ message: 'Insert failed: No insertedId returned.' });
  } catch (error) {
    console.error('Error inserting artwork:', error.stack || error);
    return res.status(500).json({
      message: 'Server error during artwork creation.',
      error: error.message
    });
  }
};

const updateArtwork = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const artwork = {
      img: req.body.img,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      size: req.body.size,
      date: req.body.date,
      stock: req.body.stock
    };
    const response = await mongodb
      .getDb()
      .collection('artworks')
      .replaceOne({ _id: userId }, artwork);
    console.log(response);
    if (response.matchedCount === 0) {
      return res.status(404).json({ error: 'Artwork not found.' });
    }
    res.status(204).send(); // Success with no content
  } catch (err) {
    console.error('Error updating artwork:', err);
    res.status(500).json({ error: 'Some error occurred while updating the artwork.' });
  }
};

const deleteArtwork = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('artworks').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the artwork.');
  }
};

module.exports = { getAll, getSingle, createArtwork, updateArtwork, deleteArtwork};