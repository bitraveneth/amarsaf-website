import type { MetadataRoute } from "next";
import { getSiteSeo, publicSiteUrl } from "@/lib/cms/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSeo();
  return {
    rules: site.allowIndexing
      ? { userAgent: "*", allow: "/", disallow: ["/admin"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${publicSiteUrl()}/sitemap.xml`,
  };
}
