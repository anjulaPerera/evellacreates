"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface PayHerePaymentObject {
  sandbox: boolean;
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string;
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
  const orderId = searchParams.get("orderId");

  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      if (user) setUserEmail(user.email || "");
      else router.push(`/login?package=${selectedPackage}`);
    };
    fetchUser();
  }, [router, selectedPackage]);

  const startPayment = async (): Promise<void> => {
    if (!orderId) return alert("Order ID is missing.");
    setLoading(true);

    try {
      // 1. Fetch the hash using LKR
      const response = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId,
          amount: currentSelection.price,
          currency: "LKR",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Hash generation failed");

      const payment: PayHerePaymentObject = {
        sandbox: true,
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || "1233959",
        return_url: `${window.location.origin}/dashboard?status=success`,
        cancel_url: window.location.href,
        notify_url: "https://evellacreates.com/api/payhere",
        order_id: orderId,
        items: currentSelection.label,
        amount: currentSelection.price,
        currency: "LKR",
        hash: data.hash,
        first_name: "Customer",
        last_name: userEmail ? userEmail.split("@")[0] : "Client",
        email: userEmail,
        phone: "0771234567",
        address: "Online Service",
        city: "Colombo",
        country: "Sri Lanka",
      };

      console.log("DEBUG: Final Payment Object:", payment);

      payhere.onCompleted = () => router.push(`/dashboard?payment=success`);
      payhere.onDismissed = () => setLoading(false);
      payhere.onError = (err) => {
        setLoading(false);
        console.error("PayHere Error:", err);
      };

      payhere.startPayment(payment);
    } catch (err) {
      console.error("Payment Process Error:", err);
      setLoading(false);
    }
  };

  return (
    <main className="container py-5 mt-5 text-center">
      <div
        className="card p-5 shadow-sm border-0 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="fw-bold mb-4">Finalize Investment</h2>
        <div className="bg-light p-4 rounded mb-4">
          <h3 className="fw-bold mb-0">LKR {currentSelection.price}</h3>
        </div>
        <button
          onClick={startPayment}
          disabled={loading}
          className="btn btn-primary btn-lg w-100 py-3"
        >
          {loading ? "Processing..." : "Invest Now"}
        </button>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
