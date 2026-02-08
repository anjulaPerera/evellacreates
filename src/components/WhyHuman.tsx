import React from "react";

export default function WhyHuman() {
  const benefits = [
    {
      title: "Context over Keywords",
      text: "AI simply stuffs keywords. I understand the context of your achievements and how they solve a company&apos;s specific problems.",
    },
    {
      title: "Emotional Intelligence",
      text: "I write for the human recruiter who reads your resume after the ATS. AI can&apos;t replicate the subtle art of persuasion.",
    },
    {
      title: "Unique Voice",
      text: "Every AI resume looks and sounds the same. I ensure your unique career story and personality shine through every sentence.",
    },
  ];

  return (
    <section id="why-human" className="py-5 bg-white shadow-sm">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold mb-4">Why Human-Only?</h2>
            <p className="lead opacity-75">
              In 2026, recruiters are flooded with generic AI content. To stand
              out, you need a document that feels alive.
            </p>
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="col-md-6">
                  <div className="p-4 rounded-4 border-start border-4 border-info bg-light h-100">
                    <h4 className="fw-bold h5">{benefit.title}</h4>
                    <p className="small mb-0 opacity-75">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
