"use client";

import { useEffect, useRef, useState } from "react";

export default function WhatIsSavara() {
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
                threshold: 0.15,
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
            id="savara"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:px-12">
                {/* Decorative top line */}
                <div
                    className={`mx-auto mb-8 h-px w-24 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
                        }`}
                    style={{
                        background:
                            "linear-gradient(to right, transparent, rgba(230, 81, 0, 0.6), rgba(74, 20, 140, 0.6), transparent)",
                    }}
                />

                {/* Sub-label
                <p
                    className={`mb-4 text-sm font-bold uppercase tracking-[0.5em] transition-all duration-700 delay-100 ease-out sm:text-base ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                    style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: "var(--savara-gold)",
                    }}
                >
                    IIITDM Prese
                </p> */}

                {/* Main heading */}
                <h2
                    className={`mb-6 text-5xl font-black uppercase tracking-tight transition-all duration-1000 delay-200 ease-out sm:text-6xl md:text-7xl lg:text-8xl ${isVisible
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-8 blur-sm"
                        }`}
                    style={{ fontFamily: "'Cinzel', serif" }}
                >
                    <span
                        style={{
                            background:
                                "linear-gradient(135deg, #e65100, #c62828, #4a148c)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        What is
                    </span>{" "}
                    <span style={{ color: "var(--savara-cream)" }}>Savāra?</span>
                </h2>

                {/* Description */}
                <p
                    className={`mx-auto max-w-3xl text-lg font-medium leading-relaxed text-pretty transition-all duration-1000 delay-400 ease-out sm:text-xl md:text-2xl ${isVisible
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-8 blur-sm"
                        }`}
                    style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: "rgba(245, 230, 211, 0.8)",
                    }}
                >
                    <strong style={{ color: "var(--savara-cream)" }}>SAVĀRA</strong> is
                    the new unified identity of{" "}
                    <span
                        style={{
                            background:
                                "linear-gradient(90deg, #e65100, #d4a574)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontWeight: 600,
                        }}
                    >
                        Samgatha × Vashisht
                    </span>{" "}
                    — the flagship techno-cultural fest of IIITDM Kancheepuram. It is the
                    collision of innovation and tradition, engineering and artistry, where
                    5,000+ minds from premier institutions ignite five days of code,
                    creativity, and culture.
                </p>

                {/* Sub-description */}
                <p
                    className={`mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-pretty transition-all duration-1000 delay-500 ease-out sm:text-lg ${isVisible
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-6 blur-sm"
                        }`}
                    style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        color: "rgba(245, 230, 211, 0.55)",
                    }}
                >
                    Under the banner of the theme of this year{" "}
                    <strong style={{ color: "var(--savara-gold)", fontWeight: 600 }}>Chronosync</strong>,
                    this edition transcends time itself — where the ancient meets the
                    futuristic in a spectacle unlike any other.
                </p>

                {/* Decorative bottom line */}
                <div
                    className={`mx-auto mt-10 h-px w-24 transition-all duration-1000 delay-600 ease-out ${isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
                        }`}
                    style={{
                        background:
                            "linear-gradient(to right, transparent, rgba(74, 20, 140, 0.6), rgba(230, 81, 0, 0.6), transparent)",
                    }}
                />
            </div>
        </section>
    );
}
