"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const sponsors = [
  { id: 1, name: "A2B", logo: "/sponsors/a2b.png" },
  { id: 2, name: "Bank of Baroda", logo: "/sponsors/bob.png" },
  { id: 3, name: "Canara Bank", logo: "/sponsors/canara_bank.png" },
  { id: 4, name: "Cigniti", logo: "/sponsors/cigniti.png" },
  { id: 5, name: "CodeChef", logo: "/sponsors/codechef.jpg" },
  { id: 6, name: "Contentstack", logo: "/sponsors/contentstack.jpg" },
  { id: 7, name: "CSK", logo: "/sponsors/csk.webp" },
  { id: 8, name: "Cyient", logo: "/sponsors/cyient.png" },
  { id: 9, name: "Devfolio", logo: "/sponsors/devfolio.webp" },
  { id: 10, name: "Green Trends", logo: "/sponsors/green_trends.webp" },
  { id: 11, name: "HDFC Bank", logo: "/sponsors/hdfc.png" },
  { id: 12, name: "Indian Bank", logo: "/sponsors/indian_bank.jpg" },
  { id: 13, name: "IOB", logo: "/sponsors/iob.jpg" },
  { id: 14, name: "Lightcast", logo: "/sponsors/lightcast.png" },
  { id: 15, name: "MTV", logo: "/sponsors/mtv.webp" },
  { id: 16, name: "Panasonic", logo: "/sponsors/panasonic.png" },
  { id: 17, name: "PNB", logo: "/sponsors/pnb.png" },
  { id: 18, name: "SBI", logo: "/sponsors/sbi.png" },
  { id: 19, name: "The Souled Store", logo: "/sponsors/souled_store.png" },
  { id: 20, name: "TNPL", logo: "/sponsors/tnpl.jpg" },
  { id: 21, name: "Unstop", logo: "/sponsors/unstop.jpg" },
  { id: 22, name: "VH1", logo: "/sponsors/vh1.png" },
  { id: 23, name: "Zebronics", logo: "/sponsors/zebronics.webp" },
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative overflow-hidden py-20 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            className={`text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-1000 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #e65100, #c62828, #4a148c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our
            </span>{" "}
            <span style={{ color: "var(--savara-cream)" }}>Sponsors</span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl font-medium transition-all duration-1000 delay-200 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "rgba(245, 230, 211, 0.9)",
            }}
          >
            Proudly supported by industry leaders
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Call to action */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <p
            className="mb-4 text-sm font-medium"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "rgba(245, 230, 211, 0.9)",
            }}
          >
            Interested in sponsoring SAVĀRA?
          </p>
          <div
            className="group relative inline-flex overflow-hidden rounded-full p-0.5"
            style={{
              background: "linear-gradient(135deg, #e65100, #c62828, #4a148c)",
            }}
          >
            <div
              className="rounded-full px-6 py-3 transition-all duration-300 group-hover:bg-transparent"
              style={{ background: "var(--savara-warm-black)" }}
            >
              <span
                className="text-sm font-bold uppercase tracking-widest group-hover:text-white"
                style={{
                  background: "linear-gradient(135deg, #e65100, #d4a574, #4a148c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Become a Sponsor
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(74, 20, 140, 0.4), rgba(230, 81, 0, 0.4), transparent)",
        }}
      />
    </section>
  );
}

function SponsorCard({
  sponsor,
  index,
  isVisible,
}: {
  sponsor: { id: number; name: string; logo: string };
  index: number;
  isVisible: boolean;
}) {
  const delay = 300 + index * 50;

  return (
    <div
      className={`group relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{
        transitionDelay: `${delay}ms`,
        border: "1px solid rgba(212, 165, 116, 0.1)",
        background: "rgba(42, 31, 26, 0.3)",
        boxShadow: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(230, 81, 0, 0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(230, 81, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(212, 165, 116, 0.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Logo area */}
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <div className="relative h-48 w-full mb-2 flex items-center justify-center">
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      </div>

      {/* Hover shine effect */}
      <div
        className="absolute inset-0 -translate-x-full skew-x-12 transition-transform duration-700 group-hover:translate-x-full"
        style={{
          background: "linear-gradient(to right, transparent, rgba(212, 165, 116, 0.05), transparent)",
        }}
      />
    </div>
  );
}
