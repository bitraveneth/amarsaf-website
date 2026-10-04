import type { StaticImageData } from "next/image";
import cleanroom from "../../public/images/hero-slide-cleanroom.jpg";
import home from "../../public/images/hero-slide-home.jpg";
import minerals from "../../public/images/hero-slide-minerals.jpg";
import office from "../../public/images/hero-slide-office.jpg";
import pure from "../../public/images/hero-slide-pure.jpg";

export type HeroSlide = {
  id: string;
  /** Short label for the slide tabs. */
  tab: string;
  image: StaticImageData;
  alt: string;
  /** CSS object-position; keep the subject visible when mobile crops the frame. */
  focus?: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  secondary?: { href: string; label: string };
};

/*
 * To add a slide: drop a 16:9 image (subject on the right, calm space on the left)
 * into public/images, import it above, and append an entry. Order here is play order.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "pure",
    tab: "Simply Pure",
    image: pure,
    alt: "A SAF bottle with a purple label suspended in a swirl of clear water against deep violet.",
    focus: "72% center",
    eyebrow: "Simply Pure!",
    title: "Pure Water for Everyone.",
    body: "Eight stages of purification keep the essential minerals in the bottle. SAF delivers to homes and offices across Bangladesh.",
    cta: { href: "/contact", label: "Order Home/Office Water" },
    secondary: { href: "/about", label: "Explore the water" },
  },
  {
    id: "minerals",
    tab: "Minerals",
    image: minerals,
    alt: "Clear water pouring into a crystal glass, droplets lit by violet light.",
    focus: "72% center",
    eyebrow: "8-stage purification",
    title: "Impurities out. Minerals kept.",
    body: "Reverse osmosis, then calcium, magnesium, and potassium put back at measured targets, with pH held between 7.0 and 7.8.",
    cta: { href: "/about", label: "See the science" },
  },
  {
    id: "office",
    tab: "Offices",
    image: office,
    alt: "A SAF bottle and a glass of water on an office desk overlooking the Dhaka skyline at sunset.",
    focus: "66% center",
    eyebrow: "For offices",
    title: "Streamline Your Workday, Elevate Your Life.",
    body: "Bottles and returnable jars on delivery rounds for offices in Motijheel and Gulshan.",
    cta: { href: "/contact", label: "Set up an office supply" },
    secondary: { href: "/products", label: "See the packs" },
  },
  {
    id: "home",
    tab: "Homes",
    image: home,
    alt: "An evening apartment with an 18 L SAF jar on a dispenser and a 2 L bottle with two glasses on the table.",
    focus: "74% center",
    eyebrow: "For homes",
    title: "Returnable jars for the household.",
    body: "BPA-free 18 L jars with a tamper-proof seal — washed, refilled, and back on the dispenser.",
    cta: { href: "/products/saf-commercial", label: "See SAF Commercial" },
  },
  {
    id: "cleanroom",
    tab: "Cleanroom",
    image: cleanroom,
    alt: "Rows of bottles with purple caps on a conveyor inside a violet-lit cleanroom bottling hall.",
    focus: "70% center",
    eyebrow: "Class 100,000 cleanroom",
    title: "No human contact until the case is sealed.",
    body: "Bottle blowing through cap sealing runs in a certified cleanroom — BSTI, ISO 22000, HACCP, and Halal.",
    cta: { href: "/heritage", label: "Read our story" },
  },
];
