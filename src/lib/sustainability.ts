import { Droplets, Recycle, RefreshCcw, RotateCcw, Sparkles, SunDim, Truck, Waves } from "lucide-react";

export const commitments = [
  {
    icon: Recycle,
    title: "Recyclable bottles",
    body: "Bottles are BPA-free rPET, made to go back into recycling once they are empty.",
  },
  {
    icon: RefreshCcw,
    title: "Returnable jars",
    body: "18 L jars come back on the delivery route to be washed, refilled, and sealed again.",
  },
  {
    icon: Waves,
    title: "Water recovered",
    body: "Process water is recovered inside the plant instead of going straight to drain.",
  },
];

export const jarLoop = [
  { icon: Truck, title: "Delivered", body: "A sealed 18 L jar reaches your dispenser." },
  { icon: RotateCcw, title: "Returned", body: "The empty jar goes back on the next delivery." },
  { icon: Sparkles, title: "Washed", body: "Every jar is cleaned and checked at the plant." },
  { icon: Droplets, title: "Refilled", body: "Filled, capped with a tamper-proof seal, and sent out again." },
];

export const careTips = [
  {
    icon: RotateCcw,
    title: "Hand back empty jars",
    body: "Keep the empty jar ready for the next delivery so it can go round again.",
  },
  {
    icon: Recycle,
    title: "Recycle the bottle",
    body: "Empty it, put the cap back on, and drop it in recycling.",
  },
  {
    icon: SunDim,
    title: "Store out of the sun",
    body: "Keep jars and bottles in a cool, shaded place before and after opening.",
  },
];
