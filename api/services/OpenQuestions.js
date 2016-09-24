var uuid = require('uuid');
var NodeCache = require( "node-cache" );
var questions = new NodeCache();
var bufferTime = 1;

module.exports = {
  add: function(question) {
    var key = uuid.v4();
    var ttl = question.duration + bufferTime;
    questions.set(key, question, ttl);
    return key;
  },
  get: function(key){
    return questions.get(key);
  }
};
