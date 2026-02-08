"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Import the specific type

export default function AdminDashboard() {
  // Replace <any> with <User | null>
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user: activeUser },
      } = await supabase.auth.getUser();
      if (!activeUser) {
        router.push("/admin");
      } else {
        setUser(activeUser);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold" style={{ color: "#0B2D72" }}>
            Admin Dashboard
          </h1>
          <p className="text-muted">Welcome back, {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm px-4"
        >
          Logout
        </button>
      </div>

      <div className="card p-4 border-0 shadow-sm">
        <h4 className="fw-bold mb-3">Add New Testimonial</h4>
        <p className="text-muted small">
          Enter the details of your Fiverr reviews here to display them on the
          homepage.
        </p>
        {/* We will build the form here next */}
      </div>
    </div>
  );
}
