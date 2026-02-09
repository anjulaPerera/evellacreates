"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status for Login/Signup vs Dashboard buttons
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkUser();
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    // Only scroll if we are on the home page
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);

        // Close mobile menu after clicking (Bootstrap native)
        const menu = document.getElementById("navbarNav");
        if (menu?.classList.contains("show")) {
          const btn = document.querySelector(".navbar-toggler") as HTMLElement;
          btn?.click();
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-sticky py-3 fixed-top bg-white shadow-sm">
      <div className="container">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="navbar-brand logo-wrapper"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={35}
            priority
            className="logo-img"
          />
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-2">
            <li className="nav-item">
              <a
                href={pathname === "/" ? "#pricing" : "/#pricing"}
                onClick={(e) => handleScroll(e, "pricing")}
                className="nav-link fw-semibold text-uppercase small nav-link-custom"
              >
                Packages
              </a>
            </li>
            <li className="nav-item">
              <a
                href={pathname === "/" ? "#why-human" : "/#why-human"}
                onClick={(e) => handleScroll(e, "why-human")}
                className="nav-link fw-semibold text-uppercase small nav-link-custom"
              >
                Why Human?
              </a>
            </li>
            <li className="nav-item">
              <a
                href={pathname === "/" ? "#testimonials" : "/#testimonials"}
                onClick={(e) => handleScroll(e, "testimonials")}
                className="nav-link fw-semibold text-uppercase small nav-link-custom"
              >
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a
                href={pathname === "/" ? "#contact" : "/#contact"}
                onClick={(e) => handleScroll(e, "contact")}
                className="nav-link fw-semibold text-uppercase small nav-link-custom"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex gap-2 mt-3 mt-lg-0">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="btn btn-evella-primary px-4 rounded-pill fw-bold w-100 w-lg-auto"
              >
                Portal
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-link text-decoration-none text-dark fw-bold small"
                >
                  Login
                </Link>
                <Link
                  href="/login?signup=true"
                  className="btn btn-dark px-4 rounded-pill fw-bold small"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
