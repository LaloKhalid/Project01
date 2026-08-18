const authService = require("../services/authService");

function register(req, res) {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
        return res.status(400).json({
            error: "Username, email, and password are required"
        });
    }

    authService.registerUser(username, email, password, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }

        return res.status(201).json({
            message: "User registered successfully",
            result: user
        });
    });
}


function login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    authService.loginUser(email, password, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }

        const { password_hash, ...safeUser } = result.user;

        return res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: safeUser
        });
    });
}


module.exports = {
    register,
    login
};