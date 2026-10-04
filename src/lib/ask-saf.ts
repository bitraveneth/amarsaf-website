import { cleanroom, purification, standards } from "@/lib/quality";
import { company, faqs, minerals, products } from "@/lib/site";
import { careTips, commitments, jarLoop } from "@/lib/sustainability";

export type AskSafTurn = {
  reply: string;
  suggestions: string[];
};

type Entry = {
  keys: readonly string[];
  reply: string;
  suggestions?: readonly string[];
};

const tds = minerals.find((item) => item.label === "TDS")?.value ?? "70–120 ppm";

const qualitySuggestions = [
  "What is the TDS?",
  "Which minerals stay in the water?",
  "What does 8-stage purification mean?",
] as const;

const deliverySuggestions = [
  "Do you deliver to Gulshan?",
  "How do the returnable 18 L jars work?",
  "Where do you deliver?",
] as const;

const contactSuggestions = [
  "How do I contact SAF?",
  "How do I start a home or office supply?",
  "What is the TDS?",
] as const;

/** Pricing stays off this chat — the hotline and contact form own quotes. */
const PRICE =
  /\b(price|pricing|prices|cost|costs|quote|quotes|taka|\bbdt\b)\b|\bhow much (?:does|do|is|are|for|per|would)\b/i;

const TDS = /\btds\b|total dissolved/i;

function turn(reply: string, suggestions: readonly string[] = qualitySuggestions): AskSafTurn {
  return { reply, suggestions: [...suggestions] };
}

function pricingTurn(): AskSafTurn {
  return turn(
    `This chat does not quote prices. Call the hotline on ${company.hotline}, or send the contact form and the team will reply with pricing for your area and volume.`,
    contactSuggestions,
  );
}

function tdsTurn(): AskSafTurn {
  const others = minerals
    .filter((item) => item.label !== "TDS")
    .map((item) => `${item.label} ${item.value}`)
    .join(", ");
  return turn(
    `SAF water is held to a TDS of ${tds}. The same typical analysis lists ${others}.`,
    qualitySuggestions,
  );
}

function gulshanTurn(): AskSafTurn {
  return turn(
    "Yes. Gulshan is on the jar-swap routes, together with Motijheel. Returnable 18 L jars go out sealed, and empty jars come back on the next run to be washed and refilled. Home drops use the same routes.",
    deliverySuggestions,
  );
}

function faq(question: string) {
  return faqs.find((item) => item.q === question)?.a ?? "";
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [
    {
      keys: ["8-stage", "8 stage", "purification", "purify", "purified", "stages"],
      reply: `${faq("What does 8-stage purification mean?")} In order: ${purification.map((stage) => stage.name).join(", ")}.`,
      suggestions: ["What is reverse osmosis?", "What is the TDS?", "Which certifications cover the water?"],
    },
    {
      keys: ["mineral", "minerals", "calcium", "magnesium", "potassium", "sodium", "ph"],
      reply: faq("Which minerals stay in the water?"),
      suggestions: qualitySuggestions,
    },
    {
      keys: ["certif", "bsti", "iso 22000", "iso", "haccp", "halal", "standard"],
      reply: `${faq("Which certifications cover the water?")} ${standards.map((item) => `${item.name}: ${item.body}`).join(" ")}`,
      suggestions: ["What does 8-stage purification mean?", "What is the cleanroom?", "What is the TDS?"],
    },
    {
      keys: ["cleanroom", "class 100", "human contact", "bottling"],
      reply: `${cleanroom.title}. ${cleanroom.body}`,
      suggestions: ["What does 8-stage purification mean?", "Which certifications cover the water?", "What is the TDS?"],
    },
    {
      keys: ["gulshan", "motijheel"],
      reply: gulshanTurn().reply,
      suggestions: deliverySuggestions,
    },
    {
      keys: ["deliver", "delivery", "where do you", "dhaka", "bashundhara", "route"],
      reply: `${faq("Where do you deliver?")} Gulshan and Motijheel are on the jar-swap routes for returnable 18 L jars, with home drops on the same routes.`,
      suggestions: deliverySuggestions,
    },
    {
      keys: ["jar", "jars", "18 l", "18l", "returnable", "dispenser", "jar-swap", "jar swap"],
      reply: `${faq("How do the returnable 18 L jars work?")} ${jarLoop.map((step) => `${step.title}: ${step.body}`).join(" ")} Gulshan and Motijheel are on the jar-swap routes.`,
      suggestions: deliverySuggestions,
    },
    {
      keys: ["start", "order", "supply", "home delivery", "office supply", "set up"],
      reply: faq("How do I start a home or office supply?"),
      suggestions: contactSuggestions,
    },
    {
      keys: ["contact", "hotline", "phone", "email", "call", "address", "where are you"],
      reply: `Call the hotline on ${company.hotline}, email ${company.email}, or send the contact form. ${company.name} is at ${company.address.join(", ")}.`,
      suggestions: contactSuggestions,
    },
    {
      keys: ["recycl", "rpet", "bpa", "sustainab", "environment"],
      reply: commitments.map((item) => `${item.title}: ${item.body}`).join(" "),
      suggestions: ["How do the returnable 18 L jars work?", "How should I store the water?", "What is the TDS?"],
    },
    {
      keys: ["store", "sunlight", "care", "cap"],
      reply: careTips.map((item) => `${item.title}: ${item.body}`).join(" "),
      suggestions: ["How do the returnable 18 L jars work?", "What sizes do you sell?", "What is the TDS?"],
    },
    {
      keys: ["size", "sizes", "range", "products", "which bottle", "packs"],
      reply: `One purified water in four sizes. ${products.map((product) => `${product.name} is ${product.size} (${product.pack}) — ${product.summary}`).join(" ")}`,
      suggestions: ["What is SAF Daily?", "What is SAF Commercial?", "Do you deliver to Gulshan?"],
    },
  ];

  for (const stage of purification) {
    entries.push({
      keys: [stage.name.toLowerCase()],
      reply: `${stage.name}: ${stage.body}`,
      suggestions: ["What does 8-stage purification mean?", "What is the TDS?", "Which certifications cover the water?"],
    });
  }

  for (const standard of standards) {
    entries.push({
      keys: [standard.name.toLowerCase()],
      reply: `${standard.name}: ${standard.body}`,
      suggestions: ["Which certifications cover the water?", "What is the cleanroom?", "What is the TDS?"],
    });
  }

  for (const product of products) {
    entries.push({
      keys: [product.name.toLowerCase(), product.id.replaceAll("-", " ")],
      reply: `${product.name} is ${product.size}, packed as ${product.pack}. ${product.summary} It suits ${product.where.toLowerCase()}. ${product.feature}.`,
      suggestions: ["What sizes do you sell?", "Do you deliver to Gulshan?", "How do I start a home or office supply?"],
    });
  }

  return entries;
}

