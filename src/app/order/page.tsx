"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Define the Order Data type to avoid 'any'
interface OrderPayload {
  user_id: string;
  target_role: string;
  job_links: string;
  achievements: string;
  education: string;
  linkedin_choice: string;
  region: string;
  phone_number: string;
  resume_url: string;
  status: "awaiting_payment" | "pending" | "completed";
}

export default function OrderForm() {
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const file = formData.get("resume") as File;
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Please log in first");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload File to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${userData.user.id}-${Date.now()}.${fileExt}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Save Order Details to Table
      const orderData: OrderPayload = {
        user_id: userData.user.id,
        target_role: formData.get("target_role") as string,
        job_links: formData.get("job_links") as string,
        achievements: formData.get("achievements") as string,
        education: formData.get("education") as string,
        linkedin_choice: formData.get("linkedin_choice") as string,
        region: formData.get("region") as string,
        phone_number: formData.get("phone_number") as string,
        resume_url: fileData.path,
        status: "awaiting_payment",
      };

      const { error: orderError } = await supabase
        .from("orders")
        .insert([orderData]);

      if (orderError) throw orderError;

      router.push("/checkout");
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred while processing your order.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="card modern-card p-5 shadow-sm border-0">
        <h2 className="fw-bold mb-2">Complete Your Professional Profile</h2>
        <p className="text-muted mb-4">
          Tell me what you need, and let&apos;s get you hired. Provide your
          &ldquo;Dream&rdquo; job links to begin.
        </p>

        <form onSubmit={handleSubmit} aria-label="Order Details Form">
          <div className="row">
            <div className="col-md-6 mb-4">
              <label
                htmlFor="target_role"
                className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
              >
                Target Job Role
              </label>
              <input
                id="target_role"
                name="target_role"
                type="text"
                className="form-control"
                placeholder="e.g. Project Manager"
                title="Enter your target job role"
                required
              />
            </div>
            <div className="col-md-6 mb-4">
              <label
                htmlFor="phone_number"
                className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
              >
                Contact Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                className="form-control"
                placeholder="+1 234 567 890"
                title="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="job_links"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              The &ldquo;Dream&rdquo; Job Links
            </label>
            <textarea
              id="job_links"
              name="job_links"
              className="form-control"
              rows={2}
              placeholder="Provide 1&ndash;2 links to active job postings..."
              title="Provide links to your target jobs"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="achievements"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              Key Achievements (&ldquo;Wins&rdquo;)
            </label>
            <textarea
              id="achievements"
              name="achievements"
              className="form-control"
              rows={3}
              placeholder='List 3&ndash;5 wins you are proud of (e.g., "Saved the company $20k")'
              title="List your career achievements"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resume"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              Upload Current Resume
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx"
              title="Upload your current resume file"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="linkedin_choice"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              LinkedIn Optimization Choice
            </label>
            <select
              id="linkedin_choice"
              name="linkedin_choice"
              className="form-select"
              title="Select your LinkedIn service preference"
              required
            >
              <option value="document">
                Document with Instructions (Copy/Paste)
              </option>
              <option value="login">
                Log in and Update for me (Requires 2FA)
              </option>
              <option value="none">Do not need LinkedIn Optimization</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-evella-primary w-100 py-3 fw-bold"
            disabled={uploading}
          >
            {uploading ? "Uploading Details..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </main>
  );
}
