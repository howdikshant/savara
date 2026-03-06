"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import {
  checkInIndividualAction,
  createTeamAction,
  joinTeamAction,
  removeCheckInAction,
} from "@/app/dashboard/events/check-in/actions";

type EventOption = {
  id: string;
  name: string;
  teamMinSize: number;
  teamMaxSize: number;
};

type TeamOption = {
  id: string;
  eventId: string;
  name: string;
};

const initialState = { error: "", success: "" };

export function CheckInForms({ events, teams }: { events: EventOption[]; teams: TeamOption[] }) {
  const [selectedEvent, setSelectedEvent] = useState(events[0]?.id ?? "");
  const [mode, setMode] = useState<"individual" | "create-team" | "join-team">("individual");

  useEffect(() => {
    const saved = window.localStorage.getItem("checkin:selectedEvent");
    if (saved && events.some((event) => event.id === saved)) {
      setSelectedEvent(saved);
    }
  }, [events]);

  useEffect(() => {
    if (selectedEvent) {
      window.localStorage.setItem("checkin:selectedEvent", selectedEvent);
    }
  }, [selectedEvent]);

  const eventTeams = useMemo(() => teams.filter((team) => team.eventId === selectedEvent), [teams, selectedEvent]);
  const selectedEventDetails = useMemo(() => events.find((event) => event.id === selectedEvent), [events, selectedEvent]);

  const [individualState, individualAction, individualPending] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await checkInIndividualAction(formData);
      return { error: result.error ?? "", success: result.success ?? "" };
    },
    initialState,
  );

  const [removeState, removeAction, removePending] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await removeCheckInAction(formData);
      return { error: result.error ?? "", success: result.success ?? "" };
    },
    initialState,
  );

  const [createState, createAction, createPending] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await createTeamAction(formData);
      return { error: result.error ?? "", success: result.success ?? "" };
    },
    initialState,
  );

  const [joinState, joinAction, joinPending] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await joinTeamAction(formData);
      return { error: result.error ?? "", success: result.success ?? "" };
    },
    initialState,
  );

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-xl border p-5" style={{ borderColor: "rgba(212, 165, 116, 0.2)", background: "rgba(42, 31, 26, 0.42)" }}>
        <h1 className="text-2xl font-bold uppercase">Volunteer Check-In</h1>

        <label className="mt-4 block text-sm font-medium" htmlFor="eventSelect">
          Select Event
        </label>
        <select
          id="eventSelect"
          className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
          value={selectedEvent}
          onChange={(event) => setSelectedEvent(event.target.value)}
        >
          {events.map((eventOption) => (
            <option key={eventOption.id} value={eventOption.id} style={{ color: "#0a0408" }}>
              {eventOption.name}
            </option>
          ))}
        </select>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("individual")}
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: mode === "individual" ? "var(--savara-gold)" : "rgba(212, 165, 116, 0.2)" }}
          >
            Check In Individual
          </button>
          <button
            type="button"
            onClick={() => setMode("create-team")}
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: mode === "create-team" ? "var(--savara-gold)" : "rgba(212, 165, 116, 0.2)" }}
          >
            Create Team
          </button>
          <button
            type="button"
            onClick={() => setMode("join-team")}
            className="rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: mode === "join-team" ? "var(--savara-gold)" : "rgba(212, 165, 116, 0.2)" }}
          >
            Join Team
          </button>
        </div>

        {mode === "individual" && (
          <div className="mt-5 space-y-4">
            <form action={individualAction} className="space-y-2">
              <input type="hidden" name="eventId" value={selectedEvent} />
              <label className="block text-sm font-medium" htmlFor="individualQr">
                Participant QR Token / JSON
              </label>
              <input
                id="individualQr"
                name="qrToken"
                required
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
              />
              <button
                type="submit"
                disabled={individualPending}
                className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em]"
                style={{ background: "var(--savara-gold)", color: "#0a0408" }}
              >
                {individualPending ? "Checking..." : "Check In"}
              </button>
              {individualState.error && <p className="text-sm" style={{ color: "#ff8c7a" }}>{individualState.error}</p>}
              {individualState.success && <p className="text-sm" style={{ color: "#a6e7b2" }}>{individualState.success}</p>}
            </form>

            <form action={removeAction} className="space-y-2">
              <input type="hidden" name="eventId" value={selectedEvent} />
              <label className="block text-sm font-medium" htmlFor="removeQr">
                Remove Participant by QR
              </label>
              <input
                id="removeQr"
                name="qrToken"
                required
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
                style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
              />
              <button
                type="submit"
                disabled={removePending}
                className="rounded-md border px-4 py-2 text-sm"
                style={{ borderColor: "rgba(212, 165, 116, 0.25)" }}
              >
                {removePending ? "Removing..." : "Remove Check-In"}
              </button>
              {removeState.error && <p className="text-sm" style={{ color: "#ff8c7a" }}>{removeState.error}</p>}
              {removeState.success && <p className="text-sm" style={{ color: "#a6e7b2" }}>{removeState.success}</p>}
            </form>
          </div>
        )}

        {mode === "create-team" && (
          <form action={createAction} className="mt-5 space-y-2">
            <input type="hidden" name="eventId" value={selectedEvent} />
            <p className="text-xs" style={{ color: "rgba(245, 230, 211, 0.7)" }}>
              Team size for this event: {selectedEventDetails?.teamMinSize ?? 1} to {selectedEventDetails?.teamMaxSize ?? 1}
            </p>
            <input
              name="teamName"
              required
              placeholder="Team name"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
            />
            <input
              name="leaderQr"
              required
              placeholder="Leader QR token / JSON"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
            />
            <textarea
              name="memberQrs"
              placeholder="Member QRs, one per line"
              className="h-32 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
            />
            <button
              type="submit"
              disabled={createPending}
              className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ background: "var(--savara-gold)", color: "#0a0408" }}
            >
              {createPending ? "Creating..." : "Check In Team"}
            </button>
            {createState.error && <p className="text-sm" style={{ color: "#ff8c7a" }}>{createState.error}</p>}
            {createState.success && <p className="text-sm" style={{ color: "#a6e7b2" }}>{createState.success}</p>}
          </form>
        )}

        {mode === "join-team" && (
          <form action={joinAction} className="mt-5 space-y-2">
            <label className="block text-sm font-medium" htmlFor="teamId">
              Existing Team
            </label>
            <select
              id="teamId"
              name="teamId"
              required
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
            >
              {eventTeams.map((team) => (
                <option key={team.id} value={team.id} style={{ color: "#0a0408" }}>
                  {team.name}
                </option>
              ))}
            </select>
            <textarea
              name="memberQrs"
              required
              placeholder="Member QRs, one per line"
              className="h-32 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
            />
            <button
              type="submit"
              disabled={joinPending}
              className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ background: "var(--savara-gold)", color: "#0a0408" }}
            >
              {joinPending ? "Adding..." : "Add Members"}
            </button>
            {joinState.error && <p className="text-sm" style={{ color: "#ff8c7a" }}>{joinState.error}</p>}
            {joinState.success && <p className="text-sm" style={{ color: "#a6e7b2" }}>{joinState.success}</p>}
          </form>
        )}
      </article>

      <article className="rounded-xl border p-5" style={{ borderColor: "rgba(212, 165, 116, 0.2)", background: "rgba(42, 31, 26, 0.42)" }}>
        <h2 className="text-xl font-bold uppercase">Existing Teams</h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(245, 230, 211, 0.8)" }}>
          Teams for selected event are shown below.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {eventTeams.length === 0 && <li style={{ color: "rgba(245, 230, 211, 0.7)" }}>No teams yet.</li>}
          {eventTeams.map((team) => (
            <li key={team.id} className="rounded-md border px-3 py-2" style={{ borderColor: "rgba(212, 165, 116, 0.18)" }}>
              {team.name}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
