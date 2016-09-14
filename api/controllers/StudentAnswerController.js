/**
 * StudentAnswerController
 *
 * @description :: Server-side logic for managing Studentanswers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


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
