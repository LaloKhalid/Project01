// Load the variables from the .env file
// Example: DATABASE_URL, JWT_SECRET, etc.
require("dotenv").config();

const express = require("express");
const cors = require("cors"); // Import CORS

// Import routes
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

// Enable CORS so the React frontend can communicate with this backend
app.use(cors());

// Tell Express to understand JSON data sent from the frontend
app.use(express.json());

// Authentication routes
// POST /api/auth/login
// POST /api/auth/register
app.use("/api/auth", authRoutes);

// Company routes
// GET /api/companies
// POST /api/companies
app.use("/api/companies", companyRoutes);

// Job application routes
app.use("/api/applications", jobApplicationRoutes);

// Simple test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Export the app so another file can start the server
// Usually server.js will import this app and call app.listen(...)
module.exports = app;
