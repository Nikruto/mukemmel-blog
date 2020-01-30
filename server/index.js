const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const connString = process.env.MONGO;

mongoose.connect(connString, err => {
  if (err) console.error(err);
});
const apiRoute = require('./routes/api/index.js');
app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cookieParser());
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
