import { BriefcaseBusiness, Handshake, Headset, Package, type LucideIcon } from "lucide-react";

export const enquiryTypes: {
  id: "product" | "business" | "support" | "careers";
  label: string;
  title: string;
  body: string;
  cta: string;
  icon: LucideIcon;
}[] = [
  {
    id: "product",
    label: "Product",
    title: "Product enquiry",
    body: "Questions about our water, pack sizes, or availability near you.",
    cta: "Contact sales",
    icon: Package,
  },
  {
    id: "business",
    label: "Business",
    title: "Business enquiry",
    body: "Bulk orders, dealerships, distribution, and partnerships.",
    cta: "Get in touch",
    icon: Handshake,
  },
  {
    id: "support",
    label: "Support",
    title: "Customer support",
    body: "Help with a delivery, a jar return, or a product. Our team is ready.",
    cta: "Contact support",
    icon: Headset,
  },
  {
    id: "careers",
    label: "Careers",
    title: "Careers",
    body: "Apply for an open role, or send us an open application.",
    cta: "Apply",
    icon: BriefcaseBusiness,
  },
];

export type EnquiryType = (typeof enquiryTypes)[number]["id"];

export function isEnquiryType(value: unknown): value is EnquiryType {
  return enquiryTypes.some((type) => type.id === value);
}

export const businessNeeds = ["Bulk order", "Dealership", "Distribution", "Corporate supply", "Partnership"];

export const supportTopics = ["A delivery", "Jar return or exchange", "Product quality", "Something else"];
