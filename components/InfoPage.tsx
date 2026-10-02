import Link from "next/link";
import {
  DATA_REQUIRED_LABEL,
  DEFAULT_LOCALE,
  articles,
  businessSolutions,
  customerStories,
  faqs,
  ownershipPillars,
  superchargeClaim,
  techPillars,
  whyElectricPoints,
} from "../lib/mockData";
import type { SitePage } from "../lib/pages";
import PageHero from "./PageHero";
import ChargingVisual from "./ChargingVisual";
import ContactForm from "./ContactForm";
import { ArticleCard, StoryCard } from "./cards";
import Visual from "./ui/Visual";
import { CtaButton, GhostButton, SectionHeading } from "./ui/common";

const locale = DEFAULT_LOCALE;

const BUSINESS_HREF: Record<string, string> = {
  fleet: "/fleet",
  rental: "/rental",
  hospitality: "/hospitality",
  corporate: "/corporate",
  dealer: "/dealer-partnership",
  "charging-partner": "/charging-partnership",
};

const HERO_IMAGES: Partial<Record<string, { src: string; alt: string }>> = {
  technology: {
    src: "/images/wedison/technology/supercharge-technology.webp",
    alt: "WEDISON SuperCharge station technology",
  },
  supercharge: {
    src: "/images/wedison/supercharge/supercharge-station-hero.webp",
    alt: "WEDISON SuperCharge station",
  },
  "charging-guide": {
    src: "/images/wedison/supercharge/edpower-supercharge.webp",
    alt: "WEDISON EDPower connected to a SuperCharge station",
  },
  "charging-partnership": {
    src: "/images/wedison/supercharge/supercharge-network.webp",
    alt: "WEDISON motorcycles and SuperCharge network",
  },
  "dealer-partnership": {
    src: "/images/wedison/showroom/showroom-reception.webp",
    alt: "WEDISON showroom reception",
  },
};

