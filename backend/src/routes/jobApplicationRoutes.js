const express = require("express");

const jobApplicationController = require("../controllers/jobApplicationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", jobApplicationController.createApplication);

router.get("/", jobApplicationController.getApplications);

router.get("/:id", jobApplicationController.getApplication);

router.put("/:id", jobApplicationController.updateApplication);

router.delete("/:id", jobApplicationController.deleteApplication);

module.exports = router;