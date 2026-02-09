"use client";

import React, { useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPackage = searchParams.get("package") || "standard";

  // REMOVED the top-level 'redirectTo' here to prevent "window is not defined" error

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    // window is safe to use here because this function only runs on the client after a click
    const redirectTo = `${window.location.origin}/dashboard?package=${selectedPackage}`;

    setLoading(true);
    setMessage(null);

    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectTo },
        });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) throw result.error;

      if (!isSignUp) {
        router.push(`/dashboard?package=${selectedPackage}`);
      } else {
        setMessage({
          type: "success",
          text: "Account created! You can now log in.",
        });
      }
    } catch (err) {
      const error = err as AuthError;
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // window is safe to use here as well
    const redirectTo = `${window.location.origin}/dashboard?package=${selectedPackage}`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  };

  return (
    <div className="card modern-card p-4 shadow-sm border-0">
      <h2 className="text-center fw-bold mb-4">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>

      {message && (
        <div
          className={`alert alert-${message.type === "success" ? "success" : "danger"}`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleAuth}>
        <div className="mb-3">
          <label
            htmlFor="login-email"
            className="small fw-bold text-uppercase opacity-50 mb-1 d-block"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
            title="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="login-password"
            className="small fw-bold text-uppercase opacity-50 mb-1 d-block"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            title="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-evella-primary w-100 fw-bold py-3 mb-3"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="text-center mb-3 opacity-50 small">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center fw-bold"
        type="button"
      >
        <i className="bi bi-google me-2"></i> Continue with Google
      </button>

      <p className="text-center mt-4 small">
        {isSignUp ? "Already have an account?" : "New to Evella Creates?"}{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="btn btn-link p-0 small fw-bold text-decoration-none"
          type="button"
        >
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-8">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
