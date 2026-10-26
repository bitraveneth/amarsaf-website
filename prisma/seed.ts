import "dotenv/config";
import { hash } from "bcryptjs";
import { Prisma, PrismaClient, type Role } from "@prisma/client";
import { jobs } from "../src/lib/careers";
import { legalDocs, legalUpdated } from "../src/lib/legal";
import {
  company,
  faqs,
  nav,
  products,
  socials,
  stories,
} from "../src/lib/site";

const prisma = new PrismaClient();

/** Hero copy only — avoid importing next/image static assets in the seed. */
const heroSlidesSeed = [
  {
    id: "pure",
    tab: "Simply Pure",
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
    focus: "88% 45%",
    eyebrow: "8-stage purification",
    title: "Impurities out. Minerals kept.",
    body: "Reverse osmosis, then calcium, magnesium, and potassium put back at measured targets, with pH held between 7.0 and 7.8.",
    cta: { href: "/about", label: "See the science" },
  },
  {
    id: "office",
    tab: "Offices",
    focus: "68% center",
    eyebrow: "For offices",
    title: "Streamline Your Workday, Elevate Your Life.",
    body: "Bottles and returnable jars on delivery rounds for offices in Motijheel and Gulshan.",
    cta: { href: "/contact", label: "Set up an office supply" },
    secondary: { href: "/products", label: "See the packs" },
  },
  {
    id: "home",
    tab: "Homes",
    focus: "72% center",
    eyebrow: "For homes",
    title: "Returnable jars for the household.",
    body: "BPA-free 18 L jars with a tamper-proof seal — washed, refilled, and back on the dispenser.",
    cta: { href: "/products/saf-commercial", label: "See SAF Commercial" },
  },
  {
    id: "cleanroom",
    tab: "Cleanroom",
    focus: "70% center",
    eyebrow: "Class 100,000 cleanroom",
    title: "No human contact until the case is sealed.",
    body: "Bottle blowing through cap sealing runs in a certified cleanroom — BSTI, ISO 22000, HACCP, and Halal.",
    cta: { href: "/heritage", label: "Read our story" },
  },
] as const;

const productDetailsSeed: Record<
  string,
  {
    tagline: string;
    description: string;
    highlights: { iconKey: string; title: string; body: string }[];
    idealFor: { iconKey: string; label: string }[];
    specs: { label: string; value: string }[];
    faqs: { q: string; a: string }[];
  }
