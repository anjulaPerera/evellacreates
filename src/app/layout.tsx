import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "evellacreates | Human-Crafted Resumes & LinkedIn Optimization",
  description:
    "Stand out in 2026 with manual, ATS-optimized career documents. No AI fluff, just human strategy to get you hired.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Resume Writing, Cover Letter Writing, LinkedIn Profile Optimization and Career Coaching",
    provider: {
      "@type": "LocalBusiness",
      name: "evellacreates",
      url: "https://www.evellacreates.com",
    },
    areaServed: "Worldwide",
    description:
      "Professional human-crafted resumes and LinkedIn optimizations.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
