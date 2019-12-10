const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const dev = process.env_NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const connString =
  'mongodb+srv://disleem:temp1415@cluster0-qlkbr.mongodb.net/mukemmel-blog?retryWrites=true&w=majority';

mongoose.connect(connString, err => {
  if (err) console.error(err);
});
const apiRoute = require('./routes/api/index.js');
app
  .prepare()
  .then(() => {
    const server = express();
    server.use('/api', apiRoute);
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch(ex => {
    console.log(ex);
  });
