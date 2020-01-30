const jwt = require('jsonwebtoken');
const User = require('../../../models/user.js');

const jwtSecret = process.env.JWT;

module.exports = (req, res, next) => {
  if (req.cookies.token) {
    let token = req.cookies.token;

    try {
      let decoded = jwt.verify(token, jwtSecret);
      User.findOne({ username: decoded.username }, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, msg: 'Server hatası' });
        }

        if (user) {
          req.user = user;
          next();
        } else {
          return res.status(401).json({ success: false, msg: 'Hatalı token' });
        }
      });
    } catch (error) {
      return res.status(401).json({ success: false, msg: 'Hatalı token' });
    }
  } else {
    return res.status(401).json({ success: false, msg: 'Token gerekli' });
  }
};
