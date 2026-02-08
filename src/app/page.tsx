import React from "react";

export default function Home() {
  const services = [
    {
      title: "ATS-Optimized Resume",
      description:
        "Manual keyword integration to bypass automated filters and land on a recruiter&apos;s desk.",
      price: "Custom Quote",
    },
    {
      title: "LinkedIn Transformation",
      description:
        "A professional profile makeover designed to attract recruiters and build your personal brand.",
      price: "Custom Quote",
    },
    {
      title: "Cover Letter Crafting",
      description:
        "Tailored narratives that show your human personality and specific value to a company.",
      price: "Custom Quote",
    },
  ];

  return (
    <main className="container-fluid p-0">
      {/* HERO SECTION */}
      <section className="container text-center py-5">
        <div className="py-5">
          <h1 className="display-2 fw-bold mb-4">
            Stop letting{" "}
            <span className="hero-gradient-text">AI ghostwrite</span> your
            career.
          </h1>
          <p
            className="lead mb-5 mx-auto opacity-75"
            style={{ maxWidth: "650px" }}
          >
            I craft high-impact resumes and LinkedIn profiles that tell your
            unique story—without the robotic fluff.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="#contact"
              className="btn btn-lg btn-evella-primary fw-bold shadow-sm"
            >
              Get My Custom Quote
            </a>
            <a
              href="#services"
              className="btn btn-lg btn-outline-dark rounded-pill px-5"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 modern-card p-4">
                <div className="card-body">
                  <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                  <p className="text-muted small mb-4">{service.description}</p>
                  <span className="fw-bold text-info">{service.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
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
                    <select
                      id="service-dropdown"
                      title="Select service combination"
                      className="form-select form-control-lg form-select-custom"
                      required
                    >
                      <option value="">Choose options...</option>
                      <optgroup label="Single Units">
                        <option value="s-resume">Single Resume</option>
                        <option value="s-cl">Single Cover Letter</option>
                        <option value="s-li">Single LinkedIn</option>
                      </optgroup>
                      <optgroup label="Bundles">
                        <option value="b-res-cl">Resume + Cover Letter</option>
                        <option value="b-res-li">Resume + LinkedIn</option>
                        <option value="b-all">Full Suite (All 3)</option>
                      </optgroup>
                    </select>
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
                    placeholder="Industry, experience level, etc..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100 py-3 fw-bold btn-evella-secondary shadow"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
