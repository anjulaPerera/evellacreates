"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // To redirect after login
import { supabase } from "@/lib/supabase"; // Our bridge from the previous step

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Success! Send the user to the dashboard
      router.push("/admin/dashboard");
    }
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
        </div>

        {errorMsg && (
          <div className="alert alert-danger py-2 small" role="alert">
            {errorMsg}
          </div>
        )}

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
            disabled={loading}
            className="btn w-100 fw-bold py-2"
            style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-decoration-none small text-muted">
            &larr; Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
