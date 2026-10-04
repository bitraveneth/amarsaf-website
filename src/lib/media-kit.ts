import type { StaticImageData } from "next/image";
import banner from "../../public/images/mockups/banner.png";
import billboard from "../../public/images/mockups/billboard.png";
import idCard from "../../public/images/mockups/id-card.png";
import mobileApp from "../../public/images/mockups/mobile-app.png";
import mug from "../../public/images/mockups/mug.png";
import poloShirt from "../../public/images/mockups/polo-shirt.png";
import sign from "../../public/images/mockups/sign.png";
import toteBag from "../../public/images/mockups/tote-bag.png";
import waterBottle from "../../public/images/mockups/water-bottle.png";

const base = "/media-kit";

export const downloads = {
  kit: { href: `${base}/saf-media-kit.zip`, size: "18 MB" },
  logos: { href: `${base}/saf-logos.zip`, size: "285 KB" },
  guidelines: { href: `${base}/saf-brand-guidelines.pdf`, size: "18.7 MB" },
};

export type Logo = {
  id: string;
  name: string;
  body: string;
  /** Width / height of the artwork, for previews. */
  ratio: number;
  purple: { svg: string; png: string };
  white: { svg: string; png: string };
};

const logo = (folder: string, file: string, whiteFolder = folder) => ({
  purple: { svg: `${base}/logos/${folder}/${file}.svg`, png: `${base}/logos/${folder}/${file}.png` },
  white: {
    svg: `${base}/logos/${whiteFolder}/${file}-white.svg`,
    png: `${base}/logos/${whiteFolder}/${file}-white.png`,
  },
});

export const logos: Logo[] = [
  {
    id: "horizontal",
    name: "Master logo",
    body: "Logomark and wordmark side by side. Reach for it first, wherever it fits.",
    ratio: 1209 / 401,
    ...logo("purple", "saf-horizontal", "white"),
  },
  {
    id: "vertical",
    name: "Stacked logo",
    body: "For square and tall spaces such as signage, packaging panels, and posts.",
    ratio: 651 / 722,
    ...logo("purple", "saf-vertical", "white"),
  },
  {
    id: "wordmark",
    name: "Wordmark",
    body: "The SAF letters alone, for when the logomark already appears nearby.",
    ratio: 764 / 316,
    ...logo("purple", "saf-wordmark", "white"),
  },
  {
    id: "logomark",
    name: "Logomark",
    body: "The water-drop S. For app icons, favicons, and the smallest spaces.",
    ratio: 1,
    ...logo("purple", "saf-logomark", "white"),
  },
];

export const bengaliLogos: Logo[] = [
  {
    id: "horizontal-bn",
    name: "Bengali master logo",
    body: "The master lockup with the Bengali wordmark.",
    ratio: 1137 / 401,
    ...logo("bengali", "saf-horizontal-bn"),
  },
  {
    id: "vertical-bn",
    name: "Bengali stacked logo",
    body: "Stacked lockup for square and tall spaces.",
    ratio: 651 / 733,
    ...logo("bengali", "saf-vertical-bn"),
  },
  {
    id: "wordmark-bn",
    name: "Bengali wordmark",
    body: "The Bengali letters alone.",
    ratio: 650 / 316,
    ...logo("bengali", "saf-wordmark-bn"),
  },
];

export const colorways = [
  { id: "light", label: "Light", className: "bg-[#f3f4f6]", tone: "purple" },
  { id: "purple", label: "Purple", className: "bg-purple", tone: "white" },
  { id: "pink", label: "Pink", className: "bg-[#eb38f8]", tone: "white" },
  {
    id: "gradient",
    label: "Gradient",
    className: "bg-[linear-gradient(135deg,#4b2cd7_0%,#6d2bd5_45%,#eb38f8_110%)]",
    tone: "white",
  },
] as const;

export type Colorway = (typeof colorways)[number]["id"];

export const palette = [
  { name: "Purple", hex: "#6D2BD5", group: "Primary" },
  { name: "Rich Indigo", hex: "#4B2CD7", group: "Primary" },
  { name: "Deep Black", hex: "#0E0F14", group: "Neutral" },
  { name: "Light Gray", hex: "#F3F4F6", group: "Neutral" },
  { name: "Cool Gray", hex: "#94A3B8", group: "Neutral" },
  { name: "Highlighter Pink", hex: "#EB38F8", group: "Accent" },
  { name: "Fresh Green", hex: "#22B573", group: "Accent" },
  { name: "Soft Lavender", hex: "#E9E4FF", group: "Tint" },
  { name: "Soft Blue", hex: "#D6E6FF", group: "Tint" },
] as const;

export const avatars = [
  { name: "Purple avatar", svg: `${base}/avatar/avatar-purple.svg`, png: `${base}/avatar/avatar-purple.png` },
  { name: "White avatar", svg: `${base}/avatar/avatar-white.svg`, png: `${base}/avatar/avatar-white.png` },
];

export const patterns = [
  { name: "Pattern 01", svg: `${base}/patterns/pattern-1.svg`, png: `${base}/patterns/pattern-1.png` },
  { name: "Pattern 02", svg: `${base}/patterns/pattern-2.svg`, png: `${base}/patterns/pattern-2.png` },
];

export const mockups: { name: string; src: StaticImageData }[] = [
  { name: "Billboard", src: billboard },
  { name: "Water bottle", src: waterBottle },
  { name: "Storefront sign", src: sign },
  { name: "Mobile app", src: mobileApp },
  { name: "Tote bag", src: toteBag },
  { name: "Mug", src: mug },
  { name: "Polo shirt", src: poloShirt },
  { name: "Banner", src: banner },
  { name: "ID card", src: idCard },
];
