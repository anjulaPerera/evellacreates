"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Function for smooth scrolling to sections
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  // Logic for the Logo: Scroll to top if on Home, otherwise navigate Home
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-sticky py-3">
      <div className="container">
        {/* Logo with Scroll-to-Top logic */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="navbar-brand d-flex align-items-center logo-wrapper"
        >
          <Image
            src="/logo.png"
            alt="evellacreates logo"
            width={230}
            height={40}
            priority
            className="logo-img"
          />
        </Link>

        <div className="d-flex gap-4 align-items-center">
          <a
            href="#services"
            onClick={(e) => handleScroll(e, "services")}
            className="nav-link fw-semibold text-uppercase small tracking-wider nav-link-custom"
          >
            Services
          </a>
          <a
            href="#why-human"
            onClick={(e) => handleScroll(e, "why-human")}
            className="nav-link fw-semibold text-uppercase small tracking-wider nav-link-custom"
          >
            Why Human?
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="btn btn-evella-nav px-4 py-2 rounded-pill fw-bold"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
