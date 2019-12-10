const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/post.js');

route.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) return console.err(err);

    if (posts) res.json({ posts: posts });
    else res.json({});
  });
});

route.get('/post/:slug', (req, res) => {
  if (req.params.slug) {
    Post.findOne({ slug: req.params.slug }, (err, post) => {
      if (err) return console.error(err);

      if (post) return res.json({ post: post });
      else return res.json({});
    });
  }
});

module.exports = route;
