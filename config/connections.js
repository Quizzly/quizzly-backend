// module.exports.connections = {
// 	/*Have only (mysql) or (localdiskdb and memory) uncommented at a time.
// 	Note need to have mysql installed -> see mysql guide part 1*/
//
//   mysql: {
// 	 adapter : 'sails-mysql',
// 	 host : 'localhost',
// 	 port : 3306,
// 	 user : 'root',
// 	 password : 'root',
// 	 database : 'quizzlydb',
//
// 	 // OR (explicit sets take precedence)
// 	//  adapter : 'sails-mysql',
// 	 // url : 'mysql://root:[TODO:password]@localhost:3306/testdb'
//
// 	 // Optional
// 	 charset : 'utf8',
// 	 collation : 'utf8_swedish_ci'
//   }
// 	// localDiskDb: {
// 	// 	adapter: 'sails-disk'
// 	// },
// 	// memory: {
// 	// 	adapter: 'sails-memory'
// 	// }
//
// };








/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can be (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you from inadvertently pushing sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/documentation/reference/configuration/sails-config-connections
 */

module.exports.connections = {

  // MongoDB is the leading NoSQL database.
  // http://en.wikipedia.org/wiki/MongoDB
  //
  // Run:
  // npm install sails-mongo
  //
  // someMongodbServer: {
  //   adapter: 'sails-mongo',
  //   host: 'localhost',
  //   port: 27017,
  //   // user: 'username',
  //   // password: 'password',
  //   // database: 'your_mongo_db_name_here'
  // },
  // prodMongo: {
  //   adapter: 'sails-mongo',
  //   host: 'ds033086.mlab.com',
  //   port: 33086,
  //   user: 'prod_user',
  //   password: 'quizzly',
  //   database: 'heroku_dxccm1p4'
  // },
  prodMySql: {
    module: 'sails-mysql',
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
  }
};
