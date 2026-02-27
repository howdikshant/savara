import EventDetailPage from "@/components/EventDetailPage";

export default function HackathonEventPage() {
  return (
    <EventDetailPage
      event={{
        name: "24-Hour Hackathon",
        tagline: "Ship ambitious ideas overnight with your team.",
        typeLabel: "Technical Event",
        accent: "#7c4dff",
        accentSoft: "rgba(124, 77, 255, 0.55)",
        background:
          "radial-gradient(circle at top right, rgba(124,77,255,0.35), transparent 55%), radial-gradient(circle at bottom left, rgba(26,0,51,0.7), #05030a 70%)",
        description:
          "A 24-hour product sprint where teams design, build, and demo a working prototype around the Savāra theme. Expect mentors, late-night caffeine, and a packed demo session.",
        date: "Day 2–3",
        time: "6:00 PM – 6:00 PM (24 hours)",
        venue: "Innovation Lab & Computing Block",
        registrationFee: "₹500 per team",
        teamSize: "2–4 members per team",
        prizePool: "₹60,000 + goodies & internships*",
        registrationNote:
          "Shortlisted teams will receive a confirmation email with problem statements, schedule, and hardware availability details.",
        rules: [
          "Teams must adhere to the code of conduct and work on ideas relevant to the given problem statements.",
          "All development during the hack must happen on-site within the official duration.",
          "Use of pre-built libraries and open-source tools is allowed; plagiarism of complete projects is not.",
          "Final demo must include a working prototype and a 3–5 minute presentation.",
          "Judges' decisions will be final and binding.",
        ],
        guidelines: [
          "Bring your own laptops, chargers, and any special hardware you need.",
          "APIs, datasets, and any platform credits (if provided) will be shared closer to the event.",
          "Focus on solving one problem really well instead of spreading across multiple ideas.",
          "Prepare a short pitch deck or demo script ahead of the final presentation.",
        ],
        highlights: [
          "Access to mentors from industry and campus tech clubs.",
          "Dedicated night-long workspaces with Wi‑Fi and refreshments.",
          "Showcase your project to judges, sponsors, and the broader Savāra audience.",
        ],
        backHref: "/events/technical",
        backLabel: "Back to Technical Events",
      }}
    />
  );
}

