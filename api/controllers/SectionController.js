/**
 * SectionController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Promise = require('bluebird');

module.exports = {
  destroySectionsByIds: function(req, res) {
    var data = req.params.all();
    Section.destroy({id: data.ids}).exec(function(err, sections) {
      res.json(sections);
    });
  },
  getSectionByStudentAndCourse: function(req, res) { // needs {courseId, studentId}
    var data = req.params.all();

    Section.find({course: data.courseId}).populate("students").exec(function(err, sections) {
      var section = {};
      for(var i = 0; i < sections.length; ++i) {
        for(var j = 0; j < sections[i].students.length; ++j) {
          if(sections[i].students[j].id == data.studentId) {
            section = sections[i];
            break;
          }
        }
      }
      res.json(section);
    });
  },
  updateStudents: function(req, res) {
    var data = req.params.all();
    Section.update({id: data.sectionId}, {students: data.studentIds}).exec(function(err, section) {
      return Section.findOne({id: data.sectionId}).populate('students').exec(function(err, section) {
        res.json(section);
      });
    })
  },

        getStatisticsForSectionQuiz: function(req,res) {
          var data = req.params.all();
          var studentAnswersArray = [];
          var quizQuestion;
          var correctAnswer;
          var studetAnswer;
          var numberOfCorrectAnswers = 0;
          sails.log.debug("Section ID is " + data.sectionId);
          Section.findOne({id: data.sectionId}).populate('students').then(function(section) {
            return Promise.each(section.students, function(student) {
                numberOfCorrectAnswers = 0;
                sails.log.debug("Student is " + student.firstName);
                StudentAnswer.find({section: data.sectionId, quiz: data.quizId, student: student.id}).then(function(studentAnswers) {
                  Promise.each(studentAnswers, function(studentAnswer) {
                    Question.findOne({id: studentAnswer.question}).populate('answers').then(function(question) {
                      sails.log.debug("Question is " + question.text);
                      quizQuestion = question.text;
                      Promise.each(question.answers, function(answer) {
                        //sails.log.debug("1");
                        if(answer.correct == true) {
                          correctAnswer = answer.text;
                          sails.log.debug("Correct Answer is " + correctAnswer);
                          return;
                        }
                      });
                    }).then(function() {

                      return Answer.findOne({id: studentAnswer.answer})

                    }).then(function(answer) {
                      sails.log.debug("Student Answer is " + answer.text);
                      studentAnswer = answer.text;
                    }).then(function() {
                        sails.log.debug(student.firstName + " answered " + quizQuestion + " with " + studentAnswer);
                        if(correctAnswer == studentAnswer) {
                          sails.log.debug("Correct");
                          numberOfCorrectAnswers++;
                          sails.log.debug("Correct answers has count " + numberOfCorrectAnswers);
                        }
                        else {
                          sails.log.debug("Wrong");
                        }
                      }).then(fuqnction() {
                        studentAnswersArray.push(numberOfCorrectAnswers);
                      });

                  });
                });
              }).then(function() {
                sails.log.debug(studentAnswersArray);
                return res.json(studentAnswersArray);
              });

          });

        }
  /*

  getStatisticsForSectionQuiz: function(req, res) {
    var data = req.params.all();
    Section.find({course: data.courseId}).populate("students").exec(function(err, section) {
      var emails = [];
      Promise.each(section.students,function(student) {

        emails.push(student.email);

      return;

      });

      res.json(emails);
    });
  }
  */

};
