import { redirect } from "next/navigation";
import { requireAdmin, canDelete } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { deleteNews, upsertNews } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaSelect } from "@/components/admin/media-select";
import { PublishCheckbox } from "@/components/admin/publish-checkbox";
import { FormMessage, FormSuccess } from "@/components/admin/form-message";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const user = await requireAdmin();
  const [posts, media] = await Promise.all([
    prisma.newsPost.findMany({ orderBy: { order: "asc" } }),
    prisma.media.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  const params = await searchParams;

  async function save(formData: FormData) {
    "use server";
    const result = await upsertNews(formData);
    if (!result.ok) redirect(`/admin/news?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/news?saved=1");
  }

  async function remove(formData: FormData) {
    "use server";
    const result = await deleteNews(formData);
    if (!result.ok) redirect(`/admin/news?error=${encodeURIComponent(result.error)}`);
    redirect("/admin/news?saved=1");
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="News"
        description="Stories and announcements on the public site."
        breadcrumbs={[{ label: "Content" }, { label: "News" }]}
      />
      <FormSuccess message={params.saved ? "Saved." : null} />
      <FormMessage message={params.error} />

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="mb-4 flex justify-between gap-2">
              <h2 className="font-medium">{post.title}</h2>
              {canDelete(user.role) ? (
                <form action={remove}>
                  <input type="hidden" name="id" value={post.id} />
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              ) : null}
            </div>
            <form action={save} className="space-y-4">
              <input type="hidden" name="id" value={post.id} />
              <NewsFields post={post} media={media} role={user.role} />
              <Button type="submit" className="bg-violet-700 hover:bg-violet-800">
                Save
              </Button>
            </form>
          </div>
        ))}
      </div>

      <form action={save} className="space-y-4 rounded-lg border border-dashed border-violet-300 bg-violet-50/40 p-6">
        <h2 className="font-medium">New post</h2>
        <NewsFields media={media} role={user.role} />
        <Button type="submit" className="bg-violet-700 hover:bg-violet-800">
          Create post
        </Button>
      </form>
    </div>
  );
}

function NewsFields({
  post,
  media,
  role,
}: {
  post?: {
    slug: string;
    title: string;
    body: string;
    dateLabel: string;
    publishedAt: Date;
    order: number;
    isPublished: boolean;
    mediaId: string | null;
  };
  media: { id: string; alt: string; filename: string | null; url: string }[];
  role: import("@/lib/roles").Role;
}) {
  const publishedAt = post?.publishedAt
    ? post.publishedAt.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" defaultValue={post?.title} required />
      </div>
      <div className="space-y-2">
        <Label>Slug</Label>
        <Input name="slug" defaultValue={post?.slug} required />
      </div>
      <div className="space-y-2">
        <Label>Date label</Label>
        <Input name="dateLabel" defaultValue={post?.dateLabel} required />
      </div>
      <div className="space-y-2">
        <Label>Published at</Label>
        <Input name="publishedAt" type="date" defaultValue={publishedAt} required />
      </div>
      <div className="space-y-2">
        <Label>Order</Label>
        <Input name="order" type="number" defaultValue={post?.order ?? 0} />
      </div>
      <div className="space-y-2">
        <Label>Media</Label>
        <MediaSelect name="mediaId" media={media} defaultValue={post?.mediaId} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label>Body</Label>
        <Textarea name="body" rows={5} defaultValue={post?.body} required />
      </div>
      <div className="sm:col-span-2">
        <PublishCheckbox role={role} defaultChecked={post?.isPublished ?? false} />
      </div>
    </div>
  );
}
