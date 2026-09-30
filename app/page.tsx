import Link from "next/link";
import { ArticleCard, ProductCard, StoryCard } from "@/components/cards";
import ChargingVisual from "@/components/ChargingVisual";
import TcoCalculator from "@/components/TcoCalculator";
import PlaceholderArt from "@/components/ui/PlaceholderArt";
import Visual from "@/components/ui/Visual";
import { CtaButton, Eyebrow, GhostButton, SectionHeading } from "@/components/ui/common";
import {
  DEFAULT_LOCALE,
  articles,
  businessSolutions,
  cities,
  customerStories,
  homeContent,
  ownershipPillars,
  products,
  siteConfig,
  superchargeClaim,
  superchargerStations,
  techPillars,
  whyElectricPoints,
} from "@/lib/mockData";

const locale = DEFAULT_LOCALE;

const BUSINESS_HREF: Record<string, string> = {
  fleet: "/fleet",
  rental: "/rental",
  hospitality: "/hospitality",
  corporate: "/corporate",
  dealer: "/dealer-partnership",
  "charging-partner": "/charging-partnership",
};

function Section({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "soft" | "dark";
}) {
  const bg = tone === "dark" ? "bg-[#0d0f11] text-white" : tone === "soft" ? "bg-foreground/[0.03]" : "bg-background";
  return (
    <section className={`${bg} py-20 sm:py-28`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* 01 Hero */
function Hero() {
  const h = homeContent.hero;
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0f11] text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,#2a2f34_0%,#14171a_50%,#0d0f11_100%)]" />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Eyebrow light>WEDISON · Electric mobility</Eyebrow>
          <h1 className="mt-5 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Electric mobility, without the wait.
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
            High-performance electric motorcycles powered by smart technology and 15-minute supercharging.*
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={h.ctas.primary.href}>Test Ride</CtaButton>
            <GhostButton href={h.ctas.secondary.href}>Explore Models</GhostButton>
          </div>
          <p className="mt-4">
            <Link href={h.ctas.tertiary.href} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
              Discover Supercharge →
            </Link>
          </p>
          <p className="mt-6 text-xs text-white/40">*Charging conditions apply and are published with the claim.</p>
        </div>
        <Visual
          kind="motorcycle"
          src={h.media.src}
          alt={h.media.alt[locale]}
          className="aspect-[4/3] rounded-3xl border border-white/10"
          priority
        />
      </div>
    </section>
  );
}

/* 02 Supercharge */
function Supercharge() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>{superchargeClaim.claimLabel}</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            15 minutes. Back on the road.
          </h2>
          <p className="mt-6 max-w-md text-base text-foreground/70 sm:text-lg">
            {superchargeClaim.subline[locale]} Ride, plug in, and be moving again in the time it takes to finish a coffee.
          </p>
          <div className="mt-8">
            <CtaButton href="/supercharge">Discover Supercharge</CtaButton>
          </div>
        </div>
        <ChargingVisual />
      </div>
    </Section>
  );
}

/* 03 Motorcycles */
function Motorcycles() {
  return (
    <Section tone="soft">
      <SectionHeading
        eyebrow="The lineup"
        title="Meet the motorcycles."
        body="From city streets to open roads, find the WEDISON that fits the way you ride."
      />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-foreground/50">
        Values tagged Sample are placeholders for the local prototype. [DATA REQUIRED] marks information still to be verified.
      </p>
    </Section>
  );
}

/* 04 Technology */
const TECH_ORDER = ["battery", "motor", "bms", "controller", "supercharger", "infrastructure"] as const;

