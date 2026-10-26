import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateSite(paths: string[] = ["/"]) {
  for (const path of paths) {
    revalidatePath(path);
  }
  revalidateTag("cms", "max");
}

export const CMS_TAG = "cms";
