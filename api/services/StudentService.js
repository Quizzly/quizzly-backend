var Promise = require('bluebird');

module.exports = {
  getStudentsBySectionId: function(sectionId) {
    var students = [];
    return Student.find().populate('sections').then(function (all_students) {
          // sails.log.debug("all_students_length", all_students.length);
          return Promise.each(all_students, function(student){
            // sails.log.debug("all_students_length", student.sections.length);
            for (i = 0; i < student.sections.length; i++) {
              // sails.log.debug("section.id",section.id);
              // sails.log.debug("student.sections[i]",student.sections[i]);
              if (student.sections[i].id == sectionId) {
                // sails.log.debug("YOLO");
                students.push(student);
                return;
              }
            }
          }).then(function(){
            return students;
          });
        });
  },
  getStudentsByCourseId: function(courseId){
    console.log("In students");
    return getStudentsBySectionId(courseId);
  }
};
