import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { removeLocalUpload, uploadMediaFile } from "@/lib/media-upload";
import { revalidateSite } from "@/lib/revalidate";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const replaceId = String(formData.get("id") ?? "").trim();
  const uploaded = await uploadMediaFile(file);

  if (replaceId) {
    const existing = await prisma.media.findUnique({ where: { id: replaceId } });
    if (!existing) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    const media = await prisma.media.update({
      where: { id: replaceId },
      data: {
        url: uploaded.url,
        filename: uploaded.filename,
        mimeType: uploaded.mimeType,
        sizeBytes: uploaded.sizeBytes,
        width: null,
        height: null,
      },
    });

    await removeLocalUpload(existing.url);
    revalidateSite(["/", "/products", "/news", "/about", "/heritage", "/media-kit"]);
    return NextResponse.json(media);
  }

  const alt = String(formData.get("alt") ?? "").trim();
  const media = await prisma.media.create({
    data: {
      url: uploaded.url,
      alt,
      filename: uploaded.filename,
      mimeType: uploaded.mimeType,
      sizeBytes: uploaded.sizeBytes,
    },
  });

  revalidateSite(["/"]);
  return NextResponse.json(media);
}
