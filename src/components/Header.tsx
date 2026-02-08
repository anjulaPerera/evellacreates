import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg py-4">
      <div className="container">
        {/* LOGO AREA */}
        <Link
          href="/"
          className="navbar-brand fw-bold fs-3"
          style={{ color: "#0B2D72", letterSpacing: "-1px" }}
        >
          evella<span style={{ color: "#0992C2" }}>creates</span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="d-flex gap-4 align-items-center">
          <Link
            href="#services"
            className="nav-link fw-semibold text-uppercase small tracking-wider"
            style={{ color: "#0B2D72" }}
          >
            Services
          </Link>
          <Link
            href="#why-human"
            className="nav-link fw-semibold text-uppercase small tracking-wider"
            style={{ color: "#0B2D72" }}
          >
            Why Human?
          </Link>
          <Link
            href="#contact"
            className="btn btn-sm px-4 py-2 rounded-pill fw-bold"
            style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
