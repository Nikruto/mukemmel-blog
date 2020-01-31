require('dotenv').config();
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withCSS(
  withImages({
    env: {
      GA: process.env.GA
    }
  })
);
