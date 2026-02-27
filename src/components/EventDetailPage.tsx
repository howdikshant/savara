import Link from "next/link";

type EventDetail = {
  name: string;
  tagline?: string;
  typeLabel: string;
  accent: string;
  accentSoft: string;
  background: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  registrationFee?: string;
  teamSize?: string;
  prizePool?: string;
  registrationNote?: string;
  rules: string[];
  guidelines?: string[];
  highlights?: string[];
  backHref: string;
  backLabel: string;
};

type EventDetailPageProps = {
  event: EventDetail;
};

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const {
    name,
    tagline,
    typeLabel,
    accent,
    accentSoft,
    background,
    description,
    date,
    time,
    venue,
    registrationFee,
    teamSize,
    prizePool,
    registrationNote,
    rules,
    guidelines,
    highlights,
    backHref,
    backLabel,
  } = event;

  return (
    <main
      className="min-h-screen px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-10"
      style={{ background }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {/* Back link */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--savara-gold)] transition-colors hover:text-[var(--savara-light-gold)] sm:text-xs"
            style={{ fontFamily: "var(--font-rajdhani), sans-serif" }}
          >
            <span className="text-base">←</span>
            <span>{backLabel}</span>
          </Link>

          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-[11px]"
            style={{
              fontFamily: "var(--font-rajdhani), sans-serif",
              backgroundColor: "rgba(10,4,8,0.75)",
              border: `1px solid ${accentSoft}`,
              color: accent,
            }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Header + meta */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
          <div className="space-y-3">
            <h1
              className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--savara-cream)" }}
            >
              {name}
            </h1>
            {tagline && (
              <p
                className="text-sm leading-relaxed sm:text-base"
                style={{
                  fontFamily: "var(--font-rajdhani), sans-serif",
                  color: "rgba(245, 230, 211, 0.78)",
                }}
              >
                {tagline}
              </p>
            )}
            <p
              className="mt-2 text-sm leading-relaxed sm:text-base"
              style={{
                fontFamily: "var(--font-rajdhani), sans-serif",
                color: "rgba(245, 230, 211, 0.85)",
              }}
            >
              {description}
            </p>
          </div>

          {/* Meta card */}
          <aside className="relative overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-5 shadow-lg shadow-black/50 backdrop-blur-sm sm:p-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 0% 0%, ${accentSoft}, transparent 55%)`,
              }}
            />
            <div className="relative space-y-3">
              <h2
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-rajdhani), sans-serif",
                  color: "rgba(245, 230, 211, 0.7)",
                }}
              >
                Event Details
              </h2>

              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt
                    className="text-[11px] uppercase tracking-[0.25em]"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.6)",
                    }}
                  >
                    Date
                  </dt>
                  <dd style={{ color: "var(--savara-cream)" }}>{date}</dd>
                </div>
                <div>
                  <dt
                    className="text-[11px] uppercase tracking-[0.25em]"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.6)",
                    }}
                  >
                    Time
                  </dt>
                  <dd style={{ color: "var(--savara-cream)" }}>{time}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt
                    className="text-[11px] uppercase tracking-[0.25em]"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.6)",
                    }}
                  >
                    Venue
                  </dt>
                  <dd style={{ color: "var(--savara-cream)" }}>{venue}</dd>
                </div>
                {prizePool && (
                  <div>
                    <dt
                      className="text-[11px] uppercase tracking-[0.25em]"
                      style={{
                        fontFamily: "var(--font-rajdhani), sans-serif",
                        color: "rgba(245, 230, 211, 0.6)",
                      }}
                    >
                      Prize Pool
                    </dt>
                    <dd style={{ color: "var(--savara-cream)" }}>{prizePool}</dd>
                  </div>
                )}
                {registrationFee && (
                  <div>
                    <dt
                      className="text-[11px] uppercase tracking-[0.25em]"
                      style={{
                        fontFamily: "var(--font-rajdhani), sans-serif",
                        color: "rgba(245, 230, 211, 0.6)",
                      }}
                    >
                      Registration
                    </dt>
                    <dd style={{ color: "var(--savara-cream)" }}>{registrationFee}</dd>
                  </div>
                )}
                {teamSize && (
                  <div>
                    <dt
                      className="text-[11px] uppercase tracking-[0.25em]"
                      style={{
                        fontFamily: "var(--font-rajdhani), sans-serif",
                        color: "rgba(245, 230, 211, 0.6)",
                      }}
                    >
                      Team Size
                    </dt>
                    <dd style={{ color: "var(--savara-cream)" }}>{teamSize}</dd>
                  </div>
                )}
              </dl>

              {registrationNote && (
                <p
                  className="mt-2 text-[11px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-rajdhani), sans-serif",
                    color: "rgba(245, 230, 211, 0.7)",
                  }}
                >
                  {registrationNote}
                </p>
              )}
            </div>
          </aside>
        </section>

        {/* Rules / guidelines / highlights */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <div>
              <h2
                className="mb-2 text-sm font-semibold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-rajdhani), sans-serif",
                  color: accent,
                }}
              >
                Rules
              </h2>
              <ul className="space-y-2.5 text-sm">
                {rules.map((rule) => (
                  <li
                    key={rule}
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.8)",
                    }}
                  >
                    • {rule}
                  </li>
                ))}
              </ul>
            </div>

            {guidelines && guidelines.length > 0 && (
              <div>
                <h2
                  className="mb-2 text-sm font-semibold uppercase tracking-[0.3em]"
                  style={{
                    fontFamily: "var(--font-rajdhani), sans-serif",
                    color: accent,
                  }}
                >
                  Guidelines
                </h2>
                <ul className="space-y-2.5 text-sm">
                  {guidelines.map((item) => (
                    <li
                      key={item}
                      className="leading-relaxed"
                      style={{
                        fontFamily: "var(--font-rajdhani), sans-serif",
                        color: "rgba(245, 230, 211, 0.78)",
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {highlights && highlights.length > 0 && (
            <aside className="space-y-3 rounded-2xl border border-white/6 bg-black/25 p-5 shadow-lg shadow-black/40 sm:p-6">
              <h2
                className="text-sm font-semibold uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-rajdhani), sans-serif",
                  color: accent,
                }}
              >
                Highlights
              </h2>
              <ul className="space-y-2.5 text-sm">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.8)",
                    }}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}

