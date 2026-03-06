import Link from "next/link";
import { requireDashboardRole } from "@/lib/auth/guards";

export default async function DashboardHomePage() {
  const role = await requireDashboardRole();

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article className="rounded-xl border p-5" style={{ borderColor: "rgba(212, 165, 116, 0.2)", background: "rgba(42, 31, 26, 0.42)" }}>
        <h2 className="text-xl font-bold uppercase">Ticket</h2>
        <p className="mt-2 text-sm" style={{ color: "rgba(245, 230, 211, 0.8)" }}>
          Redeem activation code and view your QR ticket.
        </p>
        <Link className="mt-4 inline-block rounded-md border px-3 py-2 text-sm" style={{ borderColor: "rgba(212, 165, 116, 0.25)" }} href="/dashboard/ticket">
          Open Ticket Page
        </Link>
      </article>

      {(role.isVolunteer || role.isAdmin) && (
        <article className="rounded-xl border p-5" style={{ borderColor: "rgba(212, 165, 116, 0.2)", background: "rgba(42, 31, 26, 0.42)" }}>
          <h2 className="text-xl font-bold uppercase">Event Check-In</h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(245, 230, 211, 0.8)" }}>
            Select event, scan QR tokens, and manage teams.
          </p>
          <Link className="mt-4 inline-block rounded-md border px-3 py-2 text-sm" style={{ borderColor: "rgba(212, 165, 116, 0.25)" }} href="/dashboard/events/check-in">
            Open Check-In
          </Link>
        </article>
      )}

      {role.isAdmin && (
        <article className="rounded-xl border p-5" style={{ borderColor: "rgba(212, 165, 116, 0.2)", background: "rgba(42, 31, 26, 0.42)" }}>
          <h2 className="text-xl font-bold uppercase">Admin Verification</h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(245, 230, 211, 0.8)" }}>
            Enter purchaser email and ticket count, generate activation code, send via Resend.
          </p>
          <Link className="mt-4 inline-block rounded-md border px-3 py-2 text-sm" style={{ borderColor: "rgba(212, 165, 116, 0.25)" }} href="/dashboard/admin/purchases">
            Open Admin Panel
          </Link>
        </article>
      )}
    </section>
  );
}
