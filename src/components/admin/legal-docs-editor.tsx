"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  FileText,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import type { Role } from "@/lib/roles";
import { cn } from "@/lib/utils";

export type LegalSectionDraft = {
  id: string;
  title: string;
  body: string[];
  list?: string[];
};

export type LegalDocDraft = {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: LegalSectionDraft[];
  updatedLabel: string | null;
  updatedIso: string | null;
  order: number;
  isPublished: boolean;
};

function newSection(): LegalSectionDraft {
  return {
    id: `section-${Math.random().toString(36).slice(2, 8)}`,
    title: "New section",
    body: [""],
    list: [],
  };
}

function DocEditor({
  doc,
  role,
  canDelete,
  open,
  onToggle,
  saveAction,
  deleteAction,
}: {
  doc: LegalDocDraft;
  role: Role;
  canDelete: boolean;
  open: boolean;
  onToggle: () => void;
  saveAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [label, setLabel] = useState(doc.label);
  const [slug, setSlug] = useState(doc.slug);
  const [title, setTitle] = useState(doc.title);
  const [description, setDescription] = useState(doc.description);
  const [intro, setIntro] = useState(doc.intro);
  const [updatedLabel, setUpdatedLabel] = useState(doc.updatedLabel ?? "");
  const [updatedIso, setUpdatedIso] = useState(doc.updatedIso ?? "");
  const [order, setOrder] = useState(String(doc.order));
  const [sections, setSections] = useState<LegalSectionDraft[]>(doc.sections);
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    doc.sections[0]?.id ?? null,
  );

  const sectionsJson = useMemo(() => JSON.stringify(sections), [sections]);

  function updateSection(id: string, patch: Partial<LegalSectionDraft>) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function moveSection(index: number, direction: -1 | 1) {
    setSections((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      const tmp = next[index]!;
      next[index] = next[target]!;
      next[target] = tmp;
      return next;
    });
  }

  return (
    <article className="admin-panel overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80 sm:px-6"
        aria-expanded={open}
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
          <FileText className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-[var(--admin-text)] sm:text-lg">
              {doc.label}
            </span>
            <span
              className={cn(
                "admin-status-pill",
                doc.isPublished ? "is-live" : "is-draft",
              )}
            >
              {doc.isPublished ? "Live" : "Draft"}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-sm text-[var(--admin-muted)]">
            /legal/{doc.slug} · {doc.sections.length} section
            {doc.sections.length === 1 ? "" : "s"}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-[var(--admin-faint)] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="border-t border-[var(--admin-border)] bg-slate-50/40 px-5 py-5 sm:px-6 sm:py-6">
          <form action={saveAction} className="space-y-6">
            <input type="hidden" name="id" value={doc.id} />
            <input type="hidden" name="sectionsJson" value={sectionsJson} />

            <div className="admin-panel space-y-4 p-4 sm:p-5">
              <p className="admin-section-label">Document details</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label htmlFor={`${doc.id}-label`}>Nav label</label>
                  <input
                    id={`${doc.id}-label`}
                    name="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`${doc.id}-slug`}>URL slug</label>
                  <input
                    id={`${doc.id}-slug`}
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${doc.id}-title`}>Page title</label>
                  <input
                    id={`${doc.id}-title`}
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${doc.id}-description`}>SEO description</label>
                  <textarea
                    id={`${doc.id}-description`}
                    name="description"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${doc.id}-intro`}>Intro</label>
                  <textarea
                    id={`${doc.id}-intro`}
                    name="intro"
                    rows={4}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    required
                    className="!min-h-[7rem] !leading-relaxed"
                  />
                </div>
                <div>
                  <label htmlFor={`${doc.id}-updatedLabel`}>Updated label</label>
                  <input
                    id={`${doc.id}-updatedLabel`}
                    name="updatedLabel"
                    value={updatedLabel}
                    onChange={(e) => setUpdatedLabel(e.target.value)}
                    placeholder="4 October 2026"
                  />
                </div>
                <div>
                  <label htmlFor={`${doc.id}-updatedIso`}>Updated date (ISO)</label>
                  <input
                    id={`${doc.id}-updatedIso`}
                    name="updatedIso"
                    value={updatedIso}
                    onChange={(e) => setUpdatedIso(e.target.value)}
                    placeholder="2026-10-04"
                  />
                </div>
                <div>
                  <label htmlFor={`${doc.id}-order`}>Order</label>
                  <input
                    id={`${doc.id}-order`}
                    name="order"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <PublishCheckbox role={role} defaultChecked={doc.isPublished} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="admin-section-label !mb-1">Sections</p>
                  <p className="text-sm text-[var(--admin-muted)]">
                    Open a section to edit its title, paragraphs, and optional bullets.
                  </p>
                </div>
                <button
                  type="button"
                  data-variant="outline"
                  onClick={() => {
                    const section = newSection();
                    setSections((prev) => [...prev, section]);
                    setOpenSectionId(section.id);
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--admin-border-strong)] bg-white px-3.5 text-sm font-semibold hover:bg-slate-50"
                >
                  <Plus className="size-4" />
                  Add section
                </button>
              </div>

              {sections.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--admin-border-strong)] bg-white px-5 py-10 text-center">
                  <p className="text-sm font-semibold text-[var(--admin-text)]">No sections yet</p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">
                    Add a section to start writing this document.
                  </p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {sections.map((section, index) => {
                    const isOpen = openSectionId === section.id;
                    return (
                      <li
                        key={section.id}
                        className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-white shadow-sm"
                      >
                        <div className="flex items-center gap-1 border-b border-transparent px-2 sm:px-3">
                          <span
                            className="hidden shrink-0 px-1 text-[var(--admin-faint)] sm:block"
                            title="Reorder with arrows"
                          >
                            <GripVertical className="size-4" />
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSectionId(isOpen ? null : section.id)
                            }
                            className="flex min-w-0 flex-1 items-center gap-3 py-3.5 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-violet-700 tabular-nums">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-[var(--admin-text)]">
                                {section.title || "Untitled section"}
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-[var(--admin-muted)]">
                                {section.body.filter(Boolean).length} paragraph
                                {section.body.filter(Boolean).length === 1 ? "" : "s"}
                                {section.list?.length
                                  ? ` · ${section.list.length} bullet${section.list.length === 1 ? "" : "s"}`
                                  : ""}
                              </span>
                            </span>
                            <ChevronDown
                              className={cn(
                                "size-4 shrink-0 text-[var(--admin-faint)] transition-transform",
                                isOpen && "rotate-180",
                              )}
                            />
                          </button>
                          <div className="flex shrink-0 items-center gap-0.5 pr-1">
                            <button
                              type="button"
                              data-variant="ghost"
                              disabled={index === 0}
                              onClick={() => moveSection(index, -1)}
                              className="rounded-lg px-2 py-1.5 text-xs font-semibold text-[var(--admin-muted)] hover:bg-slate-100 disabled:opacity-30"
                              aria-label="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              data-variant="ghost"
                              disabled={index === sections.length - 1}
                              onClick={() => moveSection(index, 1)}
                              className="rounded-lg px-2 py-1.5 text-xs font-semibold text-[var(--admin-muted)] hover:bg-slate-100 disabled:opacity-30"
                              aria-label="Move down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              data-variant="ghost"
                              onClick={() => {
                                setSections((prev) => prev.filter((s) => s.id !== section.id));
                                if (openSectionId === section.id) setOpenSectionId(null);
                              }}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                              aria-label="Remove section"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>

                        {isOpen ? (
                          <div className="space-y-4 border-t border-[var(--admin-border)] bg-slate-50/50 px-4 py-4 sm:px-5 sm:py-5">
                            <div>
                              <label htmlFor={`${section.id}-title`}>Section title</label>
                              <input
                                id={`${section.id}-title`}
                                value={section.title}
                                onChange={(e) =>
                                  updateSection(section.id, { title: e.target.value })
                                }
                                required
                                className="!text-base !font-semibold"
                              />
                            </div>
                            <div>
                              <label htmlFor={`${section.id}-body`}>Body text</label>
                              <p className="mb-2 text-xs text-[var(--admin-muted)]">
                                Write normally. Separate paragraphs with a blank line.
                              </p>
                              <textarea
                                id={`${section.id}-body`}
                                rows={8}
                                value={section.body.join("\n\n")}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    body: e.target.value
                                      .split(/\n\s*\n/)
                                      .map((p) => p.trim())
                                      .filter(Boolean),
                                  })
                                }
                                className="!min-h-[12rem] !leading-relaxed"
                                placeholder="First paragraph…

Second paragraph…"
                              />
                            </div>
                            <div>
                              <label htmlFor={`${section.id}-list`}>
                                Bullet list <span className="font-normal">(optional)</span>
                              </label>
                              <p className="mb-2 text-xs text-[var(--admin-muted)]">
                                One bullet per line. Leave empty if this section has no list.
                              </p>
                              <textarea
                                id={`${section.id}-list`}
                                rows={4}
                                value={(section.list ?? []).join("\n")}
                                onChange={(e) => {
                                  const lines = e.target.value
                                    .split("\n")
                                    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
                                    .filter(Boolean);
                                  updateSection(section.id, {
                                    list: lines.length ? lines : [],
                                  });
                                }}
                                className="!leading-relaxed"
                                placeholder="First point
Second point"
                              />
                            </div>
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--admin-border)] pt-5">
              <button type="submit" className="admin-btn-primary min-w-[9rem]">
                Save document
              </button>
              {canDelete ? (
                <button
                  type="submit"
                  formAction={deleteAction}
                  data-variant="destructive"
                  onClick={(e) => {
                    if (!confirm(`Delete “${doc.label}”? This cannot be undone.`)) {
                      e.preventDefault();
                    }
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
    </article>
  );
}

function NewDocForm({
  role,
  saveAction,
}: {
  role: Role;
  saveAction: (formData: FormData) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<LegalSectionDraft[]>([newSection()]);
  const [openSectionId, setOpenSectionId] = useState<string | null>(sections[0]?.id ?? null);
  const sectionsJson = useMemo(() => JSON.stringify(sections), [sections]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--admin-border-strong)] bg-white/60 px-5 py-8 text-sm font-semibold text-[var(--admin-muted)] transition-colors hover:border-violet-400 hover:bg-violet-50/50 hover:text-violet-800"
      >
        <Plus className="size-4" />
        New legal document
      </button>
    );
  }

  return (
    <div className="admin-panel overflow-hidden border-violet-200">
      <div className="border-b border-[var(--admin-border)] bg-violet-50/70 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold">New legal document</h2>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Create the page shell, then add sections below.
        </p>
      </div>
      <form action={saveAction} className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
        <input type="hidden" name="sectionsJson" value={sectionsJson} />
        <div className="admin-field-grid admin-field-grid-2">
          <div>
            <label>Nav label</label>
            <input name="label" required placeholder="Privacy" />
          </div>
          <div>
            <label>URL slug</label>
            <input name="slug" required placeholder="privacy" />
          </div>
          <div className="sm:col-span-2">
            <label>Page title</label>
            <input name="title" required placeholder="Privacy policy" />
          </div>
          <div className="sm:col-span-2">
            <label>SEO description</label>
            <textarea name="description" rows={2} required />
          </div>
          <div className="sm:col-span-2">
            <label>Intro</label>
            <textarea name="intro" rows={3} required className="!leading-relaxed" />
          </div>
          <div>
            <label>Updated label</label>
            <input name="updatedLabel" placeholder="4 October 2026" />
          </div>
          <div>
            <label>Updated date (ISO)</label>
            <input name="updatedIso" placeholder="2026-10-04" />
          </div>
          <div>
            <label>Order</label>
            <input name="order" type="number" defaultValue={0} />
          </div>
          <div className="sm:col-span-2">
            <PublishCheckbox role={role} defaultChecked />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="admin-section-label !mb-0">Sections</p>
            <button
              type="button"
              data-variant="outline"
              onClick={() => {
                const section = newSection();
                setSections((prev) => [...prev, section]);
                setOpenSectionId(section.id);
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--admin-border-strong)] bg-white px-3 text-xs font-semibold"
            >
              <Plus className="size-3.5" />
              Add
            </button>
          </div>
          {sections.map((section, index) => {
            const isOpen = openSectionId === section.id;
            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenSectionId(isOpen ? null : section.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="text-xs font-bold text-violet-700 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate text-sm font-semibold">
                    {section.title || "Untitled section"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-[var(--admin-faint)] transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="space-y-3 border-t border-[var(--admin-border)] px-4 py-4">
                    <div>
                      <label>Section title</label>
                      <input
                        value={section.title}
                        onChange={(e) =>
                          setSections((prev) =>
                            prev.map((s) =>
                              s.id === section.id ? { ...s, title: e.target.value } : s,
                            ),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label>Body text</label>
                      <textarea
                        rows={5}
                        value={section.body.join("\n\n")}
                        onChange={(e) =>
                          setSections((prev) =>
                            prev.map((s) =>
                              s.id === section.id
                                ? {
                                    ...s,
                                    body: e.target.value
                                      .split(/\n\s*\n/)
                                      .map((p) => p.trim())
                                      .filter(Boolean),
                                  }
                                : s,
                            ),
                          )
                        }
                        className="!leading-relaxed"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="admin-btn-primary">
            Create document
          </button>
          <button
            type="button"
            data-variant="ghost"
            onClick={() => setOpen(false)}
            className="h-10 rounded-xl px-4 text-sm font-semibold text-[var(--admin-muted)] hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export function LegalDocsEditor({
  docs,
  role,
  canDelete,
  saveAction,
  deleteAction,
}: {
  docs: LegalDocDraft[];
  role: Role;
  canDelete: boolean;
  saveAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  const [openId, setOpenId] = useState<string | null>(docs[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {docs.map((doc) => (
        <DocEditor
          key={doc.id}
          doc={doc}
          role={role}
          canDelete={canDelete}
          open={openId === doc.id}
          onToggle={() => setOpenId((id) => (id === doc.id ? null : doc.id))}
          saveAction={saveAction}
          deleteAction={deleteAction}
        />
      ))}
      <NewDocForm role={role} saveAction={saveAction} />
    </div>
  );
}
