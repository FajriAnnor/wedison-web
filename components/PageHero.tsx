import Link from "next/link";
import type { VisualKind } from "./ui/PlaceholderArt";
import Visual from "./ui/Visual";
import { CtaButton, GhostButton } from "./ui/common";

export interface Crumb {
  label: string;
  href?: string;
}

export default function PageHero({
  eyebrow,
  title,
  intro,
  visual = "tech",
  primary,
  secondary,
  crumbs = [],
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  visual?: VisualKind;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  crumbs?: Crumb[];
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-wedison-ink text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-2">
                  <span aria-hidden>/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/80">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">{intro}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <CtaButton href={primary.href} conversion={primary.href.startsWith("/test-ride")}>
                  {primary.label}
                </CtaButton>
              )}
              {secondary && <GhostButton href={secondary.href}>{secondary.label}</GhostButton>}
            </div>
          )}
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
          <Visual kind={visual} src={image?.src} alt={image?.alt ?? `Illustrative placeholder: ${visual}`} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
