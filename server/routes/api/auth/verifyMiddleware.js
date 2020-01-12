const jwt = require('jsonwebtoken');
const User = require('../../../models/user.js');
const config = require('../../../config.json');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;

    try {
      let decoded = jwt.verify(token, config.jwtSecret);
      User.findOne({ username: decoded.username }, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: 'Server hatası' });
        }

        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(401).json({ msg: 'Hatalı token' });
        }
      });
    } catch (error) {
      return res.status(401).json({ msg: 'Hatalı token' });
    }
  } else {
    return res.status(401).json({ msg: 'Token gerekli' });
  }
};
