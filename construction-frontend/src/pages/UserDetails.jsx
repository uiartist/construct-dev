import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
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
      .get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const body = res?.data || {};
        if (body.success) {
          const u = Array.isArray(body.data) ? body.data[0] : body.data;
          setUser(u || null);
        } else {
          setMessage(body.message || "Failed to load user.");
        }
      })
      .catch(() => setMessage("Error fetching user details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading user details...</div>;

  return (
    <div className="container-fluid px-4 mt-4">
      <h2 className="mb-4">User Details</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {user ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <tbody>
                <tr><th style={{ width: 200 }}>Name</th><td>{user.name || "—"}</td></tr>
                <tr><th>Email</th><td>{user.email || "—"}</td></tr>
                <tr><th>Phone</th><td>{user.phone || "—"}</td></tr>
                <tr><th>Job Title</th><td>{user.job_title || "—"}</td></tr>
                <tr><th>Rate</th><td>{user.rate ?? "—"}</td></tr>
                <tr>
                  <th>Created On</th>
                  <td>{user.created_at ? new Date(String(user.created_at).replace(" ","T")).toLocaleDateString("en-IN") : "—"}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3">
              <Link to="/users" className="btn btn-secondary">← Back to Users</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">User not found.</div>
      )}
    </div>
  );
};

export default UserDetails;