> = {
  "saf-daily": {
    tagline: "Pure water that goes where you go.",
    description:
      "A 500 ml grip bottle sized for the commute, the desk, and events. The same 8-stage purified, mineral-balanced water as every SAF pack, sealed in a cleanroom.",
    highlights: [
      { iconKey: "Hand", title: "Easy grip", body: "Shaped to hold comfortably and sit in a car cup holder." },
      { iconKey: "Timer", title: "Right-sized", body: "500 ml — enough for a ride, a meeting, or a workout." },
      { iconKey: "PartyPopper", title: "Event-ready", body: "Cases of 24 for conferences, weddings, and events." },
      { iconKey: "Recycle", title: "Recyclable", body: "A BPA-free rPET bottle, made to go back into recycling." },
    ],
    idealFor: [
      { iconKey: "CarFront", label: "The commute" },
      { iconKey: "Briefcase", label: "The desk" },
      { iconKey: "PartyPopper", label: "Events" },
      { iconKey: "Dumbbell", label: "The gym bag" },
    ],
    specs: [
      { label: "Volume", value: "500 ml" },
      { label: "Case", value: "24 bottles" },
      { label: "Bottle", value: "BPA-free rPET" },
      { label: "Water", value: "8-stage purified, minerals re-infused" },
      { label: "pH", value: "7.0–7.8" },
      { label: "Bottled in", value: "Class 100,000 cleanroom" },
    ],
    faqs: [
      { q: "Can I buy a single bottle?", a: "SAF Daily is supplied by the case of 24. Send a product enquiry and we will point you to the nearest stockist." },
      { q: "Is the bottle recyclable?", a: "Yes. It is BPA-free rPET. Empty it, put the cap back on, and drop it in recycling." },
    ],
  },
  "saf-executive": {
    tagline: "Built for long days.",
    description:
      "A one-litre bottle in durable rPET for long meetings, the gym, and restaurant tables — the same purified, mineral-balanced water in a sturdier pack.",
    highlights: [
      { iconKey: "ShieldCheck", title: "Durable rPET", body: "A sturdier bottle that keeps its shape in a bag or on a table." },
      { iconKey: "GlassWater", title: "One full litre", body: "Hydration for a long meeting or a full workout." },
      { iconKey: "UtensilsCrossed", title: "Table-ready", body: "Looks right on a boardroom or restaurant table." },
      { iconKey: "Recycle", title: "Recyclable", body: "BPA-free rPET, made to go back into recycling." },
    ],
    idealFor: [
      { iconKey: "Briefcase", label: "Long meetings" },
      { iconKey: "Dumbbell", label: "The gym" },
      { iconKey: "UtensilsCrossed", label: "Restaurants" },
      { iconKey: "CarFront", label: "Travel" },
    ],
    specs: [
      { label: "Volume", value: "1 L" },
      { label: "Case", value: "12 bottles" },
      { label: "Bottle", value: "Durable BPA-free rPET" },
      { label: "Water", value: "8-stage purified, minerals re-infused" },
      { label: "pH", value: "7.0–7.8" },
      { label: "Bottled in", value: "Class 100,000 cleanroom" },
    ],
    faqs: [
      { q: "Do you supply restaurants and hotels?", a: "Yes. SAF Executive is popular for tables and meeting rooms. Send a business enquiry with your expected volume." },
      { q: "How is it different from SAF Daily?", a: "Same water, bigger and sturdier bottle — one litre in a more durable rPET pack." },
    ],
  },
  "saf-family": {
    tagline: "Made for the family table.",
    description:
      "A two-litre bottle with a moulded handle, lighter to carry and easy to pour, for the dining table and the household.",
    highlights: [
      { iconKey: "Hand", title: "Moulded handle", body: "Carry it from the shop and pour with one hand." },
      { iconKey: "Feather", title: "Lighter bottle", body: "A lighter pack that is easier to lift and store." },
      { iconKey: "Users", title: "Family size", body: "Two litres — enough for a meal with the whole family." },
      { iconKey: "Recycle", title: "Recyclable", body: "BPA-free rPET, made to go back into recycling." },
    ],
    idealFor: [
      { iconKey: "UtensilsCrossed", label: "Family meals" },
      { iconKey: "Home", label: "The kitchen" },
      { iconKey: "Users", label: "Guests" },
      { iconKey: "CarFront", label: "Day trips" },
    ],
    specs: [
      { label: "Volume", value: "2 L" },
      { label: "Case", value: "9 bottles" },
      { label: "Bottle", value: "BPA-free rPET, moulded handle" },
      { label: "Water", value: "8-stage purified, minerals re-infused" },
      { label: "pH", value: "7.0–7.8" },
      { label: "Bottled in", value: "Class 100,000 cleanroom" },
    ],
    faqs: [
      { q: "Is SAF Family delivered to homes?", a: "Yes. Cases of 9 can ride along with jar deliveries on our Dhaka routes. Send a product enquiry with your area." },
      { q: "How should I store it?", a: "Keep bottles in a cool, shaded place, away from direct sunlight and strong smells." },
    ],
  },
  "saf-commercial": {
    tagline: "Fresh water, by the jar.",
    description:
      "An 18-litre returnable jar for dispensers in offices and large homes. BPA-free, sealed with a tamper-proof cap, and collected empty on the next delivery.",
    highlights: [
      { iconKey: "Lock", title: "Tamper-proof seal", body: "Every jar leaves the plant sealed, so you know it is untouched." },
      { iconKey: "ShieldCheck", title: "BPA-free jar", body: "A food-safe jar, washed and checked before every refill." },
      { iconKey: "RefreshCcw", title: "Returnable", body: "Empty jars go back on the next run to be refilled." },
      { iconKey: "GlassWater", title: "Dispenser-ready", body: "Made to sit on a water dispenser at home or at work." },
    ],
    idealFor: [
      { iconKey: "Briefcase", label: "Offices" },
      { iconKey: "Home", label: "Large homes" },
      { iconKey: "Users", label: "Teams and shops" },
      { iconKey: "UtensilsCrossed", label: "Pantries" },
    ],
    specs: [
      { label: "Volume", value: "18 L" },
      { label: "Pack", value: "Returnable jar" },
      { label: "Jar", value: "BPA-free, tamper-proof cap" },
      { label: "Water", value: "8-stage purified, minerals re-infused" },
      { label: "pH", value: "7.0–7.8" },
      { label: "Bottled in", value: "Class 100,000 cleanroom" },
    ],
    faqs: [
      { q: "How do jar returns work?", a: "Keep the empty jar ready. On your next delivery we collect it and leave a sealed, full one in its place." },
      { q: "Can you set up a dispenser too?", a: "Offices on regular supply can ask about a dispenser when they send a business enquiry." },
    ],
  },
};

