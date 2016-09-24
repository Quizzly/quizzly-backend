/**
 *  OpenQuestions.js
 *
 *  @description  :: Caches questions asked by professors while question is valid to be answered.
 *  @methods      :: add(question), get(questionKey)
 */

var uuid = require('uuid');
var NodeCache = require( "node-cache" );
var questions = new NodeCache();
var bufferTime = 1;

module.exports = {
  add: function(question) {
    var key = uuid.v4();
    var ttl = question.duration + bufferTime;
    questions.set(key, {question: question, answers: question.answers}, ttl);
    return key;
  },
  get: function(questionKey){
    var question = questions.get(questionKey);
    var ttl = questions.getTtl(questionKey);
    if(!question || !ttl) { return null; }
    return {
      question: question,
      expireTime: ttl
    };
  }
};
