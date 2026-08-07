require("dotenv").config();

const express = require("express"); // imports expres into my project

const app = express (); // creating express application

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
}); 

module.exports = app; // makes the app available to other files, such as server.js