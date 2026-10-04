import type { StaticImageData } from "next/image";
import aboutBottlingLine from "../../public/images/about-bottling-line.jpg";
import aboutMissionHero from "../../public/images/about-mission-hero.jpg";
import aboutSustainabilityHero from "../../public/images/about-sustainability-hero.jpg";
import heritagePlant from "../../public/images/heritage-plant.jpg";
import waterPour from "../../public/images/hero-slide-minerals.jpg";
import cleanroomHall from "../../public/images/hero-slide-cleanroom.jpg";
import heritageMonumentsBand from "../../public/images/heritage-monuments-band.jpg";
import leaderPlaceholder from "../../public/images/leader-placeholder.jpg";
import lifestyleOffice from "../../public/images/lifestyle-office.jpg";
import newsLabTesting from "../../public/images/news-lab-testing.jpg";
import newsLaunch from "../../public/images/news-launch.jpg";
import newsOfficeJars from "../../public/images/news-office-jars.jpg";
import product18l from "../../public/images/product-18l-square.jpg";
import product1l from "../../public/images/product-1l-square.jpg";
import product2l from "../../public/images/product-2l-square.jpg";
import product500ml from "../../public/images/product-500ml-square.jpg";
import productCommercialLife from "../../public/images/product-commercial-life.jpg";
import productDailyLife from "../../public/images/product-daily-life.jpg";
import productExecutiveLife from "../../public/images/product-executive-life.jpg";
import productFamilyLife from "../../public/images/product-family-life.jpg";
import textureWaterViolet from "../../public/images/texture-water-violet.jpg";

export type SiteImage = { src: StaticImageData; alt: string };

export const images = {
  bottlingLine: {
    src: aboutBottlingLine,
    alt: "Clear bottles with purple caps moving along an automated filling line inside a white cleanroom.",
  },
  heritage: {
    src: heritagePlant,
    alt: "The SAF bottling plant at dusk, its glass facade showing the bottling line and stacked bottles with purple caps.",
  },
  monuments: {
    src: heritageMonumentsBand,
    alt: "Violet silhouettes of Dhaka monuments, including the Smriti Soudho spires and the Sangsad Bhaban facade, reflected in still water.",
  },
  office: {
    src: lifestyleOffice,
    alt: "A SAF bottle and a glass of water on a bright office meeting table beside a laptop and notebook.",
  },
  lab: {
    src: newsLabTesting,
    alt: "A gloved hand holding a vial of clear water beside glass beakers on a laboratory bench.",
  },
  lineup: {
    src: newsLaunch,
    alt: "Four SAF containers in a row, from the 500 ml bottle to the 18 L jar, on a violet surface.",
  },
  officeJars: {
    src: newsOfficeJars,
    alt: "An office water dispenser topped with an 18 L jar, with two full SAF jars with purple caps beside it.",
  },
  cleanroom: {
    src: cleanroomHall,
    alt: "Rows of bottles with purple caps on a conveyor inside a violet-lit cleanroom bottling hall.",
  },
  leader: {
    src: leaderPlaceholder,
    alt: "Portrait of SAF's co-founder and CEO.",
  },
  pour: {
    src: waterPour,
    alt: "Clear water pouring into a crystal glass, droplets lit by violet light.",
  },
  mission: {
    src: aboutMissionHero,
    alt: "Two hands raising a glass of clear water toward the sunrise over the Dhaka skyline.",
  },
  sustainability: {
    src: aboutSustainabilityHero,
    alt: "A SAF bottle with a purple label standing among dew-covered ferns in soft morning light.",
  },
  texture: {
    src: textureWaterViolet,
    alt: "",
  },
} satisfies Record<string, SiteImage>;

export const productImages: Record<string, SiteImage> = {
  "saf-daily": {
    src: product500ml,
    alt: "SAF Daily 500 ml grip bottle with a purple label and cap.",
  },
  "saf-executive": {
    src: product1l,
    alt: "SAF Executive 1.0 L bottle with a purple label and cap.",
  },
  "saf-family": {
    src: product2l,
    alt: "SAF Family 2 L bottle with a moulded handle and a purple label.",
  },
  "saf-commercial": {
    src: product18l,
    alt: "SAF Commercial 18 L returnable jar with a purple tamper-proof cap.",
  },
};

export const productLifestyle: Record<string, SiteImage> = {
  "saf-daily": {
    src: productDailyLife,
    alt: "A SAF Daily 500 ml bottle on a sunlit desk beside a notebook, earbuds, and keys.",
  },
  "saf-executive": {
    src: productExecutiveLife,
    alt: "A SAF Executive 1 L bottle on a meeting table beside two glasses of water and a laptop.",
  },
  "saf-family": {
    src: productFamilyLife,
    alt: "A SAF Family 2 L bottle with a moulded handle on a family dinner table with glasses of water.",
  },
  "saf-commercial": {
    src: productCommercialLife,
    alt: "A SAF Commercial 18 L jar on a white water dispenser in a sunlit office pantry.",
  },
};
