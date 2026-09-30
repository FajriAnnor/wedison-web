/**
 * lib/pages.ts
 *
 * Content definitions for the secondary pages of the local prototype.
 * Copy here only explains what a page is for. Any factual claim about WEDISON is left as
 * [DATA REQUIRED] / [PLACEHOLDER] and listed in `dataRequired` (brief section 54).
 */

import type { ArticleCategory } from "./mockData";
import type { VisualKind } from "../components/ui/PlaceholderArt";

export type PageExtra =
  | "tech"
  | "why-electric"
  | "supercharge"
  | "ownership"
  | "faq"
  | "stories"
  | "articles"
  | "business-grid"
  | "business-inquiry"
  | "contact";

export interface PageItem {
  title: string;
  body: string;
}

export interface PageSection {
  title: string;
  body?: string;
  items?: PageItem[];
}

export interface SitePage {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  visual: VisualKind;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  sections?: PageSection[];
  extras?: PageExtra[];
  articleCategories?: ArticleCategory[];
  /** Facts the WEDISON team must supply before this page can be final */
  dataRequired?: string[];
  crumbs?: { label: string; href?: string }[];
}

const TEST_RIDE = { label: "Book a Test Ride", href: "/test-ride" };
const MODELS = { label: "Explore Models", href: "/motorcycles" };

