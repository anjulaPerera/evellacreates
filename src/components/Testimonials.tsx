import React from "react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah J.",
      role: "Marketing Director",
      text: "I was struggling to get past the initial screening. After the rewrite, I landed three interviews in one week. The human touch makes a massive difference.",
      verified: true,
    },
    // More will come from the dashboard later
  ];

  return (
    <section id="testimonials" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold" style={{ color: "#0B2D72" }}>
            Real Success Stories
          </h2>
          <p className="text-muted">
            Verified feedback from professionals who bypassed the bots.
          </p>
        </div>
        <div className="row g-4">
          {reviews.map((rev, i) => (
            <div key={i} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {rev.name[0]}
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold">{rev.name}</h6>
                    <small className="text-muted">{rev.role}</small>
                  </div>
                </div>
                <p className="small italic text-muted">
                  &ldquo;{rev.text}&rdquo;
                </p>{" "}
                {rev.verified && (
                  <div className="mt-auto pt-3 border-top">
                    <span className="badge bg-success-subtle text-success small">
                      ✓ Verified Fiverr Client
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
