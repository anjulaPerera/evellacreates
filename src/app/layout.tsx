import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google"; // Import the font loader
import Header from "@/components/Header";
import Footer from "@/components/Footer";


// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "evellacreates | Professional Human-Only Resume Writing",
    template: "%s | evellacreates",
  },
  description:
    "Bypass ATS bots with 100% human-crafted resumes and LinkedIn profiles. Professional career strategy for the 2026 job market.",
  keywords: [
    "human resume writer",
    "ATS optimization 2026",
    "professional LinkedIn makeover",
    "career document strategy",
  ],
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
    description:
      "Stop letting AI ghostwrite your career. Get a human-crafted strategy.",
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
    <html lang="en" className={inter.className}>
      {/* Apply font class to HTML */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* We removed the Google Fonts <link> tags from here */}
      </head>
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
