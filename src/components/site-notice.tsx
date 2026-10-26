import Link from "next/link";
import { getSiteSettings } from "@/lib/cms/settings";

export async function SiteNotice() {
  const { notice } = await getSiteSettings();
  if (!notice?.enabled || !notice.text) return null;

  const inner = (
    <p className="mx-auto max-w-[84rem] px-4 py-2.5 text-center text-sm font-medium sm:px-6 lg:px-10">
      {notice.text}
      {notice.href ? (
        <span className="ml-2 underline underline-offset-2 opacity-90">Learn more</span>
      ) : null}
    </p>
  );

  return (
    <div className="on-dark relative z-[60] bg-violet-700 text-white">
      {notice.href ? (
        <Link href={notice.href} className="block transition-colors hover:bg-violet-800">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
