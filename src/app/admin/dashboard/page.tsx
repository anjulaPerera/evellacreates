"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    is_verified: true,
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("testimonials").insert([
      {
        name: formData.name,
        role: formData.role,
        content: formData.content,
        is_verified: formData.is_verified,
      },
    ]);

    if (error) {
      alert("Error adding testimonial: " + error.message);
    } else {
      alert("Testimonial added successfully!");
      setFormData({ name: "", role: "", content: "", is_verified: true });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  if (!user) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold" style={{ color: "#0B2D72" }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card p-4 border-0 shadow-sm">
            <h4 className="fw-bold mb-4">Add New Review</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label small fw-bold">
                  Client Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label small fw-bold">
                  Job Title/Role
                </label>
                <input
                  id="role"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label small fw-bold">
                  Review Content
                </label>
                <textarea
                  id="content"
                  className="form-control"
                  rows={4}
                  placeholder="Paste the Fiverr review here..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_verified"
                  checked={formData.is_verified}
                  onChange={(e) =>
                    setFormData({ ...formData, is_verified: e.target.checked })
                  }
                />
                <label className="form-check-label small" htmlFor="is_verified">
                  Mark as Verified Fiverr Client
                </label>
              </div>
              <button
                type="submit"
                className="btn w-100 fw-bold"
                style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
                disabled={loading}
              >
                {loading ? "Saving..." : "Publish Testimonial"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
