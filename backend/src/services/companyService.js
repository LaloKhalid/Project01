const companyModel = require("../model/companyModel");

function createCompany(
    userId,
    companyName,
    website,
    industry,
    location,
    callback
) {
    companyModel.createCompany(
        userId,
        companyName,
        website,
        industry,
        location,
        callback
    );
}

function getCompaniesByUser(userId, callback) {
    companyModel.getCompaniesByUser(userId, callback);
}

function getCompanyById(companyId, userId, callback) {
    companyModel.getCompanyById(companyId, userId, callback);
}

function updateCompany(
    companyId,
    userId,
    companyName,
    website,
    industry,
    location,
    callback
) {
    companyModel.updateCompany(
        companyId,
        userId,
        companyName,
        website,
        industry,
        location,
        callback
    );
}

function deleteCompany(companyId, userId, callback) {
    companyModel.deleteCompany(companyId, userId, callback);
}

module.exports = {
    createCompany,
    getCompaniesByUser,
    getCompanyById,
    updateCompany,
    deleteCompany
};