export const sitePages: SitePage[] = [
  {
    slug: "why-electric",
    title: "Why electric",
    eyebrow: "Why WEDISON",
    intro: "Electric riding is simpler than it sounds. Less to maintain, quieter to ride and easy to charge at home.",
    visual: "battery",
    primary: { label: "Calculate Your Savings", href: "/ownership-cost" },
    secondary: MODELS,
    extras: ["why-electric"],
    dataRequired: ["Verified running cost comparison per model", "Sources for any sustainability figure"],
  },
  {
    slug: "technology",
    title: "Our technology",
    eyebrow: "Why WEDISON",
    intro: "Battery, motor, battery management, controller and charging are designed to work as one system.",
    visual: "tech",
    primary: { label: "Discover Supercharge", href: "/supercharge" },
    secondary: MODELS,
    extras: ["tech"],
    dataRequired: ["Every item marked in the list above", "Confirmation of which connected features exist"],
  },
  {
    slug: "supercharge",
    title: "15-Minute Supercharge",
    eyebrow: "Why WEDISON",
    intro: "Charge less. Ride more. Stop, plug in and get back on the road.",
    visual: "charger",
    primary: { label: "Find a Supercharger", href: "/supercharger-network" },
    secondary: { label: "Compare Models", href: "/compare" },
    extras: ["supercharge"],
    dataRequired: [
      "Starting and ending battery percentage",
      "Charger power in kW",
      "Battery capacity tested",
      "Compatible models",
      "Test conditions and temperature",
      "Laboratory or real-world tested",
    ],
  },
  {
    slug: "battery",
    title: "Battery you can trust",
    eyebrow: "Why WEDISON",
    intro: "The battery is the question every first-time electric rider asks about. Here is how we will answer it, plainly.",
    visual: "battery",
    primary: TEST_RIDE,
    secondary: { label: "Battery Guide", href: "/battery-guide" },
    sections: [
      {
        title: "What we will explain",
        items: [
          { title: "Battery technology", body: "[DATA REQUIRED] Chemistry, capacity and pack design." },
          { title: "Battery management", body: "How the BMS monitors and protects the battery during riding and charging." },
          { title: "Safety and temperature", body: "[DATA REQUIRED] Protection features and thermal management." },
          { title: "Lifecycle and warranty", body: "[DATA REQUIRED] Expected life, warranty terms and replacement options." },
          { title: "Care and support", body: "Simple habits that keep a battery healthy, and where to get help." },
        ],
      },
    ],
    dataRequired: ["Battery chemistry and capacity", "Cycle life", "Thermal protection", "Warranty and replacement policy"],
  },
  {
    slug: "performance",
    title: "Real-world performance",
    eyebrow: "Why WEDISON",
    intro: "Spec sheets show the best case. This page explains range, speed and charging in everyday conditions.",
    visual: "motorcycle",
    primary: { label: "Compare Models", href: "/compare" },
    secondary: TEST_RIDE,
    sections: [
      {
        title: "What changes real-world results",
        items: [
          { title: "Rider weight", body: "More load means more energy per kilometre." },
          { title: "Traffic and terrain", body: "Stop-start traffic and hills change how far a charge goes." },
          { title: "Weather and riding style", body: "Temperature and throttle habits both matter." },
          { title: "Claimed vs expected range", body: "[DATA REQUIRED] Both will be shown side by side once verified." },
        ],
      },
    ],
    dataRequired: ["Claimed range and test method per model", "Verified real-world range with conditions"],
  },
  {
    slug: "safety",
    title: "Safety",
    eyebrow: "Why WEDISON",
    intro: "Safety is covered in layers: the battery, the electronics, the brakes and how the motorcycle behaves on the road.",
    visual: "service",
    primary: TEST_RIDE,
    secondary: { label: "Our Technology", href: "/technology" },
    sections: [
      {
        title: "Areas covered",
        items: [
          { title: "Battery and BMS protection", body: "[DATA REQUIRED] Verified protections." },
          { title: "Braking system", body: "[DATA REQUIRED] Brake type and ABS or CBS by model." },
          { title: "Lighting and stability", body: "[DATA REQUIRED] Verified features." },
          { title: "Charging protection", body: "[DATA REQUIRED] Protections during charging." },
          { title: "Testing and certification", body: "[DATA REQUIRED] Only verified certifications will be shown." },
        ],
      },
    ],
    dataRequired: ["Verified safety features per model", "Certifications and test reports"],
  },
  {
    slug: "service-support",
    title: "Own with confidence",
    eyebrow: "Experience",
    intro: "Buying is the start. Service, warranty and support are how WEDISON stays with you after that.",
    visual: "service",
    primary: { label: "Find a Dealer", href: "/dealer" },
    secondary: { label: "FAQ", href: "/faq" },
    extras: ["ownership"],
    sections: [
      {
        title: "After you buy",
        items: [
          { title: "Service booking", body: "[PLACEHOLDER] Online booking with your nearest WEDISON location." },
          { title: "Spare parts", body: "[DATA REQUIRED] Availability and ordering." },
          { title: "Technical support", body: "Reach the team by WhatsApp, phone or email." },
          { title: "Roadside assistance", body: "[DATA REQUIRED] Confirm whether this is offered." },
        ],
      },
    ],
    dataRequired: ["Warranty terms", "Service center list", "Roadside assistance policy"],
  },
  {
    slug: "faq",
    title: "Frequently asked questions",
    eyebrow: "Why WEDISON",
    intro: "Short answers to the questions people ask most. Answers marked [DATA REQUIRED] are waiting on verified information.",
    visual: "article",
    primary: TEST_RIDE,
    secondary: { label: "Contact", href: "/contact" },
    extras: ["faq"],
  },
  {
    slug: "riders",
    title: "WEDISON Riders",
    eyebrow: "Experience",
    intro: "Real people, real rides. This is where verified rider stories will live.",
    visual: "rider",
    primary: { label: "Customer Stories", href: "/customer-stories" },
    secondary: TEST_RIDE,
    extras: ["stories"],
    dataRequired: ["Real riders with written consent", "Photos or video", "Real usage, charging and cost details"],
  },
  {
    slug: "customer-stories",
    title: "Customer stories",
    eyebrow: "Experience",
    intro: "Every story will cover why the rider chose WEDISON, what they rode before, and how charging and cost feel day to day.",
    visual: "rider",
    primary: { label: "Meet the WEDISON Riders", href: "/riders" },
    secondary: TEST_RIDE,
    extras: ["stories"],
    dataRequired: ["Real riders with written consent", "Photos or video", "Real usage, charging and cost details"],
  },
  {
    slug: "ownership-guide",
    title: "Ownership guide",
    eyebrow: "Experience",
    intro: "What to expect after you take delivery: charging, care, service and where to get help.",
    visual: "service",
    primary: { label: "Charging Guide", href: "/charging-guide" },
    secondary: { label: "Service & Support", href: "/service-support" },
    sections: [
      {
        title: "In this guide",
        items: [
          { title: "First charge", body: "[PLACEHOLDER] Step-by-step guide to be written with the WEDISON team." },
          { title: "Everyday care", body: "[PLACEHOLDER] Cleaning, tyre pressure and battery habits." },
          { title: "Service schedule", body: "[DATA REQUIRED] Service intervals." },
          { title: "Getting help", body: "Reach support by WhatsApp, phone or email." },
        ],
      },
    ],
    dataRequired: ["Ownership manual content", "Service intervals"],
  },
  {
    slug: "buying-guide",
    title: "Buying guide",
    eyebrow: "Discover",
    intro: "Everything you need to choose an electric motorcycle with confidence.",
    visual: "article",
    primary: { label: "Compare Models", href: "/compare" },
    secondary: { label: "All Articles", href: "/articles" },
    extras: ["articles"],
    articleCategories: ["buying-guide"],
  },
  {
    slug: "battery-guide",
    title: "Battery guide",
    eyebrow: "Discover",
    intro: "How electric motorcycle batteries work, and how to look after one.",
    visual: "battery",
    primary: { label: "Battery", href: "/battery" },
    secondary: { label: "All Articles", href: "/articles" },
    extras: ["articles"],
    articleCategories: ["battery"],
  },
  {
    slug: "charging-guide",
    title: "Charging guide",
    eyebrow: "Discover",
    intro: "Charging at home, charging on the road and how fast charging works.",
    visual: "charger",
    primary: { label: "Discover Supercharge", href: "/supercharge" },
    secondary: { label: "All Articles", href: "/articles" },
    extras: ["articles"],
    articleCategories: ["charging", "supercharging"],
  },
  {
    slug: "sustainability",
    title: "Sustainability",
    eyebrow: "Why WEDISON",
    intro: "We would rather show measurable benefits than make broad promises.",
    visual: "battery",
    primary: { label: "Why Electric", href: "/why-electric" },
    secondary: MODELS,
    sections: [
      {
        title: "How we will report it",
        items: [
          { title: "Measured, not claimed", body: "[DATA REQUIRED] Any emissions or energy figure needs a source and method." },
          { title: "Battery end of life", body: "[DATA REQUIRED] Recycling and second-life approach." },
          { title: "Quieter streets", body: "Electric motors are much quieter than combustion engines at low speed." },
        ],
      },
    ],
    dataRequired: ["Verified sustainability data and sources", "Battery recycling policy"],
  },
  {
    slug: "business",
    title: "Business solutions",
    eyebrow: "Business",
    intro: "WEDISON is built for more than individual riders: fleets, rental operators, hotels, companies and partners.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Contact", href: "/contact" },
    extras: ["business-grid", "business-inquiry"],
  },
  {
    slug: "fleet",
    title: "Fleet solutions",
    eyebrow: "Business",
    intro: "Electric motorcycles for delivery, corporate fleets and mobility operators.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Calculate Your Savings", href: "/ownership-cost" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "Who it is for",
        items: [
          { title: "Corporate fleet", body: "Employee and operational mobility." },
          { title: "Delivery", body: "High daily distance with predictable running costs." },
          { title: "Mobility companies", body: "Shared and on-demand riding." },
        ],
      },
    ],
    dataRequired: ["Fleet pricing model", "Fleet charging and support program"],
  },
  {
    slug: "rental",
    title: "Rental business",
    eyebrow: "Business",
    intro: "Lower running costs and less maintenance for rental and tourism operators.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Calculate Your Savings", href: "/ownership-cost" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "Who it is for",
        items: [
          { title: "Motorcycle rental", body: "Operators looking to cut fuel and service costs." },
          { title: "Tourism", body: "Quiet, easy-to-ride motorcycles for visitors." },
        ],
      },
    ],
    dataRequired: ["Rental program terms", "Charging setup for rental operators"],
  },
  {
    slug: "hospitality",
    title: "Hospitality solutions",
    eyebrow: "Business",
    intro: "Quiet electric mobility for hotels, resorts and villas.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Find a Supercharger", href: "/supercharger-network" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "Who it is for",
        items: [
          { title: "Hotels", body: "Guest mobility without engine noise." },
          { title: "Resorts and villas", body: "Easy short trips for guests and staff." },
        ],
      },
    ],
    dataRequired: ["Hospitality package details"],
  },
  {
    slug: "corporate",
    title: "Corporate solutions",
    eyebrow: "Business",
    intro: "Employee mobility, operational transport and ESG programs.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Why Electric", href: "/why-electric" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "Who it is for",
        items: [
          { title: "Employee mobility", body: "Practical commuting options." },
          { title: "ESG programs", body: "[DATA REQUIRED] Verified reporting data." },
          { title: "Operational transport", body: "Short trips around sites and cities." },
        ],
      },
    ],
    dataRequired: ["Corporate program details"],
  },
  {
    slug: "charging-partnership",
    title: "Charging partnership",
    eyebrow: "Business",
    intro: "Host a WEDISON Supercharger at your location and be part of the network.",
    visual: "charger",
    primary: { label: "Become a Charging Partner", href: "#inquiry" },
    secondary: { label: "Supercharger Network", href: "/supercharger-network" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "Suited to",
        items: [
          { title: "Retail and restaurants", body: "Riders stop while they charge." },
          { title: "Hotels", body: "Charging for guests and neighbours." },
          { title: "Strategic locations", body: "Places along busy routes." },
        ],
      },
    ],
    dataRequired: ["Partnership model", "Site requirements and commercial terms"],
  },
  {
    slug: "dealer-partnership",
    title: "Become a dealer",
    eyebrow: "Business",
    intro: "Bring WEDISON to your city as part of a growing dealer network.",
    visual: "business",
    primary: { label: "Send a Business Inquiry", href: "#inquiry" },
    secondary: { label: "Find a Dealer", href: "/dealer" },
    extras: ["business-inquiry"],
    crumbs: [{ label: "Business", href: "/business" }],
    sections: [
      {
        title: "What to expect",
        items: [
          { title: "Partnership model", body: "[DATA REQUIRED] Terms and requirements." },
          { title: "Training and support", body: "[DATA REQUIRED] Onboarding program." },
          { title: "Cities", body: "[DATA REQUIRED] Open markets." },
        ],
      },
    ],
    dataRequired: ["Dealer program terms", "Open cities and countries"],
  },
  {
    slug: "about",
    title: "About WEDISON",
    eyebrow: "Company",
    intro: "WEDISON is an electric motorcycle and electric mobility company.",
    visual: "tech",
    primary: { label: "Our Story", href: "/our-story" },
    secondary: { label: "Careers", href: "/careers" },
    sections: [
      {
        title: "What WEDISON is building",
        body: "Motorcycles, charging infrastructure and service, designed to work as one ecosystem so electric mobility fits everyday life.",
      },
      {
        title: "Who we are",
        items: [
          { title: "Mission", body: "[DATA REQUIRED] Official mission statement." },
          { title: "Vision", body: "[DATA REQUIRED] Official vision statement." },
          { title: "People", body: "[PLACEHOLDER] Leadership and team." },
        ],
      },
    ],
    dataRequired: ["Mission and vision", "Company facts approved for publication"],
  },
  {
    slug: "our-story",
    title: "Our story",
    eyebrow: "Company",
    intro: "From a simple problem to an ecosystem: how WEDISON came to be.",
    visual: "article",
    primary: { label: "About WEDISON", href: "/about" },
    secondary: MODELS,
    sections: [
      {
        title: "The story, in order",
        items: [
          { title: "Problem", body: "[PLACEHOLDER] Why electric mobility is still hard for many riders." },
          { title: "Insight", body: "[PLACEHOLDER] What WEDISON saw differently." },
          { title: "Technology and product", body: "[PLACEHOLDER] What was built." },
          { title: "Infrastructure and ecosystem", body: "[PLACEHOLDER] Charging, service and community." },
          { title: "Future", body: "[DATA REQUIRED] Approved expansion plans only." },
        ],
      },
    ],
    dataRequired: ["Company history", "Founding story", "Approved roadmap"],
  },
  {
    slug: "careers",
    title: "Careers",
    eyebrow: "Company",
    intro: "Help build the infrastructure and technology that make electric mobility practical.",
    visual: "business",
    primary: { label: "Contact", href: "/contact" },
    secondary: { label: "About WEDISON", href: "/about" },
    sections: [
      {
        title: "Working at WEDISON",
        items: [
          { title: "Culture and values", body: "[PLACEHOLDER] To be written with the team." },
          { title: "Open positions", body: "[DATA REQUIRED] No roles are listed yet." },
          { title: "Teams and growth", body: "[PLACEHOLDER] Teams and career paths." },
        ],
      },
    ],
    dataRequired: ["Open roles", "Culture and values statement"],
  },
  {
    slug: "media",
    title: "Media and press",
    eyebrow: "Company",
    intro: "Company information, brand assets and media contact for journalists and partners.",
    visual: "article",
    primary: { label: "Contact", href: "/contact" },
    secondary: { label: "About WEDISON", href: "/about" },
    sections: [
      {
        title: "Press resources",
        items: [
          { title: "Press releases", body: "[DATA REQUIRED] None published yet." },
          { title: "Media coverage", body: "[DATA REQUIRED] Only real coverage will be listed." },
          { title: "Brand and product assets", body: "[PLACEHOLDER] Downloadable press kit." },
          { title: "Media contact", body: "[DATA REQUIRED] Official press contact." },
        ],
      },
    ],
    dataRequired: ["Press releases", "Press kit", "Media contact"],
  },
  {
    slug: "contact",
    title: "Contact",
    eyebrow: "Company",
    intro: "Questions about a motorcycle, a test ride or a partnership? Send a message.",
    visual: "service",
    primary: TEST_RIDE,
    secondary: { label: "Find a Dealer", href: "/dealer" },
    extras: ["contact"],
    dataRequired: ["Official email, phone and WhatsApp", "Head office address"],
  },
];

