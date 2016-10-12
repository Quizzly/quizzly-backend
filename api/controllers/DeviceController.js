/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pushTest: function(req, res) {
	  var data = req.params.all();
    var studentId = data.student;

    var testData = {
      title: 'Test Push Notification',
      message: 'This is a test!'
    };

    if(!!studentId) {
      Device.pushToDevicesFromStudentIds([studentId], testData, function(result){
        sails.log.debug('result', result);
        return res.ok();
      });
    }

    return res.status(400).send('No studentId');
  }
};

