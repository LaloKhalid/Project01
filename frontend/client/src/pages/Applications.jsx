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

      console.log("Application saved!", response.data);

      // Add the newly created application if the backend returns it
      if (response.data.result) {
        setApplications((current) => [
          ...current,
          response.data.result,
        ]);
      } else {
        // Refresh applications from the backend
        const updatedApplications = await api.get(
          "/api/applications"
        );

        setApplications(updatedApplications.data.result);
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

          {/* COMPANY */}
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

          {/* JOB TITLE */}
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

          {/* DATE APPLIED */}
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

          {/* LOCATION */}
          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              type="text"
              placeholder="Enter location"
              {...register("location")}
            />
          </div>

          {/* STATUS */}
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

          {/* NOTES */}
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

          {/* SUBMIT */}
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

                {/* CARD HEADER */}
                <div className="application-card-header">

                  <div>
                    <h3>
                      {application.company_name}
                    </h3>

                    <p>
                      {application.job_title}
                    </p>
                  </div>

                  {application.status && (
                    <span className="application-status">
                      {application.status}
                    </span>
                  )}

                </div>

                {/* CARD DETAILS */}
                <div className="application-details">

                  {/* DATE APPLIED */}
                  {application.date_applied && (
                    <div className="application-detail">
                      <span className="detail-label">
                        Date Applied
                      </span>

                      <span className="detail-value">
                        {application.date_applied}
                      </span>
                    </div>
                  )}

                  {/* LOCATION */}
                  {application.location && (
                    <div className="application-detail">
                      <span className="detail-label">
                        Location
                      </span>

                      <span className="detail-value">
                        {application.location}
                      </span>
                    </div>
                  )}

                  {/* NOTES */}
                  {application.notes && (
                    <div className="application-detail">
                      <span className="detail-label">
                        Notes
                      </span>

                      <span className="detail-value">
                        {application.notes}
                      </span>
                    </div>
                  )}

                </div>

                {/* CARD FOOTER */}
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
