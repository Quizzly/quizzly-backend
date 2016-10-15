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
  send: function(deviceIds, data, callback) {
    var note = {};
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = settings.apn.data.badge;
    note.sound = settings.apn.data.sound;
    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
    note.payload = {'messageFrom': 'Quizzly'};
    note.topic = settings.apn.gateway;

    apnProvider.send(note, deviceIds).then( (result) => {
      callback(result);
    });
  }
};
