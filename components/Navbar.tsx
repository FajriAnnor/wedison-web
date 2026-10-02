"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_LOCALE, homeContent, mainNavigation, siteConfig, type NavGroup } from "../lib/mockData";

const locale = DEFAULT_LOCALE;
const cta = homeContent.hero.ctas.primary;

function matchesPath(pathname: string, href: string) {
  const path = href.split("?")[0];
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
}

function matchesLink(pathname: string, href: string) {
  const path = href.split("?")[0];
  return pathname === path || (path === "/articles" && pathname.startsWith("/articles/"));
}

function desktopPanelClass(group: NavGroup) {
  if (group.id === "discover") return "right-0 w-[46rem]";
  if (group.id === "ownership") return "left-1/2 w-[38rem] -translate-x-1/2";
  return "left-1/2 w-72 -translate-x-1/2";
}

function desktopGridClass(group: NavGroup) {
  if (group.sections.length >= 3) return "grid-cols-3";
  if (group.sections.length === 2) return "grid-cols-2";
  return "grid-cols-1";
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const desktopButtons = useRef<Record<string, HTMLButtonElement | null>>({});

  const close = () => {
    setIsOpen(false);
    setDesktopOpen(null);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (desktopOpen) desktopButtons.current[desktopOpen]?.focus();
      if (isOpen) mobileButton.current?.focus();
      setDesktopOpen(null);
      setIsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setDesktopOpen(null);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [desktopOpen, isOpen]);

  const toggleMobileGroup = (groupId: string) => {
    setMobileOpen((current) =>
      current.includes(groupId) ? current.filter((id) => id !== groupId) : [...current, groupId],
    );
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur dark:border-white/10">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={close}
          className="text-xl font-extrabold tracking-widest text-foreground transition-colors hover:text-wedison-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wedison-green"
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {mainNavigation.map((group) => {
            const expanded = desktopOpen === group.id;
            const active = group.sections.some((section) =>
              section.links.some((link) => matchesPath(pathname, link.href)),
            );
            return (
              <li
                key={group.id}
                className="relative"
                onMouseEnter={() => setDesktopOpen(group.id)}
                onMouseLeave={() => setDesktopOpen(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDesktopOpen(null);
                }}
              >
                <button
                  ref={(node) => {
                    desktopButtons.current[group.id] = node;
                  }}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={expanded}
                  aria-controls={`desktop-nav-${group.id}`}
                  onClick={() => setDesktopOpen(expanded ? null : group.id)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    setDesktopOpen(group.id);
                    window.requestAnimationFrame(() => {
                      document.querySelector<HTMLAnchorElement>(`#desktop-nav-${group.id} a`)?.focus();
                    });
                  }}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-green ${
                    active || expanded ? "text-wedison-green" : "text-foreground/80 hover:text-wedison-green"
                  }`}
                >
                  {group.label[locale]}
                  <span aria-hidden className={`ml-1 inline-block text-[10px] transition-transform ${expanded ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                <div
                  id={`desktop-nav-${group.id}`}
                  className={`absolute top-full z-50 pt-2 transition duration-150 ${desktopPanelClass(group)} ${
                    expanded ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className={`grid gap-2 rounded-2xl border border-black/10 bg-background p-3 shadow-xl dark:border-white/10 ${desktopGridClass(group)}`}>
                    {group.sections.map((section) => (
                      <div key={section.id} className="min-w-0">
                        {section.label && (
                          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                            {section.label[locale]}
                          </p>
                        )}
                        <ul>
                          {section.links.map((link) => {
                            const linkActive = matchesLink(pathname, link.href);
                            return (
                              <li key={`${group.id}-${link.href}-${link.label.en}`}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={linkActive ? "page" : undefined}
                                  className={`block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-wedison-green ${
                                    linkActive
                                      ? "bg-wedison-green/10 font-semibold text-wedison-green"
                                      : "text-foreground/75 hover:bg-wedison-green/10 hover:text-wedison-green"
                                  }`}
                                >
                                  {link.label[locale]}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={cta.href}
            className="hidden rounded-full bg-wedison-orange px-5 py-2 text-sm font-semibold text-wedison-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-orange lg:inline-block"
          >
            Test Ride
          </Link>

          <button
            ref={mobileButton}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-wedison-green/10 hover:text-wedison-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-green lg:hidden"
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
              {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-black/10 bg-background lg:hidden dark:border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {mainNavigation.map((group) => {
              const expanded = mobileOpen.includes(group.id);
              return (
                <div key={group.id} className="border-b border-black/10 last:border-0 dark:border-white/10">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`mobile-nav-${group.id}`}
                    onClick={() => toggleMobileGroup(group.id)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:text-wedison-green focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wedison-green"
                  >
                    {group.label[locale]}
                    <span aria-hidden className={`text-wedison-green transition-transform ${expanded ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div id={`mobile-nav-${group.id}`} hidden={!expanded} className="pb-4">
                    {group.sections.map((section) => (
                      <div key={section.id} className="mb-3 last:mb-0">
                        {section.label && (
                          <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/45">
                            {section.label[locale]}
                          </p>
                        )}
                        <ul>
                          {section.links.map((link) => {
                            const linkActive = matchesLink(pathname, link.href);
                            return (
                              <li key={`${group.id}-${link.href}-${link.label.en}`}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={linkActive ? "page" : undefined}
                                  className={`block rounded-md px-2 py-2.5 text-base transition-colors focus-visible:outline-2 focus-visible:outline-wedison-green ${
                                    linkActive
                                      ? "bg-wedison-green/10 font-semibold text-wedison-green"
                                      : "text-foreground/75 hover:bg-wedison-green/10 hover:text-wedison-green"
                                  }`}
                                >
                                  {link.label[locale]}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <Link
              href={cta.href}
              onClick={close}
              className="mt-5 block rounded-full bg-wedison-orange px-5 py-3 text-center font-semibold text-wedison-ink transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedison-orange"
            >
              Test Ride
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
