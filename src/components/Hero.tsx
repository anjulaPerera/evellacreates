import React from "react";

export default function Hero() {
  return (
    <section className="container text-center py-5">
      <div className="py-5">
        <h1 className="display-2 fw-bold mb-4">
          Stop letting <span className="hero-gradient-text">AI ghostwrite</span>{" "}
          your career.
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
  );
}
