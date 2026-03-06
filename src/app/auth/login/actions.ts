"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle(nextPath?: string) {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
  }

  const callbackUrl = new URL("/auth/callback", siteUrl);
  if (nextPath) {
    callbackUrl.searchParams.set("next", nextPath);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    throw new Error(error?.message ?? "Unable to start Google sign-in");
  }

  redirect(data.url);
}
