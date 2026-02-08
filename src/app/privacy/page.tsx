import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | evellacreates",
  description:
    "Learn how evellacreates protects your professional data with 100% human-only integrity.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold mb-4" style={{ color: "#0B2D72" }}>
            Privacy Policy
          </h1>
          <p className="text-muted small">Effective Date: February 8, 2026</p>
          <hr className="my-5 opacity-10" />

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">1. Information We Collect</h2>
            <p className="opacity-75">
              We collect information provided directly by you when you request a
              quote, including your name, email address, and the professional
              details contained within your uploaded resumes or LinkedIn
              profiles.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">2. No-AI Guarantee</h2>
            <p className="opacity-75">
              In alignment with our brand promise, your personal data and career
              history are never processed through or stored in public AI
              training models. All document drafting is performed manually by
              human specialists.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">3. Data Retention</h2>
            <p className="opacity-75">
              We retain your documents only for the duration of our service
              agreement and for a period of 6 months thereafter for your
              convenience, unless you request immediate deletion.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
