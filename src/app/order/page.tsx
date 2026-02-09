"use client";

import React, { useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

// Define the Order Data type strictly
interface OrderPayload {
  user_id: string;
  target_role: string;
  job_links: string;
  achievements: string;
  linkedin_choice: string;
  phone_number: string;
  resume_url: string;
  package_name: string; // <--- Added this to save to DB
  status: "awaiting_payment" | "pending" | "completed";
}

function OrderFormContent() {
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Reads from URL: e.g., /order?package=premium
  const selectedPackage = searchParams.get("package") || "standard";
  const isBasic = selectedPackage.toLowerCase() === "basic";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("resume") as File;

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      alert("Please log in first");
      router.push(`/login?package=${selectedPackage}`);
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userData.user.id}-${Date.now()}.${fileExt}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Prepare data to save to Supabase
      const orderData: OrderPayload = {
        user_id: userData.user.id,
        target_role: (formData.get("target_role") as string) || "",
        job_links: (formData.get("job_links") as string) || "",
        achievements: (formData.get("achievements") as string) || "",
        linkedin_choice: isBasic
          ? "none"
          : (formData.get("linkedin_choice") as string) || "document",
        phone_number: (formData.get("phone_number") as string) || "",
        resume_url: fileData.path,
        package_name: selectedPackage, // <--- SAVING THE ACTUAL PACKAGE NAME
        status: "awaiting_payment",
      };

      const { error: orderError } = await supabase
        .from("orders")
        .insert([orderData]);

      if (orderError) throw orderError;

      router.push(`/checkout?package=${selectedPackage}`);
    } catch (err) {
      const error = err as Error;
      console.error("Order error:", error.message);
      alert(`Error: ${error.message || "An error occurred."}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="card modern-card p-5 shadow-sm border-0">
        <div className="mb-4 text-center">
          <span className="badge bg-primary text-uppercase fw-bold mb-2 px-3 py-2">
            {selectedPackage} Package
          </span>
          <h2 className="fw-bold mb-2">Complete Your Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label
                htmlFor="target_role"
                className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
              >
                Target Role
              </label>
              <input
                id="target_role"
                name="target_role"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-4">
              <label
                htmlFor="phone_number"
                className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
              >
                Phone
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="job_links"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              Job Links
            </label>
            <textarea
              id="job_links"
              name="job_links"
              className="form-control"
              rows={2}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="achievements"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              Achievements
            </label>
            <textarea
              id="achievements"
              name="achievements"
              className="form-control"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="resume"
              className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
            >
              Upload Resume
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          {!isBasic && (
            <div className="mb-4">
              <label
                htmlFor="linkedin_choice"
                className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
              >
                LinkedIn Choice
              </label>
              <select
                id="linkedin_choice"
                name="linkedin_choice"
                className="form-select"
                required
              >
                <option value="document">Document (Copy/Paste)</option>
                <option value="login">Log in & Update</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-evella-primary w-100 py-3 fw-bold"
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 mt-5 text-center">Loading form...</div>
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}
