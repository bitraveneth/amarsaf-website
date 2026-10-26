import { redirect } from "next/navigation";
import { Contact, Headset, MessageSquare } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { upsertContact } from "@/lib/admin-actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";

type EnquiryType = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  iconKey?: string;
};

const DEFAULT_TYPES: EnquiryType[] = [
  {
    id: "product",
    label: "Product",
    title: "Product enquiry",
    body: "Questions about our water, pack sizes, or availability near you.",
    cta: "Contact sales",
    iconKey: "product",
  },
  {
    id: "business",
    label: "Business",
    title: "Business enquiry",
    body: "Bulk orders, dealerships, distribution, and partnerships.",
    cta: "Get in touch",
    iconKey: "business",
  },
  {
    id: "support",
    label: "Support",
    title: "Customer support",
    body: "Help with a delivery, a jar return, or a product.",
    cta: "Contact support",
    iconKey: "support",
  },
  {
    id: "careers",
    label: "Careers",
    title: "Careers",
    body: "Apply for an open role, or send an open application.",
    cta: "Apply",
    iconKey: "careers",
  },
];

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const contact = await prisma.contactSettings.findUnique({ where: { id: 1 } });
  const params = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertContact(formData);
    if (!result.ok) redirect(`/admin/contact?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/contact?saved=1");
  }

  const enquiryTypes = (Array.isArray(contact?.enquiryTypes)
    ? (contact!.enquiryTypes as EnquiryType[])
    : DEFAULT_TYPES
  ).slice(0, 8);

  while (enquiryTypes.length < 4) {
    enquiryTypes.push({
      ...DEFAULT_TYPES[enquiryTypes.length]!,
    });
  }

  const businessNeeds = contact?.businessNeeds.join("\n") ?? "";
  const supportTopics = contact?.supportTopics.join("\n") ?? "";

  return (
    <div>
      <AdminPageHeader
        title="Contact form"
        description="Controls the enquiry cards and dropdown options on /contact — not a mailbox. Messages still go through the public form."
        breadcrumbs={[{ label: "Site" }, { label: "Contact" }]}
      />
      <FormSuccess message={params.saved ? "Contact settings saved." : null} />
      <FormMessage message={params.error} />

      <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950">
        <p className="font-semibold">What is this page?</p>
        <p className="mt-1 text-sky-900/80">
          It edits the labels visitors see when they contact SAF (Product / Business / Support /
          Careers). It does not receive emails — that stays on the public contact form.
        </p>
      </div>

      <form action={save} className="space-y-6">
        <section className="admin-panel overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[var(--admin-border)] px-5 py-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <MessageSquare className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">Enquiry types</h2>
              <p className="text-xs text-[var(--admin-muted)]">
                Cards at the top of the contact page
              </p>
            </div>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {enquiryTypes.map((type, i) => (
              <div
                key={type.id || i}
                className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-slate-50/60 p-4"
              >
                <div className="flex items-center gap-2">
                  <Contact className="size-4 text-violet-600" />
                  <p className="text-sm font-semibold">Type {i + 1}</p>
                </div>
                <input type="hidden" name={`enquiry_${i}_id`} defaultValue={type.id} />
                <input type="hidden" name={`enquiry_${i}_iconKey`} defaultValue={type.iconKey || type.id} />
                <div className="admin-field-grid admin-field-grid-2">
                  <div>
                    <label>Short label</label>
                    <input name={`enquiry_${i}_label`} defaultValue={type.label} required />
                  </div>
                  <div>
                    <label>Button text</label>
                    <input name={`enquiry_${i}_cta`} defaultValue={type.cta} required />
                  </div>
                </div>
                <div>
                  <label>Title</label>
                  <input name={`enquiry_${i}_title`} defaultValue={type.title} required />
                </div>
                <div>
                  <label>Description</label>
                  <textarea name={`enquiry_${i}_body`} rows={3} defaultValue={type.body} required />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="admin-panel overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[var(--admin-border)] px-5 py-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Headset className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">Business needs</h2>
                <p className="text-xs text-[var(--admin-muted)]">One option per line</p>
              </div>
            </div>
            <div className="p-5">
              <textarea
                name="businessNeeds"
                rows={8}
                defaultValue={businessNeeds}
                placeholder={"Bulk order\nDealership\nDistribution"}
              />
            </div>
          </section>

          <section className="admin-panel overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[var(--admin-border)] px-5 py-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Headset className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold">Support topics</h2>
                <p className="text-xs text-[var(--admin-muted)]">One option per line</p>
              </div>
            </div>
            <div className="p-5">
              <textarea
                name="supportTopics"
                rows={8}
                defaultValue={supportTopics}
                placeholder={"A delivery\nJar return or exchange\nProduct quality"}
              />
            </div>
          </section>
        </div>

        <button type="submit" className="admin-btn-primary min-w-[10rem]">
          Save contact settings
        </button>
      </form>
    </div>
  );
}
