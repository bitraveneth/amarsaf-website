import { put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function uploadMediaFile(file: File): Promise<{
  url: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
}> {
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}-${sanitize(file.name)}`;
  const mimeType = file.type || "application/octet-stream";
  const sizeBytes = file.size;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    const blob = await put(filename, file, {
      access: "public",
      token,
    });
    return { url: blob.url, filename, mimeType, sizeBytes };
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);
  return { url: `/uploads/${filename}`, filename, mimeType, sizeBytes };
}

/** Best-effort cleanup for local /uploads files only. */
export async function removeLocalUpload(url: string | null | undefined) {
  if (!url || !url.startsWith("/uploads/")) return;
  const filename = path.basename(url);
  if (!filename || filename.includes("..")) return;
  try {
    await unlink(path.join(process.cwd(), "public", "uploads", filename));
  } catch {
    // Missing file or permission — ignore
  }
}

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
}
