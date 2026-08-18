const db = require("../config/db");

function createCompany(userId, companyName, website, industry, location, callback) {
    const sql = `
        INSERT INTO companies
        (user_id, company_name, website, industry, location)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userId, companyName, website, industry, location],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        }
    );
}

function getCompaniesByUser(userId, callback) {
    const sql = `
        SELECT *
        FROM companies
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, results);
    });
}

function getCompanyById(companyId, userId, callback) {
    const sql = `
        SELECT *
        FROM companies
        WHERE company_id = ? AND user_id = ?
    `;

    db.query(sql, [companyId, userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, results[0]);
    });
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
    const sql = `
        UPDATE companies
        SET company_name = ?,
            website = ?,
            industry = ?,
            location = ?
        WHERE company_id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            companyName,
            website,
            industry,
            location,
            companyId,
            userId
        ],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        }
    );
}

function deleteCompany(companyId, userId, callback) {
    const sql = `
        DELETE FROM companies
        WHERE company_id = ? AND user_id = ?
    `;

    db.query(sql, [companyId, userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    });
}

module.exports = {
    createCompany,
    getCompaniesByUser,
    getCompanyById,
    updateCompany,
    deleteCompany
};