/**
 * StudentAnswerController
 *
 * @description :: Server-side logic for managing Studentanswers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getMetrics: function(req, res){
		var allQuestions = StudentAnswer.find({
      student: req.param('student'),
      quiz: req.param('quiz'),
      section: req.param('section')
		})
		.populate('answer')
		.then(function(studentanswers){
			console.log(studentanswers);
			var questions = Question.find({
	        "quiz": req.param('quiz')
	    })
			.populate('answers')
	    .then(function (questions){
				//creating map of studentanswers
				var studentanswersmap = {};
				for(var i = 0; i < studentanswers.length; i++){
					studentanswersmap[studentanswers[i].question] = studentanswers[i];
				}
				console.log("Over here: ");
				console.log(studentanswersmap);
				console.log(questions);
				var countIncorrect = 0;
				for(var i = 0; i < questions.length; i++){
					var studentanswer = studentanswersmap[questions[i].id];
					if(studentanswer){
						if(questions[i].answers.length > 0){
							for(var j = 0; j < questions[i].answers.length; j++){
								//Assumes that students answer all multiple choice questions
								if((studentanswer.answer.id == questions[i].answers[j].id) && (studentanswer.answer.correct == false)){
									console.log("here");
									questions[i].answers[j].studentSelectedIncorrect = true;
									countIncorrect++;
									break;
								}
							}
						}
						else{
							if(studentanswers[i].text){
								questions[i].answerText = studentanswers[i].text;
							}
						}
					}
					else{
						questions[i].studentUnanswered = true;
					}
				}
				var object = {
					questions: questions,
					size: questions.length,
					countIncorrect: countIncorrect,
					countCorrect: studentanswers.length - countIncorrect,
					countUnanswered: questions.length - studentanswers.length
				};
				console.log(questions);
	      return res.json(object);
	    });
		});
	},

	getStudentCountByAnswerId: function(req,res) {
    	console.log("--------------getStudentCountByAnswerId");
    	// var data = req.params.all();
        var id = req.param('id');
        var section = req.param('section');
    	console.log("id: ", id);
        console.log("section: ", section);
        if (section == -1) {
            StudentAnswer.count({answer: id}).exec(function(err, found){
            console.log("found: ", found);
            return res.json(found);

        });
        } else {
        // console.log("data.section", data.section);
    	StudentAnswer.count({answer: id, section: section}).exec(function(err, found){
    		console.log("found: ", found);
    		return res.json(found);

    	});
    }
	}


};
