"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// --- PAYHERE TYPES ---
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

declare const payhere: PayHere;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPackage = searchParams.get("package") || "standard";

  const [userEmail, setUserEmail] = useState<string>("");

  // Price configuration aligned with your Pricing.tsx
  const priceMap: Record<string, { label: string; price: string }> = {
    basic: { label: "Basic Resume Pack", price: "30.00" },
    standard: { label: "Standard Resume Pack", price: "50.00" },
    premium: { label: "Premium Transformation", price: "80.00" },
  };

  const currentSelection =
    priceMap[selectedPackage.toLowerCase()] || priceMap.standard;

  // Fetch logged in user email from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
      } else {
        router.push(`/login?package=${selectedPackage}`);
      }
    };
    fetchUser();
  }, [router, selectedPackage]);

  const startPayment = () => {
    if (typeof payhere === "undefined") {
      alert("Payment gateway is still loading. Please wait a moment.");
      return;
    }

    // Set this to false when you are ready to accept real payments
    const isSandbox = true;

    const payment: PayHerePaymentObject = {
      sandbox: isSandbox,
      merchant_id: "1233959", // Your Merchant ID integrated
      return_url: `${window.location.origin}/dashboard?status=success`,
      cancel_url: `${window.location.origin}/checkout?package=${selectedPackage}`,
      notify_url: "https://evellacreates.com/api/payhere-webhook", // Replace with your actual domain later
      order_id: `EV-${Date.now()}`, // Unique order ID based on timestamp
      items: currentSelection.label,
      amount: currentSelection.price,
      currency: "USD",
      hash: "", // Sandbox does not require a hash. In production, you might need to generate one.
      first_name: "Customer",
      last_name: userEmail ? userEmail.split("@")[0] : "Client",
      email: userEmail,
      phone: "0771234567", // Default placeholder
      address: "Online Service",
      city: "Colombo",
      country: "Sri Lanka",
    };

    // Callback Handlers
    payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID:" + orderId);
      // Redirect to dashboard with success state
      router.push(`/dashboard?package=${selectedPackage}&payment=success`);
    };

    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed by user");
    };

    payhere.onError = function onError(error: string) {
      console.error("PayHere Error: " + error);
      alert("There was an error processing your payment. Please try again.");
    };

    payhere.startPayment(payment);
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card modern-card p-5 text-center shadow-sm border-0">
            <h2 className="fw-bold mb-4">Finalize Your Investment</h2>
            <p className="text-muted mb-5">
              Secure payment for your <strong>{currentSelection.label}</strong>.
            </p>

            <div className="bg-light p-4 rounded-4 mb-5">
              <div className="d-flex justify-content-between mb-2 text-uppercase small opacity-75">
                <span>Selected Service:</span>
                <span className="fw-bold">{currentSelection.label}</span>
              </div>
              <div className="d-flex justify-content-between h3 fw-bold mb-0">
                <span>Total Amount:</span>
                <span>${currentSelection.price}</span>
              </div>
            </div>

            <button
              onClick={startPayment}
              className="btn btn-evella-primary btn-lg w-100 py-3 fw-bold shadow-sm mb-3"
            >
              Pay with PayHere
            </button>

            <p className="small text-muted">
              <i className="bi bi-shield-lock me-1"></i> Secure encrypted
              payment via PayHere
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 mt-5 text-center">
          Preparing Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
