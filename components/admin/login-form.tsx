"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { signIn, type LoginState } from "@/app/admin/login/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(signIn, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      {state?.error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {state.error}
        </div>
      )}

      <div>
        <Label htmlFor="email" required>
          Email
        </Label>
        <div className="relative mt-1.5">
          <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <Input id="email" name="email" type="email" autoComplete="email" required className="pl-10" />
        </div>
      </div>

      <div>
        <Label htmlFor="password" required>
          Password
        </Label>
        <div className="relative mt-1.5">
          <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="pl-10"
          />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="mt-2 w-full">
        {isPending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
