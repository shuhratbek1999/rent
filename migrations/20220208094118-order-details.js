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
  return db.createTable('order-details', {
    id:{
     type: 'int',
     autoIncrement: true,
     primaryKey: true
    },
    order_id:{
      type: 'int',
      foreignKey:{
        name: 'ismi',
        table: 'order'
      },
      mapping: 'id'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('order-details');
};

exports._meta = {
  "version": 1
};
