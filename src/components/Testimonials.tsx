"use client";

import React, { useState, useRef, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  is_verified: boolean;
}

interface TestimonialsProps {
  initialData: Testimonial[];
}

export default function Testimonials({ initialData }: TestimonialsProps) {
  // We use the data passed from the server
  const [testimonials] = useState<Testimonial[]>(initialData);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track button visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(initialData.length > 1);

  // Function to check scroll position and update button state
  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Use a small 5px buffer for better reliability
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollLimits);
      // Run once on mount to set initial button states
      checkScrollLimits();
    }
    return () => currentRef?.removeEventListener("scroll", checkScrollLimits);
  }, [testimonials]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 450;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // If no testimonials exist, don't show the section at all
  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="testimonial-section position-relative overflow-hidden"
    >
      <div className="container testimonial-container-relative">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold testimonial-title">
            What Clients Say
          </h2>
          <div className="title-underline mb-3"></div>
          <p className="text-muted">
            Proven results from professionals around the globe.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="d-none d-md-block">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="btn shadow-sm rounded-circle position-absolute top-50 translate-middle-y nav-btn btn-prev"
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="btn shadow-sm rounded-circle position-absolute top-50 translate-middle-y nav-btn btn-next"
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <div
          ref={scrollRef}
          className="testimonial-scroll-container no-scrollbar d-flex"
        >
          {testimonials.map((rev) => (
            <div key={rev.id} className="testimonial-card-wrapper">
              <div className="card h-100 border-0 shadow-sm p-4 position-relative overflow-hidden">
                <span className="position-absolute end-0 top-0 p-3 opacity-10 fw-bold quote-icon">
                  &rdquo;
                </span>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm testimonial-avatar">
                    {rev.name ? rev.name[0] : "C"}
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold">{rev.name}</h6>
                    <small className="text-muted small d-block">
                      {rev.role}
                    </small>
                  </div>
                </div>
                <p className="small text-secondary mb-4 testimonial-content">
                  &ldquo;{rev.content}&rdquo;
                </p>
                {rev.is_verified && (
                  <div className="mt-auto">
                    <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 border border-success-subtle verified-badge">
                      <i className="bi bi-patch-check-fill me-1"></i> Verified
                      Fiverr Client
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
