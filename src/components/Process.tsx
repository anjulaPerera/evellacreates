import React from "react";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Strategy Consultation",
      text: "We begin with a deep dive into your career goals. I don&apos;t just look at your history; I look at where you want to go next.",
    },
    {
      number: "02",
      title: "Human-Centric Drafting",
      text: "I manually craft your documents from scratch. No templates, no AI generators—just strategic storytelling tailored to your industry.",
    },
    {
      number: "03",
      title: "Collaborative Refinement",
      text: "We review the drafts together. I provide unlimited minor tweaks until your new professional brand feels exactly like you.",
    },
  ];

  return (
    <section id="process" className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">The Human Process</h2>
        <p className="opacity-75">
          Exactly how we turn your experience into an irresistible career
          narrative.
        </p>
      </div>

      <div className="row g-4">
        {steps.map((step, index) => (
          <div key={index} className="col-lg-4">
            <div
              className="p-4 h-100 position-relative"
              style={{ borderLeft: "1px solid rgba(11, 45, 114, 0.1)" }}
            >
              <span className="display-4 fw-bold opacity-10 position-absolute top-0 end-0 pe-4">
                {step.number}
              </span>
              <h3 className="h4 fw-bold mb-3 mt-2">{step.title}</h3>
              <p className="text-muted small lh-lg">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
