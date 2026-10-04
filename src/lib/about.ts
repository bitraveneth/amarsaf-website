import { Building2, Compass, FlaskConical, Leaf, type LucideIcon } from "lucide-react";
import { images, type SiteImage } from "@/lib/images";

export type AboutPage = {
  href: string;
  /** Short label for tabs and menus. */
  label: string;
  body: string;
  icon: LucideIcon;
  image: SiteImage;
};

export const aboutPages: AboutPage[] = [
  {
    href: "/about",
    label: "Overview",
    body: "Who we are, where we bottle, and what we stand for.",
    icon: Building2,
    image: images.bottlingLine,
  },
  {
    href: "/about/mission-vision",
    label: "Mission & vision",
    body: "Our purpose, where we are heading, and the values behind it.",
    icon: Compass,
    image: images.mission,
  },
  {
    href: "/about/quality",
    label: "Quality & safety",
    body: "Eight stages, mineral targets, a cleanroom, and four certifications.",
    icon: FlaskConical,
    image: images.lab,
  },
  {
    href: "/about/sustainability",
    label: "Sustainability",
    body: "Recyclable bottles, returnable jars, and water recovered in the plant.",
    icon: Leaf,
    image: images.sustainability,
  },
];
