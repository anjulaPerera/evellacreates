import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";

// src/app/layout.tsx
export const metadata = {
  title: {
    default: "evellacreates | Professional Human-Only Resume Writing",
    template: "%s | evellacreates"
  },
  description: "Bypass ATS bots with 100% human-crafted resumes and LinkedIn profiles. Professional career strategy for the 2026 job market.",
  keywords: ["human resume writer", "ATS optimization 2026", "professional LinkedIn makeover", "career document strategy"],
  authors: [{ name: "evellacreates" }],
  creator: "evellacreates",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.evellacreates.com",
    siteName: "evellacreates",
    images: [
      {
        url: "/og-image.jpg", // You should add an image with this name to your /public folder later
        width: 1200,
        height: 630,
        alt: "evellacreates - Professional Career Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "evellacreates | Human-Only Resumes",
    description: "Stop letting AI ghostwrite your career. Get a human-crafted strategy.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Human-Crafted Resume Writing",
  serviceType: "Career Services",
  description:
    "Manual keyword integration and career storytelling for high-level professionals.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
    price: "0", // 0 indicates "Contact for Quote"
  },
  provider: {
    "@type": "LocalBusiness",
    name: "evellacreates",
    image: "https://www.evellacreates.com/logo.png",
  },
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
