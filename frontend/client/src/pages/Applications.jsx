import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

function Applications() {
  // Get existing applications
  const [applications, setApplications] = useState([]);

  // React Hook Form
  const { register, handleSubmit } = useForm();

  // Get applications from API
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

  // Submit NEW application
  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      await api.post("/api/applications", data);

      console.log("Application saved!");

    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  const deleteApplication = async (applicationId) => {
  try {
    await api.delete(`/api/applications/${applicationId}`);

    console.log("Application deleted!");
  } catch (error) {
    console.error("Error deleting application:", error);
  }
};

  return (
    <div>
      <h1>Applications</h1>

      {/* NEW APPLICATION FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Company"
          {...register("company_name")}
        />

        <input
          placeholder="Job title"
          {...register("job_title")}
        />

        <input
          type="date"
          {...register("date_applied")}
        />

        <input
          placeholder="Contact person"
          {...register("contact_person")}
        />

        <input
          placeholder="Status"
          {...register("status")}
        />

        <textarea
          placeholder="Notes"
          {...register("notes")}
        />

        <button type="submit">
          Save Application
        </button>

      </form>

      {/* EXISTING APPLICATIONS */}
      <h2>My Applications</h2>

      {applications.map((application) => (
        <div key={application.application_id}>
          <h2>{application.company_name}</h2>
          <p>{application.job_title}</p>
          <p>{application.date_applied}</p>
          <button onClick={() => deleteApplication(application.application_id)}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}

export default Applications;
