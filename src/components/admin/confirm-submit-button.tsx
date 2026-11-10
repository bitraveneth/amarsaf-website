"use client";

import type { ReactNode } from "react";

export function ConfirmSubmitButton({
  formAction,
  message,
  className,
  children,
  "data-variant": dataVariant,
}: {
  formAction: (formData: FormData) => void | Promise<void>;
  message: string;
  className?: string;
  children: ReactNode;
  "data-variant"?: string;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      data-variant={dataVariant}
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
