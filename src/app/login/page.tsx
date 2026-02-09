"use client";

import React, { useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { AuthError } from "@supabase/supabase-js"; // Added specific error type

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "standard";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard?package=${selectedPackage}`,
        },
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Check your email for the magic link to log in!",
      });
    } catch (err) {
      // Replacement for 'any': Check if it's a Supabase AuthError
      const error = err as AuthError;
      setMessage({
        type: "error",
        text: error.message || "An error occurred during login.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card modern-card p-4 p-md-5 shadow-sm border-0">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome Back</h2>
        <p className="text-muted small">
          Log in to manage your {selectedPackage} order
        </p>
      </div>

      {message && (
        <div
          className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mb-4`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="form-control form-control-lg"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-evella-primary btn-lg w-100 fw-bold py-3 shadow-sm"
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
          Send Magic Link
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-8">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
