"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Converting FormData to a plain object ensures punctuation like "I'm"
    // is stringified correctly for the JSON request.
    const entries = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xwvnkzgo", {
        method: "POST",
        body: JSON.stringify(entries),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <section id="contact" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="contact-glass-card">
            {status === "SUCCESS" ? (
              <div className="text-center py-5">
                <h2 className="text-white fw-bold">Success!</h2>
                <p className="text-white-50">
                  Your request has been sent. I&apos;ll reach out within 24
                  hours.
                </p>
                <button
                  onClick={() => setStatus("IDLE")}
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
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="email"
                        className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control form-control-lg form-input-custom"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="service"
                        className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                      >
                        Service Needed
                      </label>
                      <div className="custom-select-wrapper">
                        <select
                          id="service"
                          name="service"
                          className="form-select form-control-lg form-select-custom"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Choose goal...
                          </option>
                          <optgroup label="Bundles">
                            <option value="Full Suite">
                              Full Suite (All 3)
                            </option>
                            <option value="Res+LI">Resume + LinkedIn</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control form-input-custom"
                      rows={4}
                      placeholder="Industry, experience level, etc..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-lg w-100 py-3 fw-bold btn-evella-secondary shadow-lg"
                    disabled={status === "SENDING"}
                  >
                    {status === "SENDING" ? "Processing..." : "Submit Request"}
                  </button>
                  {status === "ERROR" && (
                    <p className="text-danger small mt-3 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
