import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../Layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/"); // redirect to login
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "220px" }}
      >
        <h4 className="text-center mb-4">Construct Admin</h4>
        <nav className="flex-grow-1">
          <ul className="list-unstyled">
            <li className="mb-2">
              <Link to="/dashboard" className="text-white text-decoration-none">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/projects" className="text-white text-decoration-none">
                Projects
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/users" className="text-white text-decoration-none">
                Users
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="btn btn-outline-light btn-sm mt-auto"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
