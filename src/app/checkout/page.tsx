"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// 1. Define strict interfaces to avoid 'any'
interface PayHerePaymentObject {
  sandbox: boolean;
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string | number;
  currency: string;
  hash: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

interface PayHere {
  startPayment: (payment: PayHerePaymentObject) => void;
  onCompleted: (orderId: string) => void;
  onDismissed: () => void;
  onError: (error: string) => void;
}

// 2. Declare the global payhere constant (provided by the script in layout)
declare const payhere: PayHere;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "standard";

  // Price configuration aligned with your Pricing.tsx
  const priceMap: Record<string, { label: string; price: string }> = {
    basic: { label: "Basic Resume Pack", price: "30.00" },
    standard: { label: "Standard Resume Pack", price: "50.00" },
    premium: { label: "Premium Transformation", price: "80.00" },
  };

  const currentSelection =
    priceMap[selectedPackage.toLowerCase()] || priceMap.standard;

  const startPayment = () => {
    const payment: PayHerePaymentObject = {
      sandbox: true, // Set to false for production
      merchant_id: "YOUR_MERCHANT_ID", // TODO: Replace with your actual ID
      return_url: `${window.location.origin}/dashboard?status=success`,
      cancel_url: `${window.location.origin}/checkout?package=${selectedPackage}`,
      notify_url: "https://your-domain.com/api/payhere-webhook",
      order_id: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      items: currentSelection.label,
      amount: currentSelection.price,
      currency: "USD",
      hash: "", // Sandbox doesn't require hash
      first_name: "Client",
      last_name: "User",
      email: "client@example.com",
      phone: "0771234567",
      address: "Online Service",
      city: "Colombo",
      country: "Sri Lanka",
    };

    if (typeof payhere !== "undefined") {
      // Callback handlers
      payhere.onCompleted = (orderId: string) => {
        console.log("Payment completed. OrderID:" + orderId);
        window.location.href = `/dashboard?package=${selectedPackage}&payment=success`;
      };

      payhere.onDismissed = () => {
        console.log("Payment dismissed");
      };

      payhere.onError = (error: string) => {
        console.error("PayHere Error: " + error);
        alert("Payment failed. Please try again.");
      };

      payhere.startPayment(payment);
    } else {
      alert("Payment gateway is loading. Please try again in a second.");
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="card modern-card p-5 text-center shadow-sm border-0">
        <h2 className="fw-bold mb-4">Finalize Your Investment</h2>
        <p className="text-muted mb-5">
          Secure payment for your <strong>{currentSelection.label}</strong>.
        </p>

        <div
          className="bg-light p-4 rounded-4 mb-5 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <div className="d-flex justify-content-between mb-2 text-uppercase small opacity-75">
            <span>Service:</span>
            <span className="fw-bold">{currentSelection.label}</span>
          </div>
          <div className="d-flex justify-content-between h3 fw-bold mb-0">
            <span>Total:</span>
            <span>${currentSelection.price}</span>
          </div>
        </div>

        <button
          onClick={startPayment}
          className="btn btn-evella-primary btn-lg w-100 py-3 fw-bold shadow-sm"
        >
          Pay with PayHere
        </button>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="p-5 text-center">Preparing Checkout...</div>}
    >
      <CheckoutContent />
    </Suspense>
  );
}
