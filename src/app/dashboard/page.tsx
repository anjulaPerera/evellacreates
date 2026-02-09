"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // 1. Get the package from the URL
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "standard";

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center">
        Loading your portal...
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <div className="card modern-card p-5 shadow-lg border-0">
        <h1 className="fw-bold">Welcome, {user?.email}!</h1>
        <p className="text-muted">
          You are now logged into your secure Client Portal.
        </p>
        <hr className="my-4 opacity-10" />

        <div className="bg-light p-4 rounded-4 mb-4">
          <h5 className="fw-bold mb-2">Next Step: Complete Your Order</h5>
          <p className="small text-secondary">
            You have selected the <strong>{selectedPackage}</strong> package.
            Click below to finish your profile.
          </p>
          {/* 2. Pass the package name to the Order page link */}
          <Link
            href={`/order?package=${selectedPackage}`}
            className="btn btn-evella-primary"
          >
            Start{" "}
            {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}{" "}
            Order Form
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm rounded-pill"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// Wrapped in Suspense because useSearchParams() requires it in Next.js
export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 mt-5 text-center">Loading...</div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
