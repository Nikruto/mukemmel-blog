const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();

const User = require('../../../models/user.js');
const verifyMiddleware = require('./verifyMiddleware.js');

const jwtSecret = process.env.JWT;

route.get('/login', (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ msg: 'Kullanıcı adı ve şifre gerekli' });
    }

    User.findOne({ username, password }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server hatası' });
      }

      if (user) {
        let token = jwt.sign(
          {
            name: user.name,
            username: user.username
          },
          jwtSecret
        );
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ msg: 'Hatalı kullanıcı adı veya şifre' });
      }
    });
  } catch (error) {
    res.status(401).json({ msg: 'Hatalı kullanıcı adı veya şifre' });
  }
});

module.exports = route;
