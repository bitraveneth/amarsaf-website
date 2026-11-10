import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";
import {
  certifications as staticCertifications,
  company as staticCompany,
  nav as staticNav,
  socials as staticSocials,
} from "@/lib/site";

async function loadSettings() {
  const [settings, nav, socials] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.navItem.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    }),
    prisma.socialLink.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return {
    company: settings
      ? {
          name: settings.companyName,
          tagline: settings.tagline,
          address: settings.addressLines,
          hotline: settings.hotline,
          email: settings.email,
          seoTitle: settings.seoTitle,
          seoDescription: settings.seoDescription,
        }
      : {
          ...staticCompany,
          address: [...staticCompany.address],
          seoTitle: null as string | null,
          seoDescription: null as string | null,
        },
    headerBar: {
      delivery:
        settings?.headerDelivery?.trim() || "Home and office delivery across Dhaka",
      cert: settings?.headerCert?.trim() || "BSTI & ISO 22000 certified",
      hotline: settings?.hotline?.trim() || staticCompany.hotline,
      email: settings?.email?.trim() || staticCompany.email,
    },
    notice: settings
      ? {
          enabled: settings.noticeEnabled,
          text: settings.noticeText,
          href: settings.noticeHref,
        }
      : { enabled: false, text: null as string | null, href: null as string | null },
    footer: {
      copyright:
        settings?.footerCopyright?.trim() ||
        `© ${new Date().getFullYear()} ${settings?.companyName ?? staticCompany.name}`,
      certifications:
        settings?.footerCertifications && settings.footerCertifications.length > 0
          ? settings.footerCertifications
          : [...staticCertifications],
    },
    nav:
      nav.length > 0
        ? nav.map((n) => ({ href: n.href, label: n.label }))
        : staticNav.map((n) => ({ href: n.href, label: n.label })),
    socials:
      socials.length > 0
        ? socials.map((s) => ({
            id: s.key,
            label: s.label,
            href: s.href,
          }))
        : staticSocials.map((s) => ({
            id: s.id,
            label: s.label,
            href: s.href,
          })),
  };
}

export const getSiteSettings = unstable_cache(loadSettings, ["cms-settings"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
