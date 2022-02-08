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
  return db.insert('user', 
    ['full_name', 'phone_number', 'password_hash', `role`, `status`], 
    ['Ilhomjon Muxtorov', '+998916652855', '$2a$08$YLZ7gtHc5KgiF3TlX/12r.boof4dIvGSoViUYxaRL8f7yHhKjPh0i', 'operator', 'active']
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
