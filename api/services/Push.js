/**
 *  Push.js
 *
 *  @description  :: Push notification service
 *  @methods      :: send(deviceIds, data, callback)
 *
 *  @moreInfo     :: https://www.npmjs.com/package/node-pushnotifications
 */

var PushNotifications = new require('node-pushnotifications');
var settings = sails.config.pushSettings;
var Push = new PushNotifications(settings);

module.exports = Push;
