"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Define the shape of our testimonial data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  is_verified: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false }); // Show newest first

      if (!error && data) {
        setTestimonials(data);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading) return null; // Or a subtle spinner
  if (testimonials.length === 0) return null; // Hide section if no reviews yet

  return (
    <section id="testimonials" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold" style={{ color: "#0B2D72" }}>
            Real Success Stories
          </h2>
          <p className="text-muted">
            Verified feedback from professionals who bypassed the bots.
          </p>
        </div>
        <div className="row g-4">
          {testimonials.map((rev) => (
            <div key={rev.id} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#0992C2",
                    }}
                  >
                    {rev.name[0]}
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold">{rev.name}</h6>
                    <small className="text-muted small">{rev.role}</small>
                  </div>
                </div>
                <p className="small fst-italic text-muted">
                  &ldquo;{rev.content}&rdquo;
                </p>
                {rev.is_verified && (
                  <div className="mt-auto pt-3 border-top">
                    <span className="badge bg-success-subtle text-success border border-success-subtle small">
                      ✓ Verified Fiverr Client
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
