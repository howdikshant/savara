"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "/gallery/img317.jpg",
    alt: "Event 1",
    width: 728,
    height: 1203,
  },
  {
    id: 2,
    src: "/gallery/img360.jpg",
    alt: "Event 2",
    width: 729,
    height: 1203,
  },
  {
    id: 3,
    src: "/gallery/img450.jpg",
    alt: "Event 3",
    width: 617,
    height: 625,
  },
  {
    id: 4,
    src: "/gallery/img454.jpg",
    alt: "Event 4",
    width: 1275,
    height: 541,
  },
  {
    id: 5,
    src: "/gallery/img458.jpg",
    alt: "Event 5",
    width: 617,
    height: 624,
  },
  {
    id: 6,
    src: "/gallery/img462.jpg",
    alt: "Event 6",
    width: 474,
    height: 480,
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for header/text fade-in animations
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
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger horizontal carousel + per-image parallax
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;

    // Small delay so images/layout are measured correctly
    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth;
        };

        // Main horizontal scroll tween — pins the carousel and slides the track left
        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        // Per-image parallax using containerAnimation
        // Each image's inner wrapper pans at a different rate than its frame
        frameRefs.current.forEach((frame, index) => {
          const inner = parallaxRefs.current[index];
          if (!frame || !inner) return;

          gsap.fromTo(
            inner,
            { xPercent: 6 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      // Refresh after a beat to ensure pinning measurements are accurate
      const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

      // Store cleanup references on the container for the effect cleanup
      (
        container as HTMLDivElement & {
          _gsapCtx?: gsap.Context;
          _gsapTimer?: ReturnType<typeof setTimeout>;
        }
      )._gsapCtx = ctx;
      (
        container as HTMLDivElement & {
          _gsapTimer?: ReturnType<typeof setTimeout>;
        }
      )._gsapTimer = timer;
    });

    return () => {
      cancelAnimationFrame(rafId);
      const el = container as HTMLDivElement & {
        _gsapCtx?: gsap.Context;
        _gsapTimer?: ReturnType<typeof setTimeout>;
      };
      if (el._gsapTimer) clearTimeout(el._gsapTimer);
      if (el._gsapCtx) el._gsapCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, var(--savara-warm-black) 0%, #1a0a04 30%, #0d0520 70%, var(--savara-warm-black) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Text content area ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-32">
        {/* Section Header */}
        <h2
          className={`mb-16 text-5xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-1000 ease-out ${
            isVisible
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

        {/* Description */}
        <div className="max-w-3xl">
          <p
            className={`text-lg font-light leading-relaxed text-pretty sm:text-xl md:text-2xl transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "rgba(245, 230, 211, 0.75)",
            }}
          >
            Join us for Samgatha X Vashisht, 2026, the flagship techno-cultural
            fest of IIITDM Kancheepuram, a five-day celebration of innovation,
            creativity, and culture.
            <br />
            <br />
            The fest brings together 5,000+ bright minds from top institutions
            across India, uniting engineers, designers, and creators on one
            dynamic stage.
          </p>

          {/* Brochure button */}
          <div
            className={`mt-10 inline-flex items-center gap-4 transition-all duration-700 delay-500 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div
              className="group relative overflow-hidden rounded-full p-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #e65100, #c62828, #4a148c)",
              }}
            >
              <div
                className="rounded-full px-6 py-3 transition-all duration-300 group-hover:bg-transparent"
                style={{ background: "var(--savara-warm-black)" }}
              >
                <span
                  className="text-sm font-bold uppercase tracking-widest group-hover:text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #e65100, #d4a574, #4a148c)",
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
      </div>

      {/* ── Horizontal Scroll Carousel (pinned by ScrollTrigger) ── */}
      <div
        ref={containerRef}
        className="relative flex h-screen items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #1a0a04 0%, #0d0520 50%, var(--savara-warm-black) 100%)",
        }}
      >
        {/* Oversized watermark text on the left */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 text-[15vw] sm:text-[10vw] font-black leading-none pointer-events-none"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "rgba(212, 165, 116, 0.04)",
          }}
        >
          Catch
          <br />
          a
          <br />
          Glimpse
        </div>

        {/* Subtle decorative glow inside the carousel area */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[150px]"
            style={{ background: "rgba(230, 81, 0, 0.06)" }}
          />
          <div
            className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[150px]"
            style={{ background: "rgba(74, 20, 140, 0.06)" }}
          />
        </div>

        {/* Horizontal track — starts with first image at screen centre */}
        <div
          ref={trackRef}
          className="relative flex items-center gap-8 will-change-transform"
          style={{ paddingLeft: "50vw", paddingRight: "50vw" }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => {
                frameRefs.current[index] = el;
              }}
              className="relative flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl"
              style={{
                height: "50vh",
                aspectRatio: `${image.width} / ${image.height}`,
                border: "1px solid rgba(212, 165, 116, 0.15)",
              }}
            >
              {/* Parallax inner — 120 % of frame width, shifted so GSAP can pan it */}
              <div
                ref={(el) => {
                  parallaxRefs.current[index] = el;
                }}
                className="absolute inset-y-0 will-change-transform"
                style={{ left: "-10%", width: "120%" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 60vw"
                  loading="lazy"
                />
              </div>

              {/* Subtle gradient overlay for depth */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(230, 81, 0, 0.08), rgba(74, 20, 140, 0.08))",
                }}
              />

              {/* Bottom vignette */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10, 4, 8, 0.35) 0%, transparent 40%)",
                }}
              />

              {/* Shine highlight on the rounded frame */}
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(212, 165, 116, 0.12), inset 0 -1px 0 rgba(0,0,0,0.3)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(230, 81, 0, 0.4), rgba(74, 20, 140, 0.4), transparent)",
        }}
      />
    </section>
  );
}
