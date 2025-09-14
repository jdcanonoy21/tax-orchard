import React from "react";
import Section from "../components/Section";
import Hero from "../components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <Section title="Welcome to Next.js!" />
      <Section title="Section 2" />
      <Section title="Section 3" />
      <Section title="Section 4" />
    </main>
  );
}
