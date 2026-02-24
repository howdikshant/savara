import dynamic from "next/dynamic";
import Logo3D from "@/components/Logo3D";

const WhatIsSavara = dynamic(() => import("@/components/WhatIsSavara"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const Sponsors = dynamic(() => import("@/components/Sponsors"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Logo3D />
      <WhatIsSavara />
      <AboutSection />
      <Sponsors />
      <Footer />
    </>
  );
}
