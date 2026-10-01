import Link from "next/link";
import {
  DEFAULT_LOCALE,
  legalLinks,
  mainNavigation,
  siteConfig,
  type NavGroup,
  type NavLink,
} from "../lib/mockData";

const locale = DEFAULT_LOCALE;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-wedison-soft dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-md">
          <p className="text-xl font-extrabold tracking-widest">{siteConfig.name}</p>
          <p className="mt-3 text-sm text-foreground/70">{siteConfig.entityDefinition[locale]}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {mainNavigation.map((group: NavGroup) => (
            <div key={group.id}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-wedison-green">
                {group.label[locale]}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link: NavLink) => (
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

        <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
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
