/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  pushSettings: {
    // // Android
    // gcm: {
    //   id: null, // PUT YOUR GCM SERVER API KEY,
    //   msgcnt: 1,
    //   dataDefaults: {
    //     delayWhileIdle: false,
    //     timeToLive: 4 * 7 * 24 * 3600, // 4 weeks
    //     retries: 4,
    //   },
    //   // Custom GCM request options https://github.com/ToothlessGear/node-gcm#custom-gcm-request-options
    //   options: {},
    // },

    // Apple
    apn: {
      gateway: 'com.quizzly.mobile',
      badge: 1,
      defaultData: {
        expiry: 4 * 7 * 24 * 3600, // 4 weeks
        sound: 'ping.aiff'
      },

      options: {
        cert: 'certs/ios.cert'
      },
    }
  }

};
