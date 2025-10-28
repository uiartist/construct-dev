import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import UserList from "./components/UserList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="/users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}
