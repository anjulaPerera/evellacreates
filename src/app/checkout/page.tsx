"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const startPayment = () => {
    // This object follows the PayHere SDK requirements
    const payment = {
      sandbox: true, // IMPORTANT: Set to false when moving to production
      merchant_id: "YOUR_MERCHANT_ID", // Replace with your actual PayHere Merchant ID
      return_url: `${window.location.origin}/dashboard`,
      cancel_url: `${window.location.origin}/checkout`,
      notify_url: "https://your-domain.com/api/payhere-webhook",
      order_id: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      items: "Professional Resume Package",
      amount: "50.00",
      currency: "USD",
      hash: "", // Leave empty for Sandbox testing
      first_name: "Client",
      last_name: "User",
      email: "client@example.com",
      phone: "0771234567",
      address: "Online Service",
      city: "Colombo",
      country: "Sri Lanka",
    };

    // Trigger the PayHere Modal
    // @ts-expect-error - payhere is loaded via external script in layout.tsx
    payhere.startPayment(payment);

    // Handle Payment Completion
    // @ts-expect-error - payhere is loaded via external script
    payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID: " + orderId);
      router.push("/dashboard?payment=success");
    };

    // Handle Modal Dismissal
    // @ts-expect-error - payhere is loaded via external script
    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed by user");
    };

    // Handle Errors
    // @ts-expect-error - payhere is loaded via external script
    payhere.onError = function onError(error: string) {
      console.error("PayHere Error: " + error);
    };
  };

  return (
    <main className="container py-5 mt-5">
      <div className="card modern-card p-5 text-center shadow-sm border-0">
        <h2 className="fw-bold mb-4">Finalize Your Investment</h2>
        <p className="text-muted mb-5">
          You&rsquo;re one step away from a human-crafted career transformation.
          Secure payment is processed via PayHere.
        </p>

        <div
          className="bg-light p-4 rounded-4 mb-5 mx-auto"
          style={{ maxWidth: "400px" }}
        >
          <div className="d-flex justify-content-between mb-2">
            <span className="opacity-75">Service:</span>
            <span className="fw-bold text-primary">Standard Resume Pack</span>
          </div>
          <div className="d-flex justify-content-between h4 fw-bold mb-0">
            <span>Total:</span>
            <span>$50.00</span>
          </div>
        </div>

        <button
          onClick={startPayment}
          className="btn btn-evella-primary btn-lg px-5 py-3 fw-bold shadow"
          title="Click to open the secure payment modal"
        >
          Pay Securely Now
        </button>
      </div>
    </main>
  );
}
