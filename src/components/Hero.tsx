import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container text-center py-5 mt-5">
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
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link
            href="/#pricing"
            className="btn btn-lg btn-evella-primary fw-bold shadow-sm px-5 py-3 rounded-pill"
          >
            Explore Packages
          </Link>
          <Link
            href="/#contact"
            className="btn btn-lg btn-outline-dark rounded-pill px-5 py-3"
          >
            Get Custom Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
