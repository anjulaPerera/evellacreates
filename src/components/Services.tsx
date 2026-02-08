import React from "react";

export default function Services() {
  const services = [
    {
      title: "ATS-Optimized Resume",
      description:
        "Manual keyword integration to bypass automated filters and land on a recruiter&apos;s desk.",
      price: "Custom Quote",
    },
    {
      title: "LinkedIn Transformation",
      description:
        "A professional profile makeover designed to attract recruiters and build your personal brand.",
      price: "Custom Quote",
    },
    {
      title: "Cover Letter Crafting",
      description:
        "Tailored narratives that show your human personality and specific value to a company.",
      price: "Custom Quote",
    },
  ];

  return (
    <section id="services" className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Services</h2>
        <p className="opacity-75">
          Tailored solutions for every stage of your job search.
        </p>
      </div>
      <div className="row g-4">
        {services.map((service, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 modern-card p-4">
              <div className="card-body">
                <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                <p className="text-muted small mb-4">{service.description}</p>
                <span className="fw-bold text-info">{service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
