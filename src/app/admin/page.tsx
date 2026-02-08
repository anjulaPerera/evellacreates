"use client";

import React, { useState } from "react";
import Link from "next/link"; // Improved: Use Next.js Link

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in...", email);
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#0B2D72" }}>
            Admin Access
          </h2>
          <p className="text-muted small">
            Enter your credentials to manage testimonials.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="admin-email" className="form-label small fw-bold">
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              className="form-control"
              placeholder="admin@evellacreates.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="admin-password"
              className="form-label small fw-bold"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold py-2"
            style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          {/* Improved: Using Link instead of <a> */}
          <Link href="/" className="text-decoration-none small text-muted">
            &larr; Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
