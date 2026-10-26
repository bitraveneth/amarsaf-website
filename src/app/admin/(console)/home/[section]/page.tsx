import { notFound, redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { saveHomeSection } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaPicker } from "@/components/admin/media-picker";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

const META: Record<string, { label: string; hint: string }> = {
  "purity-measured": {
    label: "Purity, measured",
    hint: "Eyebrow + headline + the four stat cards under the hero.",
  },
  "why-saf": {
    label: "Why SAF",
    hint: "Section intro + four bento promise cards.",
  },
  "know-what-you-drink": {
    label: "Know what you drink",
    hint: "Dark mineral section copy, bullets, CTA, and image.",
  },
  ways: {
    label: "Get SAF your way",
    hint: "Homes / offices / shops delivery cards.",
  },
};

function blockData(blocks: { key: string | null; type: string; data: unknown; mediaId: string | null }[], key: string) {
  const b = blocks.find((x) => x.key === key);
  return {
    data: (b?.data ?? {}) as Record<string, unknown>,
    mediaId: b?.mediaId ?? null,
  };
}

export default async function AdminHomeSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const { section: sectionKey } = await params;
  const meta = META[sectionKey];
  if (!meta) notFound();

  const sp = await searchParams;
  const [home, media] = await Promise.all([
    prisma.page.findUnique({
      where: { slug: "home" },
      include: {
        sections: {
          where: { key: sectionKey },
          include: { blocks: { orderBy: { order: "asc" } } },
        },
      },
    }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const section = home?.sections[0];
  const blocks = section?.blocks ?? [];

  async function save(formData: FormData) {
    "use server";
    formData.set("sectionKey", sectionKey);
    formData.set("sectionTitle", meta!.label);
    const result = await saveHomeSection(formData);
    if (!result.ok) {
      redirect(`/admin/home/${sectionKey}?error=${encodeURIComponent(result.error)}`);
    }
    redirect(`/admin/home/${sectionKey}?saved=1`);
  }

  const header = blockData(blocks, "header").data;
  const copy = blockData(blocks, "copy").data;
  const copyMedia = blockData(blocks, "copy").mediaId;

  return (
    <div>
      <AdminPageHeader
        title={meta.label}
        description={meta.hint}
        breadcrumbs={[
          { label: "Content" },
          { label: "Homepage", href: "/admin/home" },
          { label: meta.label },
        ]}
      />
      <FormSuccess message={sp.saved ? "Section saved — homepage will refresh." : null} />
      <FormMessage message={sp.error} />

      <form action={save} className="space-y-6">
        {sectionKey === "purity-measured" ? (
          <>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Section header</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Eyebrow</label>
                  <input name="eyebrow" defaultValue={String(header.eyebrow ?? "Purity, measured")} required />
                </div>
                <div>
                  <label>CTA label</label>
                  <input name="ctaLabel" defaultValue={String(header.ctaLabel ?? "How we purify")} />
                </div>
                <div className="sm:col-span-2">
                  <label>Headline</label>
                  <input name="title" defaultValue={String(header.title ?? "Every bottle, by the numbers.")} required />
                </div>
                <div className="sm:col-span-2">
                  <label>CTA link</label>
                  <input name="ctaHref" defaultValue={String(header.ctaHref ?? "/about")} />
                </div>
              </div>
            </div>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Four stat cards</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1, 2, 3].map((i) => {
                  const stat = blockData(blocks, `stat-${i}`).data;
                  const defaults = [
                    { label: "Purification", value: "8", unit: "stages", note: "Sand filtration through ozone" },
                    { label: "Certified", value: "4", unit: "standards", note: "BSTI · ISO 22000 · HACCP · Halal" },
                    { label: "Mineral balance", value: "7.0–7.8", unit: "pH", note: "Calcium, magnesium, potassium kept" },
                    { label: "Cleanroom", value: "100,000", unit: "class", note: "No human contact until sealed" },
                  ][i]!;
                  return (
                    <div key={i} className="space-y-2 rounded-xl border border-[var(--admin-border)] bg-slate-50/70 p-4">
                      <p className="text-xs font-bold text-[var(--admin-faint)]">Card {i + 1}</p>
                      <input name={`stat_${i}_label`} defaultValue={String(stat.label ?? defaults.label)} placeholder="Label" required />
                      <div className="grid grid-cols-2 gap-2">
                        <input name={`stat_${i}_value`} defaultValue={String(stat.value ?? defaults.value)} placeholder="Value" required />
                        <input name={`stat_${i}_unit`} defaultValue={String(stat.unit ?? defaults.unit)} placeholder="Unit" />
                      </div>
                      <input name={`stat_${i}_note`} defaultValue={String(stat.note ?? defaults.note)} placeholder="Note" />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        {sectionKey === "why-saf" ? (
          <>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Section intro</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Eyebrow</label>
                  <input name="eyebrow" defaultValue={String(header.eyebrow ?? copy.eyebrow ?? "Why SAF")} required />
                </div>
                <div className="sm:col-span-2">
                  <label>Headline</label>
                  <input name="title" defaultValue={String(header.title ?? copy.title ?? "Four promises in every bottle.")} required />
                </div>
                <div className="sm:col-span-2">
                  <label>Supporting text</label>
                  <textarea name="body" rows={3} defaultValue={String(header.body ?? copy.body ?? "")} required />
                </div>
              </div>
            </div>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Bento cards (4)</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {[0, 1, 2, 3].map((i) => {
                  const card = blockData(blocks, `card-${i}`);
                  const defaults = [
                    { title: "Pure by science", body: "Deep-aquifer water runs through eight purification stages, then is bottled with the minerals kept.", points: "" },
                    { title: "Balanced hydration", body: "Calcium, magnesium, and potassium are put back at measured targets.", points: "Calcium\nMagnesium\nPotassium" },
                    { title: "Certified safety", body: "Four standards cover the water, and it is tested right through bottling.", points: "" },
                    { title: "Sustainable packs", body: "Recyclable bottles, and 18 L jars that come back to be washed and refilled.", points: "BPA-free rPET bottles\nReturnable 18 L jars\nWater recovered in the plant" },
                  ][i]!;
                  const points = Array.isArray(card.data.points)
                    ? (card.data.points as string[]).join("\n")
                    : defaults.points;
                  return (
                    <div key={i} className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-slate-50/70 p-4">
                      <p className="text-xs font-bold text-[var(--admin-faint)]">Card {i + 1}</p>
                      <input name={`card_${i}_title`} defaultValue={String(card.data.title ?? defaults.title)} required />
                      <textarea name={`card_${i}_body`} rows={3} defaultValue={String(card.data.body ?? defaults.body)} required />
                      <div>
                        <label className="!text-[11px]">Optional bullet lines</label>
                        <textarea name={`card_${i}_points`} rows={3} defaultValue={points} />
                      </div>
                      <MediaPicker
                        name={`card_${i}_mediaId`}
                        media={media}
                        defaultValue={card.mediaId}
                        label="Optional background image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        {sectionKey === "know-what-you-drink" ? (
          <div className="admin-panel space-y-4 p-5 sm:p-6">
            <div className="admin-field-grid admin-field-grid-2">
              <div>
                <label>Eyebrow</label>
                <input name="eyebrow" defaultValue={String(copy.eyebrow ?? "Know what you drink")} required />
              </div>
              <div>
                <label>CTA label</label>
                <input name="ctaLabel" defaultValue={String(copy.ctaLabel ?? "See the full analysis")} />
              </div>
              <div className="sm:col-span-2">
                <label>Headline</label>
                <input name="title" defaultValue={String(copy.title ?? "Nothing hidden on our label.")} required />
              </div>
              <div className="sm:col-span-2">
                <label>Body</label>
                <textarea name="body" rows={4} defaultValue={String(copy.body ?? "")} required />
              </div>
              <div className="sm:col-span-2">
                <label>Bullets (one per line)</label>
                <textarea
                  name="bullets"
                  rows={4}
                  defaultValue={
                    Array.isArray(copy.bullets)
                      ? (copy.bullets as string[]).join("\n")
                      : "Calcium, magnesium, and potassium at measured targets\nLow sodium — under 10 mg/L\nTested through bottling, batch after batch"
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <label>CTA link</label>
                <input name="ctaHref" defaultValue={String(copy.ctaHref ?? "/about/quality")} />
              </div>
            </div>
            <MediaPicker name="mediaId" media={media} defaultValue={copyMedia} label="Section image" />
          </div>
        ) : null}

        {sectionKey === "ways" ? (
          <>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Section intro</p>
              <div className="admin-field-grid admin-field-grid-2">
                <div>
                  <label>Eyebrow</label>
                  <input name="eyebrow" defaultValue={String(header.eyebrow ?? "Get SAF your way")} />
                </div>
                <div className="sm:col-span-2">
                  <label>Headline</label>
                  <input name="title" defaultValue={String(header.title ?? "One water. Three easy ways to get it.")} required />
                </div>
                <div className="sm:col-span-2">
                  <label>Supporting text</label>
                  <textarea name="body" rows={3} defaultValue={String(header.body ?? "")} />
                </div>
              </div>
            </div>
            <div className="admin-panel space-y-4 p-5 sm:p-6">
              <p className="admin-section-label">Three way cards</p>
              <div className="space-y-4">
                {[0, 1, 2].map((i) => {
                  const way =
                    blocks.find((b) => b.type === "way" && (b.key === `way-${i}` || b.order === i + 1)) ??
                    blocks.filter((b) => b.type === "way")[i];
                  const data = (way?.data ?? {}) as Record<string, unknown>;
                  const defaults = [
                    {
                      title: "For homes",
                      body: "18 L jars for the dispenser and 2 L bottles for the table, on a regular delivery day.",
                      points: "Jar swap on every delivery\nTamper-proof seal on every jar\nAdd cases of any size",
                      cta: "Set up home delivery",
                      href: "/contact?type=product#enquiry",
                    },
                    {
                      title: "For offices",
                      body: "Jars for the pantry and bottles for meeting rooms, delivered on your office schedule.",
                      points: "Routes in Motijheel and Gulshan\nAsk about a dispenser\nOne contact for every order",
                      cta: "Set up office supply",
                      href: "/contact?type=business#enquiry",
                    },
                    {
                      title: "For shops and distributors",
                      body: "Case packs for shelves, dealers, and distributors across Dhaka.",
                      points: "All four sizes by the case\nDealership and distribution\nLogos for your shop in the media kit",
                      cta: "Become a stockist",
                      href: "/contact?type=business#enquiry",
                    },
                  ][i]!;
                  return (
                    <div key={i} className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-slate-50/70 p-4">
                      <p className="text-sm font-semibold">Card {i + 1}</p>
                      <input name={`way_${i}_title`} defaultValue={String(data.title ?? defaults.title)} required />
                      <textarea name={`way_${i}_body`} rows={2} defaultValue={String(data.body ?? defaults.body)} required />
                      <textarea
                        name={`way_${i}_points`}
                        rows={3}
                        defaultValue={
                          Array.isArray(data.points) ? (data.points as string[]).join("\n") : defaults.points
                        }
                      />
                      <div className="admin-field-grid admin-field-grid-2">
                        <input name={`way_${i}_cta`} defaultValue={String(data.cta ?? defaults.cta)} />
                        <input name={`way_${i}_href`} defaultValue={String(data.href ?? defaults.href)} />
                      </div>
                      <MediaPicker
                        name={`way_${i}_mediaId`}
                        media={media}
                        defaultValue={way?.mediaId}
                        label="Card image"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        <button type="submit" className="admin-btn-primary min-w-[10rem]">
          Save section
        </button>
      </form>
    </div>
  );
}
