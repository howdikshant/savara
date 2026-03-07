import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json()) as { eventId?: string; ticketId?: string };
  const eventId = String(body.eventId ?? "").trim();
  const ticketId = String(body.ticketId ?? "").trim();

  if (!eventId || !ticketId) {
    return NextResponse.json({ error: "Event and ticket are required." }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("remove_event_checkin_by_ticket", {
    p_event_id: eventId,
    p_ticket_id: ticketId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ removed: Boolean(data) });
}
