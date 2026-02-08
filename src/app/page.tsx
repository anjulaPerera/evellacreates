export default function Home() {
  return (
    <main className="min-h-[90vh] flex flex-col items-center justify-center bg-cream px-4">
      {/* Hero Content */}
      <div className="max-w-5xl w-full text-center space-y-10 py-20">
        <h2 className="text-primary text-6xl md:text-8xl font-black tracking-tighter leading-none">
          Stop letting <br />
          <span className="text-secondary italic">AI ghostwrite</span> <br />
          your career.
        </h2>

        <p className="text-primary/90 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
          I provide professional, human-crafted resumes and LinkedIn
          optimizations designed to beat ATS systems and land you the interview.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Primary Action Button */}
          <button className="bg-[#0B2D72] text-[#F6E7BC] px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-[#0992C2] transition-colors min-w-[240px]">
            Get My Custom Quote
          </button>

          {/* Secondary Action Button */}
          <button className="border-2 border-[#0B2D72] text-[#0B2D72] px-10 py-4 rounded-full font-bold text-xl hover:bg-[#0B2D72] hover:text-[#F6E7BC] transition-all min-w-[240px]">
            View Services
          </button>
        </div>
      </div>

      {/* Trust Bar - Positioned at the bottom of the hero area */}
      <div className="w-full max-w-6xl border-t border-primary/20 py-10 mt-10">
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-primary font-extrabold uppercase tracking-[0.2em] text-xs opacity-70">
          <span>✓ 100% Manual Writing</span>
          <span>✓ Result-Oriented Strategy</span>
          <span>✓ SEO Optimized Profile</span>
        </div>
      </div>
    </main>
  );
}
