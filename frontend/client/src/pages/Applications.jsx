import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // Get existing applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/applications");

        console.log("Applications:", response.data);

        setApplications(response.data.result);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Submit new application
  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      const response = await api.post("/api/applications", data);

      console.log("Application saved!");

      if (response.data.result) {
        setApplications((current) => [
          ...current,
          response.data.result,
        ]);
      }

      reset();
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  // Delete application
  const deleteApplication = async (applicationId) => {
    try {
      await api.delete(`/api/applications/${applicationId}`);

      console.log("Application deleted!");

      setApplications((current) =>
        current.filter(
          (application) =>
            application.application_id !== applicationId
        )
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <main className="applications-page">

      {/* PAGE HEADER */}
      <header className="page-header">
        <h1>Applications</h1>
        <p>Keep track of your job applications.</p>
      </header>

      {/* APPLICATION FORM */}
      <section className="application-container">
        <form
          className="application-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="company_name">
              Company
            </label>

            <input
              id="company_name"
              type="text"
              placeholder="Enter company name"
              {...register("company_name")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="job_title">
              Job Title
            </label>

            <input
              id="job_title"
              type="text"
              placeholder="Enter job title"
              {...register("job_title")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_applied">
              Date Applied
            </label>

            <input
              id="date_applied"
              type="date"
              {...register("date_applied")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <input
              id="status"
              type="text"
              placeholder="e.g. Applied, Interview, Rejected"
              {...register("status")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              Notes
            </label>

            <textarea
              id="notes"
              placeholder="Add any notes about this application..."
              {...register("notes")}
            />
          </div>

          <button
            className="primary-btn"
            type="submit"
          >
            Save Application
          </button>
        </form>
      </section>

      {/* EXISTING APPLICATIONS */}
      <section className="applications-list">
        <div className="section-header">
          <h2>My Applications</h2>

          <p>
            {applications.length}{" "}
            {applications.length === 1
              ? "application"
              : "applications"}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>

            <p>
              Add your first job application using the form above.
            </p>
          </div>
        ) : (
          <div className="application-grid">
            {applications.map((application) => (
              <article
                className="application-card"
                key={application.application_id}
              >
                <div className="application-card-header">
                  <div>
                    <h3>{application.company_name}</h3>
                    <p>{application.job_title}</p>
                  </div>

                  <span className="application-status">
                    {application.status}
                  </span>
                </div>

                <div className="application-details">
                  <div>
                    <span className="detail-label">
                      Date Applied
                    </span>

                    <span className="detail-value">
                      {application.date_applied}
                    </span>
                  </div>

                  {application.notes && (
                    <div>
                      <span className="detail-label">
                        Notes
                      </span>

                      <span className="detail-value">
                        {application.notes}
                      </span>
                    </div>
                  )}
                </div>

                <div className="application-card-footer">
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() =>
                      deleteApplication(
                        application.application_id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Applications;