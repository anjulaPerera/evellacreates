import React from "react";
import Hero from "@/components/Hero";
import WhyHuman from "@/components/WhyHuman";
import Process from "@/components/Process"; // New
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <WhyHuman />
        <Process />
        <Services />
        <ContactForm />
      </main>
      {/* <Footer /> */}
    </>
  );
}
