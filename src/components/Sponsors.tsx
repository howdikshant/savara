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

// Floating shapes configuration
const shapes = [
  { type: "circle", size: 60, x: 10, y: 20, duration: 20, delay: 0 },
  { type: "square", size: 40, x: 85, y: 15, duration: 25, delay: 2 },
  { type: "triangle", size: 50, x: 75, y: 70, duration: 22, delay: 4 },
  { type: "circle", size: 30, x: 20, y: 80, duration: 18, delay: 1 },
  { type: "square", size: 25, x: 50, y: 10, duration: 30, delay: 3 },
  { type: "triangle", size: 35, x: 5, y: 50, duration: 24, delay: 5 },
  { type: "circle", size: 45, x: 90, y: 45, duration: 28, delay: 2 },
  { type: "square", size: 55, x: 40, y: 85, duration: 20, delay: 0 },
];

function FloatingShape({
  type,
  size,
  x,
  y,
  duration,
  delay,
}: {
  type: string;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}) {
  const shapeStyles: React.CSSProperties = {
    position: "absolute",
    left: `${x}%`,
    top: `${y}%`,
    width: size,
    height: size,
    animation: `float-${type} ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  };

  if (type === "circle") {
    return (
      <div
        style={shapeStyles}
        className="rounded-full border border-orange-500/10 bg-linear-to-br from-orange-500/5 to-pink-500/5"
      />
    );
  }

  if (type === "square") {
    return (
      <div
        style={{ ...shapeStyles, transform: "rotate(45deg)" }}
        className="rounded-md border border-purple-500/10 bg-linear-to-br from-purple-500/5 to-blue-500/5"
      />
    );
  }

  if (type === "triangle") {
    return (
      <div
        style={{
          ...shapeStyles,
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid rgba(236, 72, 153, 0.05)`,
        }}
      />
    );
  }

  return null;
}

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
      className="relative overflow-hidden bg-linear-to-b from-black via-zinc-950 to-zinc-900 py-20 sm:py-32"
    >
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
        <div className="absolute -left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            className={`text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our
            </span>{" "}
            <span className="text-zinc-100">Sponsors</span>
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-zinc-500 transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
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
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4 text-sm text-zinc-500">
            Interested in sponsoring Fest &apos;26?
          </p>
          <div className="group relative inline-flex overflow-hidden rounded-full bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 p-0.5">
            <div className="rounded-full bg-zinc-950 px-6 py-3 transition-all duration-300 group-hover:bg-transparent">
              <span className="bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-sm font-bold uppercase tracking-widest text-transparent group-hover:text-white">
                Become a Sponsor
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

      {/* CSS Keyframes for floating animations */}
      <style jsx>{`
        @keyframes float-circle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-10px, -50px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -20px) rotate(270deg);
          }
        }
        @keyframes float-square {
          0%, 100% {
            transform: translate(0, 0) rotate(45deg);
          }
          25% {
            transform: translate(-25px, 20px) rotate(135deg);
          }
          50% {
            transform: translate(15px, 40px) rotate(225deg);
          }
          75% {
            transform: translate(30px, 10px) rotate(315deg);
          }
        }
        @keyframes float-triangle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(25px, -35px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, -25px) rotate(240deg);
          }
        }
      `}</style>
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
      className={`group relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl border border-zinc-800/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-zinc-600/50 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
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
      <div className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}