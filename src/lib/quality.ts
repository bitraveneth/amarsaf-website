import {
  Atom,
  Filter,
  FlaskConical,
  Layers,
  Microscope,
  Sparkles,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";

export const purification: { name: string; body: string; icon: LucideIcon }[] = [
  { name: "Sand", body: "Sand filtration traps sediment and suspended particles.", icon: Layers },
  { name: "Carbon", body: "Activated carbon takes out chlorine, odour, and organic compounds.", icon: Atom },
  { name: "Sediment", body: "Fine micron filters remove the smallest particles left.", icon: Filter },
  { name: "Reverse osmosis", body: "A semi-permeable membrane removes dissolved impurities.", icon: Microscope },
  { name: "Mineral re-infusion", body: "Calcium, magnesium, and potassium go back in at measured targets.", icon: FlaskConical },
  { name: "UV", body: "Ultraviolet light disinfects the water without added chemicals.", icon: Sun },
  { name: "Ozone", body: "Ozone gives a final disinfection just before bottling.", icon: Wind },
  { name: "Cleanroom bottling", body: "Bottles are blown, filled, and capped in a Class 100,000 cleanroom.", icon: Sparkles },
];

export const standards = [
  {
    name: "BSTI BDS 1240:2001",
    body: "The Bangladesh standard for packaged drinking water, from the Bangladesh Standards and Testing Institution.",
  },
  {
    name: "ISO 22000",
    body: "An international food-safety management system that covers the whole chain, source to shelf.",
  },
  {
    name: "HACCP",
    body: "Hazard Analysis and Critical Control Points: each risk identified and controlled at the step where it can occur.",
  },
  {
    name: "Halal",
    body: "Production and materials certified Halal.",
  },
];

export const cleanroom = {
  title: "Class 100,000 cleanroom",
  body: "Bottle blowing through cap sealing runs with no human contact until the case is sealed.",
};
