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
  const orderId = searchParams.get("orderId"); // <--- GET DB ID

  const [userEmail, setUserEmail] = useState<string>("");

  const priceMap: Record<string, { label: string; price: string }> = {
    basic: { label: "Basic Resume Pack", price: "30.00" },
    standard: { label: "Standard Resume Pack", price: "50.00" },
    premium: { label: "Premium Transformation", price: "80.00" },
  };

  const currentSelection =
    priceMap[selectedPackage.toLowerCase()] || priceMap.standard;

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
      alert("Payment gateway is loading...");
      return;
    }

    if (!orderId) {
      alert("No valid order found. Please restart the process.");
      return;
    }

    const payment: PayHerePaymentObject = {
      sandbox: true,
      merchant_id: "1233959",
      return_url: `${window.location.origin}/dashboard?status=success`,
      cancel_url: `${window.location.origin}/checkout?package=${selectedPackage}&orderId=${orderId}`,
      notify_url: "https://evellacreates.com/api/payhere-webhook",
      order_id: orderId, // Use the real DB UUID
      items: currentSelection.label,
      amount: currentSelection.price,
      currency: "USD",
      hash: "",
      first_name: "Customer",
      last_name: userEmail ? userEmail.split("@")[0] : "Client",
      email: userEmail,
      phone: "0771234567",
      address: "Online Service",
      city: "Colombo",
      country: "Sri Lanka",
    };

    payhere.onCompleted = (oid) =>
      router.push(`/dashboard?package=${selectedPackage}&payment=success`);
    payhere.onDismissed = () => console.log("Dismissed");
    payhere.onError = (err) => alert("Payment error: " + err);

    payhere.startPayment(payment);
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card modern-card p-5 text-center shadow-sm border-0">
            <h2 className="fw-bold mb-4">Finalize Your Investment</h2>
            <p className="text-muted mb-5">
              Package: <strong>{currentSelection.label}</strong>
            </p>
            <div className="bg-light p-4 rounded-4 mb-5">
              <div className="d-flex justify-content-between h3 fw-bold mb-0">
                <span>Total:</span>
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
              <i className="bi bi-shield-lock me-1"></i> Secure via PayHere
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
