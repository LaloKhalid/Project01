require("dotenv").config();
require("./config/db");


const app = require ("./app"); // imports the app from app.js

const PORT = process.env.PORT || 5000; // sets the port to the value in the .env file or 5000 if not set

app.listen (PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT}`);

});