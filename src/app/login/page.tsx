"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // This sends a "Magic Link" - the easiest, most secure way for users to log in
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card modern-card p-4 shadow-sm">
            <h2 className="fw-bold mb-3 text-center">Client Portal</h2>
            <p className="text-muted text-center mb-4">
              Enter your email to sign in or create an account to track your
              orders.
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="small fw-bold text-uppercase opacity-50">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-evella-primary w-100 py-3 fw-bold"
                disabled={loading}
              >
                {loading ? "Sending link..." : "Send Magic Link"}
              </button>
            </form>
            {message && (
              <p className="mt-3 text-center small fw-bold text-primary">
                {message}
              </p>
            )}
            <div className="mt-4 text-center">
              <Link href="/" className="text-decoration-none small text-muted">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
