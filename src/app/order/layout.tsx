import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Complete Your Order",
  description:
    "Provide your career details and resume to start your human-crafted transformation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
