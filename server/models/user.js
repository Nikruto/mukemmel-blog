const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  imageUrl: String
});

module.exports = mongoose.model('user', userSchema);
