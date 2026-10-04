export const company = {
  name: "SAF Food & Beverage Ltd.",
  tagline: "Simply Pure!",
  address: ["Road 1/A, Block J", "Bashundhara R/A", "Dhaka-1229, Bangladesh"],
  hotline: "+880 96XX-XXXXXX",
  email: "care@safwater.com",
} as const;

// Instagram comes from the brand guidelines; the other profile URLs are placeholders until SAF confirms them.
export const socials = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/amarsaf" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/amarsaf_com" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/amarsaf" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@amarsaf" },
  { id: "x", label: "X", href: "https://x.com/amarsaf_com" },
] as const;

export type SocialId = (typeof socials)[number]["id"];

// Placeholder name and photo until SAF supplies the real ones; the message adapts the brand guidelines' introduction.
export const leader = {
  name: "[Co-founder name]",
  role: "Co-founder & CEO",
  quote:
    "Purity is not just a marketing statement for SAF; it is our commitment to the health and future of our nation.",
  message: [
    "Our journey began with drinking water, because we believe purity is the cornerstone of any food brand. Every choice we make follows one rule: we never compromise on what goes into our customers’ bodies.",
    "We want to grow alongside Bangladesh, from drinking water to the everyday food and beverages modern families need. We will measure our success not by promises, but by delivery. Trust is not just a value for us — it is the standard we uphold every day.",
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const products = [
  {
    id: "saf-daily",
    name: "SAF Daily",
    size: "500 ml",
    pack: "24 bottles / case",
    where: "Commute, desk, events",
    feature: "Grip that sits in a car cup holder",
    summary: "A grip bottle for the commute, the desk, and events.",
  },
  {
    id: "saf-executive",
    name: "SAF Executive",
    size: "1.0 L",
    pack: "12 bottles / case",
    where: "Gyms, long meetings, restaurants",
    feature: "Durable rPET",
    summary: "Durable rPET for gyms, long meetings, and restaurants.",
  },
  {
    id: "saf-family",
    name: "SAF Family",
    size: "2 L",
    pack: "9 bottles / case",
    where: "Table and household",
    feature: "Lighter family size",
    summary: "A lighter bottle for the table and the household.",
  },
  {
    id: "saf-commercial",
    name: "SAF Commercial",
    size: "18 L",
    pack: "Returnable jar",
    where: "Dispensers and large homes",
    feature: "BPA-free, with a tamper-proof seal",
    summary: "A returnable BPA-free jar with a tamper-proof seal.",
  },
] as const;

export const stages = [
  "Sand",
  "Carbon",
  "Sediment",
  "Reverse osmosis",
  "Mineral re-infusion",
  "UV",
  "Ozone",
  "Cleanroom bottling",
] as const;

export const certifications = [
  "BSTI BDS 1240:2001",
  "ISO 22000",
  "HACCP",
  "Halal",
] as const;

export const minerals = [
  { label: "Calcium", value: "10–20 mg/L" },
  { label: "Magnesium", value: "5–12 mg/L" },
  { label: "Potassium", value: "1.5–4 mg/L" },
  { label: "Sodium", value: "Under 10 mg/L" },
  { label: "pH", value: "7.0–7.8" },
  { label: "TDS", value: "70–120 ppm" },
] as const;

export const monuments = [
  { name: "Ahsan Manzil", line: "Heritage and craftsmanship" },
  { name: "Jatiya Sangsad Bhaban", line: "Modern architecture and structure" },
  { name: "Curzon Hall", line: "Academic excellence and science" },
  { name: "Jatiyo Smriti Soudho", line: "Strength and national pride" },
  { name: "Baitul Mukarram", line: "Community and tradition" },
] as const;

export type Milestone = {
  when: string;
  iso?: string;
  status: "done" | "next";
  title: string;
  body: string;
  image?: "bottlingLine" | "lineup" | "lab" | "officeJars";
};

// Origin and plant years are not confirmed yet, so those entries carry phase labels, not dates.
export const milestones: Milestone[] = [
  {
    when: "The idea",
    status: "done",
    title: "Water every household can trust",
    body: "SAF Food & Beverage Ltd. starts from one belief: every person in Bangladesh deserves laboratory-verified drinking water.",
  },
  {
    when: "The plant",
    status: "done",
    title: "A cleanroom in Bashundhara",
    body: "The plant on Road 1/A, Block J is built around 8-stage purification and a Class 100,000 cleanroom, where bottling runs with no human contact until the case is sealed.",
    image: "bottlingLine",
  },
  {
    when: "12 March 2026",
    iso: "2026-03-12",
    status: "done",
    title: "SAF opens in Dhaka",
    body: "Simply Pure bottled water launches from Bashundhara, with four packs for the desk, the table, and the dispenser.",
    image: "lineup",
  },
  {
    when: "3 June 2026",
    iso: "2026-06-03",
    status: "done",
    title: "Certified on the line",
    body: "The plant carries BSTI BDS 1240:2001 and ISO 22000, alongside HACCP and Halal, and tests the water through bottling.",
    image: "lab",
  },
  {
    when: "18 August 2026",
    iso: "2026-08-18",
    status: "done",
    title: "Office jars on the route",
    body: "Returnable 18 L jars reach offices in Motijheel and Gulshan, with home drops on the same routes.",
    image: "officeJars",
  },
  {
    when: "Coming next",
    status: "next",
    title: "Order by the case, online",
    body: "An online store where households and retail buyers order SAF case packs straight from the website.",
  },
  {
    when: "Coming next",
    status: "next",
    title: "Further than Dhaka",
    body: "Corporate drops beyond Dhaka are arranged on request today. Distribution partners can already write in through the contact desk.",
  },
];

export const stories = [
  {
    date: "12 March 2026",
    iso: "2026-03-12",
    image: "lineup",
    title: "SAF packaged water opens in Dhaka",
    body: "SAF Food & Beverage Ltd. launched Simply Pure bottled water from Bashundhara, with four packs for the desk, the table, and the dispenser.",
  },
  {
    date: "3 June 2026",
    iso: "2026-06-03",
    image: "lab",
    title: "BSTI and ISO 22000 on the bottling line",
    body: "The plant now carries BSTI BDS 1240:2001 and ISO 22000, alongside HACCP and Halal, and tests the water through bottling.",
  },
  {
    date: "18 August 2026",
    iso: "2026-08-18",
    image: "officeJars",
    title: "Office jars reach Motijheel and Gulshan",
    body: "Returnable 18 L jars are on a delivery round for offices in Motijheel and Gulshan, with home drops on the same routes.",
  },
] as const;

export const faqs = [
  {
    q: "What does 8-stage purification mean?",
    a: "The water passes sand, carbon, and sediment filters, then reverse osmosis. Minerals are re-infused, and the stream is treated with UV and ozone before cleanroom bottling.",
  },
  {
    q: "Which minerals stay in the water?",
    a: "Targets are calcium 10–20 mg/L, magnesium 5–12 mg/L, potassium 1.5–4 mg/L, and sodium under 10 mg/L. pH sits between 7.0 and 7.8, and TDS between 70 and 120 ppm.",
  },
  {
    q: "Where do you deliver?",
    a: "We deliver across Dhaka, including Bashundhara and the rest of the city. Corporate drops beyond Dhaka are arranged on request.",
  },
  {
    q: "How do the returnable 18 L jars work?",
    a: "SAF Commercial is a BPA-free jar with a tamper-proof seal. Empty jars come back, are washed, and are filled again for dispensers and large homes.",
  },
  {
    q: "Which certifications cover the water?",
    a: "The water is covered by BSTI BDS 1240:2001, ISO 22000, HACCP, and Halal. It is tested through bottling.",
  },
  {
    q: "How do I start a home or office supply?",
    a: "Send the contact form with your location and whether you need Home, Office / SME, Enterprise, or Distribution. You can also write to care@safwater.com or call the hotline.",
  },
] as const;

export function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
