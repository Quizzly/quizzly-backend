/**
 *  JWT.js
 *
 *  @description  :: JSON Web Token interface used
 *  @methods      :: encode(payload, callback) => given JS Object, turns it into a JWT
 *                :: decode(token, payload)    => given a JWT, turns back into a JS Object
 */

var jwt = require('jsonwebtoken');
var secret = sails.config.session.secret;

module.exports = {
  encode: function(payload, callback) {
    jwt.sign(payload, secret, function(err, token) {
      callback(err, token);
    });
  },

  decode: function(token, callback) {
    jwt.verify(token, secret, function(err, payload){
      callback(err, payload);
    });
  }
};
