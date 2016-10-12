/**
 *  Push.js
 *
 *  @description  :: Push notification service
 *  @methods      :: send(deviceIds, data, callback)
 *
 */

var apn = require('apn');
var settings = sails.config.pushSettings;
var apnProvider = new apn.Provider(settings.apn.options);

module.exports = {
  send: function(deviceIds, data) {
    var note = new apn.Notification();
    note.expiry = (Math.floor(Date.now() / 1000) + 3600) * settings.apn.data.expiry;
    note.badge = settings.apn.data.badge;
    note.sound = settings.apn.data.sound;
    note.alert = data.title || settings.apn.data.defaultAlert;
    note.payload = data;
    note.topic = settings.apn.gateway;

    return apnProvider.send(note, deviceIds);
  },

  pushToSection(section, data) {
    return Section.findOne({id: section}).populate('student').exec(function(err, section){
      if(err || !section){
        return sails.log.error('pushToSection', err);
      }
      return Device.pushToDevicesFromStudentIds(section.students, data);
    });
  }
};
