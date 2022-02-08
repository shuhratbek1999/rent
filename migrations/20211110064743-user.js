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

exports.up = function(db) {
  return db.createTable('user', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    full_name: {
      type: 'string',
      length: 50,
      notNull: true
    },
    phone_number: {
      type: 'string',
      length: 20,
      notNull: true,
      unique: true
    },
    password_hash: {
      type: 'string',
      length: 100,
      notNull: true
    },
    role: {
      type: 'enum',
      length: "'ceo','paymaster','operator'"
    },
    status: {
      type: 'enum',
      length: "'active','blocked'"
    }
  });
};

exports.down = function(db) {
  return db.dropTable('user');
};

exports._meta = {
  "version": 1
};
