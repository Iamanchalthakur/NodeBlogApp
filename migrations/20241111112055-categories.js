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
  db.createTable('categories', {
    id: { type: 'int', unsigned: true, length: 11, primaryKey: true, autoIncrement: true, notNull: true },
    
   cat_name: { type: 'string', length: 255, notNull: true },
    
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('post', callback);
};

exports._meta = {
  "version": 1
};
