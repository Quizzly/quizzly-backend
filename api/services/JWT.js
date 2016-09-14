const password = require('password-hash-and-salt');
const jwt = require('jsonwebtoken');
const secret = sails.config.session.secret;

module.exports = {
  encode(payload, next) {
    jwt.sign(payload, secret, { expiresIn: '1d' }, function(err, token) {
      next(err, token);
    });
  },

  decode(token, next) {
    jwt.verify(token, secret, function(err, payload){
      next(err, payload);
    });
  }
}