const entries = buildEntries();

function hasKey(query: string, key: string) {
  if (key.length <= 3) {
    return new RegExp(`(?:^|\\s)${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\s|[?.!,])`, "i").test(
      query,
    );
  }
  return query.includes(key);
}

function scoreEntry(query: string, entry: Entry) {
  let score = 0;
  for (const key of entry.keys) {
    if (hasKey(query, key)) score += 2 + key.length;
  }
  return score;
}

function smallTalk(query: string): string | null {
  if (/^(hi|hello|hey|good\s+(morning|afternoon|evening))\b/.test(query)) {
    return "Hello. Ask me about SAF water quality, the 8-stage purification, minerals, packs, or delivery across Dhaka.";
  }
  if (/\b(how are you|how's it going)\b/.test(query)) {
    return "Ready when you are. Water quality, purification, and delivery are the questions I can answer from this site.";
  }
  if (/\b(thank|thanks|thx)\b/.test(query)) {
    return "Glad that helped. Ask about the water, a delivery route, or how to start a supply.";
  }
  if (/\b(bye|goodbye|see you)\b/.test(query)) {
    return `Take care. The hotline is ${company.hotline} if you need a person.`;
  }
  if (/\b(who are you|what are you|your name|are you (a )?bot|are you (an )?ai)\b/.test(query)) {
    return "I'm Ask SAF. I answer from the pages on this site — quality, purification, packs, and delivery. I don't quote prices.";
  }
  if (/\b(what can you|help me|i need help)\b/.test(query)) {
    return "I can explain the water, the eight purification stages, minerals and TDS, the four pack sizes, and where the jar-swap routes run. What do you want to know?";
  }
  return null;
}

function bestEntry(query: string): Entry | null {
  let best: { score: number; entry: Entry } | null = null;
  for (const entry of entries) {
    const score = scoreEntry(query, entry);
    if (!best || score > best.score) best = { score, entry };
  }
  if (best && best.score >= 6) return best.entry;
  return null;
}

/** Answer from published site copy. No network, no quoted prices. */
export function answerAskSaf(query: string): AskSafTurn {
  const q = query.toLowerCase().trim();
  if (!q) {
    return turn(
      "Ask about water quality, purification, minerals, or delivery.",
      qualitySuggestions,
    );
  }

  if (PRICE.test(q)) return pricingTurn();
  if (TDS.test(q)) return tdsTurn();
  if (/\bgulshan\b/.test(q)) return gulshanTurn();

  const talk = smallTalk(q);
  if (talk) return turn(talk, [...qualitySuggestions.slice(0, 2), deliverySuggestions[0]]);

  const entry = bestEntry(q);
  if (entry) return turn(entry.reply, entry.suggestions ?? qualitySuggestions);

  return turn(
    `I can help with water quality, the 8 purification stages, minerals, packs, and delivery. For anything else, call the hotline on ${company.hotline} or send the contact form.`,
    contactSuggestions,
  );
}
