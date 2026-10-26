import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { CMS_TAG } from "@/lib/revalidate";
import {
  businessNeeds as staticNeeds,
  enquiryTypes as staticTypes,
  supportTopics as staticTopics,
} from "@/lib/contact";

export type CmsEnquiryType = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  iconKey?: string;
};

async function loadContact() {
  try {
    const row = await prisma.contactSettings.findUnique({ where: { id: 1 } });
    if (!row) {
      return {
        enquiryTypes: staticTypes.map((t) => ({
          id: t.id,
          label: t.label,
          title: t.title,
          body: t.body,
          cta: t.cta,
          iconKey: t.id,
        })),
        businessNeeds: [...staticNeeds],
        supportTopics: [...staticTopics],
      };
    }
    return {
      enquiryTypes: row.enquiryTypes as CmsEnquiryType[],
      businessNeeds: row.businessNeeds,
      supportTopics: row.supportTopics,
    };
  } catch {
    return {
      enquiryTypes: staticTypes.map((t) => ({
        id: t.id,
        label: t.label,
        title: t.title,
        body: t.body,
        cta: t.cta,
        iconKey: t.id,
      })),
      businessNeeds: [...staticNeeds],
      supportTopics: [...staticTopics],
    };
  }
}

export const getContactSettings = unstable_cache(loadContact, ["cms-contact"], {
  tags: [CMS_TAG],
  revalidate: 60,
});
