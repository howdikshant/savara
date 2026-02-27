import EventsCategoryPage from "@/components/EventsCategoryPage";

const technicalEvents = [
  {
    name: "24‑Hour Hackathon",
    tag: "Hack",
    level: "Intermediate–Advanced",
    summary:
      "Teams build end‑to‑end solutions overnight — from brainstorming to working prototype.",
    prizePool: "₹60,000",
    unstopUrl: "https://unstop.com/",
  },
  {
    name: "Capture The Flag",
    tag: "Security",
    level: "All levels",
    summary:
      "A cybersecurity CTF featuring web, crypto, pwn, and forensics challenges with live scoreboards.",
    prizePool: "₹30,000",
    unstopUrl: "https://unstop.com/",
  },
  {
    name: "Robotics Arena",
    tag: "Robotics",
    level: "Team event",
    summary:
      "Line‑followers, obstacle courses, and custom bots — a space where hardware and control shine.",
  },
  {
    name: "Designathon",
    tag: "Design",
    level: "Teams",
    summary:
      "UI/UX sprint to reimagine real products with clear flows, polished visuals, and storytelling.",
  },
  {
    name: "CodeSprint",
    tag: "CP",
    level: "Individual",
    summary:
      "Competitive programming contest spanning algorithms, data structures, and problem‑solving speed.",
  },
  {
    name: "AI Ideation Lab",
    tag: "AI / ML",
    level: "Beginner‑friendly",
    summary:
      "Pitch and prototype AI‑powered ideas — from smart campus concepts to creative ML experiments.",
  },
];

export default function TechnicalEventsPage() {
  return (
    <EventsCategoryPage
      title="Technical Events"
      subtitle="Build, break, and innovate"
      description="A common hub for all technical events — hackathons, robotics, security, design, and more. Swap these placeholders with your final event lineup."
      accent="#7c4dff"
      accentSoft="rgba(124, 77, 255, 0.55)"
      background="radial-gradient(circle at top right, rgba(124,77,255,0.3), transparent 55%), radial-gradient(circle at bottom left, rgba(26,0,51,0.65), #05030a 70%)"
      events={technicalEvents}
    />
  );
}

