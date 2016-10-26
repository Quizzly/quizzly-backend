/**
 *  Push.js
 *
 *  @description  :: Push notification service
 *  @methods      :: send(deviceIds, data, callback)
 *
 */

var apn = require('apn');
var settings = sails.config.pushSettings;
//var apnProvider = new apn.Provider(settings.apn.options);

module.exports = {
  send: function(deviceIds, data, callback) {
    /*
    var note = new apn.Notification();
    note.expiry = (Math.floor(Date.now() / 1000) + 3600) * settings.apn.data.expiry;
    note.badge = settings.apn.data.badge;
    note.sound = settings.apn.data.sound;
    note.alert = data.title || settings.apn.data.defaultAlert;
    note.payload = data;
    note.topic = settings.apn.gateway;

    return apnProvider.send(note, deviceIds).then(callback);
    */
  },

  pushToSection(section, data, callback) {
    /*
    return Section.findOne({id: section.id}).populate('students').exec(function(err, section){
      if(err || !section){
        sails.log.debug('section', section);
        return sails.log.error('pushToSection', err);
      }

      var studentIds = section.students.map(student => student.id);

      return Device.pushToDevicesFromStudentIds(studentIds, data, callback);
    });
    */
  }
};