const enquiryTypesSeed = [
  { id: "product", label: "Product", title: "Product enquiry", body: "Questions about our water, pack sizes, or availability near you.", cta: "Contact sales", iconKey: "product" },
  { id: "business", label: "Business", title: "Business enquiry", body: "Bulk orders, dealerships, distribution, and partnerships.", cta: "Get in touch", iconKey: "business" },
  { id: "support", label: "Support", title: "Customer support", body: "Help with a delivery, a jar return, or a product. Our team is ready.", cta: "Contact support", iconKey: "support" },
  { id: "careers", label: "Careers", title: "Careers", body: "Apply for an open role, or send us an open application.", cta: "Apply", iconKey: "careers" },
];

const businessNeeds = ["Bulk order", "Dealership", "Distribution", "Corporate supply", "Partnership"];
const supportTopics = ["A delivery", "Jar return or exchange", "Product quality", "Something else"];

type MediaSeed = { key: string; url: string; alt: string };

const mediaSeeds: MediaSeed[] = [
  { key: "hero-pure", url: "/images/hero-slide-pure.jpg", alt: "A SAF bottle with a purple label suspended in a swirl of clear water against deep violet." },
  { key: "hero-minerals", url: "/images/hero-slide-minerals.jpg", alt: "Clear water pouring into a crystal glass beside a SAF bottle, droplets lit by violet light." },
  { key: "hero-office", url: "/images/hero-slide-office.jpg", alt: "A SAF bottle and a glass of water on an office desk overlooking the Dhaka skyline at sunset." },
  { key: "hero-home", url: "/images/hero-slide-home.jpg", alt: "An evening apartment with an 18 L SAF jar on a dispenser and a SAF bottle with glasses on the table." },
  { key: "hero-cleanroom", url: "/images/hero-slide-cleanroom.jpg", alt: "Rows of SAF bottles with purple caps on a conveyor inside a violet-lit cleanroom bottling hall." },
  { key: "pack-daily", url: "/images/product-500ml-square.png", alt: "SAF Daily 500 ml grip bottle with a purple label and cap." },
  { key: "pack-executive", url: "/images/product-1l-square.png", alt: "SAF Executive 1 L bottle with a purple label and cap." },
  { key: "pack-family", url: "/images/product-2l-square.png", alt: "SAF Family 2 L bottle with a moulded handle and a purple label." },
  { key: "pack-commercial", url: "/images/product-18l-square.png", alt: "SAF Commercial 18 L returnable jar with a purple tamper-proof cap." },
  { key: "life-daily", url: "/images/product-daily-life.jpg", alt: "A SAF Daily 500 ml bottle on a sunlit desk beside a notebook, earbuds, and keys." },
  { key: "life-executive", url: "/images/product-executive-life.jpg", alt: "A SAF Executive 1 L bottle on a meeting table beside two glasses of water and a laptop." },
  { key: "life-family", url: "/images/product-family-life.jpg", alt: "A SAF Family 2 L bottle on a family dinner table with glasses of water and Bangladeshi dishes." },
  { key: "life-commercial", url: "/images/product-commercial-life.jpg", alt: "A SAF Commercial 18.9 L jar on a white water dispenser in a sunlit office pantry." },
  { key: "news-launch", url: "/images/news-launch.jpg", alt: "Four SAF containers in a row, from the 500 ml bottle to the 18.9 L jar, on a violet surface." },
  { key: "news-lab", url: "/images/news-lab-testing.jpg", alt: "A gloved hand holding a vial of clear water beside glass beakers on a laboratory bench." },
  { key: "news-office-jars", url: "/images/news-office-jars.jpg", alt: "An office water dispenser topped with an 18 L jar, with two full SAF jars with purple caps beside it." },
  { key: "know-drink", url: "/images/know-what-you-drink.jpg", alt: "Clear water pouring into a crystal glass beside a SAF bottle, lit by violet light." },
  { key: "lineup", url: "/images/news-launch.jpg", alt: "Four SAF containers in a row on a violet surface." },
  { key: "lab", url: "/images/news-lab-testing.jpg", alt: "Laboratory water testing." },
  { key: "bottling", url: "/images/about-bottling-line.jpg", alt: "SAF bottles on an automated filling line." },
  { key: "mission", url: "/images/about-mission-hero.jpg", alt: "Hands raising a glass of water toward sunrise over Dhaka." },
  { key: "sustainability", url: "/images/about-sustainability-hero.jpg", alt: "A SAF bottle among dew-covered ferns." },
  { key: "heritage", url: "/images/heritage-plant.jpg", alt: "The SAF bottling plant at dusk." },
];

