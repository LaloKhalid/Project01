const mysql = require("mysql2"); // bringing mysql library into the project

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); // creating a connection to the database using the mysql library and environment variables for configuration

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
        return;
    }

    console.log("MySQL database connected successfully");
}); // connecting to the database and handling any errors that may occur during the connection process

module.exports = connection; // exporting the connection object so that it can be used in other parts of the application