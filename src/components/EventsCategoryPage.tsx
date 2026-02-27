import Link from "next/link";

type EventItem = {
  name: string;
  tag?: string;
  level?: string;
  summary: string;
  href?: string;
  prizePool?: string;
  unstopUrl?: string;
};

type EventsCategoryPageProps = {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentSoft: string;
  background: string;
  events: EventItem[];
};

export default function EventsCategoryPage({
  title,
  subtitle,
  description,
  accent,
  accentSoft,
  background,
  events,
}: EventsCategoryPageProps) {
  return (
    <main
      className="min-h-screen px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-10"
      style={{ background }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm"
              style={{
                fontFamily: "var(--font-rajdhani), sans-serif",
                color: "rgba(245, 230, 211, 0.6)",
              }}
            >
              {subtitle}
            </p>
            <h1
              className="mt-1 text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-cinzel), serif", color: "var(--savara-cream)" }}
            >
              {title}
            </h1>
            <p
              className="mt-3 max-w-xl text-sm leading-relaxed sm:text-base"
              style={{
                fontFamily: "var(--font-rajdhani), sans-serif",
                color: "rgba(245, 230, 211, 0.78)",
              }}
            >
              {description}
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] sm:text-xs"
            style={{
              fontFamily: "var(--font-rajdhani), sans-serif",
              borderColor: `${accent}66`,
              color: "rgba(245,230,211,0.9)",
              background: "rgba(10,4,8,0.45)",
            }}
          >
            <span className="text-base">←</span>
            <span>Back to Events</span>
          </Link>
        </header>

        {/* Events grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const card = (
              <article
                key={event.name}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/25 p-6 shadow-lg shadow-black/40 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/70 sm:rounded-3xl"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 20% 0%, ${accentSoft}, transparent 55%)`,
                  }}
                />

                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2
                      className="text-xl font-semibold uppercase tracking-wide sm:text-2xl"
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        color: "var(--savara-cream)",
                      }}
                    >
                      {event.name}
                    </h2>
                    {event.tag && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{
                          fontFamily: "var(--font-rajdhani), sans-serif",
                          backgroundColor: "rgba(10,4,8,0.85)",
                          color: accent,
                          border: `1px solid ${accentSoft}`,
                        }}
                      >
                        {event.tag}
                      </span>
                    )}
                  </div>

                  <p
                    className="text-sm leading-relaxed sm:text-[15px]"
                    style={{
                      fontFamily: "var(--font-rajdhani), sans-serif",
                      color: "rgba(245, 230, 211, 0.78)",
                    }}
                  >
                    {event.summary}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-3">
                    <div className="space-y-1">
                      {event.level && (
                        <p
                          className="text-[11px] uppercase tracking-[0.25em]"
                          style={{
                            fontFamily: "var(--font-rajdhani), sans-serif",
                            color: "rgba(245, 230, 211, 0.6)",
                          }}
                        >
                          {event.level}
                        </p>
                      )}
                      {event.prizePool && (
                        <p
                          className="text-xs uppercase tracking-[0.25em]"
                          style={{
                            fontFamily: "var(--font-rajdhani), sans-serif",
                            color: "rgba(245, 230, 211, 0.75)",
                          }}
                        >
                          Prize Pool
                        </p>
                      )}
                    </div>

                    {event.prizePool && (
                      <div className="text-right">
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.28em] text-right sm:text-[11px]"
                          style={{
                            fontFamily: "var(--font-rajdhani), sans-serif",
                            color: "rgba(245, 230, 211, 0.7)",
                          }}
                        >
                          Up to
                        </p>
                        <p
                          className="text-lg font-bold sm:text-xl"
                          style={{
                            fontFamily: "var(--font-cinzel), serif",
                            background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {event.prizePool}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );

            if (event.unstopUrl) {
              return (
                <a
                  key={event.name}
                  href={event.unstopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              );
            }

            if (event.href) {
              return (
                <Link key={event.name} href={event.href} className="block">
                  {card}
                </Link>
              );
            }

            return card;
          })}
        </section>
      </div>
    </main>
  );
}

