import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/"); // or "/login"
        return null;
      }
      return res.json();
    })
    .then((data) => {
      if (data) setDashboardData(data);
    });
  }, [navigate]);

  if (!dashboardData) {
    return <div className="container mt-5">..</div>;
  }

  if (!dashboardData.success) {
    return (
      <div className="container mt-5 text-danger">
        {dashboardData.message}
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
    {/* Sidebar */}
    <nav
      className="bg-light p-3 border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Dashboard <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Materials</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Users</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Invoices</a>
        </li>
      </ul>
    </nav>

    {/* Main content */}
    <main className="flex-grow-1 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Dashboard</h1>
        <div>
          <button className="btn btn-danger me-2" onClick={handleLogout}>
            Logout
          </button>
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
            >
              This week
            </button>
          </div>
        </div>
      </div>

      <h4>Welcome, {dashboardData.user.name || dashboardData.user.email}!</h4>
      <p className="lead">{dashboardData.message}</p>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Projects Overview</h5>
          <p className="card-text">
            This is where project statistics or material allocations can be displayed.
          </p>
          <a href="#" className="btn btn-primary">
            View Projects
          </a>
        </div>
      </div>
    </main>
  </div>
  );
}

export default Dashboard;
