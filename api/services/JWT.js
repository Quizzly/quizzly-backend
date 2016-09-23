var password = require('password-hash-and-salt');
var jwt = require('jsonwebtoken');
var secret = sails.config.session.secret;

module.exports = {
  encode: function(payload, next) {
    jwt.sign(payload, secret, { expiresIn: '1d' }, function(err, token) {
      next(err, token);
    });
  },

  decode: function(token, next) {
    jwt.verify(token, secret, function(err, payload){
      next(err, payload);
    });
  }
};
