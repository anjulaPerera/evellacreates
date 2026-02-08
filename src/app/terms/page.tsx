import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | evellacreates",
  description:
    "The legal framework for our human-only resume writing and career strategy services.",
};

export default function TermsOfService() {
  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold mb-4" style={{ color: "#0B2D72" }}>
            Terms of Service
          </h1>
          <p className="text-muted small">Last Updated: February 2026</p>
          <hr className="my-5 opacity-10" />

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">1. Scope of Services</h2>
            <p className="opacity-75">
              evellacreates provides custom resume writing, cover letters, and
              LinkedIn profile optimization. Our service is a collaborative
              process requiring timely input from the client.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">2. Disclaimer of Outcomes</h2>
            <p className="opacity-75">
              While we use industry-leading ATS optimization and human strategy,
              evellacreates does not guarantee interviews, job offers, or
              specific salary increases.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">3. Refunds & Revisions</h2>
            <p className="opacity-75">
              Due to the custom nature of our human-crafted work, refunds are
              not provided once the first draft is delivered. We offer up to two
              rounds of revisions within 14 days of delivery.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
