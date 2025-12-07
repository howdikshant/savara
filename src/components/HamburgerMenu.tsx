"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MenuItemProps {
  label: string;
  index: number;
  isOpen: boolean;
  onClose: () => void;
}

function MenuItem({ label, index, isOpen, onClose }: MenuItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!itemRef.current) return;

    if (isOpen) {
      // Animate in with stagger
      gsap.fromTo(
        itemRef.current,
        {
          x: -100,
          opacity: 0,
          rotateX: -90,
        },
        {
          x: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          delay: 0.1 + index * 0.1,
          ease: "power4.out",
        }
      );
    }
  }, [isOpen, index]);

  const handleMouseEnter = () => {
    if (!itemRef.current) return;

    // Kill any ongoing animations on letters first
    letterRefs.current.forEach((letter) => {
      if (letter) gsap.killTweensOf(letter);
    });

    // Main item animation
    gsap.to(itemRef.current, {
      x: 40,
      scale: 1.05,
      duration: 0.4,
      ease: "power3.out",
    });

    // Animate each letter with wave effect
    letterRefs.current.forEach((letter, i) => {
      if (!letter) return;
      gsap.to(letter, {
        y: -10,
        rotateZ: gsap.utils.random(-15, 15),
        color: "#f97316",
        textShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
        duration: 0.3,
        delay: i * 0.03,
        ease: "power2.out",
      });

      // Bounce back
      gsap.to(letter, {
        y: 0,
        rotateZ: 0,
        duration: 0.4,
        delay: 0.3 + i * 0.03,
        ease: "elastic.out(1, 0.5)",
      });
    });

    // Add glitch effect
    const glitchTl = gsap.timeline();
    glitchTl
      .to(itemRef.current, {
        skewX: 5,
        duration: 0.1,
      })
      .to(itemRef.current, {
        skewX: -3,
        duration: 0.1,
      })
      .to(itemRef.current, {
        skewX: 0,
        duration: 0.1,
      });
  };

  const handleMouseLeave = () => {
    if (!itemRef.current) return;

    // Kill any ongoing animations on the item and letters
    gsap.killTweensOf(itemRef.current);
    letterRefs.current.forEach((letter) => {
      if (letter) gsap.killTweensOf(letter);
    });

    // Reset item immediately
    gsap.to(itemRef.current, {
      x: 0,
      scale: 1,
      skewX: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    // Reset all letters immediately
    letterRefs.current.forEach((letter) => {
      if (!letter) return;
      gsap.to(letter, {
        y: 0,
        rotateZ: 0,
        color: "#fafafa",
        textShadow: "none",
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  const handleClick = () => {
    onClose();
  };

  return (
    <a
      ref={itemRef}
      href={`#${label.toLowerCase()}`}
      className="group relative block cursor-pointer py-2 opacity-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <span className="relative inline-flex text-4xl font-black uppercase tracking-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl">
        {label.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      {/* Decorative line */}
      <span className="absolute -bottom-1 left-0 h-1 w-0 bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
    </a>
  );
}

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const menuItems = ["Home", "About", "Timeline", "Merch", "Sponsors", "Contact"];

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate menu container
      gsap.fromTo(
        menuRef.current,
        {
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
        },
        {
          clipPath: "circle(150% at calc(100% - 40px) 40px)",
          duration: 1,
          ease: "power4.inOut",
        }
      );
    } else {
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Animate menu container out
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Blur Overlay */}
      {/* <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-40 bg-black/30 opacity-0 backdrop-blur-md"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      /> */}

      {/* Full Screen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-101 flex flex-col items-start justify-center overflow-hidden bg-linear-to-br from-zinc-900 via-zinc-950 to-black px-8 sm:px-16 md:px-24"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-orange-500 blur-[150px]" />
          <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500 blur-[150px]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500 blur-[100px]" />
        </div>

        {/* Menu Items */}
        <nav className="relative z-10 flex flex-col gap-2 md:gap-4">
          {menuItems.map((item, index) => (
            <MenuItem key={item} label={item} index={index} isOpen={isOpen} onClose={onClose} />
          ))}
        </nav>

        {/* Decorative number */}
        <div className="absolute bottom-8 right-8 text-[20vw] font-black leading-none text-white/5">
          26
        </div>
      </div>
    </>
  );
}
