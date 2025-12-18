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

  // const paragraphText = `Get ready for Fest '26, the second edition of IIITDM Kancheepuram's Techno-Cultural Fest. With a lineup of robotics, hackathons, coding, design, dance, dramatics, music, and more, there's something for everyone. This year, the fest has taken on the theme of vibrant and rapidly growing field of Animation, Visual Effects, Gaming, and Comics, bridging technology and creativity to foster innovation and cultural expression. Fest '26 seeks to kindle a passion for technology and creativity, inviting individuals of the student community to join the journey towards innovative horizons.`;
  const paragraphText = `Join us for Samgatha X Vashisht, 2026, the flagship techno-cultural fest of IIITDM Kancheepuram, a five-day celebration of innovation, creativity, and culture. The fest brings together 5,000+ bright minds from top institutions across India, uniting engineers, designers, and creators on one dynamic stage.`


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-zinc-950 via-zinc-900 to-black py-20 sm:py-32"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <h2
          className={`mb-16 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <span className="bg-linear-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            About
          </span>{" "}
          <span className="text-zinc-100">Fest &apos;26</span>
        </h2>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p
              className={`text-lg font-extralight leading-relaxed text-pretty font-mono text-zinc-300 sm:text-xl md:text-2xl transition-all duration-1000 delay-200 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-8 blur-sm"
              }`}
            >
            Join us for Samgatha X Vashisht, 2026, the flagship techno-cultural fest of IIITDM Kancheepuram, a five-day celebration of innovation, creativity, and culture. 
            <br />
            <br />
            The fest brings together 5,000+ bright minds from top institutions across India, uniting engineers, designers, and creators on one dynamic stage.
            </p>

            <div
              className={`mt-10 inline-flex items-center gap-4 transition-all duration-700 delay-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="group relative overflow-hidden rounded-full bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 p-0.5">
                <div className="rounded-full bg-zinc-950 px-6 py-3 transition-all duration-300 group-hover:bg-transparent">
                  <span className="bg-linear-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-sm font-bold uppercase tracking-widest text-transparent group-hover:text-white">
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
                  className={`group absolute h-40 w-56 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-zinc-800/50 shadow-2xl backdrop-blur-sm sm:h-48 sm:w-64 md:h-52 md:w-72 transition-all duration-700 ease-out hover:z-50! hover:scale-110 hover:border-orange-500/50 ${
                    isVisible
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
                  }}
                >
                  {/* Placeholder gradient background */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20" />

                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Image content */}
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Floating animation */}
                  <style jsx>{`
                    @keyframes float-${index} {
                      0%, 100% { transform: rotate(${pos.rotate}) translateY(0px); }
                      50% { transform: rotate(${pos.rotate}) translateY(${index % 2 === 0 ? '-8px' : '8px'}); }
                    }
                  `}</style>
                </div>
              );
            })}

            {/* Decorative floating elements */}
            <div className="absolute -right-4 top-1/4 h-20 w-20 animate-pulse rounded-full bg-orange-500/20 blur-xl" />
            <div
              className="absolute -left-4 bottom-1/4 h-16 w-16 animate-pulse rounded-full bg-purple-500/20 blur-xl"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />
    </section>
  );
}
