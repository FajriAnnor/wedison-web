import Link from "next/link";
import { ProductCard } from "@/components/cards";
import ChargingVisual from "@/components/ChargingVisual";
import HeroSlider from "@/components/HeroSlider";
import { CtaButton, Eyebrow, GhostButton, SectionHeading } from "@/components/ui/common";
import {
  DEFAULT_LOCALE,
  homeContent,
  products,
  siteConfig,
  superchargeClaim,
  whyElectricPoints,
} from "@/lib/mockData";

const locale = DEFAULT_LOCALE;

function Section({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "soft" | "dark";
}) {
  const bg = tone === "dark" ? "bg-wedison-charcoal text-white" : tone === "soft" ? "bg-wedison-soft" : "bg-background";
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
    <section className="relative isolate overflow-hidden bg-wedison-ink text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,#282d2a_0%,#1a1f1c_50%,#111513_100%)]" />
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
            <CtaButton href={h.ctas.primary.href} conversion>Test Ride</CtaButton>
            <GhostButton href={h.ctas.secondary.href}>Explore Models</GhostButton>
          </div>
          <p className="mt-4">
            <Link href={h.ctas.tertiary.href} className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline">
              Discover Supercharge →
            </Link>
          </p>
          <p className="mt-6 text-xs text-white/40">*Charging conditions apply and are published with the claim.</p>
        </div>
        <HeroSlider />
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
            15 minutes. Ready to move.
          </h2>
          <p className="mt-6 max-w-md text-base text-foreground/70 sm:text-lg">
            Charge compatible WEDISON motorcycles from 10% to 80% in 15 minutes. Find nearby stations and monitor charging through the WEDISON app.
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

/* 04 Why electric */
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

/* 05 Final statement */
function FinalStatement() {
  const f = homeContent.finalStatement;
  return (
    <section className="relative isolate overflow-hidden bg-wedison-ink py-28 text-center text-white sm:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,#282d2a_0%,#111513_65%)]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
          The future of mobility is already moving.
        </h2>
        <div className="mt-10">
          <CtaButton href={f.cta.href} conversion>Ride WEDISON</CtaButton>
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
      <Motorcycles />
      <Supercharge />
      <WhyElectric />
      <FinalStatement />
    </>
  );
}
