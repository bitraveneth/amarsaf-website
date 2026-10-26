import type { Media } from "@prisma/client";
import type { CmsImage } from "@/lib/cms/types";

export function toCmsImage(media: Media | null | undefined): CmsImage | null {
  if (!media) return null;
  return {
    id: media.id,
    src: media.url,
    alt: media.alt,
    width: media.width,
    height: media.height,
  };
}

export function mediaOrFallback(
  media: Media | null | undefined,
  fallback: { src: string; alt: string },
): CmsImage {
  return toCmsImage(media) ?? { src: fallback.src, alt: fallback.alt };
}
