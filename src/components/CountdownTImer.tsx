"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minutesRef = useRef<HTMLSpanElement>(null);
  const secondsRef = useRef<HTMLSpanElement>(null);

  const prevTimeRef = useRef<TimeLeft>({
    days: -1,
    hours: -1,
    minutes: -1,
    seconds: -1,
  });

  useEffect(() => {
    const animateDigit = (element: HTMLSpanElement | null) => {
      if (!element) return;
      gsap.fromTo(
        element,
        {
          y: -20,
          opacity: 0,
          scale: 1.1,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.inout",
        }
      );
    };

    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft();

      if (prevTimeRef.current.seconds !== newTimeLeft.seconds) {
        animateDigit(secondsRef.current);
      }
      if (prevTimeRef.current.minutes !== newTimeLeft.minutes) {
        animateDigit(minutesRef.current);
      }
      if (prevTimeRef.current.hours !== newTimeLeft.hours) {
        animateDigit(hoursRef.current);
      }
      if (prevTimeRef.current.days !== newTimeLeft.days) {
        animateDigit(daysRef.current);
      }

      prevTimeRef.current = newTimeLeft;
      setTimeLeft(newTimeLeft);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4">
      {/* Navbar with Logo and Hamburger Button */}
      <Navbar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover -z-10"
      >
        <source src="/background_video.mp4" type="video/mp4" />
      </video>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
            <span
              ref={daysRef}
              className="block font-mono text-4xl font-light tracking-wider text-zinc-100 sm:text-6xl md:text-7xl"
            >
              {formatNumber(timeLeft.days)}
            </span>
          </div>
          <span className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
            Days
          </span>
        </div>

        <div className="flex items-center pb-6">
          <span className="text-3xl font-light text-zinc-700 sm:text-5xl md:text-6xl">
            :
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
            <span
              ref={hoursRef}
              className="block font-mono text-4xl font-light tracking-wider text-zinc-100 sm:text-6xl md:text-7xl"
            >
              {formatNumber(timeLeft.hours)}
            </span>
          </div>
          <span className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
            Hours
          </span>
        </div>

        <div className="flex items-center pb-6">
          <span className="text-3xl font-light text-zinc-700 sm:text-5xl md:text-6xl">
            :
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
            <span
              ref={minutesRef}
              className="block font-mono text-4xl font-light tracking-wider text-zinc-100 sm:text-6xl md:text-7xl"
            >
              {formatNumber(timeLeft.minutes)}
            </span>
          </div>
          <span className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
            Minutes
          </span>
        </div>

        <div className="flex items-center pb-6">
          <span className="text-3xl font-light text-zinc-700 sm:text-5xl md:text-6xl">
            :
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
            <span
              ref={secondsRef}
              className="block font-mono text-4xl font-light tracking-wider text-zinc-100 sm:text-6xl md:text-7xl"
            >
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
          <span className="mt-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}