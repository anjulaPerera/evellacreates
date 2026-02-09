"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js"; // Import the official type

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // Specific type instead of any
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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
            Since you&apos;ve logged in, we can now link your career details to
            your account.
          </p>
          {/* We will update this button in Step #3 */}
          <button className="btn btn-evella-primary">Start Order Form</button>
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
