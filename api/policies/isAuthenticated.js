/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

var Promise = require('bluebird');

module.exports = function(req, res, next) {
  const jwt = req.cookies.jwt || req.body.jwt ;

  if(!jwt) { return res.status(401).send('Not Authorized.'); }

  return JWT.decode(jwt, function(err, decoded){

    if(err || !decoded || !decoded.email || !decoded.id || !decoded.authToken) {
      return res.status(401).send('Not Authorized.');
    }

    const userQuery = {
      id: decoded.id,
      email: decoded.email,
      authToken: decoded.authToken
    }

    return Promise.all([
      Professor.findOne(userQuery),
      Student.findOne(userQuery)
    ]).spread(function(professor, student){
      sails.log.debug("professor", professor);
      sails.log.debug("student", student);
      var user = {};
      if(professor) {
        user = professor;
      } else if(student) {
        user = student;
      } else {
        return res.status(400).send('That user was not found!');
      }

      req.user = user;
      delete req.user['password'];
      delete req.user['authToken'];
      next();
    }).catch(function(){
      sails.log.debug("error is encountered in 'policy::isAuthenticated'");
    }).done(function(){
      sails.log.debug("promise call is done");
    });
  });
};
