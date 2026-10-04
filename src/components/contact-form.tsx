"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { jobs } from "@/lib/careers";
import { businessNeeds, enquiryTypes, supportTopics, type EnquiryType } from "@/lib/contact";
import { company, products } from "@/lib/site";
import { cn } from "@/lib/utils";

type FieldName =
  | "fullName"
  | "phone"
  | "email"
  | "location"
  | "company"
  | "product"
  | "need"
  | "topic"
  | "role"
  | "message";

const fieldCopy: Record<FieldName, string> = {
  fullName: "Enter your full name.",
  phone: "Enter a phone number we can call.",
  email: "Enter a valid email address, or leave it empty.",
  location: "Enter your area or delivery location.",
  company: "Enter your company or shop name.",
  product: "Choose the product you are asking about.",
  need: "Choose what you need.",
  topic: "Choose what you need help with.",
  role: "Choose a role, or Open application.",
  message: "Tell us a little about the problem.",
};

const required: Record<EnquiryType, FieldName[]> = {
  product: ["fullName", "phone", "location", "product"],
  business: ["fullName", "phone", "company", "location", "need"],
  support: ["fullName", "phone", "location", "topic", "message"],
  careers: ["fullName", "phone", "role"],
};

const messageLabel: Record<EnquiryType, string> = {
  product: "Your question",
  business: "Volumes, areas, or anything we should know",
  support: "What happened?",
  careers: "Tell us about your experience",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm({
  defaultType = "product",
  defaultRole,
  defaultProduct,
}: {
  defaultType?: EnquiryType;
  defaultRole?: string;
  defaultProduct?: string;
}) {
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState<EnquiryType | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const errorCount = Object.keys(errors).length;
  const needs = required[type];

  useEffect(() => {
    if (submitted || errorCount > 0) alertRef.current?.focus();
  }, [submitted, errorCount]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Partial<Record<FieldName, string>> = {};
    for (const name of needs) {
      if (!String(data.get(name) ?? "").trim()) next[name] = fieldCopy[name];
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !isEmail(email)) next.email = fieldCopy.email;
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0 ? type : null);
  }

  function chooseType(next: EnquiryType) {
    setType(next);
    setErrors({});
  }

  if (submitted) {
    const label = enquiryTypes.find((item) => item.id === submitted)?.title ?? "Enquiry";
    return (
      <div ref={alertRef} tabIndex={-1} role="status" className="rounded-[1.5rem] bg-lavender px-6 py-10 sm:px-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-purple text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <p className="eyebrow mt-6 text-purple">{label} recorded</p>
        <h3 className="text-title mt-3 text-ink">Thank you — we have your details.</h3>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/80">
          This preview keeps your enquiry in this browser session only; it is not
          sent anywhere yet. For a quick answer, call the hotline on{" "}
          <span className="font-semibold whitespace-nowrap text-ink">{company.hotline}</span>.
        </p>
        <Button
          type="button"
          className="mt-8 h-12 rounded-full px-6 text-[0.9375rem] font-semibold"
          onClick={() => setSubmitted(null)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const field = (name: FieldName) => ({ name, error: errors[name], optional: !needs.includes(name) });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">What is this about?</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {enquiryTypes.map(({ id, label, icon: Icon }) => (
            <label
              key={id}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-2xl px-3.5 py-3 text-sm font-semibold ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-purple",
                type === id ? "bg-purple text-white ring-purple" : "bg-haze text-ink ring-ink/10 hover:bg-lavender",
              )}
            >
              <input
                type="radio"
                name="type"
                value={id}
                checked={type === id}
                onChange={() => chooseType(id)}
                className="sr-only"
              />
              <Icon aria-hidden className="size-4 shrink-0" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {errorCount > 0 ? (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-destructive/30 bg-[#fff5f7] px-4 py-3 text-sm font-medium text-destructive"
        >
          Please check the form. {errorCount} {errorCount === 1 ? "field needs" : "fields need"} a correction.
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" autoComplete="name" {...field("fullName")} />
        <Field id="phone" label="Phone" type="tel" autoComplete="tel" {...field("phone")} />
        <Field id="email" label="Email" type="email" autoComplete="email" {...field("email")} />
        <Field id="location" label="Area or location" autoComplete="address-level2" {...field("location")} />
      </div>

      {type === "product" ? (
        <Select
          id="product"
          label="Which product?"
          placeholder="Choose a product"
          defaultValue={products.some((product) => product.name === defaultProduct) ? defaultProduct : undefined}
          {...field("product")}
        >
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name} — {product.size}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </Select>
      ) : null}

      {type === "business" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="company" label="Company or shop" autoComplete="organization" {...field("company")} />
          <Select id="need" label="What do you need?" placeholder="Choose one" {...field("need")}>
            {businessNeeds.map((need) => (
              <option key={need}>{need}</option>
            ))}
          </Select>
        </div>
      ) : null}

      {type === "support" ? (
        <Select id="topic" label="What do you need help with?" placeholder="Choose one" {...field("topic")}>
          {supportTopics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </Select>
      ) : null}

      {type === "careers" ? (
        <Select
          id="role"
          label="Role"
          placeholder="Choose a role"
          defaultValue={jobs.some((job) => job.slug === defaultRole) ? defaultRole : undefined}
          {...field("role")}
        >
          {jobs.map((job) => (
            <option key={job.slug} value={job.slug}>
              {job.title}
            </option>
          ))}
          <option value="open-application">Open application</option>
        </Select>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="message">
          {messageLabel[type]}
          {needs.includes("message") ? null : <span className="font-normal text-ink/55"> (optional)</span>}
        </Label>
        <Textarea
          key={type}
          id="message"
          name="message"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-32 rounded-xl bg-white px-4 py-3 text-base aria-invalid:border-destructive"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="h-12 w-full rounded-full px-7 text-[0.9375rem] font-semibold sm:w-fit">
        Send {enquiryTypes.find((item) => item.id === type)?.title.toLowerCase()}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  error,
  optional,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: FieldName;
  label: string;
  error?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="font-normal text-ink/55"> (optional)</span> : null}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 rounded-xl bg-white px-4 text-base"
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  label,
  placeholder,
  error,
  optional,
  defaultValue,
  children,
}: {
  id: string;
  name: FieldName;
  label: string;
  placeholder: string;
  error?: string;
  optional?: boolean;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <Label htmlFor={id}>
        {label}
        {optional ? <span className="font-normal text-ink/55"> (optional)</span> : null}
      </Label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-ink transition-colors hover:border-ink/30 aria-invalid:border-destructive"
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
