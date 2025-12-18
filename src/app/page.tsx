"use client";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Sponsors from "@/components/Sponsors";
import Timeline from "@/components/Timeline";
import CountdownTimer from "@/components/CountdownTImer";
import Logo3D from "@/components/Logo3D";

export default function Home() {
  // Set target date to 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  return (
    <>
      {/* <CountdownTimer targetDate={targetDate} /> */}
      <Logo3D />

      <AboutSection />

      {/* Timeline Section */}
      {/* <Timeline /> */}

      <Sponsors />

      <Footer />
    </>
  );
}

