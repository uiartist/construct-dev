import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const body = res?.data || {};
        if (body.success) {
          const p = Array.isArray(body.data) ? body.data[0] : body.data;
          setProject(p || null);
        } else {
          setMessage(body.message || "Failed to load project.");
        }
      })
      .catch(() => setMessage("Error fetching project details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading project details...</div>;

  const fmt = (d) =>
    d ? new Date(String(d).replace(" ", "T")).toLocaleDateString("en-IN") : "—";

  return (
    <div className="container-fluid px-4 mt-4">
      <h2 className="mb-4">Project Details</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {project ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <tbody>
                <tr><th style={{ width: 200 }}>Name</th><td>{project.name || "—"}</td></tr>
                <tr><th>Location</th><td>{project.location || "—"}</td></tr>
                <tr><th>Status</th><td>{project.status || "—"}</td></tr>
                <tr><th>Deadline</th><td>{fmt(project.deadline)}</td></tr>
                <tr><th>Created On</th><td>{fmt(project.created_at)}</td></tr>
              </tbody>
            </table>

            <div className="mt-3">
              <Link to="/projects" className="btn btn-secondary">← Back to Projects</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">Project not found.</div>
      )}
    </div>
  );
};

export default ProjectDetails;
