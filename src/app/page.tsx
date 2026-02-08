import React from "react";
import Hero from "@/components/Hero";
import WhyHuman from "@/components/WhyHuman";
import Process from "@/components/Process"; // New
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { supabase } from "@/lib/supabase";
import { error } from "console";

export default async function Home() {
  // Fetch data on the server
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
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
