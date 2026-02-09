"use client";

import React, { useState, Suspense, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "standard";
  const pkgKey = selectedPackage.toLowerCase();

  const [uploading, setUploading] = useState<boolean>(false);

  // --- PERSISTENCE STATE ---
  // This keeps your data alive even when switching packages
  const [formData, setFormData] = useState({
    target_role: "",
    target_region: "",
    job_links: "",
    achievements: "",
    new_info: "",
    contact_changes: "",
    linkedin_choice: "document",
  });

  const isBasic = pkgKey === "basic";
  const isStandard = pkgKey === "standard";
  const isPremium = pkgKey === "premium";

  // Handle input changes to sync with state
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const resumeFile = (
      form.querySelector('input[name="resume"]') as HTMLInputElement
    ).files?.[0];
    const otherDocsFile = (
      form.querySelector('input[name="other_docs"]') as HTMLInputElement
    ).files?.[0];

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push(`/login?package=${selectedPackage}`);
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    setUploading(true);
    try {
      // Upload Resume
      const resumeExt = resumeFile.name.split(".").pop();
      const resumePath = `${userData.user.id}/resume-${Date.now()}.${resumeExt}`;
      await supabase.storage.from("resumes").upload(resumePath, resumeFile);

      // Upload Other Docs
      let otherDocsPath = "";
      if (otherDocsFile) {
        const otherExt = otherDocsFile.name.split(".").pop();
        otherDocsPath = `${userData.user.id}/other-${Date.now()}.${otherExt}`;
        await supabase.storage
          .from("resumes")
          .upload(otherDocsPath, otherDocsFile);
      }

      const { error } = await supabase.from("orders").insert([
        {
          user_id: userData.user.id,
          ...formData,
          resume_url: resumePath,
          other_docs_url: otherDocsPath,
          package_name: selectedPackage,
          linkedin_choice: isPremium
            ? formData.linkedin_choice
            : "not_included",
          status: "awaiting_payment",
        },
      ]);

      if (error) throw error;
      router.push(`/checkout?package=${selectedPackage}`);
    } catch (err) {
      console.error(err);
      alert("Error saving order.");
    } finally {
      setUploading(false);
    }
  };

  // Function to switch packages without losing state
  const switchPackage = (newPkg: string) => {
    router.push(`/order?package=${newPkg.toLowerCase()}`);
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card modern-card p-5 shadow-sm border-0">
            <div className="mb-4">
              <span className="badge bg-primary-subtle text-primary mb-2 text-uppercase fw-bold">
                Current: {selectedPackage} Package
              </span>
              <h2 className="fw-bold">Tell us about your goals</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label
                    htmlFor="target_role"
                    className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
                  >
                    Dream Job Role *
                  </label>
                  <input
                    id="target_role"
                    name="target_role"
                    value={formData.target_role}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="target_region" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                    Targeting Region
                  </label>
                  <input
                    id="target_region"
                    name="target_region"
                    value={formData.target_region}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    placeholder="US, UK, etc"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="job_links"
                  className="small fw-bold text-uppercase opacity-50 mb-2 d-block"
                >
                  Link for your dream job
                </label>
                <input
                  id="job_links"
                  value={formData.job_links}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="achievements" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                  Key Achievements
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="form-control"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="new_info" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                  Anything new to be added?
                </label>
                <textarea
                  id="new_info"
                  name="new_info"
                  value={formData.new_info}
                  onChange={handleInputChange}
                  className="form-control"
                  rows={2}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact_changes" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                  Contact Info Changes
                </label>
                <input
                  id="contact_changes"
                  name="contact_changes"
                  value={formData.contact_changes}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="resume" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                    Current Resume *
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
                <div className="col-md-6 mb-4">
                  <label htmlFor="other_docs" className="small fw-bold text-uppercase opacity-50 mb-2 d-block">
                    Other Docs
                  </label>
                  <input
                    id="other_docs"
                    name="other_docs"
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>

              {isPremium && (
                <div className="mb-4 p-4 bg-primary-subtle rounded-4">
                  <label className="small fw-bold text-uppercase text-primary mb-3 d-block">
                    LinkedIn Choice
                  </label>
                  <div className="form-check mb-2">
                    <input
                      id="linkedin-document"
                      className="form-check-input"
                      type="radio"
                      name="linkedin_choice"
                      value="document"
                      checked={formData.linkedin_choice === "document"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="linkedin-document" className="form-check-label">
                      Document with Instructions
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="linkedin-login"
                      className="form-check-input"
                      type="radio"
                      name="linkedin_choice"
                      value="login"
                      checked={formData.linkedin_choice === "login"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="linkedin-login" className="form-check-label">
                      Log in and Update
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-evella-primary w-100 py-3 fw-bold"
                disabled={uploading}
              >
                {uploading ? "Processing..." : `Pay for ${selectedPackage}`}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          {/* UPSELL / DOWNSELL CARD */}
          <div
            className="card border-0 shadow-sm bg-dark text-white p-4 sticky-top"
            style={{ top: "100px" }}
          >
            <h5 className="fw-bold mb-3">Package Options</h5>

            {isPremium ? (
              <div>
                <p className="small opacity-75">
                  You are currently on the <strong>Premium</strong> tier. This
                  includes the full brand transformation.
                </p>
                <button
                  onClick={() => switchPackage("standard")}
                  className="btn btn-sm btn-outline-light w-100"
                >
                  Switch to Standard ($50)
                </button>
              </div>
            ) : (
              <div>
                <p className="small opacity-75">
                  {isBasic
                    ? "Recruiters expect a Cover Letter."
                    : "Your LinkedIn is your digital storefront."}
                </p>
                <button
                  onClick={() =>
                    switchPackage(isBasic ? "standard" : "premium")
                  }
                  className="btn btn-warning w-100 fw-bold mb-3"
                >
                  Upgrade to {isBasic ? "Standard" : "Premium"}
                </button>

                {isStandard && (
                  <button
                    onClick={() => switchPackage("basic")}
                    className="btn btn-link text-white text-decoration-none small w-100 opacity-50"
                  >
                    Actually, I&apos;ll go back to Basic
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 mt-5 text-center">Loading...</div>
      }
    >
      <OrderFormContent />
    </Suspense>
  );
}
