'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('section', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      title: 'string',
      professor: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'section_professor_fk',
          table: 'professor',
          rules: {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      createdAt: {type: 'date'},
      updatedAt: {type: 'date'}  // shorthand notation
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('section', callback);
};

exports._meta = {
  "version": 1
};
