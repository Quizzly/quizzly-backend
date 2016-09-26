/**
 * StudentAnswerController
 *
 * @description :: Server-side logic for managing Studentanswers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getMetrics: function(req, res){
		var questions = Question.find({
        "quiz": req.param('quiz')
    })
		.populate('answers')
    .then(function (questions){
			var studentanswers = req.param('studentanswers');
			//Assumes that questions and studentanswer questions are in the same order
			for(var i = 0; i < studentanswers.length; i++){
				if(questions[i].answers.length > 0){
					for(var j = 0; j < questions[i].answers.length; j++){
						//Assumes that students answer all multiple choice questions
						console.log(studentanswers[i].answer.id);
						console.log(questions[i].answers[j].id);
						console.log(studentanswers[i].answer.correct);
						if((studentanswers[i].answer.id == questions[i].answers[j].id) && (studentanswers[i].answer.correct == 'false')){
							console.log("here");
							questions[i].answers[j].studentSelectedIncorrect = true;
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
			console.log(questions);
      return res.json(questions);
    });
	},

	getStudentCountByAnswerId: function(req,res) {
    	sails.log.debug("--------------getStudentCountByAnswerId");
    	// var data = req.params.all();
        var id = req.param('id');
        var section = req.param('section');
    	sails.log.debug("id: ", id);
        sails.log.debug("section: ", section);
        if (section == -1) {
            StudentAnswer.count({answer: id}).exec(function(err, found){
            sails.log.debug("found: ", found);
            return res.json(found);

        });
        } else {
        // sails.log.debug("data.section", data.section);
    	StudentAnswer.count({answer: id, section: section}).exec(function(err, found){
    		sails.log.debug("found: ", found);
    		return res.json(found);

    	});
    }
	}


};
