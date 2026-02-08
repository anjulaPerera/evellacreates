import React from "react";
import Link from "next/link";
import Image from "next/image";

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
          <div className="col-lg-3">
            <Link href="/" className="navbar-brand d-flex align-items-center">
              <Image
                src="/logo.png"
                alt="evellacreates logo"
                width={230}
                height={40}
                priority
              />
            </Link>
            <p className="small opacity-75" style={{ maxWidth: "300px" }}>
              Crafting premium, human-only career documents designed to beat the
              bots and land the interview.
            </p>
          </div>

          {/* Column 2: Navigation (SEO Internal Links) */}
          <div className="col-6 col-md-3 col-lg-3">
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

          {/* Column 3: Legal (Trust Signals for SEO) */}
          <div className="col-6 col-md-3 col-lg-3">
            <h5 className="fw-bold mb-3 small text-uppercase tracking-wider">
              Legal
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  href="/privacy"
                  className="text-decoration-none small text-muted"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/terms"
                  className="text-decoration-none small text-muted"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Market Positioning */}
          <div className="col-lg-3 text-lg-end">
            <h5 className="fw-bold mb-3 small text-uppercase tracking-wider">
              Connect
            </h5>
            <ul className="list-unstyled d-flex justify-content-lg-end gap-3 mb-4">
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
            <p className="small opacity-50">
              Built with precision for the 2026 job market.
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-top text-center opacity-50">
          <p className="small mb-0" suppressHydrationWarning>
            &copy; {currentYear} evellacreates. All rights reserved. Don&apos;t
            settle for AI-generated mediocrity.
          </p>
        </div>
      </div>
    </footer>
  );
}
