import { AskSaf } from "@/components/ask-saf";
import { BackToTop } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNotice } from "@/components/site-notice";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-purple focus:shadow-lg"
      >
        Skip to content
      </a>
      <SiteNotice />
      <SiteHeader />
      <main id="content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
      <AskSaf />
    </>
  );
}
