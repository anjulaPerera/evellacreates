import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-5 mt-5"
      style={{ borderTop: "1px solid rgba(11, 45, 114, 0.1)" }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Column 1: Branding */}
          <div className="col-lg-4">
            <Link
              href="/"
              className="navbar-brand fw-bold fs-4 mb-3 d-block"
              style={{ color: "#0B2D72", letterSpacing: "-1px" }}
            >
              evella<span style={{ color: "#0992C2" }}>creates</span>
            </Link>
            <p className="small opacity-75" style={{ maxWidth: "300px" }}>
              Crafting premium, human-only career documents designed to beat the
              bots and land the interview.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-lg-4">
            <h5 className="fw-bold mb-3 small text-uppercase tracking-wider">
              Navigation
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="#services"
                  className="text-decoration-none small text-muted"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="#why-human"
                  className="text-decoration-none small text-muted"
                >
                  Why Human?
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="#contact"
                  className="text-decoration-none small text-muted"
                >
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal/Social */}
          <div className="col-6 col-lg-4 text-lg-end">
            <h5 className="fw-bold mb-3 small text-uppercase tracking-wider">
              Social
            </h5>
            <ul className="list-unstyled d-flex justify-content-lg-end gap-3">
              <li>
                <a href="#" className="text-decoration-none small text-muted">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none small text-muted">
                  Twitter/X
                </a>
              </li>
            </ul>
            <p className="mt-4 small opacity-50">
              Built with precision for the 2026 job market.
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-top text-center opacity-50">
          <p className="small mb-0">
            &copy; {currentYear} evellacreates. All rights reserved. Don&apos;t
            settle for AI-generated mediocrity.
          </p>
        </div>
      </div>
    </footer>
  );
}
