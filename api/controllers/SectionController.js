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

  getStatisticsForSectionQuiz: function(req, res) {
    var data = req.params.all();
    var sectionId = data.sectionId;
    var quizId = data.quizId;
    var correctStudentAnswers = {};

    StudentAnswer.find({section: sectionId, quiz: quizId})
    .populate('student')
    .populate('answer')
    .then(function(studentAnswers) {
      for(var i = 0; i < studentAnswers.length; i++) {
        var studentAnswer = studentAnswers[i];
        if(correctStudentAnswers[studentAnswer.student.id] == undefined) {
          correctStudentAnswers[studentAnswer.student.id] = {
            correct: 0,
            name: studentAnswer.student.firstName
          };
        }
        else {
          if(studentAnswer.answer.correct) {
            correctStudentAnswers[studentAnswer.student.id].correct++;
          }
        }
      }
      var correctAnswers = [];
      for(var studentId in correctStudentAnswers) {
        if(correctStudentAnswers.hasOwnProperty(studentId)) {
          var correctAnswer = {name: correctStudentAnswers[studentId].name, correct:correctStudentAnswers[studentId].correct};
          correctAnswers.push(correctAnswer);
        }
      }
      res.json(correctAnswers);
    });
  }

};
