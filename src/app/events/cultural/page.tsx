import EventsCategoryPage from "@/components/EventsCategoryPage";

const culturalEvents = [
  {
    name: "Opening Night Showcase",
    tag: "Flagship",
    level: "Open to all",
    summary:
      "A high-energy medley of music, dance, and theatre to kick off the cultural side of the fest.",
    prizePool: "₹35,000",
    unstopUrl: "https://unstop.com/",
  },
  {
    name: "Classical Evening",
    tag: "Music",
    level: "Solo & group",
    summary:
      "Indian classical vocals and instrumentals in an intimate, spotlight-style setting.",
    prizePool: "₹20,000",
    unstopUrl: "https://unstop.com/",
  },
  {
    name: "Street Play Arena",
    tag: "Drama",
    level: "Team event",
    summary:
      "Thought-provoking nukkad nataks that bring social themes to life in the open-air arena.",
  },
  {
    name: "Battle of Bands",
    tag: "Bands",
    level: "Teams",
    summary:
      "Campus and city bands go head‑to‑head with original tracks and covers under the lights.",
  },
  {
    name: "Fashion Walk",
    tag: "Showcase",
    level: "Teams",
    summary:
      "A runway celebrating styles across eras and cultures with choreography, music, and lights.",
  },
  {
    name: "Open Mic Nights",
    tag: "Informal",
    level: "Chill zone",
    summary:
      "Poetry, stand‑up, storytelling, and unplugged sets — a relaxed space to just get on stage.",
  },
];

export default function CulturalEventsPage() {
  return (
    <EventsCategoryPage
      title="Cultural Events"
      subtitle="All things performance & art"
      description="Browse the full slate of cultural experiences — from spotlight nights to informal, late‑night sessions. Replace these placeholders with your final event list."
      accent="#e65100"
      accentSoft="rgba(230, 81, 0, 0.5)"
      background="radial-gradient(circle at top left, rgba(230,81,0,0.22), transparent 55%), radial-gradient(circle at bottom right, rgba(198,40,40,0.35), #0a0408 70%)"
      events={culturalEvents}
    />
  );
}

