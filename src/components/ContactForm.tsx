"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate an API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="contact-glass-card">
            {status === "success" ? (
              <div className="text-center py-5">
                <h2 className="text-white fw-bold">Message Sent!</h2>
                <p className="text-white-50">
                  I&apos;ll get back to you within 24 hours. Let&apos;s get you
                  hired.
                </p>
                <button
                  onClick={() => setStatus("")}
                  className="btn btn-outline-light rounded-pill px-4 mt-3"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h2 className="fw-bold text-white mb-2">Request a Quote</h2>
                <p className="text-white-50 mb-5">
                  Tell me what you need, and let&apos;s get you hired.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* ... same input fields as before ... */}
                  <button
                    type="submit"
                    className="btn btn-lg w-100 py-3 fw-bold btn-evella-secondary shadow-lg"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Submit Request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
