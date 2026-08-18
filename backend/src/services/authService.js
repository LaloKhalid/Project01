const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");



function registerUser(username, email, password, callback) {
bcrypt.hash(password, 10, function (err, passwordHash) {
if (err) {
return callback(err, null);
}


    userModel.findUserByEmail(email, function (err, existingUser) {
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
            function (err, result) {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, result);
            }
        );
    });
});

}

function loginUser(email, password, callback) {
    userModel.findUserByEmail(email, function (err, user) {
        if (err) {
            return callback(err, null);
        }

        if (!user) {
            return callback(
                new Error("Invalid email or password"),
                null
            );
        }

        bcrypt.compare(password, user.password_hash, function (err, isMatch) {
            if (err) {
                return callback(err, null);
            }

         if (!isMatch) {
            return callback(
            new Error("Invalid email or password"),
            null
    );
}

        const token = jwt.sign(
            { user_id: user.user_id },
            process.env.JWT_SECRET,
                { expiresIn: "1h" }
);

            return callback(null, {
                user: user,
                token: token
});
        });
    });
}




module.exports = {
registerUser: registerUser,
loginUser: loginUser
};
