import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Secure Checkout | evellacreates",
  description:
    "Complete your payment securely to begin your resume transformation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
