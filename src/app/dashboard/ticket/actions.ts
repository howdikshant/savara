"use server";

import { revalidatePath } from "next/cache";
import { requireDashboardUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";

export async function redeemTicketAction(formData: FormData) {
  await requireDashboardUser();
  const supabase = await createClient();

  const activationCode = String(formData.get("activationCode") ?? "").trim().toUpperCase();
  if (!activationCode) {
    return { error: "Activation code is required." };
  }

  const { error } = await supabase.rpc("redeem_activation_code", {
    p_code: activationCode,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/ticket");
  return { success: "Ticket activated successfully." };
}
