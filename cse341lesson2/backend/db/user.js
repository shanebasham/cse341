const mongoose = require('mongoose');
const user = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

module.exports = mongoose.model('User', user);