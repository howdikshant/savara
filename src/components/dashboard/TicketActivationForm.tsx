"use client";

import { useActionState } from "react";
import { redeemTicketAction } from "@/app/dashboard/ticket/actions";

const initialState = {
  error: "",
  success: "",
};

export function TicketActivationForm() {
  const [state, formAction, isPending] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await redeemTicketAction(formData);
      return {
        error: result.error ?? "",
        success: result.success ?? "",
      };
    },
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-3">
      <label className="block text-sm font-medium" htmlFor="activationCode">
        Enter Ticket Activation Code
      </label>
      <input
        id="activationCode"
        name="activationCode"
        required
        autoComplete="off"
        className="w-full rounded-md border bg-transparent px-3 py-2 text-sm uppercase"
        style={{ borderColor: "rgba(212, 165, 116, 0.28)" }}
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em]"
        style={{ background: "var(--savara-gold)", color: "#0a0408" }}
      >
        {isPending ? "Activating..." : "Activate Ticket"}
      </button>

      {state.error && (
        <p className="text-sm" style={{ color: "#ff8c7a" }}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm" style={{ color: "#a6e7b2" }}>
          {state.success}
        </p>
      )}
    </form>
  );
}
