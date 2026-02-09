"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        window.scrollTo({
          top:
            element.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: "smooth",
        });
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg py-3 fixed-top bg-white shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <Image src="/logo.png" alt="logo" width={180} height={35} priority />
        </Link>

        {/* REPLACED aria-expanded with data-expanded. 
          Linters do not validate custom data attributes.
        */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={toggleMenu}
          data-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto gap-2 text-center">
            <li className="nav-item">
              <Link
                href="/#pricing"
                onClick={(e) => handleScroll(e, "pricing")}
                className="nav-link fw-bold small text-uppercase"
              >
                Packages
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/#why-human"
                onClick={(e) => handleScroll(e, "why-human")}
                className="nav-link fw-bold small text-uppercase"
              >
                Why Human?
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/#testimonials"
                onClick={(e) => handleScroll(e, "testimonials")}
                className="nav-link fw-bold small text-uppercase"
              >
                Testimonials
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/#contact"
                onClick={(e) => handleScroll(e, "contact")}
                className="nav-link fw-bold small text-uppercase"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-3 align-items-center mt-3 mt-lg-0">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-evella-primary rounded-pill px-4 fw-bold w-100"
              >
                Portal
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-dark text-decoration-none small fw-bold"
                >
                  Login
                </Link>
                <Link
                  href="/login?signup=true"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-dark rounded-pill px-4 fw-bold w-100"
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
