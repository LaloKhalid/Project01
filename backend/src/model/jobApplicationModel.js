const db = require("../config/db");

function createApplication(
    userId,
    companyName,
    jobTitle,
    dateApplied,
    contactPerson,
    status,
    notes,
    callback
) {
    const sql = `
        INSERT INTO job_applications
        (user_id, company_name, job_title, date_applied, contact_person, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            companyName,
            jobTitle,
            dateApplied,
            contactPerson,
            status,
            notes
        ],
        (err, result) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, result);
        }
    );
}

function getApplicationsByUser(userId, callback) {
    const sql = `
        SELECT *
        FROM job_applications
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

function getApplicationById(applicationId, userId, callback) {
    const sql = `
        SELECT *
        FROM job_applications
        WHERE application_id = ? AND user_id = ?
    `;

    db.query(sql, [applicationId, userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, results[0]);
    });
}

function updateApplication(
    applicationId,
    userId,
    companyName,
    jobTitle,
    dateApplied,
    contactPerson,
    status,
    notes,
    callback
) {
    const sql = `
        UPDATE job_applications
        SET company_name = ?,
            job_title = ?,
            date_applied = ?,
            contact_person = ?,
            status = ?,
            notes = ?
        WHERE application_id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [
            companyName,
            jobTitle,
            dateApplied,
            contactPerson,
            status,
            notes,
            applicationId,
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

function deleteApplication(applicationId, userId, callback) {
    const sql = `
        DELETE FROM job_applications
        WHERE application_id = ? AND user_id = ?
    `;

    db.query(sql, [applicationId, userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    });
}

module.exports = {
    createApplication,
    getApplicationsByUser,
    getApplicationById,
    updateApplication,
    deleteApplication
};