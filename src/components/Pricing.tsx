"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const packages = [
  {
    name: "Basic",
    price: "30",
    description: "Perfect for a targeted job search.",
    features: [
      "Resume Only",
      "10 Revisions",
      "ATS Score Sheet",
      "48-Hour Delivery",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "50",
    description: "The complete application toolkit.",
    features: [
      "Resume + Cover Letter",
      "10 Revisions",
      "ATS Score Sheet",
      "48-Hour Delivery",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "80",
    description: "Full brand transformation.",
    features: [
      "Resume + CL + LinkedIn",
      "Unlimited Revisions",
      "ATS Score Sheet",
      "3-Day Priority Delivery",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const router = useRouter();

  const handleSelect = async (pkgName: string) => {
    const pkg = pkgName.toLowerCase();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push(`/dashboard?package=${pkg}`);
    } else {
      router.push(`/login?package=${pkg}`);
    }
  };

  return (
    <section id="pricing" className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Choose Your Package</h2>
        <p className="opacity-75">
          Invest in a career strategy that pays for itself.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {packages.map((pkg, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div
              className={`card h-100 modern-card p-4 ${pkg.popular ? "border border-primary border-2 shadow-lg" : ""}`}
            >
              {pkg.popular && (
                <span className="badge bg-primary rounded-pill position-absolute top-0 start-50 translate-middle">
                  MOST POPULAR
                </span>
              )}
              <div className="card-body d-flex flex-column">
                <h3 className="h4 fw-bold mb-2">{pkg.name}</h3>
                <div className="d-flex align-items-baseline mb-3">
                  <span className="h2 fw-bold mb-0">${pkg.price}</span>
                  <span className="text-muted ms-1">LKR</span>
                </div>
                <p className="text-muted small mb-4">{pkg.description}</p>
                <ul className="list-unstyled mb-5 flex-grow-1">
                  {pkg.features.map((f, i) => (
                    <li
                      key={i}
                      className="mb-3 small d-flex align-items-center"
                    >
                      <i className="bi bi-check2-circle text-primary me-2"></i>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn btn-lg rounded-pill fw-bold ${pkg.popular ? "btn-evella-primary" : "btn-outline-dark"}`}
                  onClick={() => handleSelect(pkg.name)}
                >
                  Select {pkg.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
