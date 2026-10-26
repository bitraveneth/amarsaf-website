import { redirect } from "next/navigation";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteJob, upsertJob } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  const jobs = await prisma.job.findMany({ orderBy: { order: "asc" } });
  const params = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertJob(formData);
    if (!result.ok) redirect(`/admin/jobs?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/jobs?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteJob(formData);
    if (!result.ok) redirect(`/admin/jobs?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/jobs?saved=1");
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Jobs"
        description="Open roles on the careers page."
        breadcrumbs={[{ label: "Content" }, { label: "Jobs" }]}
      />
      <FormSuccess message={params.saved ? "Saved." : null} />
      <FormMessage message={params.error} />

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-medium">{job.title}</h2>
              {canDelete(user.role) ? (
                <form action={remove}>
                  <input type="hidden" name="id" value={job.id} />
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              ) : null}
            </div>
            <form action={save} className="space-y-4">
              <input type="hidden" name="id" value={job.id} />
              <JobFields job={job} role={user.role} />
              <Button type="submit" className="bg-violet-700 hover:bg-violet-800">
                Save
              </Button>
            </form>
          </div>
        ))}
      </div>

      <form action={save} className="space-y-4 rounded-lg border border-dashed border-violet-300 bg-violet-50/40 p-6">
        <h2 className="font-medium">New job</h2>
        <JobFields role={user.role} />
        <Button type="submit" className="bg-violet-700 hover:bg-violet-800">
          Create job
        </Button>
      </form>
    </div>
  );
}

function JobFields({
  job,
  role,
}: {
  job?: {
    slug: string;
    title: string;
    team: string;
    experience: string;
    location: string;
    type: string;
    summary: string;
    requirements: string[];
    order: number;
    isPublished: boolean;
  };
  role: import("@/lib/roles").Role;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" defaultValue={job?.title} required />
      </div>
      <div className="space-y-2">
        <Label>Slug</Label>
        <Input name="slug" defaultValue={job?.slug} required />
      </div>
      <div className="space-y-2">
        <Label>Team</Label>
        <Input name="team" defaultValue={job?.team} required />
      </div>
      <div className="space-y-2">
        <Label>Experience</Label>
        <Input name="experience" defaultValue={job?.experience} required />
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Input name="location" defaultValue={job?.location} required />
      </div>
      <div className="space-y-2">
        <Label>Type</Label>
        <Input name="type" defaultValue={job?.type} required />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Summary</Label>
        <Textarea name="summary" rows={3} defaultValue={job?.summary} required />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Requirements (one per line)</Label>
        <Textarea
          name="requirements"
          rows={4}
          defaultValue={job?.requirements.join("\n") ?? ""}
        />
      </div>
      <div className="space-y-2">
        <Label>Order</Label>
        <Input name="order" type="number" defaultValue={job?.order ?? 0} />
      </div>
      <div className="sm:col-span-2">
        <PublishCheckbox role={role} defaultChecked={job?.isPublished ?? true} />
      </div>
    </div>
  );
}
