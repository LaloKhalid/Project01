const jobApplicationModel = require("../model/jobApplicationModel");

function createApplication(
    userId,
    companyName,
    jobTitle,
    dateApplied,
    contactPerson,
    status,
    location,
    notes,
    callback
) {
    jobApplicationModel.createApplication(
        userId,
        companyName,
        jobTitle,
        dateApplied,
        contactPerson,
        status,
        location,
        notes,
        callback
    );
}

function getApplicationsByUser(userId, callback) {
    jobApplicationModel.getApplicationsByUser(userId, callback);
}

function getApplicationById(applicationId, userId, callback) {
    jobApplicationModel.getApplicationById(
        applicationId,
        userId,
        callback
    );
}

function updateApplication(
    applicationId,
    userId,
    companyName,
    jobTitle,
    dateApplied,
    contactPerson,
    status,
    location,
    notes,
    callback
) {
    jobApplicationModel.updateApplication(
        applicationId,
        userId,
        companyName,
        jobTitle,
        dateApplied,
        contactPerson,
        status,
        location,
        notes,
        callback
    );
}

function deleteApplication(applicationId, userId, callback) {
    jobApplicationModel.deleteApplication(
        applicationId,
        userId,
        callback
    );
}

module.exports = {
    createApplication,
    getApplicationsByUser,
    getApplicationById,
    updateApplication,
    deleteApplication
};