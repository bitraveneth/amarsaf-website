import {
  Briefcase,
  CarFront,
  Dumbbell,
  Feather,
  GlassWater,
  Hand,
  Home,
  Lock,
  PartyPopper,
  Recycle,
  RefreshCcw,
  ShieldCheck,
  Timer,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

type Detail = {
  tagline: string;
  description: string;
  highlights: { icon: LucideIcon; title: string; body: string }[];
  idealFor: { icon: LucideIcon; label: string }[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

const water = [
  { label: "Water", value: "8-stage purified, minerals re-infused" },
  { label: "pH", value: "7.0–7.8" },
  { label: "Bottled in", value: "Class 100,000 cleanroom" },
];

export const productDetails: Record<string, Detail> = {
  "saf-daily": {
    tagline: "Pure water that goes where you go.",
    description:
      "A 500 ml grip bottle sized for the commute, the desk, and events. The same 8-stage purified, mineral-balanced water as every SAF pack, sealed in a cleanroom.",
    highlights: [
      { icon: Hand, title: "Easy grip", body: "Shaped to hold comfortably and sit in a car cup holder." },
      { icon: Timer, title: "Right-sized", body: "500 ml — enough for a ride, a meeting, or a workout." },
      { icon: PartyPopper, title: "Event-ready", body: "Cases of 24 for conferences, weddings, and events." },
      { icon: Recycle, title: "Recyclable", body: "A BPA-free rPET bottle, made to go back into recycling." },
    ],
    idealFor: [
      { icon: CarFront, label: "The commute" },
      { icon: Briefcase, label: "The desk" },
      { icon: PartyPopper, label: "Events" },
      { icon: Dumbbell, label: "The gym bag" },
    ],
    specs: [
      { label: "Volume", value: "500 ml" },
      { label: "Case", value: "24 bottles" },
      { label: "Bottle", value: "BPA-free rPET" },
      ...water,
    ],
    faqs: [
      {
        q: "Can I buy a single bottle?",
        a: "SAF Daily is supplied by the case of 24. Send a product enquiry and we will point you to the nearest stockist.",
      },
      {
        q: "Is the bottle recyclable?",
        a: "Yes. It is BPA-free rPET. Empty it, put the cap back on, and drop it in recycling.",
      },
    ],
  },
  "saf-executive": {
    tagline: "Built for long days.",
    description:
      "A one-litre bottle in durable rPET for long meetings, the gym, and restaurant tables — the same purified, mineral-balanced water in a sturdier pack.",
    highlights: [
      { icon: ShieldCheck, title: "Durable rPET", body: "A sturdier bottle that keeps its shape in a bag or on a table." },
      { icon: GlassWater, title: "One full litre", body: "Hydration for a long meeting or a full workout." },
      { icon: UtensilsCrossed, title: "Table-ready", body: "Looks right on a boardroom or restaurant table." },
      { icon: Recycle, title: "Recyclable", body: "BPA-free rPET, made to go back into recycling." },
    ],
    idealFor: [
      { icon: Briefcase, label: "Long meetings" },
      { icon: Dumbbell, label: "The gym" },
      { icon: UtensilsCrossed, label: "Restaurants" },
      { icon: CarFront, label: "Travel" },
    ],
    specs: [
      { label: "Volume", value: "1.0 L" },
      { label: "Case", value: "12 bottles" },
      { label: "Bottle", value: "Durable BPA-free rPET" },
      ...water,
    ],
    faqs: [
      {
        q: "Do you supply restaurants and hotels?",
        a: "Yes. SAF Executive is popular for tables and meeting rooms. Send a business enquiry with your expected volume.",
      },
      {
        q: "How is it different from SAF Daily?",
        a: "Same water, bigger and sturdier bottle — one litre in a more durable rPET pack.",
      },
    ],
  },
  "saf-family": {
    tagline: "Made for the family table.",
    description:
      "A two-litre bottle with a moulded handle, lighter to carry and easy to pour, for the dining table and the household.",
    highlights: [
      { icon: Hand, title: "Moulded handle", body: "Carry it from the shop and pour with one hand." },
      { icon: Feather, title: "Lighter bottle", body: "A lighter pack that is easier to lift and store." },
      { icon: Users, title: "Family size", body: "Two litres — enough for a meal with the whole family." },
      { icon: Recycle, title: "Recyclable", body: "BPA-free rPET, made to go back into recycling." },
    ],
    idealFor: [
      { icon: UtensilsCrossed, label: "Family meals" },
      { icon: Home, label: "The kitchen" },
      { icon: Users, label: "Guests" },
      { icon: CarFront, label: "Day trips" },
    ],
    specs: [
      { label: "Volume", value: "2 L" },
      { label: "Case", value: "9 bottles" },
      { label: "Bottle", value: "BPA-free rPET, moulded handle" },
      ...water,
    ],
    faqs: [
      {
        q: "Is SAF Family delivered to homes?",
        a: "Yes. Cases of 9 can ride along with jar deliveries on our Dhaka routes. Send a product enquiry with your area.",
      },
      {
        q: "How should I store it?",
        a: "Keep bottles in a cool, shaded place, away from direct sunlight and strong smells.",
      },
    ],
  },
  "saf-commercial": {
    tagline: "Fresh water, by the jar.",
    description:
      "An 18-litre returnable jar for dispensers in offices and large homes. BPA-free, sealed with a tamper-proof cap, and collected empty on the next delivery.",
    highlights: [
      { icon: Lock, title: "Tamper-proof seal", body: "Every jar leaves the plant sealed, so you know it is untouched." },
      { icon: ShieldCheck, title: "BPA-free jar", body: "A food-safe jar, washed and checked before every refill." },
      { icon: RefreshCcw, title: "Returnable", body: "Empty jars go back on the next run to be refilled." },
      { icon: GlassWater, title: "Dispenser-ready", body: "Made to sit on a water dispenser at home or at work." },
    ],
    idealFor: [
      { icon: Briefcase, label: "Offices" },
      { icon: Home, label: "Large homes" },
      { icon: Users, label: "Teams and shops" },
      { icon: UtensilsCrossed, label: "Pantries" },
    ],
    specs: [
      { label: "Volume", value: "18 L" },
      { label: "Pack", value: "Returnable jar" },
      { label: "Jar", value: "BPA-free, tamper-proof cap" },
      ...water,
    ],
    faqs: [
      {
        q: "How do jar returns work?",
        a: "Keep the empty jar ready. On your next delivery we collect it and leave a sealed, full one in its place.",
      },
      {
        q: "Can you set up a dispenser too?",
        a: "Offices on regular supply can ask about a dispenser when they send a business enquiry.",
      },
    ],
  },
};
