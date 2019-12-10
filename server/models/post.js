const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  shortDesc: String,
  details: String,
  date: Date
});

module.exports = mongoose.model('post', postSchema);
