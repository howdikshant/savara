import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDashboardRole, type DashboardRole } from "@/lib/auth/roles";

export async function requireDashboardUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  return user;
}

export async function requireDashboardRole() {
  await requireDashboardUser();
  const role = await getDashboardRole();
  if (!role) {
    redirect("/auth/login?next=/dashboard");
  }

  return role;
}

export async function requireVolunteerOrAdmin() {
  const role = await requireDashboardRole();
  if (!role.isVolunteer && !role.isAdmin) {
    redirect("/dashboard?error=forbidden");
  }
  return role;
}

export async function requireAdmin(): Promise<DashboardRole> {
  const role = await requireDashboardRole();
  if (!role.isAdmin) {
    redirect("/dashboard?error=admin_only");
  }
  return role;
}
