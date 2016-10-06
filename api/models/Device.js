/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    deviceId: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['ios', 'android'],
      required: true
    },

    // associations
    student: {
      model: 'student'
    }
  },

  handleStudentLogin: function(student, mobileData) {
    var student = student.id;
    var type = mobileData.type;
    var deviceId = mobileData.deviceId;

    if(!student || !type || !deviceId) { return };

    Device.findOrCreate({
      deviceId: deviceId,
      type: type
    }).exec(function(err, record) {
      if(err) { return sails.log.error(err); }
      record.student = student;
      record.save();
      sails.log.debug('Student: \'' + student + '\' is now registered with device: \'' + record.deviceId + '\'');
    });
  },

  pushToDevicesFromStudentIds: function(studentIds, data) {
    return Device.find(studentIds).exec(function(err, records){
      return Device.find({student:studentId}).exec(function(err, devices){
        if(err) {
          return sails.log.debug('Error occurend in pushToDevicesFromStudentIds');
        }
        else if(!devices) {
          return sails.log.debug('Push requested but no devices found');
        }

        var deviceIds = devices.map(function(device){ return device.deviceId; });

        Push.send(deviceIds, data, function (result) {
          sails.log.debug('Device.pushToDevicesFromStudentIds: result =>', result);
        });
      });
    });
  }


};

