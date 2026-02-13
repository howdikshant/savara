"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/gallery/img317.jpg", alt: "Event 1" },
  { id: 2, src: "/gallery/img360.jpg", alt: "Event 2" },
  { id: 3, src: "/gallery/img450.jpg", alt: "Event 3" },
  { id: 4, src: "/gallery/img454.jpg", alt: "Event 4" },
  { id: 5, src: "/gallery/img458.jpg", alt: "Event 5" },
  { id: 6, src: "/gallery/img462.jpg", alt: "Event 6" },
];

export default function AboutSection() {
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
      id="about"
      className="relative min-h-screen overflow-hidden py-20 sm:py-32"
      style={{
        background: "linear-gradient(180deg, var(--savara-warm-black) 0%, #1a0a04 30%, #0d0520 70%, var(--savara-warm-black) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(230, 81, 0, 0.08)" }}
        />
        <div
          className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "rgba(74, 20, 140, 0.08)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ background: "rgba(198, 40, 40, 0.05)" }}
        />
      </div>

      {/* Stone texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <h2
          className={`mb-16 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-1000 ease-out ${isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-12"
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
            About
          </span>{" "}
          <span style={{ color: "var(--savara-cream)" }}>the Fest</span>
        </h2>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p
              className={`text-lg font-light leading-relaxed text-pretty sm:text-xl md:text-2xl transition-all duration-1000 delay-200 ease-out ${isVisible
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-8 blur-sm"
                }`}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "rgba(245, 230, 211, 0.75)",
              }}
            >
              Join us for Samgatha X Vashisht, 2026, the flagship techno-cultural fest of IIITDM Kancheepuram, a five-day celebration of innovation, creativity, and culture.
              <br />
              <br />
              The fest brings together 5,000+ bright minds from top institutions across India, uniting engineers, designers, and creators on one dynamic stage.
            </p>

            <div
              className={`mt-10 inline-flex items-center gap-4 transition-all duration-700 delay-500 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
                }`}
            >
              <div className="group relative overflow-hidden rounded-full p-0.5"
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
                    Brochure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Gallery */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
            {galleryImages.map((image, index) => {
              const positions = [
                { top: "0%", left: "10%", rotate: "-6deg", zIndex: 5 },
                { top: "15%", right: "0%", rotate: "4deg", zIndex: 4 },
                { top: "35%", left: "5%", rotate: "3deg", zIndex: 3 },
                { top: "50%", right: "5%", rotate: "-5deg", zIndex: 2 },
                { top: "65%", left: "0%", rotate: "2deg", zIndex: 1 },
                { top: "80%", left: "30%", rotate: "10deg", zIndex: 4 },
              ];

              const pos = positions[index];
              const delay = 300 + index * 150;

              return (
                <div
                  key={image.id}
                  className={`group absolute h-40 w-56 cursor-pointer overflow-hidden rounded-xl shadow-2xl backdrop-blur-sm sm:h-48 sm:w-64 md:h-52 md:w-72 transition-all duration-700 ease-out hover:z-50! hover:scale-110 ${isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-16 scale-90"
                    }`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    transform: isVisible ? `rotate(${pos.rotate})` : `rotate(${pos.rotate}) translateY(64px)`,
                    zIndex: pos.zIndex,
                    transitionDelay: `${delay}ms`,
                    border: "1px solid rgba(212, 165, 116, 0.15)",
                  }}
                >
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(230, 81, 0, 0.15), rgba(74, 20, 140, 0.15))",
                    }}
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(to top, rgba(10, 4, 8, 0.8), transparent)",
                    }}
                  />

                  {/* Image */}
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                      className="object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>

                  {/* Shine effect */}
                  <div
                    className="absolute inset-0 -translate-x-full skew-x-12 transition-transform duration-700 group-hover:translate-x-full"
                    style={{
                      background: "linear-gradient(to right, transparent, rgba(212, 165, 116, 0.1), transparent)",
                    }}
                  />

                  {/* Border glow */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: "0 0 30px rgba(230, 81, 0, 0.3)" }}
                  />
                </div>
              );
            })}

            {/* Decorative floating elements */}
            <div
              className="absolute -right-4 top-1/4 h-20 w-20 animate-pulse rounded-full blur-xl"
              style={{ background: "rgba(230, 81, 0, 0.15)" }}
            />
            <div
              className="absolute -left-4 bottom-1/4 h-16 w-16 animate-pulse rounded-full blur-xl"
              style={{ background: "rgba(74, 20, 140, 0.15)", animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(230, 81, 0, 0.4), rgba(74, 20, 140, 0.4), transparent)",
        }}
      />
    </section>
  );
}
