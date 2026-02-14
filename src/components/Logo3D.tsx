"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Logo3D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate the arch gateway glow
    tl.fromTo(
      archRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5 }
    );

    // Animate the main title/wordmark
    tl.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.6, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "elastic.out(1, 0.8)" },
      "-=0.8"
    );

    // Animate left and right labels
    tl.fromTo(
      leftLabelRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 },
      "-=0.5"
    );

    tl.fromTo(
      rightLabelRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8 },
      "-=0.8"
    );

    // Spiral rotation
    gsap.to(spiralRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          opacity: gsap.utils.random(0.2, 0.8),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, { y: self.progress * 100 });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Navbar with Logo and Hamburger Button */}
      <Navbar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Banner background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/savara_banner_main.jpeg')",
        }}
      />

      {/* Dark vignette overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10, 4, 8, 0.3) 0%, rgba(10, 4, 8, 0.7) 70%, rgba(10, 4, 8, 0.85) 100%)",
        }}
      />

      {/* Subtle color-enhancing overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10, 4, 8, 0.4) 0%, transparent 30%, transparent 70%, rgba(10, 4, 8, 0.8) 100%)",
        }}
      />

      {/* Background split gradient - Orange left, Purple right */}
      <div className="absolute inset-0">
        {/* Left warm side */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(230, 81, 0, 0.25) 0%, rgba(198, 40, 40, 0.15) 40%, transparent 60%)",
          }}
        />
        {/* Right cool side */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(225deg, rgba(74, 20, 140, 0.3) 0%, rgba(26, 0, 51, 0.2) 40%, transparent 60%)",
          }}
        />
      </div>

      {/* Stone texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full -left-48 top-1/4"
          style={{
            background: "radial-gradient(circle, rgba(230, 81, 0, 0.15) 0%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full -right-48 top-1/4"
          style={{
            background: "radial-gradient(circle, rgba(74, 20, 140, 0.2) 0%, transparent 70%)",
            animation: "pulse-glow 4s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full left-1/2 bottom-0 -translate-x-1/2"
          style={{
            background: "radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)",
            animation: "pulse-glow 3s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* Spiral decorative element (center-top) */}
      <div
        ref={spiralRef}
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-40 h-40 sm:w-56 sm:h-56 opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 20 C140 20, 180 60, 180 100 C180 140, 140 180, 100 180 C60 180, 30 150, 30 110 C30 80, 55 55, 80 55 C105 55, 125 75, 125 100 C125 120, 110 135, 90 135 C75 135, 65 120, 65 105 C65 90, 78 80, 90 80"
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e65100" />
              <stop offset="100%" stopColor="#4a148c" />
            </linearGradient>
          </defs>
        </svg>
      </div>



      {/* Floating particles — deterministic positions to avoid hydration mismatch */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const seed = ((i + 1) * 7.3) % 1;
          const size = (((i * 13 + 5) % 10) / 10) * 4 + 2;
          const left = ((i * 17 + 3) % 20) * 5;
          const top = ((i * 11 + 7) % 20) * 5;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                background: i % 2 === 0
                  ? "rgba(230, 81, 0, 0.5)"
                  : "rgba(74, 20, 140, 0.5)",
                opacity: 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Main Wordmark: SAVĀRA CHRONOSYNC */}
        <div ref={titleRef} className="opacity-0 mb-4">
          <Image
            src="/color_savara.png"
            alt="SAVĀRA Chronosync"
            width={1200}
            height={500}
            priority
            className="h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96 w-auto"
            style={{
              filter: "drop-shadow(0 0 40px rgba(230, 81, 0, 0.3))",
            }}
          />
        </div>
      </div>

      {/* Left label: SAMGATHA */}
      <div
        ref={leftLabelRef}
        className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 opacity-0"
      >
        <span
          className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.4em]"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "var(--savara-gold)",
            textShadow: "0 0 20px rgba(230, 81, 0, 0.3)",
          }}
        >
          Samgatha
        </span>
      </div>

      {/* Right label: VASHISHT */}
      <div
        ref={rightLabelRef}
        className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 opacity-0"
      >
        <span
          className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.4em]"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "var(--savara-gold)",
            textShadow: "0 0 20px rgba(74, 20, 140, 0.4)",
          }}
        >
          Vashisht
        </span>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--savara-warm-black) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
