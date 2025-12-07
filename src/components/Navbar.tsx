"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface NavbarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export default function Navbar({ isMenuOpen, onMenuToggle }: NavbarProps) {
  const topLineRef = useRef<HTMLSpanElement>(null);
  const middleLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      // Animate hamburger to X
      gsap.to(topLineRef.current, {
        rotate: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(middleLineRef.current, {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
      });
      gsap.to(bottomLineRef.current, {
        rotate: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Animate X back to hamburger
      gsap.to(topLineRef.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(middleLineRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.2,
        delay: 0.1,
      });
      gsap.to(bottomLineRef.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-row">
      {/* IIITDM Logo */}
      <div className="fixed z-100 left-6 top-6">
        <Image
          src="/iiitdm_logo.png"
          alt="IIITDM Logo"
          width={1024}
          height={512}
          className="h-16 lg:h-20 w-auto"
        />
      </div>

      {/* Hamburger Button */}
      <button
        onClick={onMenuToggle}
        className="fixed right-6 top-6 z-102 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm transition-colors hover:bg-zinc-800"
        aria-label="Toggle menu"
      >
        <span
          ref={topLineRef}
          className="block h-0.5 w-6 origin-center bg-white transition-colors"
        />
        <span
          ref={middleLineRef}
          className="block h-0.5 w-6 origin-center bg-white transition-colors"
        />
        <span
          ref={bottomLineRef}
          className="block h-0.5 w-6 origin-center bg-white transition-colors"
        />
      </button>
    </div>
  );
}
