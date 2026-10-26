"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { canPublish, type Role } from "@/lib/roles";

/**
 * Draft / Live visibility for content.
 * SUPERADMIN + ADMIN can publish; STAFF always saves as draft.
 */
export function PublishCheckbox({
  role,
  defaultChecked,
  name = "isPublished",
}: {
  role: Role;
  defaultChecked?: boolean;
  name?: string;
}) {
  const canPub = canPublish(role);
  const [live, setLive] = useState(Boolean(defaultChecked) && canPub);

  return (
    <div className="rounded-xl border border-[var(--admin-border)] bg-white p-3 sm:p-3.5">
      {/* Always submit a value; unchecked checkboxes are omitted from FormData */}
      <input type="hidden" name={name} value={live ? "true" : "false"} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--admin-text)]">Visibility on site</p>
          <p className="mt-0.5 text-xs text-[var(--admin-muted)]">
            {canPub
              ? live
                ? "Live — visitors can see this on the public site."
                : "Draft — saved in CMS only, hidden from the public site."
              : "Staff accounts can only save drafts. An admin must publish."}
          </p>
        </div>

        <div
          role="group"
          aria-label="Visibility"
          className={`inline-flex rounded-lg bg-slate-100 p-1 ${!canPub ? "opacity-60" : ""}`}
        >
          <button
            type="button"
            disabled={!canPub}
            onClick={() => setLive(false)}
            className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
              !live
                ? "bg-white text-amber-800 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <EyeOff className="size-3.5" />
            Draft
          </button>
          <button
            type="button"
            disabled={!canPub}
            onClick={() => setLive(true)}
            className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-colors ${
              live
                ? "bg-white text-emerald-800 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Eye className="size-3.5" />
            Live
          </button>
        </div>
      </div>
    </div>
  );
}