function Block({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "soft" }) {
  return (
    <section className={`py-16 sm:py-20 ${tone === "soft" ? "bg-foreground/[0.03]" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function Cards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <li key={it.title} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
          <h3 className="font-bold">{it.title}</h3>
          <p className="mt-2 text-sm text-foreground/70">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function InfoPage({ page }: { page: SitePage }) {
  const extras = page.extras ?? [];
  const categories = page.articleCategories ?? [];
  const relatedArticles = articles.filter((a) => categories.includes(a.category));

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        visual={page.visual}
        primary={page.primary}
        secondary={page.secondary}
        crumbs={[...(page.crumbs ?? []), { label: page.title }]}
        image={HERO_IMAGES[page.slug]}
      />

      {page.sections?.map((s) => (
        <Block key={s.title}>
          <SectionHeading title={s.title} body={s.body} />
          {s.items && <Cards items={s.items} />}
        </Block>
      ))}

      {extras.includes("why-electric") && (
        <Block>
          <SectionHeading eyebrow="Five reasons" title="What changes when you switch" />
          <Cards items={whyElectricPoints.map((p) => ({ title: p.title[locale], body: p.body[locale] }))} />
          <div className="mt-10">
            <CtaButton href="/ownership-cost">Calculate Your Savings</CtaButton>
          </div>
        </Block>
      )}

      {extras.includes("tech") && (
        <Block>
          <SectionHeading
            eyebrow="The system"
            title="Every part, explained"
            body="Simple summaries first. Technical detail is added only once WEDISON has verified it."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techPillars.map((p) => (
              <li key={p.id} className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
                <h3 className="font-bold">{p.title[locale]}</h3>
                <p className="mt-2 text-sm text-foreground/70">{p.summary[locale]}</p>
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer font-medium text-wedison-green">Detail needed</summary>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/60">
                    {p.dataRequired.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {extras.includes("supercharge") && (
        <Block>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow={superchargeClaim.claimLabel}
                title="Fast charging, built around the ride."
                body="WEDISON SuperCharge is a DC fast-charging system for compatible motorcycles, designed to make charging faster, safer and more practical."
              />
              <dl className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                  <dt className="text-xs uppercase tracking-wider text-foreground/50">Charge</dt>
                  <dd className="mt-2 text-xl font-extrabold text-wedison-green">10% → 80%</dd>
                </div>
                <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                  <dt className="text-xs uppercase tracking-wider text-foreground/50">Time</dt>
                  <dd className="mt-2 text-xl font-extrabold text-wedison-green">15 min</dd>
                </div>
                <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
                  <dt className="text-xs uppercase tracking-wider text-foreground/50">Network</dt>
                  <dd className="mt-2 text-xl font-extrabold text-wedison-green">100+</dd>
                </div>
              </dl>
            </div>
            <ChargingVisual />
          </div>
          <div className="mt-16">
            <SectionHeading
              eyebrow="SuperCharge app"
              title="Find. Charge. Keep moving."
              body="The WEDISON app connects station discovery, live availability and charging-session controls in one place."
            />
            <Cards
              items={[
                {
                  title: "Find nearby stations",
                  body: "Explore SuperCharge locations on an interactive map, filter by availability and distance, and save favourites.",
                },
                {
                  title: "Plan before you leave",
                  body: "Check real-time station availability, queue status and estimated wait times before setting off.",
                },
                {
                  title: "Monitor every session",
                  body: "Start charging from the app, follow progress in real time, and review session history and analytics.",
                },
                {
                  title: "Engineered for safety",
                  body: "WEDISON states that its DC stations are certified to IEC safety standards and comply with European Union directives.",
                },
              ]}
            />
          </div>
        </Block>
      )}

      {extras.includes("ownership") && (
        <Block tone="soft">
          <SectionHeading eyebrow="Five pillars" title="Warranty, service, support, battery, network" />
          <Cards items={ownershipPillars.map((p) => ({ title: p.title[locale], body: p.body[locale] }))} />
        </Block>
      )}

      {extras.includes("faq") && (
        <Block>
          <ul className="mx-auto max-w-3xl divide-y divide-black/10 dark:divide-white/10">
            {faqs.map((f) => (
              <li key={f.id}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.question[locale]}
                    <span aria-hidden className="text-wedison-green transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className={`mt-3 text-sm ${f.status === "required" ? "text-foreground/40" : "text-foreground/70"}`}>
                    {f.answer[locale]}
                  </p>
                  {f.relatedHref && (
                    <Link href={f.relatedHref} className="mt-3 inline-block text-sm font-semibold text-wedison-green underline-offset-4 hover:underline">
                      Learn more
                    </Link>
                  )}
                </details>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {extras.includes("stories") && (
        <Block>
          <SectionHeading
            eyebrow="Sample layout"
            title="Real people. Real rides."
            body="These profiles are fictional and show the format only. Real stories replace them once riders have given written consent."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {customerStories.map((s) => (
              <li key={s.id}>
                <StoryCard story={s} />
              </li>
            ))}
          </ul>
        </Block>
      )}

      {extras.includes("articles") && (
        <Block>
          {relatedArticles.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/60">No articles in this guide yet.</p>
          )}
          <div className="mt-10">
            <GhostButton href="/articles" className="text-foreground">
              All Articles
            </GhostButton>
          </div>
        </Block>
      )}

      {extras.includes("business-grid") && (
        <Block>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessSolutions.map((b) => (
              <li key={b.id} className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
                <Link href={BUSINESS_HREF[b.id] ?? "/business"} className="block">
                  <div className="aspect-[16/9]">
                    <Visual
                      kind="business"
                      src={b.image.src}
                      alt={b.image.alt[locale]}
                      className="h-full w-full"
                      caption={false}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{b.title[locale]}</h3>
                    <p className="mt-2 text-sm text-foreground/70">{b.summary[locale]}</p>
                    <p className="mt-3 text-xs text-foreground/50">{b.audiences[locale].join(" · ")}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-wedison-green">Learn more →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {extras.includes("business-inquiry") && (
        <Block tone="soft">
          <div id="inquiry" className="scroll-mt-24">
            <SectionHeading eyebrow="Talk to us" title="Business inquiry" body="Tell us about your operation and the team will get back to you." />
            <div className="mt-8 max-w-3xl">
              <ContactForm
                kind="business"
                topics={["Fleet", "Rental", "Hospitality", "Corporate", "Dealer partnership", "Charging partnership"]}
              />
            </div>
          </div>
        </Block>
      )}

      {extras.includes("contact") && (
        <Block>
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <SectionHeading title="Get in touch" />
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Email</dt>
                  <dd className="mt-0.5 text-foreground/50">{DATA_REQUIRED_LABEL}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Phone and WhatsApp</dt>
                  <dd className="mt-0.5 text-foreground/50">{DATA_REQUIRED_LABEL}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Address</dt>
                  <dd className="mt-0.5 text-foreground/50">{DATA_REQUIRED_LABEL}</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </Block>
      )}

      {page.dataRequired && page.dataRequired.length > 0 && (
        <section className="border-t border-black/10 py-10 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <details className="text-sm">
              <summary className="cursor-pointer font-semibold text-foreground/70">Information needed from the WEDISON team</summary>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-foreground/60">
                {page.dataRequired.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
          </div>
        </section>
      )}
    </>
  );
}
