var uuid = require('uuid');
var NodeCache = require( "node-cache" );
var questions = new NodeCache();

module.exports = {
  add: function(question) {
    var key = uuid.v4();
    questions.set(key, question, question.duration);
    return key;
  },
  get: function(key){
    return questions.get(key);
  }
};
