// Sample openings for layout and copy; replace with the roles SAF is actually hiring for.
export type Job = {
  slug: string;
  title: string;
  team: string;
  experience: string;
  location: string;
  type: string;
  summary: string;
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "business-development-manager",
    title: "Business Development Manager — Corporate Sales",
    team: "Sales",
    experience: "3–5 years",
    location: "Dhaka",
    type: "Full-time",
    summary: "Grow office and corporate supply accounts across Dhaka, from first meeting to a steady delivery route.",
    requirements: [
      "3–5 years in key account management or business development, ideally in FMCG or beverages.",
      "Strong negotiation skills and a record of growing B2B accounts.",
      "Clear communication in Bangla and English.",
    ],
  },
  {
    slug: "quality-control-officer",
    title: "Quality Control Officer",
    team: "Quality",
    experience: "2–4 years",
    location: "Bashundhara plant",
    type: "Full-time",
    summary: "Test water at every stage of the line and keep our BSTI, ISO 22000, and HACCP records in order.",
    requirements: [
      "Degree in chemistry, microbiology, food science, or a related field.",
      "Hands-on lab testing experience in food or beverage production.",
      "Working knowledge of ISO 22000 and HACCP.",
    ],
  },
  {
    slug: "production-supervisor",
    title: "Production Supervisor — Cleanroom Bottling",
    team: "Production",
    experience: "4–6 years",
    location: "Bashundhara plant",
    type: "Full-time",
    summary: "Lead a shift on the cleanroom bottling line, from bottle blowing through cap sealing.",
    requirements: [
      "4–6 years supervising production in beverages, pharma, or food.",
      "Experience with cleanroom or GMP environments.",
      "Calm, safety-first leadership on a busy shift.",
    ],
  },
  {
    slug: "delivery-route-lead",
    title: "Delivery Route Lead",
    team: "Logistics",
    experience: "2+ years",
    location: "Dhaka",
    type: "Full-time",
    summary: "Plan and run daily jar and case-pack routes so homes and offices never run dry.",
    requirements: [
      "2+ years in last-mile delivery or distribution.",
      "Good knowledge of Dhaka routes and traffic patterns.",
      "Comfortable with route planning tools and simple reporting.",
    ],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    team: "Marketing",
    experience: "1–3 years",
    location: "Dhaka",
    type: "Full-time",
    summary: "Tell the SAF story on social media and the website, from campaign ideas to monthly reports.",
    requirements: [
      "1–3 years in social media or digital marketing.",
      "An eye for design and a portfolio of campaigns you ran.",
      "Comfortable with Meta Ads, analytics, and basic content tools.",
    ],
  },
  {
    slug: "customer-care-executive",
    title: "Customer Care Executive",
    team: "Customer support",
    experience: "1–2 years",
    location: "Dhaka",
    type: "Full-time",
    summary: "Be the friendly voice on the hotline for deliveries, jar returns, and product questions.",
    requirements: [
      "1–2 years in a call centre or customer service role.",
      "Patient, clear phone manner in Bangla and English.",
      "Organised follow-up on every open request.",
    ],
  },
];
