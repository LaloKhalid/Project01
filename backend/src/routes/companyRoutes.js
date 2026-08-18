const express = require("express");

const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", companyController.createCompany);
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;