import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";
import LocationFilter from "../components/LocationFilter";


function formatDate(dateString){

  if (!dateString) return "—";

  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}
function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");
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

  // Sort applications by date
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    return sortNewestFirst
      ? new Date(b.date_applied) - new Date(a.date_applied)
      : new Date(a.date_applied) - new Date(b.date_applied);
  });

  const clearFilters = () => {
    setSelectedLocation("All Locations");
    setSortNewestFirst(true);
  };

  const hasActiveFilter = selectedLocation !== "All Locations";

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Keep track of your job applications.</p>
      </header>

      {/* Dashboard summary */}
      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Applied Jobs</h2>
          <p>{applications.length}</p>
        </div>
      </section>

      {/* Applications section */}
      <section className="dashboard-applications">
        <div className="applications-section-header">
          <div>
            <h2>Your Applications</h2>
            <p>View and organize your job applications.</p>
          </div>

          <span className="applications-count">
            {sortedApplications.length}{" "}
            {sortedApplications.length === 1
              ? "application"
              : "applications"}
          </span>
        </div>

        {/* Filter and sorting toolbar */}
        <div className="application-toolbar">
          <div className="filter-group">
            <label>Filter by location</label>
            <LocationFilter
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="application-sort">Sort by date</label>
            <select
              id="application-sort"
              value={sortNewestFirst ? "newest" : "oldest"}
              onChange={(e) =>
                setSortNewestFirst(e.target.value === "newest")
              }
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Applications table */}
        {sortedApplications.length === 0 ? (
          <div className="applications-empty-state">
            <h3>No applications found</h3>
            <p>
              {hasActiveFilter
                ? "Try selecting another location or clear your filters."
                : "Add your first job application to get started."}
            </p>

            {hasActiveFilter && (
              <button
                type="button"
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
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
                    <td>{application.location || "—"}</td>
                    <td>{formatDate(application.date_applied)}</td>
                    <td>{application.job_source || "—"}</td>
                    <td>
                      <span className="application-status">
                        {application.status || "Pending"}
                      </span>
                    </td>
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