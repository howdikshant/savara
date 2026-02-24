"use client";

import { useEffect, useMemo, useState } from "react";

const TARGET_IST_MS = Date.UTC(2026, 2, 26, 18, 30, 0); // 27 Mar 2026, 00:00 IST
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getTimeParts(nowMs: number) {
  const remaining = Math.max(0, TARGET_IST_MS - nowMs);

  const days = Math.floor(remaining / DAY);
  const hours = Math.floor((remaining % DAY) / HOUR);
  const minutes = Math.floor((remaining % HOUR) / MINUTE);
  const seconds = Math.floor((remaining % MINUTE) / SECOND);

  return { days, hours, minutes, seconds };
}

function TimeUnit({
  value,
}: {
  value: number;
}) {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="chrono-unit min-w-16 sm:min-w-20">
      <span key={padded} className="chrono-digit-value">
        {padded}
      </span>
    </div>
  );
}

export default function ChronoCountdown() {
  const [nowMs, setNowMs] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const update = () => {
      const current = Date.now();
      setNowMs(current);
      if (current >= TARGET_IST_MS) setIsComplete(true);
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = useMemo(
    () => getTimeParts(nowMs ?? TARGET_IST_MS),
    [nowMs],
  );

  return (
    <div className="mt-4 flex w-full flex-col items-center">
      <div className="w-full max-w-4xl px-3 sm:px-6">
        {isComplete ? (
          <div className="chrono-breach-text">
            Time Gate Open
          </div>
        ) : (
          <div className="chrono-digits-row flex items-center justify-center gap-3 sm:gap-5">
            <TimeUnit value={time.days} />
            <span className="chrono-dot-separator">•</span>
            <TimeUnit value={time.hours} />
            <span className="chrono-dot-separator">•</span>
            <TimeUnit value={time.minutes} />
            <span className="chrono-dot-separator">•</span>
            <TimeUnit value={time.seconds} />
          </div>
        )}
      </div>
    </div>
  );
}
