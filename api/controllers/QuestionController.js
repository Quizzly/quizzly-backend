
/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UrbanAirshipPush = require('urban-airship-push');
var Pusher = require('pusher');
 // Your app access configuration. You will find this stuff in your App
 // Settings under App Key, App Secret and App Master Secret.
 var config = {
/*     key: 'UWBj9II1Tc-GBn4aioUHUw',
     secret: 'q4q2I2DNQw2URglIRPkC-Q',
     masterSecret: 'mL0uDhSPThSrfQyGp4kw0w'*/
    key: 'RpquxajkQKeLnupkBrvWtw',
    secret: 'O8p2HuxVQBOrYaTersE5CA',
    masterSecret: 'Lcay6AUkQXapKaztfYSJGw'
 };

 // Create a push object
 var urbanAirshipPush = new UrbanAirshipPush(config);
 var Promise = require('bluebird');

module.exports = {
   destroyQuestionsByIds: function(req, res) {
     var data = req.params.all();
     Question.destroy({id: data.ids}).exec(function(err, questions) {
       res.json(questions);
     });
   },

  /**
   * `QuestionController.getQuestionsByCourseId()`
   */
  getQuestionsByCourseId: function (req, res) {
    sails.log.debug("--------------getQuestionsByCourseId");
    var data = req.params.all();

    var questions = [];

    Quiz.find({course: data.id}).exec(function (err, quizzes) {
      // sails.log.debug("quizzes: ", quizzes);
      Promise.each(quizzes, function(quiz) {
        // sails.log.debug("quiz: ", quiz);
        return Question.find({quiz: quiz.id}).then(function (quiz_questions) {
          // sails.log.debug("quiz_questions: ", quiz_questions);
          return quiz_questions;
        }).then(function(quiz_questions) {
          return Promise.each(quiz_questions, function(question) {
            // sails.log.debug("question: ", question);
            questions.push(question);
          });
        });
      }).then(function() {
        sails.log.debug("finished!", questions.length);
        // sails.log.debug("finished!", questions);
        return res.json(questions);
      });
    });
  },

  // This route is used by professors to as questions params: (questionId as question, sectionId as section)
  ask: function(req, res) {
    sails.log.debug('Asking a question');
    var data = req.params.all();
    var questionId = data.question;
    var sectionId = data.section;

    if(!questionId || !sectionId) { return res.status(400).send('Bad Request!'); }

    // Find the question and section and make sure they exists
    return Promise.all([
      Question.findOne({id: questionId}).populate('answers').populate('quiz'),
      Section.findOne({id: sectionId}).populate('course')
    ]).spread(function(question, section){
      if(!question || ! section) { return res.status(400).send('Bad Request!'); }
      question.section = section; // include the section
      var questionKey = OpenQuestions.add(question);
      sails.sockets.broadcast('section-'+section.id, 'question', {
        questionKey: questionKey
      });
      Push.pushToSection(section, {title: 'You have a new question!', questionKey: questionKey, type: 'question'}, function(result) {
        sails.log.debug('push result', JSON.stringify(result, {}, 4));
      });
      return res.json({questionKey: questionKey });
    });
  },

  getOpenQuestion: function(req, res) {
    var data = req.params.all();
    var questionKey = data.questionKey;

    if(!questionKey) { return res.status(400).send('Bad Request!'); }

    var data = OpenQuestions.get(questionKey);

    return (data) ? res.json(data) : res.status(404).send('Question not found!');

  },

  // This route is used by students to answer questions parameters(questionKey, answerId as answer)
  // note: the 'questionKey' maps to the question being answered.
  answer: function(req, res) {
    var data = req.params.all();
    var questionKey = data.questionKey;
    var answerId = data.answer;
    var text = data.text;
    var student = req.user;

    if(!questionKey || (!answerId && !text) || !student) { return res.status(400).send('Bad Request'); }

    var questionData = OpenQuestions.get(questionKey);

    if(!questionData || !questionData.question) { return res.status(401).send('Question Not Found!'); }

    var data = {
      student: student.id,
      question: questionData.question.id,
      quiz: questionData.question.quiz.id,
      section: questionData.question.section.id,
      course: questionData.question.section.course.id,
      text: text,
      answer: answerId
    };

    StudentAnswer.create(data).exec(function(err, studentAnswer){
      if(err || !studentAnswer) { return res.status(400).send('something went wrong.'); }
      return res.json(studentAnswer);
    });
  },

  //Returns the question text and the ID of the answer that the user selected
  //Used for Android stats page
  getQuestionAndUserAnswer: function(req, res) {
    var data = req.params.all();

    Question.findOne({id: data.question}).populate('answers').exec(function(err, q) {

      var correct_answer = "";
      q.answers.forEach(function(a) {
        if(a.correct == true) {
          correct_answer = a.option;
        }
      });

      Student.findOne({email: data.student}).exec(function(err, s) {
        StudentAnswer.findOne({student: s.id, question: data.question}).populate('answer').exec(function(err, studentanswer) {
          if(!studentanswer) {
            return res.send(200, []);
          }
          questionWithStudentAnswer = {};

          questionWithStudentAnswer.question = q.text;
          questionWithStudentAnswer.student_answer = studentanswer.answer.option;
          questionWithStudentAnswer.correct_answer = correct_answer;

          return res.send(200, questionWithStudentAnswer);
        });
      });
    });
  },

  //Returns all the answers for that question
  //Used for Android stats page
  getQuestionAnswers: function(req,res) {
    var data = req.params.all();
    Question.findOne({id: data.question}).populate('answers').exec(function(err, q) {
      if(q.answers.length != 0) {
        return res.send(200, q.answers);
      }
      return res.json({
        error: "No answers for that question"
      });
    });
  },

  getJsonQuestionAndUserAnswers: function(req, res) {
    var data = req.params.all();
    Question.findOne({id: data.question}).populate('answers').exec(function(err, q) {
      Student.findOne({email: data.student}).exec(function(err, s) {
        StudentAnswer.findOne({student: s.id, question: data.question}).populate('answer').exec(function(err, sa) {
          return res.json({
            question: q.text,
            answers: q.answers,
            user_answer: sa
          });
        });
      });
    });
  },

  //Used by iOS and Android to answer free response questions
  answerFreeResponse: function(req, res) {
    sails.log.debug("Question ID: " + req.param('quest_id'));
    sails.log.debug("Quiz ID: " + req.param('quiz_id'));
    sails.log.debug("User Email: " + req.param('user_email'));
    sails.log.debug("Answer: " + req.param('answer'));

    Student.findOne({email : req.param('user_email')}).exec(function(err, student) {
      var data = {
        student: student.id,
        question: req.param('quest_id'),
        text: req.param('answer'),
        quiz: req.param('quiz_id')
      };
      StudentAnswer.create(data).exec(function(err, studentanswer) {
        if(err) {
          return res.json({
            error: "answer not created"
          });
        }

        return res.send(200, studentanswer);
      });
    });
  }
};
