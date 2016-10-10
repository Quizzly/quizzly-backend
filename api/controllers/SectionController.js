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

  // getStatisticsForSectionQuiz: function(req, res) {
  // This route is used by students to subscribe to to their sections so that a professor can push questions to them.
  connect: function(req, res) {
    if(!req.isSocket) { return res.status(400).send('Bad Request'); }
    Student.findOne({id: req.user.id}).populate('sections').exec(function(err, student) {
      if (err || !student) {
        return res.status(400).send('Something went wrong.');
      }
      student.sections.map(function (section) {
        sails.sockets.join(req, 'section-' + section.id);
      });

      return res.ok();
    });
  },

  numberOfCorrectAnswersPerStudent: function(req, res) {
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
// <<<<<<< HEAD
//       var correctAnswers = [];
//       for(var studentId in correctStudentAnswers) {
//         if(correctStudentAnswers.hasOwnProperty(studentId)) {
//           var correctAnswer = {name: correctStudentAnswers[studentId].name, correct:correctStudentAnswers[studentId].correct};
//           correctAnswers.push(correctAnswer);
// =======
    }).then(function() {
      for(var quiz in numberOfCorrectAndIncorrectAnswers) { //For each key or student in the map
        if(numberOfCorrectAndIncorrectAnswers.hasOwnProperty(quiz)) {
          var entry = {"Name": quiz, "Questions Correct" :numberOfCorrectAndIncorrectAnswers[quiz].correct, "Questions Incorrect" :numberOfCorrectAndIncorrectAnswers[quiz].incorrect}; //Make a pair corresponding to the value pair in the map
          arrayNumberOfCorrectAndIncorrectAnswers.push(entry); //Put it in the array
        }
      }
      res.json(correctAnswers);
    });
  }

};
