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
  db.createTable('section_students__student_sections', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      student_sections: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'SSSS_student_fk',
          table: 'student',
          rules: {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      sections_student: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'SSSS_section_fk',
          table: 'section',
          rules: {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        } 
      },
      // shorthand notation
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('section_students__student_sections', callback);
};

exports._meta = {
  "version": 1
};
