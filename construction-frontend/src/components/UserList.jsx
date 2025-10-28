import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please log in.");
      return;
    }

    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.data);
          setLoading(false);
        } else {
          setMessage("Failed to fetch users.");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setMessage("Error fetching users.");
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading users...</div>;
  }

  return (
    <div className="container-fluid px-4 mt-4">
      <h2 className="mb-4">Users</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {new Date(user.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
