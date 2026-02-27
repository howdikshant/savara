import EventDetailPage from "@/components/EventDetailPage";

export default function OpeningNightShowcasePage() {
  return (
    <EventDetailPage
      event={{
        name: "Opening Night Showcase",
        tagline: "The cultural curtain‑raiser of Savāra.",
        typeLabel: "Cultural Event",
        accent: "#e65100",
        accentSoft: "rgba(230, 81, 0, 0.55)",
        background:
          "radial-gradient(circle at top left, rgba(230,81,0,0.26), transparent 55%), radial-gradient(circle at bottom right, rgba(198,40,40,0.4), #0a0408 70%)",
        description:
          "A high‑energy medley of dance, music, theatre, and visual performances that introduces the cultural flavour of Savāra. Short, tight sets from the best teams set the tone for the rest of the fest.",
        date: "Day 1 · Evening",
        time: "7:00 PM – 9:30 PM",
        venue: "Main Stage Amphitheatre",
        registrationFee: "Free for registered Savāra attendees",
        teamSize: "Solo or teams up to 12",
        prizePool: "₹35,000 + spotlight slots in main shows",
        registrationNote:
          "Registration is via a pre‑selection form. Shortlisted teams will be contacted with soundcheck slots and final timings.",
        rules: [
          "Each act gets 6–8 minutes on stage, including setup and exit.",
          "Only clean, campus‑appropriate content is allowed; avoid explicit or offensive material.",
          "Teams must report to backstage at least 45 minutes before their slot.",
          "Tracks must be submitted in advance in .mp3 or .wav format; backup on a pendrive is mandatory.",
          "Use of fire, water, or hazardous props is not permitted on stage.",
        ],
        guidelines: [
          "Multi‑genre collaborations (e.g., dance + live vocals) are encouraged.",
          "Keep transitions tight — long blackouts between segments may lead to time penalties.",
          "Costumes and props should be planned for quick entry and exit.",
          "Bring your own small props; heavy stage setups may not be possible.",
        ],
        highlights: [
          "Perfect for teams that want maximum visibility at the start of the fest.",
          "Professional lights and audio with a dedicated show‑runner.",
          "Photographers and videographers will capture each act for social media reels.",
        ],
        backHref: "/events/cultural",
        backLabel: "Back to Cultural Events",
      }}
    />
  );
}

