import { useEffect, useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  fetch("/api/projects", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 send JWT token
    },
  })
    .then((response) => {
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
        return null;
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.success) {
        setProjects(data.data || []);
        setLoading(false);
      } else {
        setError("Failed to fetch projects.");
        setLoading(false);
      }
    })
    .catch((err) => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });
}, [navigate]);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4 text-center">Projects</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td><Link to={`/projects/${project.id}`} className="text-decoration-underline"style={{ cursor: "pointer" }}> {project.name}</Link></td>
                <td>{project.location}</td>
                <td>
                  <span
                    className={`badge ${
                      project.status === "completed"
                        ? "bg-success"
                        : project.status === "in-progress"
                        ? "bg-primary"
                        : project.status === "on-hold"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  {new Date(project.deadline).toLocaleDateString("en-IN")}</td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectList;
