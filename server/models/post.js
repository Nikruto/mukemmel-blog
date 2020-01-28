const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  details: String,
  date: Date,
  imageUrl: String
});

module.exports = mongoose.model('post', postSchema);
