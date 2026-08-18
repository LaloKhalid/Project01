const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You have access to this protected route",
        user: req.user
    });
});

module.exports = router;