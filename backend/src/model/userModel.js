const db = require("../config/db"); // importing the database connection from the config file


// function to find a user by emailfunction findUserbyEmail(email, callback) {

    const sql = "SELECT * FROM users WHERE email = ?"; // SQL query to find a user by email

    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback (err, null); // if there's an error during the query, return the error and null results 

        }

        callback (null, results[0]);
    })
 

//  function to insert new user in the table

function createUser(username, email, passwordHash, callback) {
    const sql =` INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
    // SQL query to insert a new user into the users table
}
module.exports = {
    findUserbyEmail,
    createUser
}; // exporting the findUserbyEmail  and createUser function so that it can be used in other parts of the application