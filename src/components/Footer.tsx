"use client";

import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full py-16 px-6 sm:px-12 lg:px-20"
      style={{
        background: "linear-gradient(180deg, var(--savara-warm-black) 0%, #0d0408 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <Image
              src="/white_logo_small.png"
              alt="Savara Logo"
              width={128}
              height={128}
              className="mb-4 h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "var(--savara-cream)",
              }}
            >
              SAVĀRA
            </h2>
            <p
              className="text-sm mt-1 tracking-wide"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "rgba(212, 165, 116, 0.5)",
              }}
            >
              Chronosync — Where Ancient Meets Future
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-start">
            <h3
              className="text-lg font-bold uppercase tracking-widest mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "var(--savara-cream)",
              }}
            >
              Contact Us
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:fest@iiitdm.ac.in"
                className="group flex items-start gap-3 transition-colors duration-300"
                style={{ color: "rgba(212, 165, 116, 0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--savara-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212, 165, 116, 0.6)")}
              >
                <Mail className="w-5 h-5 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm relative" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  fest@iiitdm.ac.in
                  <span
                    className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "var(--savara-gold)" }}
                  />
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+910000000000"
                className="group flex items-start gap-3 transition-colors duration-300"
                style={{ color: "rgba(212, 165, 116, 0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--savara-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212, 165, 116, 0.6)")}
              >
                <Phone className="w-5 h-5 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm relative" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  +91 00000 00000
                  <span
                    className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: "var(--savara-gold)" }}
                  />
                </span>
              </a>

              {/* Address */}
              <div className="group flex items-start gap-3" style={{ color: "rgba(212, 165, 116, 0.6)" }}>
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <address
                  className="text-sm not-italic leading-relaxed"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  IIITDM Kancheepuram,<br />
                  Melakottaiyur, Nellikuppam Road,<br />
                  Near Kandigai,<br />
                  Off Vandalur-Kelambakkam Road,<br />
                  Chennai, Tamil Nadu,<br />
                  India - 600127
                </address>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col items-start">
            <h3
              className="text-lg font-bold uppercase tracking-widest mb-6"
              style={{
                fontFamily: "'Cinzel', serif",
                color: "var(--savara-cream)",
              }}
            >
              Follow Us
            </h3>

            <div className="flex flex-col space-y-4">
              {[
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 transition-colors duration-300"
                  style={{ color: "rgba(212, 165, 116, 0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--savara-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212, 165, 116, 0.6)")}
                >
                  <div
                    className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(42, 31, 26, 0.5)",
                      border: "1px solid rgba(212, 165, 116, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(230, 81, 0, 0.15)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(230, 81, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(42, 31, 26, 0.5)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212, 165, 116, 0.1)";
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-sm font-medium relative"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {label}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ background: "var(--savara-gold)" }}
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(212, 165, 116, 0.1)" }}
        >
          <p
            className="text-xs text-center tracking-wider"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              color: "rgba(212, 165, 116, 0.3)",
            }}
          >
            &copy; 2026 SAVĀRA Chronosync — IIITDM Kancheepuram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
