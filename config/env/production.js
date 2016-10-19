/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */


module.exports = {

  connections: {
    prodMongo: {
      adapter: 'sails-mongo',
      url: process.env.MONGOLAB_URI
    }
  },

  models: {
    connection: 'prodMongo'
  },

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
      data: {
        topic: 'com.quizzly.mobile',
        badge: 1,
        expiry: 1, // in hours
        defaultAlert: 'You have a new message!',
        sound: 'ping.aiff'
      },

      options: {
        cert: process.env.APN_CERT,
        key: process.env.APN_KEY,
        production: true
      },
    }
  }

};
