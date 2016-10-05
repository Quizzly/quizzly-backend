/**
 *  OpenQuizzes.js
 *
 *  @description  :: Caches quizzes asked by professors while quiz is valid.
 *  @methods      :: add(quiz), get(quizKey)
 */

var uuid = require('uuid');
var NodeCache = require( "node-cache" );
var quizzes = new NodeCache();
var bufferTime = 1;

module.exports = {
  add: function(quiz) {
    var key = uuid.v4();
    var totalDuration = quiz.questions.reduce(function(pre, curr){
      return pre.duration + curr.duration;
    });

    quiz.timeAsked = Date.now();

    var ttl = totalDuration + bufferTime; //ttl = time to live
    quizzes.set(key, JSON.stringify(quiz), ttl);
    return key;
  },
  get: function(quizKey){
    var data = quizzes.get(quizKey);
    if(!data || !ttl) { return null; }
    var quiz = JSON.parse(data);

    var elapsedTime = (Date.now() - quiz.timeAsked) / 1000;

    var runningSum = 0;
    var checkFirstQuestion = true;
    var firstQuestionIndex = 0;
    var firstQuestionDuration = 0;

    var i = -1;
    quiz.questions = quiz.questions.filter(function(question){
      i++;
      runningSum += question.duration;
      if (runningSum < elapsedTime) {
        return false;
      }

      if(checkFirstQuestion) {
        firstQuestionIndex = i;
        firstQuestionDuration = (runningSum - elapsedTime);
        checkFirstQuestion = false;
      }

      return true;
    });

    quiz.questions[i].duration = firstQuestionDuration;

    return {
      quiz: quiz
    };
  }
};
