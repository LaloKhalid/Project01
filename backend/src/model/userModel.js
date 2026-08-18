const db = require("../config/db");

function findUserByEmail(email, callback) {

    const sql = "SELECT * FROM users WHERE email = ?"; // SQL query to find a user by email

    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);

        }

        callback (null, results[0]);
    });
}

function createUser(username, email, passwordHash, callback) {
    const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

    db.query(sql, [username, email, passwordHash], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    });
}

module.exports = {
    findUserByEmail,
    createUser
};