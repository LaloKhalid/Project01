❌ Error
⚠️ Warning / Issue
🚫 Failed
🔴 Bug found
🐛 Bug
💥 Crash / Failure
⛔ Connection failed

---
## 📅 **06/08/2026** — Backend Setup & MySQL Connection Debugging
    * PROJECT SETUP DAY:
            -created folders and files
            -installed dependencies
            -configured express i.e app.js and server.js
            -Installed MySQL package i.e npm install mysql
            -Accessed the existing database:
                Database name: job_tracker
                Existing tables:
                        users
                        job_applications
                -Added MySQL database credentials to the backend .env file to keep sensitive information separate from the source code:
        -Created a separate database configuration file: --> backend/config/db.js

        -Configured the database connection using environment variables:
        Host,Port,Username,Password,Database name,
        -Added connection testing using 
        connection.connect() to verify whether the application can successfully communicate with MySQL.
        -Exported the database connection using  --> module.exports = connection;

                Result:

                        ✅ MySQL server is running
                        ✅ Backend has MySQL driver installed
                        ✅ Database credentials are stored securely in .env
                        ✅ Database connection file has been created
                        ⏭️ Next step: Connect the database configuration with the Express server and test the connection.

        ❌ Error
         ISSUE: MySQL connection failed with error: Access denied for user ''@'localhost' (using password: NO)

        CAUSE: the database connection (db.js) was executed before the .env file was loaded, so the database credentials in process.env were empty

        FIX: MOVED require("dotenv").config(); above require("./config/db"); in server.js so the environment variables are loaded before connecting to MySQL.

        LESSON: Always load .env before importing files that use process.env.


## 📅 **07/08/2026** 