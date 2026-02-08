import React from "react";

export default function Home() {
  const services = [
    {
      title: "ATS-Optimized Resume",
      description:
        "Manual keyword integration to bypass automated filters and land on a recruiter's desk.",
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
    <main
      style={{
        backgroundColor: "#FDF8EC",
        color: "#0B2D72",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* MODERN HERO SECTION */}
      <section className="container text-center py-5">
        <div className="py-5">
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor: "rgba(9, 146, 194, 0.1)",
              color: "#0992C2",
              letterSpacing: "1px",
            }}
          >
            100% HUMAN WRITING
          </span>
          <h1
            className="display-2 fw-bold mb-4"
            style={{ letterSpacing: "-2px" }}
          >
            Stop letting{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0B2D72, #0992C2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI ghostwrite
            </span>{" "}
            your career.
          </h1>
          <p
            className="lead mb-5 mx-auto opacity-75"
            style={{ maxWidth: "650px", lineHeight: "1.7" }}
          >
            I craft high-impact resumes and LinkedIn profiles that tell your
            unique story—without the robotic fluff.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="#contact"
              className="btn btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
              style={{
                backgroundColor: "#0B2D72",
                color: "#F6E7BC",
                border: "none",
              }}
            >
              Get My Custom Quote
            </a>
            <a
              href="#services"
              className="btn btn-lg px-5 py-3 rounded-pill fw-bold"
              style={{ border: "1px solid #0B2D72", color: "#0B2D72" }}
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* MINIMALIST SERVICES GRID */}
      <section id="services" className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{
                  borderRadius: "24px",
                  transition: "transform 0.3s ease",
                }}
              >
                <div className="card-body">
                  <div
                    className="mb-3"
                    style={{
                      width: "40px",
                      height: "4px",
                      backgroundColor: "#0992C2",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                  <p className="text-muted small mb-4">{service.description}</p>
                  <span className="fw-bold" style={{ color: "#0992C2" }}>
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODERN CONTACT FORM (Fixed Dropdown) */}
      <section id="contact" className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div
              className="p-5 shadow-lg border-0"
              style={{
                backgroundColor: "#0B2D72",
                borderRadius: "32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle background decoration */}
              <div
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "-10%",
                  width: "200px",
                  height: "200px",
                  background: "rgba(9, 146, 194, 0.15)",
                  borderRadius: "50%",
                }}
              ></div>

              <h2 className="fw-bold text-white mb-2">Request a Quote</h2>
              <p className="text-white-50 mb-5">
                Tell me what you need, and let's get you hired.
              </p>

              <form>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="text-white-50 small fw-bold mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg bg-white bg-opacity-10 text-white border-0 rounded-3"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="text-white-50 small fw-bold mb-2">
                      SERVICE NEEDED
                    </label>
                    <select
                      className="form-select form-control-lg border-0 rounded-3"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "#ffffff",
                      }}
                    >
                      {/* Using a darker background for options to ensure visibility */}
                      <option style={{ color: "#000000" }} value="">
                        Select Service...
                      </option>
                      <optgroup
                        label="Single Units"
                        style={{ color: "#000000" }}
                      >
                        <option value="s-resume">Single Resume</option>
                        <option value="s-cl">Single Cover Letter</option>
                        <option value="s-li">Single LinkedIn</option>
                      </optgroup>
                      <optgroup label="Multiples" style={{ color: "#000000" }}>
                        <option value="m-resume">Multiple Resumes</option>
                        <option value="m-cl">Multiple Cover Letters</option>
                      </optgroup>
                      <optgroup label="Bundles" style={{ color: "#000000" }}>
                        <option value="b-res-cl">Resume + Cover Letter</option>
                        <option value="b-res-li">Resume + LinkedIn</option>
                        <option value="b-all">Full Suite (All 3)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-white-50 small fw-bold mb-2">
                    TELL ME MORE
                  </label>
                  <textarea
                    className="form-control bg-white bg-opacity-10 text-white border-0 rounded-3"
                    rows={4}
                    placeholder="Industry, experience level, etc..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100 py-3 fw-bold shadow"
                  style={{
                    backgroundColor: "#0992C2",
                    color: "white",
                    borderRadius: "12px",
                    border: "none",
                  }}
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
