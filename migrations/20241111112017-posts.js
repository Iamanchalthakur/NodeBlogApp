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
  db.createTable('post', {
    id: { type: 'int', primaryKey: true, unsigned: true, length: 11, autoIncrement: true, notNull: true },
    user_id: { type: 'int', notNull: true, unsigned: true, length:11, foreignkey:{
      name:'user_post_fk', 
      table:'user',
      rules: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      mapping:'id'
    } },
    title: { type: 'string', length: 255, notNull: true },
    description: { type: 'text' },
    image: { type: 'string' },

    
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
