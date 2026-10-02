import Link from "next/link";
import {
  DEFAULT_LOCALE,
  legalLinks,
  siteConfig,
  type NavLink,
} from "../lib/mockData";

const locale = DEFAULT_LOCALE;

const footerNavigation = [
  {
    id: "motorcycles",
    label: { en: "Motorcycles", id: "Motor" },
    links: [
      { label: { en: "EDPower", id: "EDPower" }, href: "/motorcycles/ed-power" },
      { label: { en: "Athena", id: "Athena" }, href: "/motorcycles/athena" },
      { label: { en: "Victory", id: "Victory" }, href: "/motorcycles/victory" },
      { label: { en: "Bees Pro", id: "Bees Pro" }, href: "/motorcycles/bees-pro" },
      { label: { en: "Compare Models", id: "Bandingkan Model" }, href: "/compare" },
    ],
  },
  {
    id: "supercharge",
    label: { en: "SuperCharge", id: "SuperCharge" },
    links: [
      { label: { en: "WEDISON SuperCharge", id: "WEDISON SuperCharge" }, href: "/supercharge" },
      { label: { en: "Find a Station", id: "Cari Stasiun" }, href: "/supercharger" },
      { label: { en: "SuperCharge Network", id: "Jaringan SuperCharge" }, href: "/supercharger-network" },
      { label: { en: "Charging Guide", id: "Panduan Charging" }, href: "/charging-guide" },
      { label: { en: "Technology", id: "Teknologi" }, href: "/technology" },
    ],
  },
  {
    id: "ownership",
    label: { en: "Ownership", id: "Kepemilikan" },
    links: [
      { label: { en: "Book a Test Ride", id: "Booking Test Ride" }, href: "/test-ride" },
      { label: { en: "Find a Dealer", id: "Cari Dealer" }, href: "/dealer" },
      { label: { en: "Service & Support", id: "Servis & Dukungan" }, href: "/service-support" },
      { label: { en: "Ownership Guide", id: "Panduan Kepemilikan" }, href: "/ownership-guide" },
      { label: { en: "FAQ", id: "FAQ" }, href: "/faq" },
    ],
  },
  {
    id: "company",
    label: { en: "Company", id: "Perusahaan" },
    links: [
      { label: { en: "About WEDISON", id: "Tentang WEDISON" }, href: "/about" },
      { label: { en: "Our Story", id: "Cerita Kami" }, href: "/our-story" },
      { label: { en: "Careers", id: "Karier" }, href: "/careers" },
      { label: { en: "Contact", id: "Kontak" }, href: "/contact" },
      { label: { en: "Business Solutions", id: "Solusi Bisnis" }, href: "/business" },
    ],
  },
] satisfies { id: string; label: NavLink["label"]; links: NavLink[] }[];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-wedison-soft dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 max-w-md">
          <p className="text-xl font-extrabold tracking-widest">{siteConfig.name}</p>
          <p className="mt-3 text-sm text-foreground/70">{siteConfig.entityDefinition[locale]}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerNavigation.map((group) => (
            <div key={group.id}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-wedison-green">
                {group.label[locale]}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.id}-${link.href}-${link.label.en}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-wedison-green"
                    >
                      {link.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p>© 2026 WEDISON. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link: NavLink) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-wedison-green">
                  {link.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
