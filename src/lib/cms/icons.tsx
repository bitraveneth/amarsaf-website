import {
  Briefcase,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Feather,
  GlassWater,
  Hand,
  Handshake,
  Headset,
  Home,
  Lock,
  Package,
  PartyPopper,
  Recycle,
  RefreshCcw,
  ShieldCheck,
  Timer,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Hand,
  Timer,
  PartyPopper,
  Recycle,
  CarFront,
  Briefcase,
  Dumbbell,
  ShieldCheck,
  GlassWater,
  UtensilsCrossed,
  Feather,
  Users,
  Home,
  Lock,
  RefreshCcw,
  Package,
  Handshake,
  Headset,
  BriefcaseBusiness,
};

export function resolveIcon(key?: string | null): LucideIcon {
  if (!key) return Package;
  return map[key] ?? Package;
}
