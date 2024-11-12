const db = require('../config/db.config'); 

const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
}


User.create = (user, result) => {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [user.username, user.email, user.password];
    
    db.query(query, values, (err, res) => {
        if (err) {
            console.error("Error inserting user: ", err);
            return result(err, null);
        }
        result(null, res.rows[0]);
    });
};


User.getAll = (result) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, res) => {
        if (err) {
            console.error("Error fetching users: ", err);
            return result(err, null);
        }
        result(null, res.rows);
    });
};


User.getById = (id, result) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    
    db.query(query, values, (err, res) => {
        if (err) {
            console.error("Error fetching user by ID: ", err);
            return result(err, null);
        }
        if (res.rows.length) {
            result(null, res.rows[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};





User.updateById = (id, user, result) => {
    const query = `
        UPDATE users 
        SET username = $1, email = $2, password = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [user.username, user.email, user.password, id];
    
    db.query(query, values, (err, res) => {
        if (err) {
            console.error("Error updating user: ", err);
            return result(err, null);
        }
        if (res.rows.length) {
            result(null, res.rows[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};


User.deleteById = (id, result) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    
    db.query(query, values, (err, res) => {
        if (err) {
            console.error("Error deleting user: ", err);
            return result(err, null);
        }
        if (res.rows.length) {
            result(null, res.rows[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};


module.exports = User;
