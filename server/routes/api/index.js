const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/post.js');
const authRouter = require('./auth/index.js');

route.use('/auth', authRouter);
route.get('/posts', (req, res) => {
  if (req.query.from && req.query.to) {
    let { from, to } = req.query;
    Post.find({})
      .sort({ date: -1 })
      .skip(from - 1)
      .limit(to - from + 1)
      .exec((err, posts) => {
        if (err) return console.err(err);

        if (posts) res.json({ posts: posts });
        else res.json({});
      });
  } else {
    Post.find({}, (err, posts) => {
      if (err) return console.err(err);

      if (posts) res.json({ posts: posts });
      else res.json({});
    });
  }
});

route.get('/postcount', (req, res) => {
  Post.countDocuments({}, (err, count) => {
    if (err) return console.err(err);

    if (count) res.json({ count });
    else res.json({ count: 0 });
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
