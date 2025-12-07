"use client";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Sponsors from "@/components/Sponsors";
import Timeline from "@/components/Timeline"; // <-- added
import CountdownTimer from "@/components/CountdownTImer";

export default function Home() {
  // Set target date to 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <>
      <CountdownTimer targetDate={targetDate} />

      <AboutSection />

      {/* Timeline Section */}
      <Timeline />

      <Sponsors />

      <Footer />
    </>
  );
}