function Technology() {
  const steps = TECH_ORDER.map((id) => techPillars.find((p) => p.id === id)).filter(
    (p): p is (typeof techPillars)[number] => p !== undefined,
  );
  return (
    <Section tone="dark">
      <SectionHeading
        light
        eyebrow="The technology"
        title="One system. Engineered end to end."
        body="Every part of a WEDISON works with the next, from the energy stored in the battery to the network that refills it."
      />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {steps.map((step, i) => (
          <li key={step.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tabular-nums text-wedison-green">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden className="h-2 w-2 rounded-full bg-wedison-green" />
            </div>
            <h3 className="mt-5 font-bold leading-tight">{step.title[locale]}</h3>
            <p className="mt-2 text-sm text-white/65">{step.summary[locale]}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <CtaButton href="/technology">Explore Our Technology</CtaButton>
      </div>
    </Section>
  );
}

/* 05 Network */
function Network() {
  const rows = cities
    .map((city) => {
      const list = superchargerStations.filter((s) => s.citySlug === city.slug);
      return {
        slug: city.slug,
        name: city.name[locale],
        live: list.filter((s) => s.status === "operational").length,
        soon: list.filter((s) => s.status === "coming_soon").length,
      };
    })
    .filter((r) => r.live + r.soon > 0);

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            <PlaceholderArt kind="map" />
          </div>
          <ul className="mt-6 divide-y divide-black/10 dark:divide-white/10">
            {rows.map((r) => (
              <li key={r.slug} className="flex items-center justify-between py-3 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="flex items-center gap-3 text-foreground/60">
                  {r.live > 0 && (
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden className="h-2 w-2 rounded-full bg-wedison-green" />
                      {r.live} sample live
                    </span>
                  )}
                  {r.soon > 0 && <span>{r.soon} coming soon</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow>Supercharger network</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            Powering your journey.
          </h2>
          <p className="mt-6 max-w-md text-base text-foreground/70 sm:text-lg">
            Charging is infrastructure, not an accessory. The network is being built so the next charge is always on your route.
          </p>
          <p className="mt-3 text-xs text-foreground/50">Locations shown are samples for the local prototype.</p>
          <div className="mt-8">
            <CtaButton href="/supercharger-network">Find a Supercharger</CtaButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* 06 Why electric */
function WhyElectric() {
  return (
    <Section tone="soft">
      <SectionHeading eyebrow="Why switch" title="Why switch to electric." />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyElectricPoints.map((p) => (
          <li key={p.id} className="rounded-2xl border border-black/10 bg-background p-6 dark:border-white/10">
            <span aria-hidden className="block h-1 w-8 rounded bg-wedison-green" />
            <h3 className="mt-4 font-bold">{p.title[locale]}</h3>
            <p className="mt-2 text-sm text-foreground/70">{p.body[locale]}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <GhostButton href="/why-electric" className="text-foreground">
          Read more
        </GhostButton>
      </div>
    </Section>
  );
}

/* 07 TCO */
function Tco() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ownership economics"
        title="How much could you save?"
        body="Move the sliders and compare a WEDISON with a petrol motorcycle."
      />
      <div className="mt-12">
        <TcoCalculator compact />
      </div>
      <div className="mt-10">
        <CtaButton href="/ownership-cost">Calculate Your Savings</CtaButton>
      </div>
    </Section>
  );
}

/* 08 Stories */
function Stories() {
  return (
    <Section tone="soft">
      <SectionHeading
        eyebrow="Riders"
        title="Real people. Real rides."
        body="Sample layout with fictional profiles. Verified rider stories replace these before launch."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {customerStories.map((s) => (
          <li key={s.id}>
            <StoryCard story={s} />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CtaButton href="/riders">Meet the WEDISON Riders</CtaButton>
      </div>
    </Section>
  );
}

/* 09 Ownership */
function Ownership() {
  return (
    <Section>
      <SectionHeading eyebrow="After you buy" title="Own with confidence." body="WEDISON stays with you after the sale." />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ownershipPillars.map((p) => (
          <li key={p.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
            <h3 className="font-bold">{p.title[locale]}</h3>
            <p className={`mt-2 text-sm ${p.status === "required" ? "text-foreground/40" : "text-foreground/70"}`}>{p.body[locale]}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CtaButton href="/service-support">Explore Ownership</CtaButton>
      </div>
    </Section>
  );
}

/* 10 Business */
function Business() {
  return (
    <Section tone="dark">
      <SectionHeading
        light
        eyebrow="Business"
        title="Built for more than one rider."
        body="Fleets, rental operators, hotels, companies and partners can all run on WEDISON."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {businessSolutions.map((b) => (
          <li key={b.id}>
            <Link
              href={BUSINESS_HREF[b.id] ?? "/business"}
              className="block h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/30 hover:bg-white/[0.07]"
            >
              <h3 className="font-bold">{b.title[locale]}</h3>
              <p className="mt-2 text-sm text-white/65">{b.summary[locale]}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-wedison-green">Learn more →</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CtaButton href="/business">Explore Business Solutions</CtaButton>
      </div>
    </Section>
  );
}

/* 11 Latest stories */
function Latest() {
  return (
    <Section>
      <SectionHeading eyebrow="Latest stories" title="Learn before you ride." />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => (
          <li key={a.id}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <GhostButton href="/articles" className="text-foreground">
          All Articles
        </GhostButton>
      </div>
    </Section>
  );
}

/* 12 Find your WEDISON */
function FindYours() {
  return (
    <Section tone="soft">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>Find your WEDISON</Eyebrow>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
            See it. Ride it. Decide.
          </h2>
          <p className="mt-6 max-w-md text-base text-foreground/70 sm:text-lg">
            Pick a city, choose a location and book a test ride in under a minute.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/test-ride">Book a Test Ride</CtaButton>
            <GhostButton href="/dealer" className="text-foreground">
              Find a Dealer
            </GhostButton>
          </div>
        </div>
        <div className="aspect-[16/9] overflow-hidden rounded-3xl">
          <PlaceholderArt kind="business" />
        </div>
      </div>
    </Section>
  );
}

/* 13 Final statement */
function FinalStatement() {
  const f = homeContent.finalStatement;
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0f11] py-28 text-center text-white sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,#2a2f34_0%,#0d0f11_65%)]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
          The future of mobility is already moving.
        </h2>
        <div className="mt-10">
          <CtaButton href={f.cta.href}>Ride WEDISON</CtaButton>
        </div>
      </div>
    </section>
  );
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.entityDefinition.en,
  url: siteConfig.url,
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Hero />
      <Supercharge />
      <Motorcycles />
      <Technology />
      <Network />
      <WhyElectric />
      <Tco />
      <Stories />
      <Ownership />
      <Business />
      <Latest />
      <FindYours />
      <FinalStatement />
    </>
  );
}
