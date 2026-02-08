"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    // If we're already on the home page, prevent the default "jump"
    e.preventDefault();

    const element = document.getElementById(targetId);
    if (element) {
      // Offset calculation for the sticky header
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Updates URL without refreshing the page
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-sticky py-3">
      <div className="container">
        {/* BEST PRACTICE: Use Link for the main logo/home navigation */}
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/logo.png"
            alt="evellacreates logo"
            width={230}
            height={40}
            priority
          />
        </Link>

        <div className="d-flex gap-4 align-items-center">
          {/* Use <a> for fragment links to allow custom smooth-scroll logic */}
          <a
            href="#services"
            onClick={(e) => handleScroll(e, "services")}
            className="nav-link fw-semibold text-uppercase small tracking-wider"
            style={{ color: "#0B2D72" }}
          >
            Services
          </a>
          <a
            href="#why-human"
            onClick={(e) => handleScroll(e, "why-human")}
            className="nav-link fw-semibold text-uppercase small tracking-wider"
            style={{ color: "#0B2D72" }}
          >
            Why Human?
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="btn btn-sm px-4 py-2 rounded-pill fw-bold"
            style={{ backgroundColor: "#0B2D72", color: "#F6E7BC" }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
