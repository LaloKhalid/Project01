// Load the variables from the .env file
// Example: DATABASE_URL, JWT_SECRET, etc.
require("dotenv").config();


const express = require("express");// Import Express// Express helps us create our backend/server
const authRoutes = require("./routes/authRoutes");// Import the routes related to authentication// These routes will handle things like login and signup
const companyRoutes = require("./routes/companyRoutes"); //Import the routes related to companies ,These routes will handle things like creating and getting companies
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const app = express();// Create our Express application// 'app' is now our backend application

app.use(express.json());// Tell Express to understand JSON data sent from the frontend
// Example: { "name": "John", "email": "john@email.com" }

app.use("/api/auth", authRoutes);// Connect the authentication routes to /api/auth , For example:
// POST /api/auth/login
// POST /api/auth/register


app.use("/api/companies", companyRoutes);// Connect the company routes to /api/companies// For example:// GET /api/companies
// POST /api/companies
app.use("/api/applications", jobApplicationRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});// A simple test route
// If we visit http://localhost:PORT/
// we should see "Backend is running!"

// Export the app so another file can start the server
// Usually server.js will import this app and call app.listen(...)
module.exports = app;