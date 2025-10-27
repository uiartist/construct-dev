import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";

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
    <div className="text-center">
      <h4>Hey, {dashboardData.user.email}!</h4>
      <p className="lead">{dashboardData.message}</p>
    </div>
  );
}

export default Dashboard;
