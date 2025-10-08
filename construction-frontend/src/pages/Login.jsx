import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("Logging in...");

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // Prevent redirect on wrong creds
      const errorData = await res.json();
      throw new Error(errorData.error || "Invalid Login");
    }

    const data = await res.json();

    // Save JWT in localStorage
    localStorage.setItem("token", data.token); // save JWT

    setMessage("✅ Login successful! Redirecting...");
    // Redirect only after success
    window.location.href = "/dashboard";
  } catch (err) {
    setMessage("❌ " + err.message);
  }
};

  return (
    <div
  className="d-flex justify-content-center align-items-center vh-100"
  style={{
    background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
    minHeight: "100vh",
    width: "100vw", // full width
  }}
>
  <div
    className="card shadow-lg p-4 border-0"
    style={{
      width: "350px",
      borderRadius: "15px",
      backgroundColor: "#ffffffcc",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    }}
  >
    <h3 className="text-center mb-3 fw-bold text-primary">Admin Login</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Email address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="btn w-100"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Login
      </button>
    </form>
    {message && <p className="mt-3 text-center text-danger">{message}</p>}
  </div>
</div>
  );
}