const heroMediaKey: Record<string, string> = {
  pure: "hero-pure",
  minerals: "hero-minerals",
  office: "hero-office",
  home: "hero-home",
  cleanroom: "hero-cleanroom",
};

const productPackKey: Record<string, string> = {
  "saf-daily": "pack-daily",
  "saf-executive": "pack-executive",
  "saf-family": "pack-family",
  "saf-commercial": "pack-commercial",
};

const productLifeKey: Record<string, string> = {
  "saf-daily": "life-daily",
  "saf-executive": "life-executive",
  "saf-family": "life-family",
  "saf-commercial": "life-commercial",
};

const storyMediaKey: Record<string, string> = {
  lineup: "news-launch",
  lab: "news-lab",
  officeJars: "news-office-jars",
};

async function seedUser(
  email: string | undefined,
  password: string | undefined,
  role: Role,
  name: string,
) {
  if (!email || !password) return;
  const passwordHash = await hash(password, 12);
  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    create: {
      email: email.toLowerCase(),
      passwordHash,
      role,
      name,
      active: true,
    },
    update: {
      passwordHash,
      role,
      name,
      active: true,
    },
  });
  console.log(`  user ${role}: ${email}`);
}

async function main() {
  console.log("Seeding SAF CMS…");

  await seedUser(
    process.env.SUPERADMIN_EMAIL,
    process.env.SUPERADMIN_PASSWORD,
    "SUPERADMIN",
    "Superadmin",
  );
  await seedUser(
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD,
    "ADMIN",
    "Admin",
  );
  await seedUser(
    process.env.STAFF_EMAIL,
    process.env.STAFF_PASSWORD,
    "STAFF",
    "Staff",
  );

  const mediaIds = new Map<string, string>();
  for (const m of mediaSeeds) {
    const existing = await prisma.media.findFirst({ where: { url: m.url, alt: m.alt } });
    const row =
      existing ??
      (await prisma.media.create({
        data: { url: m.url, alt: m.alt, filename: m.url.split("/").pop() },
      }));
    mediaIds.set(m.key, row.id);
  }
  console.log(`  media: ${mediaIds.size}`);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      companyName: company.name,
      tagline: company.tagline,
      addressLines: [...company.address],
      hotline: company.hotline,
      email: company.email,
      seoTitle: "SAF Packaged Drinking Water | Simply Pure Hydration Bangladesh",
      seoDescription:
        "Order SAF packaged drinking water online. 8-stage purified water with essential minerals for home and office delivery across Dhaka.",
    },
    update: {
      companyName: company.name,
      tagline: company.tagline,
      addressLines: [...company.address],
      hotline: company.hotline,
      email: company.email,
    },
  });

  await prisma.navItem.deleteMany();
  await prisma.navItem.createMany({
    data: nav.map((item, order) => ({
      href: item.href,
      label: item.label,
      order,
      isPublished: true,
    })),
  });

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: socials.map((s, order) => ({
      key: s.id,
      label: s.label,
      href: s.href,
      order,
      isPublished: true,
    })),
  });

  for (const [order, slide] of heroSlidesSeed.entries()) {
    const mediaId = mediaIds.get(heroMediaKey[slide.id] ?? "") ?? null;
    await prisma.heroSlide.upsert({
      where: { key: slide.id },
      create: {
        key: slide.id,
        tab: slide.tab,
        eyebrow: slide.eyebrow,
        title: slide.title,
        body: slide.body,
        focus: slide.focus,
        ctaHref: slide.cta.href,
        ctaLabel: slide.cta.label,
        secondaryHref: "secondary" in slide ? slide.secondary?.href : undefined,
        secondaryLabel: "secondary" in slide ? slide.secondary?.label : undefined,
        order,
        isPublished: true,
        mediaId,
      },
      update: {
        tab: slide.tab,
        eyebrow: slide.eyebrow,
        title: slide.title,
        body: slide.body,
        focus: slide.focus,
        ctaHref: slide.cta.href,
        ctaLabel: slide.cta.label,
        secondaryHref: "secondary" in slide ? slide.secondary?.href : undefined,
        secondaryLabel: "secondary" in slide ? slide.secondary?.label : undefined,
        order,
        mediaId,
      },
    });
  }
  console.log(`  hero slides: ${heroSlidesSeed.length}`);

  for (const [order, p] of products.entries()) {
    const detail = productDetailsSeed[p.id];
    const product = await prisma.product.upsert({
      where: { slug: p.id },
      create: {
        slug: p.id,
        name: p.name,
        size: p.size,
        pack: p.pack,
        whereUsed: p.where,
        feature: p.feature,
        summary: p.summary,
        tagline: detail?.tagline,
        description: detail?.description,
        order,
        isPublished: true,
        packMediaId: mediaIds.get(productPackKey[p.id] ?? "") ?? null,
        lifeMediaId: mediaIds.get(productLifeKey[p.id] ?? "") ?? null,
        idealFor: detail?.idealFor ?? [],
      },
      update: {
        name: p.name,
        size: p.size,
        pack: p.pack,
        whereUsed: p.where,
        feature: p.feature,
        summary: p.summary,
        tagline: detail?.tagline,
        description: detail?.description,
        order,
        packMediaId: mediaIds.get(productPackKey[p.id] ?? "") ?? null,
        lifeMediaId: mediaIds.get(productLifeKey[p.id] ?? "") ?? null,
        idealFor: detail?.idealFor ?? [],
      },
    });

    await prisma.productHighlight.deleteMany({ where: { productId: product.id } });
    await prisma.productSpec.deleteMany({ where: { productId: product.id } });
    await prisma.productFaq.deleteMany({ where: { productId: product.id } });

    if (detail) {
      await prisma.productHighlight.createMany({
        data: detail.highlights.map((h, i) => ({
          productId: product.id,
          iconKey: h.iconKey,
          title: h.title,
          body: h.body,
          order: i,
        })),
      });
      await prisma.productSpec.createMany({
        data: detail.specs.map((s, i) => ({
          productId: product.id,
          label: s.label,
          value: s.value,
          order: i,
        })),
      });
      await prisma.productFaq.createMany({
        data: detail.faqs.map((f, i) => ({
          productId: product.id,
          question: f.q,
          answer: f.a,
          order: i,
        })),
      });
    }
  }
  console.log(`  products: ${products.length}`);

  for (const [order, story] of stories.entries()) {
    const slug = story.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    await prisma.newsPost.upsert({
      where: { slug },
      create: {
        slug,
        title: story.title,
        body: story.body,
        dateLabel: story.date,
        publishedAt: new Date(story.iso),
        order,
        isPublished: true,
        mediaId: mediaIds.get(storyMediaKey[story.image] ?? "") ?? null,
      },
      update: {
        title: story.title,
        body: story.body,
        dateLabel: story.date,
        publishedAt: new Date(story.iso),
        order,
        mediaId: mediaIds.get(storyMediaKey[story.image] ?? "") ?? null,
      },
    });
  }

  await prisma.faqItem.deleteMany();
  await prisma.faqItem.createMany({
    data: faqs.map((f, order) => ({
      question: f.q,
      answer: f.a,
      order,
      isPublished: true,
    })),
  });

  for (const [order, job] of jobs.entries()) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      create: {
        slug: job.slug,
        title: job.title,
        team: job.team,
        experience: job.experience,
        location: job.location,
        type: job.type,
        summary: job.summary,
        requirements: job.requirements,
        order,
        isPublished: true,
      },
      update: {
        title: job.title,
        team: job.team,
        experience: job.experience,
        location: job.location,
        type: job.type,
        summary: job.summary,
        requirements: job.requirements,
        order,
      },
    });
  }

  await prisma.careerPage.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      title: "Build the future of pure water in Bangladesh.",
      intro:
        "Join a team that treats the cleanroom, the lab, and the delivery route as one job — and keeps raising the bar.",
      seoTitle: "Careers",
      seoDescription:
        "Work at SAF Food & Beverage Ltd. in Dhaka: open roles in sales, quality, production, logistics, marketing, and customer care.",
    },
    update: {},
  });

  await prisma.contactSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      enquiryTypes: enquiryTypesSeed,
      businessNeeds: [...businessNeeds],
      supportTopics: [...supportTopics],
    },
    update: {
      enquiryTypes: enquiryTypesSeed,
      businessNeeds: [...businessNeeds],
      supportTopics: [...supportTopics],
    },
  });

  for (const [order, doc] of legalDocs.entries()) {
    await prisma.legalDoc.upsert({
      where: { slug: doc.slug },
      create: {
        slug: doc.slug,
        label: doc.label,
        title: doc.title,
        description: doc.description,
        intro: doc.intro,
        sections: doc.sections,
        updatedLabel: legalUpdated.label,
        updatedIso: legalUpdated.iso,
        order,
        isPublished: true,
      },
      update: {
        label: doc.label,
        title: doc.title,
        description: doc.description,
        intro: doc.intro,
        sections: doc.sections,
        updatedLabel: legalUpdated.label,
        updatedIso: legalUpdated.iso,
        order,
      },
    });
  }

  // Home page + key sections for Phase 3 editing
  const home = await prisma.page.upsert({
    where: { slug: "home" },
    create: {
      slug: "home",
      title: "Home",
      seoTitle: "SAF Packaged Drinking Water | Simply Pure Hydration Bangladesh",
      seoDescription:
        "Order SAF packaged drinking water online. 8-stage purified water with essential minerals for home and office delivery across Dhaka.",
      isPublished: true,
    },
    update: {},
  });

  const homeSections: {
    key: string;
    title: string;
    blocks: { key?: string; type: string; data: Record<string, unknown>; mediaKey?: string }[];
  }[] = [
    {
      key: "purity-measured",
      title: "Purity, measured",
      blocks: [
        {
          key: "header",
          type: "text",
          data: {
            eyebrow: "Purity, measured",
            title: "Every bottle, by the numbers.",
            ctaLabel: "How we purify",
            ctaHref: "/about",
          },
        },
        {
          key: "stat-0",
          type: "stat",
          data: {
            label: "Purification",
            value: "8",
            unit: "stages",
            note: "Sand filtration through ozone",
          },
        },
        {
          key: "stat-1",
          type: "stat",
          data: {
            label: "Certified",
            value: "4",
            unit: "standards",
            note: "BSTI · ISO 22000 · HACCP · Halal",
          },
        },
        {
          key: "stat-2",
          type: "stat",
          data: {
            label: "Mineral balance",
            value: "7.0–7.8",
            unit: "pH",
            note: "Calcium, magnesium, potassium kept",
          },
        },
        {
          key: "stat-3",
          type: "stat",
          data: {
            label: "Cleanroom",
            value: "100,000",
            unit: "class",
            note: "No human contact until sealed",
          },
        },
      ],
    },
    {
      key: "why-saf",
      title: "Why SAF",
      blocks: [
        {
          key: "header",
          type: "text",
          data: {
            eyebrow: "Why SAF",
            title: "Four promises in every bottle.",
            body: "From the aquifer to the cap — purified, mineral-balanced, certified, and packed to come back.",
          },
        },
        {
          key: "card-0",
          type: "bento",
          data: {
            title: "Pure by science",
            body: "Deep-aquifer water runs through eight purification stages, then is bottled with the minerals kept.",
            points: [],
          },
          mediaKey: "bottling",
        },
        {
          key: "card-1",
          type: "bento",
          data: {
            title: "Balanced hydration",
            body: "Calcium, magnesium, and potassium are put back at measured targets.",
            points: ["Calcium", "Magnesium", "Potassium"],
          },
        },
        {
          key: "card-2",
          type: "bento",
          data: {
            title: "Certified safety",
            body: "Four standards cover the water, and it is tested right through bottling.",
            points: [],
          },
        },
        {
          key: "card-3",
          type: "bento",
          data: {
            title: "Sustainable packs",
            body: "Recyclable bottles, and 18 L jars that come back to be washed and refilled. Process water is recovered inside the plant.",
            points: ["BPA-free rPET bottles", "Returnable 18 L jars", "Water recovered in the plant"],
          },
        },
      ],
    },
    {
      key: "know-what-you-drink",
      title: "Know what you drink",
      blocks: [
        {
          key: "copy",
          type: "text",
          data: {
            eyebrow: "Know what you drink",
            title: "Nothing hidden on our label.",
            body: "Every batch is held to the same targets: essential minerals put back, low sodium, and a gently balanced pH.",
            bullets: [
              "Calcium, magnesium, and potassium at measured targets",
              "Low sodium — under 10 mg/L",
              "Tested through bottling, batch after batch",
            ],
            ctaLabel: "See the full analysis",
            ctaHref: "/about/quality",
          },
          mediaKey: "know-drink",
        },
      ],
    },
    {
      key: "ways",
      title: "Get SAF your way",
      blocks: [
        {
          key: "header",
          type: "text",
          data: {
            eyebrow: "Get SAF your way",
            title: "One water. Three easy ways to get it.",
            body: "Home delivery, office supply, or wholesale for shops — same purified water, your schedule.",
          },
        },
        {
          key: "way-0",
          type: "way",
          data: {
            title: "For homes",
            body: "18 L jars for the dispenser and 2 L bottles for the table, on a regular delivery day.",
            points: ["Jar swap on every delivery", "Tamper-proof seal on every jar", "Add cases of any size"],
            cta: "Set up home delivery",
            href: "/contact?type=product#enquiry",
          },
          mediaKey: "life-family",
        },
        {
          key: "way-1",
          type: "way",
          data: {
            title: "For offices",
            body: "Jars for the pantry and bottles for meeting rooms, delivered on your office schedule.",
            points: ["Routes in Motijheel and Gulshan", "Ask about a dispenser", "One contact for every order"],
            cta: "Set up office supply",
            href: "/contact?type=business#enquiry",
          },
          mediaKey: "life-commercial",
        },
        {
          key: "way-2",
          type: "way",
          data: {
            title: "For shops and distributors",
            body: "Case packs for shelves, dealers, and distributors across Dhaka.",
            points: ["All four sizes by the case", "Dealership and distribution", "Logos for your shop in the media kit"],
            cta: "Become a stockist",
            href: "/contact?type=business#enquiry",
          },
          mediaKey: "lineup",
        },
      ],
    },
  ];

  for (const [order, section] of homeSections.entries()) {
    const row = await prisma.section.upsert({
      where: { pageId_key: { pageId: home.id, key: section.key } },
      create: {
        pageId: home.id,
        key: section.key,
        title: section.title,
        order,
        isPublished: true,
      },
      update: { title: section.title, order },
    });
    await prisma.sectionBlock.deleteMany({ where: { sectionId: row.id } });
    for (const [bi, block] of section.blocks.entries()) {
      await prisma.sectionBlock.create({
        data: {
          sectionId: row.id,
          key: block.key,
          type: block.type,
          order: bi,
          data: block.data as Prisma.InputJsonValue,
          mediaId: block.mediaKey ? mediaIds.get(block.mediaKey) ?? null : null,
        },
      });
    }
  }

  for (const slug of ["about", "careers", "contact", "faq", "products", "news"] as const) {
    await prisma.page.upsert({
      where: { slug },
      create: {
        slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        isPublished: true,
      },
      update: {},
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
