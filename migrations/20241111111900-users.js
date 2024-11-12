'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    username: { type: 'string', length: 255, notNull: true },
    email: { type: 'string', length: 255, notNull: true, unique: true },
    password: { type: 'string', length: 255, notNull: true }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
