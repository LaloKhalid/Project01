
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

function registerUser(username, email, password, callback) {
    bcrypt.hash(password, 10, (err, passwordHash) => {
        if (err) {
            return callback(err, null);
        }

        userModel.findUserByEmail(email, (err, existingUser) => {
            if (err) {
                return callback(err, null);
            }

            if (existingUser) {
                return callback(
                    new Error("User with this email already exists"),
                    null
                );
            }

            userModel.createUser(
                username,
                email,
                passwordHash,
                (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }

                    callback(null, result);
                }
            );
        });
    });
}

module.exports = {
    registerUser
};
```
