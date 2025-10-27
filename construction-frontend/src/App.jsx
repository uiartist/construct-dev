import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./components/ProjectList";

/*function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in → send back to login
    window.location.href = "/";
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome to the Dashboard</h2>
      <p>You are logged in as Admin.</p>
    </div>
  );
}*/

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/projects" element={<ProjectList />} />
        {/* <Route path="materials" element={<Materials />} />
        <Route path="users" element={<Users />} />
        <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </Router>
  );
}
