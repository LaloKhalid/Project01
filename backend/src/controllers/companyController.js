const companyService = require("../services/companyService");

function createCompany(req, res) {
    const {
        company_name,
        website,
        industry,
        location
    } = req.body || {};

    const userId = req.user.user_id;

    if (!company_name) {
        return res.status(400).json({
            error: "Company name is required"
        });
    }

    companyService.createCompany(
        userId,
        company_name,
        website || null,
        industry || null,
        location || null,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            return res.status(201).json({
                message: "Company created successfully",
                company_id: result.insertId
            });
        }
    );
}

function getCompanies(req, res) {
    const userId = req.user.user_id;

    companyService.getCompaniesByUser(userId, (err, companies) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        return res.status(200).json({
            result: companies
        });
    });
}

function getCompany(req, res) {
    const companyId = req.params.id;
    const userId = req.user.user_id;

    companyService.getCompanyById(
        companyId,
        userId,
        (err, company) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!company) {
                return res.status(404).json({
                    error: "Company not found"
                });
            }

            return res.status(200).json({
                result: company
            });
        }
    );
}

function updateCompany(req, res) {
    const companyId = req.params.id;
    const userId = req.user.user_id;

    const {
        company_name,
        website,
        industry,
        location
    } = req.body || {};

    if (!company_name) {
        return res.status(400).json({
            error: "Company name is required"
        });
    }

    companyService.updateCompany(
        companyId,
        userId,
        company_name,
        website || null,
        industry || null,
        location || null,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Company not found"
                });
            }

            return res.status(200).json({
                message: "Company updated successfully"
            });
        }
    );
}

function deleteCompany(req, res) {
    const companyId = req.params.id;
    const userId = req.user.user_id;

    companyService.deleteCompany(
        companyId,
        userId,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Company not found"
                });
            }

            return res.status(200).json({
                message: "Company deleted successfully"
            });
        }
    );
}

module.exports = {
    createCompany,
    getCompanies,
    getCompany,
    updateCompany,
    deleteCompany
};