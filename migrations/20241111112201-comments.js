   
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

exports.up = function(db, callback) {
  db.createTable('comments', {
    columns: {
      id: { type: 'int', notNull: true, primaryKey: true, autoIncrement: true, unsigned: true, length: 11 },
      user_id: { type: 'int', notNull: true, unsigned: true, length:11, foreignkey:{
        name:'user_comments_fk', 
        table:'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping:'id'
      }  },
      post_id: { type: 'int', notNull: true, unsigned: true, length:11, foreignkey:{
        name:'post_comments_fk', 
        table:'post',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping:'id'
      }  },
      comment_text: { type: 'text', notNull: true },
      image: { type: 'string' },
      created_at: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') }
    },
    ifNotExists: true
  }, function(err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function(db, callback) {
  db.dropTable('comments', callback);
};

exports._meta = {
  "version": 1
};

