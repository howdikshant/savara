import { createClient } from "@/lib/supabase/server";

export type DashboardRole = {
  email: string;
  isAdmin: boolean;
  isVolunteer: boolean;
  participantType: "internal" | "external";
};

export async function getDashboardRole(): Promise<DashboardRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const normalizedEmail = user.email.toLowerCase();

  const [{ data: roleRow }, { data: profileRow }] = await Promise.all([
    supabase
      .from("roles")
      .select("is_admin, is_volunteer")
      .eq("email", normalizedEmail)
      .maybeSingle(),
    supabase.from("profiles").select("participant_type").eq("id", user.id).maybeSingle(),
  ]);

  const participantType =
    (profileRow?.participant_type as "internal" | "external" | undefined) ??
    (normalizedEmail.endsWith("@iiitdm.ac.in") ? "internal" : "external");

  return {
    email: normalizedEmail,
    isAdmin: roleRow?.is_admin ?? false,
    isVolunteer: roleRow?.is_volunteer ?? false,
    participantType,
  };
}
