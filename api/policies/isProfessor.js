/**
 * isProfessor
 *
 * @module        :: Policy
 * @description   :: Allow a professor
 *
 * @docs          :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = function(req, res, next) {
  const jwt = req.cookies.jwt || req.body.jwt ;
  if(!jwt) { return res.status(401).send('Not Authorized.'); }
  return JWT.decode(jwt, function(err, decoded){
    if(err || !decoded || decoded.type !== 'PROFESSOR') { return res.status(401).send('Not Authorized.'); }
    req.user = decoded;
    return next();
  });
};
