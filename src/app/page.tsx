import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-cream py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary text-5xl md:text-6xl font-extrabold leading-tight">
            Stop letting <span className="text-secondary">AI ghostwrite</span>{" "}
            your career.
          </h2>
          <p className="mt-6 text-primary/80 text-xl max-w-2xl mx-auto">
            I provide professional, human-crafted resumes and LinkedIn
            optimizations designed to beat ATS systems and land you the
            interview.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#contact"
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-all shadow-xl"
            >
              Get My Custom Quote
            </Link>
            <Link
              href="#services"
              className="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-all"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar (SEO focused) */}
      <section className="py-8 bg-white w-full border-b flex justify-center space-x-12 opacity-60 grayscale">
        <span className="font-bold text-primary italic underline">
          100% Manual Writing
        </span>
        <span className="font-bold text-primary italic underline">
          Result-Oriented Strategy
        </span>
        <span className="font-bold text-primary italic underline">
          SEO Optimized Profile
        </span>
      </section>
    </div>
  );
}
