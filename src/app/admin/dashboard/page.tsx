"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

// Fix: Define the Testimonial interface to replace 'any'
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  is_verified: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]); // Typed array
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    is_verified: true,
  });
  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setTestimonials(data);
  };
  useEffect(() => {
    const initDashboard = async () => {
      const {
        data: { user: activeUser },
      } = await supabase.auth.getUser();
      if (!activeUser) {
        router.push("/admin");
      } else {
        setUser(activeUser);
        fetchTestimonials();
      }
    };
    initDashboard();
  }, [router]);



  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) alert(error.message);
      else fetchTestimonials();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("testimonials").insert([formData]);
    if (!error) {
      setFormData({ name: "", role: "", content: "", is_verified: true });
      fetchTestimonials();
    }
    setLoading(false);
  };

  if (!user) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold testimonial-title">Admin Dashboard</h1>
        <button
          onClick={() =>
            supabase.auth.signOut().then(() => router.push("/admin"))
          }
          className="btn btn-outline-danger btn-sm"
        >
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card p-4 border-0 shadow-sm">
            <h4 className="fw-bold mb-4">Add New Review</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="client-name"
                  className="form-label small fw-bold"
                >
                  Client Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sarah Jenkins"
                  title="Enter the client's name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="job-title" className="form-label small fw-bold">
                  Job Title
                </label>
                <input
                  id="job-title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Marketing Manager"
                  title="Enter the client's professional title"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="review-content"
                  className="form-label small fw-bold"
                >
                  Review
                </label>
                <textarea
                  id="review-content"
                  className="form-control"
                  rows={3}
                  placeholder="Paste the testimonial here..."
                  title="Paste the testimonial content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn w-100 fw-bold"
                style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
              >
                {loading ? "Saving..." : "Publish"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card p-4 border-0 shadow-sm">
            <h4 className="fw-bold mb-4">Existing Testimonials</h4>
            <div className="overflow-auto" style={{ maxHeight: "500px" }}>
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="admin-list-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded"
                >
                  <div style={{ maxWidth: "80%" }}>
                    <p className="mb-0 fw-bold">{t.name}</p>
                    <small className="text-muted d-block text-truncate">
                      {t.content}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="btn btn-sm btn-delete"
                    aria-label={`Delete testimonial from ${t.name}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {testimonials.length === 0 && (
                <p className="text-muted">No testimonials found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
