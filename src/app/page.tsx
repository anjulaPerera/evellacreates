import React from "react";
import Hero from "@/components/Hero";
import WhyHuman from "@/components/WhyHuman";
import Process from "@/components/Process"; // New
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Fetch data on the server
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

   if (error) {
     // Option A: Just the message (Cleanest)
     console.error("Supabase error:", error.message);

     // Option B: If you want to see everything safely
    //  console.error("Supabase error:", JSON.stringify(error, null, 2));
   }
  return (
    <>
      <main>
        <Hero />
        <WhyHuman />
        <Process />
        <Services />
        <Testimonials initialData={testimonials || []} />
        <ContactForm />
      </main>
      {/* <Footer /> */}
    </>
  );
}
