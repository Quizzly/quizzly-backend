/**
 * isProfessor
 *
 * @module        :: Policy
 * @description   :: Allow a professor
 * @dependencies  :: isAuthenticated
 * @docs          :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = function(req, res, next) {
  if(req.user && req.user.type === 'PROFESSOR') {
    return next();
  }
  return res.status(401).send('Not Authorized.');
};
