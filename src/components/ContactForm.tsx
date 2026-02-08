import React from "react";

export default function ContactForm() {
  return (
    <section id="contact" className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="contact-glass-card">
            <h2 className="fw-bold text-white mb-2">Request a Quote</h2>
            <p className="text-white-50 mb-5">
              Tell me what you need, and let&apos;s get you hired.
            </p>

            <form>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label
                    htmlFor="email-input"
                    className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    className="form-control form-control-lg form-input-custom"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label
                    htmlFor="service-dropdown"
                    className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                  >
                    Service Needed
                  </label>
                  {/* Added custom-select-wrapper for the stylized arrow */}
                  <div className="custom-select-wrapper">
                    <select
                      id="service-dropdown"
                      className="form-select form-control-lg form-select-custom"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Choose your goal...
                      </option>
                      <optgroup label="Bundles (Recommended)">
                        <option value="b-all">
                          Full Suite (Resume + CL + LinkedIn)
                        </option>
                        <option value="b-res-li">
                          Resume + LinkedIn Optimization
                        </option>
                      </optgroup>
                      <optgroup label="Individual Services">
                        <option value="s-res">Professional Resume</option>
                        <option value="s-li">LinkedIn Makeover</option>
                        <option value="s-cl">Custom Cover Letter</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message-area"
                  className="text-white-50 small fw-bold mb-2 text-uppercase tracking-wider"
                >
                  Tell me more
                </label>
                <textarea
                  id="message-area"
                  className="form-control form-input-custom"
                  rows={4}
                  placeholder="Industry, experience level, or specific challenges..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 py-3 fw-bold btn-evella-secondary shadow-lg"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
