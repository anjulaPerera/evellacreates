import React from "react";
import Hero from "@/components/Hero";
import WhyHuman from "@/components/WhyHuman";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";


export default function Home() {
  return (
    <main>
      <Hero />
      <WhyHuman />
      <Services />
      <ContactForm />
    </main>
  );
}
