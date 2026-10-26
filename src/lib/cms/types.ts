export type CmsImage = {
  id?: string;
  src: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

export type CmsHeroSlide = {
  id: string;
  key: string;
  tab: string;
  eyebrow: string;
  title: string;
  body: string;
  focus?: string | null;
  image: CmsImage;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export type CmsProduct = {
  id: string;
  slug: string;
  name: string;
  size: string;
  pack: string;
  where: string;
  feature: string;
  summary: string;
  tagline?: string | null;
  description?: string | null;
  packImage?: CmsImage | null;
  lifestyleImage?: CmsImage | null;
  highlights: { iconKey?: string | null; title: string; body: string }[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  idealFor: { iconKey?: string; label: string }[];
};
