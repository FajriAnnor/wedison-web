"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_LOCALE,
  homeContent,
  mainNavigation,
  siteConfig,
  type NavGroup,
  type NavLink,
} from "../lib/mockData";

const locale = DEFAULT_LOCALE;
const cta = homeContent.hero.ctas.primary;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur dark:border-white/10">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          className="text-xl font-extrabold tracking-widest text-foreground transition-colors hover:text-wedison-green"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((group: NavGroup) => (
            <li key={group.id} className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-wedison-green focus-visible:text-wedison-green group-focus-within:text-wedison-green"
              >
                {group.label[locale]}
                <span aria-hidden className="ml-1 inline-block text-[10px]">
                  ▾
                </span>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="rounded-xl border border-black/10 bg-background p-2 shadow-lg dark:border-white/10">
                  {group.links.map((link: NavLink) => (
                    <li key={`${group.id}-${link.href}-${link.label.en}`}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-wedison-green/10 hover:text-wedison-green"
                      >
                        {link.label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <Link
            href={cta.href}
            className="hidden rounded-full bg-wedison-orange px-5 py-2 text-sm font-semibold text-wedison-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:brightness-110 lg:inline-block"
          >
            {cta.label[locale]}
          </Link>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-wedison-green/10 hover:text-wedison-green lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-black/10 bg-background lg:hidden dark:border-white/10"
        >
          <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
            {mainNavigation.map((group: NavGroup) => (
              <div key={group.id}>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-wedison-green">
                  {group.label[locale]}
                </p>
                <ul className="space-y-1">
                  {group.links.map((link: NavLink) => (
                    <li key={`${group.id}-${link.href}-${link.label.en}`}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className="block rounded-md px-2 py-2 text-base text-foreground/80 transition-colors hover:bg-wedison-green/10 hover:text-wedison-green"
                      >
                        {link.label[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={cta.href}
              onClick={close}
              className="block rounded-full bg-wedison-orange px-5 py-3 text-center font-semibold text-wedison-ink transition hover:brightness-110"
            >
              {cta.label[locale]}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
