const jobApplicationService = require("../services/jobApplicationService");

function createApplication(req, res) {
    const {
        company_name,
        job_title,
        date_applied,
        contact_person,
        status,
        notes
    } = req.body || {};

    const userId = req.user.user_id;

    if (!company_name || !job_title) {
        return res.status(400).json({
            error: "Company name and job title are required"
        });
    }

    jobApplicationService.createApplication(
        userId,
        company_name,
        job_title,
        date_applied || null,
        contact_person || null,
        status || null,
        notes || null,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            return res.status(201).json({
                message: "Job application created successfully",
                application_id: result.insertId
            });
        }
    );
}

function getApplications(req, res) {
    const userId = req.user.user_id;

    jobApplicationService.getApplicationsByUser(
        userId,
        (err, applications) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            return res.status(200).json({
                result: applications
            });
        }
    );
}

function getApplication(req, res) {
    const applicationId = req.params.id;
    const userId = req.user.user_id;

    jobApplicationService.getApplicationById(
        applicationId,
        userId,
        (err, application) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!application) {
                return res.status(404).json({
                    error: "Job application not found"
                });
            }

            return res.status(200).json({
                result: application
            });
        }
    );
}

function updateApplication(req, res) {
    const applicationId = req.params.id;
    const userId = req.user.user_id;

    const {
        company_name,
        job_title,
        date_applied,
        contact_person,
        status,
        notes
    } = req.body || {};

    if (!company_name || !job_title) {
        return res.status(400).json({
            error: "Company name and job title are required"
        });
    }

    jobApplicationService.updateApplication(
        applicationId,
        userId,
        company_name,
        job_title,
        date_applied || null,
        contact_person || null,
        status || null,
        notes || null,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Job application not found"
                });
            }

            return res.status(200).json({
                message: "Job application updated successfully"
            });
        }
    );
}

function deleteApplication(req, res) {
    const applicationId = req.params.id;
    const userId = req.user.user_id;

    jobApplicationService.deleteApplication(
        applicationId,
        userId,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Job application not found"
                });
            }

            return res.status(200).json({
                message: "Job application deleted successfully"
            });
        }
    );
}

module.exports = {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication
};