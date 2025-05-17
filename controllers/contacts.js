const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().collection('contacts').find();
        console.log("Using DB: cse341"); 
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
            console.log("All contacts from DB sent successfully.");
        });
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: 'Some error occurred while getting contacts.' });
    }
};

const getSingle = async (req, res, next) => {
    try {
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
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).json({ error: 'Some error occurred while getting contact.' });
    }
};

const createContact = async (req, res) => {
  console.log('Creating contact...');
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDb();
    const response = await db.collection('contacts').insertOne(contact);

    console.log('Insert response:', response);

    if (response && response.insertedId) {
      return res.status(201).json({
        message: 'Contact created successfully',
        contactId: response.insertedId.toString()
      });
    }

    console.error('Insert failed or incomplete response:', response);
    return res.status(500).json({ message: 'Insert failed: No insertedId returned.' });

  } catch (error) {
    console.error('Error inserting contact:', error.stack || error);
    return res.status(500).json({
      message: 'Some error occured during contact creation.',
      error: error.message
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.status(204).send(); // Success with no content
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Some error occurred while updating the contact.' });
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact};