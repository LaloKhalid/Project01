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


## 📅 **07/08/2026** — Authentication Setup

        - ## 🔐 Authentication Setup Progress

        * Confirmed the existing `users` table is suitable for authentication:

* `user_id`
* `username`
* `email`
* `password_hash`
* `created_at`

* Confirmed required authentication dependencies are already installed:

  * `bcrypt` → password hashing
  * `jsonwebtoken` → JWT authentication
  * `mysql2` → MySQL connection
  * `dotenv` → environment variables
  * `express` → API/server

* Created `src/model/userModel.js`

  * Connected the user model to the database using `db.js`.
  * Added `findUserByEmail()` to find an existing user by email.
  * Added `createUser()` to insert a new user into the `users` table.

* Created `src/services/authService.js`

  * Connected the authentication service to `userModel.js`.
  * Added `registerUser()` for registration logic.
  * Checks whether the email is already registered.
  * Uses `bcrypt.hash()` to hash the user's password.
  * Sends the hashed password to `createUser()` instead of storing the plain password.

* Created `src/controllers/authController.js`

  * Connected the controller to `authService.js`.
  * Added `register()` to receive `username`, `email`, and `password` from `req.body`.
  * Passes registration data to `authService.registerUser()`.
  * Returns a success response or an error response.

* Created `src/routes/authRoutes.js`

  * File created but currently empty.
  * Next step: connect the `/register` route to `authController.register()`.

### Current Authentication Flow

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Authentication Service
  ↓
User Model
  ↓
MySQL users table
```

### Current Status

* ✅ Database connection working
* ✅ User model created
* ✅ Registration service created
* ✅ Password hashing added
* ✅ Authentication controller created
* 🔄 Authentication routes next
* ⏳ Registration API testing
* ⏳ Login
* ⏳ JWT token generation
* ⏳ Authentication middleware
* ⏳ Protecting job application routes
* ⏳ Final authentication testing

```
```


## 📅 **10/08/2026**
    - revised what we did previously, understood what each file does and how the registeration request will eventuall;y travel i.e 

    USER --> ROUTE --> CONTROLLER --> SERVICE --> MODEL --> DATABASE

    and then answer comes back 

    DATABASE --> MODEL --> SERVICE --> CONTROLLER --> USER

    what we actually did today:
  - ✅ Registration API tested successfully

  what next? --> Logg in


  ## 📅 **18/08/2026**

  As of now, my company CRUD is implemented now i will test it

  **Company CRUD — ✅ Implemented and tested**

We created:

companyModel.js
companyService.js
companyController.js
companyRoutes.js

and  implemented all five operations:

POST   /companies
GET    /companies
GET    /companies/:id
PUT    /companies/:id
DELETE /companies/:id

**Job Application CRUD — ✅ Implemented and fully tested**

This is the work we just completed.

We created:

src/
├── model/
│   └── jobApplicationModel.js
│
├── services/
│   └── jobApplicationService.js
│
├── controllers/
│   └── jobApplicationController.js
│
└── routes/
    └── jobApplicationRoutes.js