import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import LocationFilter from "../components/LocationFilter";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/applications");

        setApplications(response.data.result);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Could not load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter applications by location
  const filteredApplications = applications.filter((application) => {
    if (selectedLocation === "All Locations") {
      return true;
    }

    return application.location === selectedLocation;
  });

  // Sort the filtered applications by date
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    return sortNewestFirst
      ? new Date(b.date_applied) - new Date(a.date_applied)
      : new Date(a.date_applied) - new Date(b.date_applied);
  });

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Keep track of your job applications.</p>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Applied Jobs</h2>
          <p>{applications.length}</p>
        </div>

        {/* Sort button */}
        <button
          type="button"
          onClick={() => setSortNewestFirst(!sortNewestFirst)}
        >
          {sortNewestFirst ? "Oldest first" : "Newest first"}
        </button>

        {/* Location filter */}
        <div>
          <LocationFilter
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </section>

      <section className="dashboard-applications">
        <h2>Your Applications</h2>

        {sortedApplications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Date Applied</th>
                  <th>Job Source</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedApplications.map((application) => (
                  <tr key={application.application_id}>
                    <td>{application.company_name}</td>
                    <td>{application.job_title}</td>
                    <td>{application.location}</td>
                    
                    <td>{application.date_applied}</td>
                    <td>{application.job_source}</td>
                    <td>{application.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
