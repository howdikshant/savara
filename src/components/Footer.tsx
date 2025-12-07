"use client";

import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-900 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="w-16 h-16 bg-zinc-700 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
              <span className="font-mono text-2xl font-bold text-zinc-100">
                F
              </span>
            </div>
            <h2 className="font-mono text-2xl font-bold tracking-tight text-zinc-100">
              Fest &apos;26
            </h2>
            <p className="font-mono text-sm text-zinc-400 mt-1 tracking-wide">
              Technocultural Festival
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="flex flex-col items-start">
            <h3 className="font-mono text-lg font-bold uppercase tracking-widest text-zinc-100 mb-6">
              Contact Us
            </h3>
            
            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:fest@iiitdm.ac.in"
                className="group flex items-start gap-3 text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
              >
                <Mail className="w-5 h-5 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-mono text-sm relative">
                  fest@iiitdm.ac.in
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+910000000000"
                className="group flex items-start gap-3 text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
              >
                <Phone className="w-5 h-5 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-mono text-sm relative">
                  +91 00000 00000
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              {/* Address */}
              <div className="group flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <address className="font-mono text-sm not-italic leading-relaxed">
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
            <h3 className="font-mono text-lg font-bold uppercase tracking-widest text-zinc-100 mb-6">
              Follow Us
            </h3>
            
            <div className="flex flex-col space-y-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
              >
                <div className="p-2 rounded-lg bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700 group-hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm font-medium relative">
                  Instagram
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
              >
                <div className="p-2 rounded-lg bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700 group-hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm font-medium relative">
                  LinkedIn
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-zinc-400 transition-colors duration-300 hover:text-zinc-100"
              >
                <div className="p-2 rounded-lg bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700 group-hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm font-medium relative">
                  YouTube
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="font-mono text-xs text-zinc-500 text-center tracking-wider">
            © 2026 Fest &apos;26 — IIITDM Kancheepuram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
