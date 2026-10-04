export type LegalSection = { id: string; title: string; body: string[]; list?: string[] };

export type LegalDoc = {
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export const legalUpdated = { label: "4 October 2026", iso: "2026-10-04" };

const contact: LegalSection = {
  id: "contact",
  title: "Contact us",
  body: [
    "SAF Food & Beverage Ltd., Road 1/A, Block J, Bashundhara R/A, Dhaka-1229, Bangladesh.",
    "Use the contact page on this website or call the hotline, and mention which policy your question is about.",
  ],
};

export const legalDocs: LegalDoc[] = [
  {
    slug: "notice",
    label: "Important notice",
    title: "Important notice",
    description: "What the information on the SAF website is for, and the limits of what it promises.",
    intro:
      "Please read this notice before you rely on anything on this website. It explains what the information here is for and where its limits are.",
    sections: [
      {
        id: "information",
        title: "Information on this website",
        body: [
          "Content on this website is general information about SAF Food & Beverage Ltd., its products, and its services. We work to keep it accurate and current, but pack sizes, availability, and delivery areas can change without notice.",
        ],
      },
      {
        id: "health",
        title: "Product and health information",
        body: [
          "Mineral values are typical analysis targets, not a guarantee for every batch. Nothing on this website is medical or nutritional advice. If you have a medical condition or follow a special diet, ask a qualified professional.",
        ],
      },
      {
        id: "orders",
        title: "Orders and prices",
        body: [
          "This website does not take payments or orders. Supply arrangements, prices, and delivery are confirmed directly by the SAF team.",
        ],
      },
      {
        id: "plans",
        title: "Plans and future services",
        body: [
          "Statements about future products, services, or expansion — including online ordering and distribution beyond Dhaka — describe current plans and may change.",
        ],
      },
      {
        id: "fraud",
        title: "Beware of fraud",
        body: [
          "SAF will never ask you to pay into a personal mobile wallet or an unofficial account, and will never ask for your passwords or PINs. If someone claims to represent SAF and asks for money or personal details, contact us through this website before you act.",
        ],
      },
      {
        id: "links",
        title: "Links to other websites",
        body: [
          "Links to other websites, including social media, are provided for convenience. SAF is not responsible for their content or their privacy practices.",
        ],
      },
      {
        id: "liability",
        title: "No warranty",
        body: [
          "The website is provided as it is. To the extent the law allows, SAF is not liable for loss arising from the use of, or reliance on, this website.",
        ],
      },
      contact,
    ],
  },
  {
    slug: "privacy",
    label: "Privacy policy",
    title: "Privacy policy",
    description: "How SAF collects, uses, and protects the personal information you share through this website.",
    intro:
      "This policy explains what personal information SAF collects through this website, why we collect it, and the choices you have.",
    sections: [
      {
        id: "who",
        title: "Who we are",
        body: [
          "SAF Food & Beverage Ltd. (“SAF”, “we”) runs this website and is responsible for the personal information collected through it.",
        ],
      },
      {
        id: "collect",
        title: "What we collect",
        body: ["We collect only what we need to answer you and arrange supply:"],
        list: [
          "Details you send through the contact form: name, phone number, email address, location, enquiry type, and your message.",
          "Basic technical data our servers log when you visit, such as IP address, browser type, pages viewed, and the time of the visit.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies",
        body: [
          "This website does not use advertising or analytics cookies. If that changes, we will update this policy and ask for consent where the law requires it.",
        ],
      },
      {
        id: "use",
        title: "How we use it",
        body: ["We use your information to:"],
        list: [
          "Reply to your enquiry and arrange home, office, or business supply.",
          "Provide customer support and follow up on deliveries.",
          "Keep the website secure and working well.",
          "Meet our legal and regulatory obligations.",
        ],
      },
      {
        id: "sharing",
        title: "Who we share it with",
        body: [
          "We do not sell your personal information. We share it only with service providers who help us deliver and support our products, under confidentiality obligations, or when the law requires it.",
        ],
      },
      {
        id: "retention",
        title: "How long we keep it",
        body: [
          "We keep personal information only as long as we need it for the purpose it was collected, or as the law requires. After that it is deleted or anonymised.",
        ],
      },
      {
        id: "security",
        title: "How we protect it",
        body: [
          "We use reasonable technical and organisational measures to protect your information. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        id: "rights",
        title: "Your choices",
        body: ["You can ask us to:"],
        list: [
          "Show you the personal information we hold about you.",
          "Correct information that is wrong or out of date.",
          "Delete your information, where we are not required to keep it.",
          "Stop contacting you.",
        ],
      },
      {
        id: "children",
        title: "Children",
        body: [
          "This website is not directed at children, and we do not knowingly collect personal information from children.",
        ],
      },
      {
        id: "changes",
        title: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The date at the top of the page shows when it last changed.",
        ],
      },
      contact,
    ],
  },
  {
    slug: "terms",
    label: "Terms of use",
    title: "Terms of use",
    description: "The terms that apply when you use the SAF website.",
    intro: "By using this website you agree to these terms. If you do not agree, please do not use the website.",
    sections: [
      {
        id: "use",
        title: "Using this website",
        body: ["You may use this website for lawful, personal, and business purposes. You must not:"],
        list: [
          "Use it in a way that breaks the law or harms others.",
          "Try to gain unauthorised access to the website or the systems behind it.",
          "Interfere with its operation, or overload it with automated requests.",
          "Submit false information or impersonate someone else.",
        ],
      },
      {
        id: "enquiries",
        title: "Enquiries and supply",
        body: [
          "Sending an enquiry does not create a contract. Supply, pricing, and delivery terms are agreed separately with the SAF team.",
        ],
      },
      {
        id: "ip",
        title: "Intellectual property",
        body: [
          "The content, design, logos, and trademarks on this website belong to SAF or its licensors. You may download brand assets from the media kit and use them as described in our Trademark usage policy.",
        ],
      },
      {
        id: "submissions",
        title: "What you send us",
        body: [
          "When you send us a message, you allow us to use it to respond and to provide the service you asked for, as described in our Privacy policy.",
        ],
      },
      {
        id: "links",
        title: "Links to other websites",
        body: [
          "We are not responsible for the content or availability of websites we link to, and a link is not an endorsement.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        body: [
          "The website is provided as it is, without warranties of any kind. To the extent the law allows, SAF is not liable for indirect or consequential loss arising from its use.",
        ],
      },
      {
        id: "law",
        title: "Governing law",
        body: [
          "These terms are governed by the laws of Bangladesh. The courts of Dhaka have jurisdiction over any dispute about them.",
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        body: ["We may update these terms. Continued use of the website after a change means you accept the new terms."],
      },
      contact,
    ],
  },
  {
    slug: "trademark",
    label: "Trademark usage policy",
    title: "Trademark usage policy",
    description: "How the SAF name, logos, and brand assets may and may not be used.",
    intro:
      "The SAF name and logos tell people the water inside is ours. This policy explains when you can use them and how to use them correctly.",
    sections: [
      {
        id: "marks",
        title: "Our marks",
        body: ["This policy covers:"],
        list: [
          "The SAF name and wordmark, in Latin and Bengali script.",
          "The water-drop S logomark and every logo lockup.",
          "The “Simply Pure!” tagline.",
          "Our label, packaging, and pattern designs.",
        ],
      },
      {
        id: "allowed",
        title: "When you may use them",
        body: ["Without asking first, you may use the marks:"],
        list: [
          "In news coverage, reviews, and editorial content about SAF.",
          "As a retailer or distributor, to show that you stock genuine SAF products.",
        ],
      },
      {
        id: "how",
        title: "How to use them",
        body: [
          "Download logos only from the SAF media kit, and follow the brand guidelines: keep the clear space around the logo and use only the approved colourways.",
        ],
        list: [
          "Do not rotate, stretch, or distort the logo.",
          "Do not add gradients, drop shadows, or strokes.",
          "Do not recolour it outside the approved palette.",
          "Do not place it on busy backgrounds that hurt legibility.",
        ],
      },
      {
        id: "not-allowed",
        title: "What is not allowed",
        body: ["You may not use the marks to:"],
        list: [
          "Suggest that SAF sponsors, endorses, or partners with you without written approval.",
          "Name your company, product, website, domain, or social media account.",
          "Make merchandise or packaging, or combine them with other marks.",
          "Present SAF in a misleading or disparaging way.",
        ],
      },
      {
        id: "permission",
        title: "Asking for permission",
        body: [
          "For co-branding, advertising, or any use not covered here, send a business enquiry through the contact page before you publish.",
        ],
      },
      {
        id: "misuse",
        title: "Reporting misuse",
        body: [
          "If you see the SAF name or logo used in a way that looks wrong, please tell us. We may withdraw permission for any use that does not follow this policy.",
        ],
      },
      contact,
    ],
  },
];
