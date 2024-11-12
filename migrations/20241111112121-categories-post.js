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
  db.createTable('categories-post', {
    columns: {
      id: { type: 'int', notNull: true, primaryKey: true, autoIncrement: true, unsigned: true, length: 11 },
     post_id: { type: 'int', notNull: true, unsigned: true, length: 11, 
      
      foreignKey:{
        name: 'post_cat_fk',
        table: 'post',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    
    },
      cat_id: { type: 'int', notNull: true, unsigned: true, length: 11, foreignKey: {
        name: 'cat_catpost_fk',
        table: 'categories',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'

      } },
      created_at: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') },
    
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('categories-post', callback);
};

exports._meta = {
  "version": 1
};
