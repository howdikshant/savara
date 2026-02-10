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

    letterRefs.current.forEach((letter) => {
      if (letter) gsap.killTweensOf(letter);
    });

    gsap.to(itemRef.current, {
      x: 40,
      scale: 1.05,
      duration: 0.4,
      ease: "power3.out",
    });

    letterRefs.current.forEach((letter, i) => {
      if (!letter) return;
      gsap.to(letter, {
        y: -10,
        rotateZ: gsap.utils.random(-15, 15),
        color: "#e65100",
        textShadow: "0 0 20px rgba(230, 81, 0, 0.5)",
        duration: 0.3,
        delay: i * 0.03,
        ease: "power2.out",
      });

      gsap.to(letter, {
        y: 0,
        rotateZ: 0,
        duration: 0.4,
        delay: 0.3 + i * 0.03,
        ease: "elastic.out(1, 0.5)",
      });
    });

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

    gsap.killTweensOf(itemRef.current);
    letterRefs.current.forEach((letter) => {
      if (letter) gsap.killTweensOf(letter);
    });

    gsap.to(itemRef.current, {
      x: 0,
      scale: 1,
      skewX: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    letterRefs.current.forEach((letter) => {
      if (!letter) return;
      gsap.to(letter, {
        y: 0,
        rotateZ: 0,
        color: "#f5e6d3",
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
      <span
        className="relative inline-flex text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ color: "var(--savara-cream)", fontFamily: "'Cinzel', serif" }}
      >
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
      <span
        className="absolute -bottom-1 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
        style={{
          background: "linear-gradient(to right, #e65100, #c62828, #4a148c)",
        }}
      />
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

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

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
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Full Screen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-101 flex flex-col items-start justify-center overflow-hidden px-8 sm:px-16 md:px-24"
        style={{
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
          background: "linear-gradient(135deg, #0a0408 0%, #1a0a04 30%, #0d0520 70%, #0a0408 100%)",
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full blur-[150px]"
            style={{ background: "var(--savara-orange)" }}
          />
          <div
            className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-[150px]"
            style={{ background: "var(--savara-purple)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: "var(--savara-deep-red)" }}
          />
        </div>

        {/* Stone texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Menu Items */}
        <nav className="relative z-10 flex flex-col gap-2 md:gap-4">
          {menuItems.map((item, index) => (
            <MenuItem key={item} label={item} index={index} isOpen={isOpen} onClose={onClose} />
          ))}
        </nav>

        {/* Decorative number */}
        <div
          className="absolute bottom-8 right-8 text-[20vw] font-black leading-none"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "rgba(212, 165, 116, 0.04)",
          }}
        >
          26
        </div>
      </div>
    </>
  );
}
