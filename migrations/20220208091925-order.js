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
  return db.createTable('order', {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true
    },
    employe_id:{
      type: 'int',
      foreignKey:{
        name: 'employee_employe_id',
        table: 'employee',
        rules:{
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    customer_id:{
      type: 'int',
      foreignKey:{
        name: 'salom',
        table: 'customer'
      },
      rules:{
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      mapping: 'id'
    },
    order_date:{
      type: 'string',
      length: 20
    }
    
  });
};


exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