export const legalPages: SitePage[] = [
  {
    slug: "privacy",
    title: "Privacy",
    eyebrow: "Legal",
    intro: "How WEDISON handles personal information.",
    visual: "article",
    crumbs: [{ label: "Legal" }],
    sections: [{ title: "Privacy policy", body: "[DATA REQUIRED] Legal text to be supplied and approved by WEDISON." }],
    dataRequired: ["Approved privacy policy"],
  },
  {
    slug: "terms",
    title: "Terms",
    eyebrow: "Legal",
    intro: "The terms that apply when you use this website.",
    visual: "article",
    crumbs: [{ label: "Legal" }],
    sections: [{ title: "Terms and conditions", body: "[DATA REQUIRED] Legal text to be supplied and approved by WEDISON." }],
    dataRequired: ["Approved terms and conditions"],
  },
  {
    slug: "cookies",
    title: "Cookie policy",
    eyebrow: "Legal",
    intro: "How this website uses cookies.",
    visual: "article",
    crumbs: [{ label: "Legal" }],
    sections: [{ title: "Cookie policy", body: "[DATA REQUIRED] Legal text to be supplied and approved by WEDISON." }],
    dataRequired: ["Approved cookie policy"],
  },
];

export const getSitePage = (slug: string) => sitePages.find((p) => p.slug === slug);
export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
