const authService = require("../services/authService");
function register(req,res){
    const { username, email, password } = req.body;

    authService.registerUser(username, email, password, (err, result) =>{
        if (err) {
            return res.status(400).json({
                message: err.message
            });

        }

        res.status(201).json({
            message: "User registered successfully",
            result
        });
    });
}

module.exports = {
    register
};


