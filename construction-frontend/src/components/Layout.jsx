import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../Layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear auth and redirect
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light border-end min-vh-100">
          <div className="d-flex flex-column align-items-sm-start px-3 pt-2 text-dark">
            <Link
              to="/"
              className="d-flex align-items-center mb-3 mt-3 text-decoration-none"
            >
              <span className="fs-4 fw-bold">🏗️ Home</span>
            </Link>

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-sm-start w-100">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/projects" className="nav-link text-dark">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/materials" className="nav-link text-dark">
                  Materials
                </Link>
              </li>
              <li>
                <Link to="/users" className="nav-link text-dark">
                  Users
                </Link>
              </li>
              <li>
                <Link to="/invoices" className="nav-link text-dark">
                  Invoices
                </Link>
              </li>
            </ul>

            <hr className="w-100" />
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm mb-3 w-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col py-4 px-5">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h2 className="fw-semibold">Dashboard</h2>
          </div>

          {/* Render child route (Dashboard, Projects, etc.) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
