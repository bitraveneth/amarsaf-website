"use client";

import { useRef, useState, useTransition } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { FormMessage } from "@/components/admin/form-message";

export type DemoAccount = {
  role: "SUPERADMIN" | "ADMIN" | "STAFF";
  label: string;
  email: string;
  password: string;
  hint: string;
};

const ROLE_META = {
  SUPERADMIN: {
    icon: ShieldCheck,
    tone: "border-violet-200/80 bg-violet-50/90 hover:border-violet-300 hover:bg-violet-50",
    badge: "bg-violet-600 text-white",
    ring: "focus-visible:ring-violet-400",
  },
  ADMIN: {
    icon: Shield,
    tone: "border-sky-200/80 bg-sky-50/90 hover:border-sky-300 hover:bg-sky-50",
    badge: "bg-sky-600 text-white",
    ring: "focus-visible:ring-sky-400",
  },
  STAFF: {
    icon: UserRound,
    tone: "border-emerald-200/80 bg-emerald-50/90 hover:border-emerald-300 hover:bg-emerald-50",
    badge: "bg-emerald-600 text-white",
    ring: "focus-visible:ring-emerald-400",
  },
} as const;

export function LoginForm({
  action,
  error,
  demos,
}: {
  action: (formData: FormData) => Promise<void>;
  error?: string;
  demos: DemoAccount[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, startTransition] = useTransition();

  function fillAndSignIn(demo: DemoAccount) {
    setEmail(demo.email);
    setPassword(demo.password);
    queueMicrotask(() => {
      const form = formRef.current;
      if (!form) return;
      const fd = new FormData(form);
      fd.set("email", demo.email);
      fd.set("password", demo.password);
      startTransition(() => {
        void action(fd);
      });
    });
  }

  return (
    <div className="space-y-7">
      <form
        ref={formRef}
        action={action}
        className="space-y-5"
        onSubmit={() => startTransition(() => undefined)}
      >
        <FormMessage message={error} />

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="!mb-2 !text-[0.8125rem] !font-semibold !tracking-normal !text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-[1.05rem] -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@safwater.com"
                className="!h-12 !rounded-xl !border-slate-200 !bg-slate-50/80 !pl-11 !text-[0.9375rem] !shadow-none placeholder:!text-slate-400 focus:!border-violet-500 focus:!bg-white focus:!shadow-[0_0_0_4px_rgb(91_33_182/0.12)]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="!mb-2 !text-[0.8125rem] !font-semibold !tracking-normal !text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-[1.05rem] -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="!h-12 !rounded-xl !border-slate-200 !bg-slate-50/80 !pr-11 !pl-11 !text-[0.9375rem] !shadow-none placeholder:!text-slate-400 focus:!border-violet-500 focus:!bg-white focus:!shadow-[0_0_0_4px_rgb(91_33_182/0.12)]"
              />
              <button
                type="button"
                data-variant="ghost"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="admin-btn-primary !mt-1 !h-12 !w-full !rounded-xl !text-[0.9375rem] !shadow-[0_10px_24px_-12px_rgb(91_33_182/0.7)]"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              Continue to CMS
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      {demos.length > 0 ? (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <p className="text-[11px] font-bold tracking-[0.16em] text-slate-400 uppercase">
              Quick sign-in
            </p>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
          <ul className="grid gap-2">
            {demos.map((demo) => {
              const meta = ROLE_META[demo.role];
              const Icon = meta.icon;
              return (
                <li key={demo.role}>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => fillAndSignIn(demo)}
                    className={`group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-[transform,box-shadow,background-color] hover:-translate-y-px hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60 ${meta.tone} ${meta.ring}`}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${meta.badge}`}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{demo.label}</span>
                        <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-500 uppercase ring-1 ring-black/5">
                          {demo.role}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {demo.hint}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
