import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { StoryCard } from "@/components/cards";
import Visual from "@/components/ui/Visual";
import { CtaButton, DataValue, PriceValue, SectionHeading } from "@/components/ui/common";
import {
  DEFAULT_LOCALE,
  getFaqsByIds,
  getProductBySlug,
  getStoriesByProduct,
  products,
  specDefinitions,
  type SpecGroup,
} from "@/lib/mockData";

const locale = DEFAULT_LOCALE;

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/motorcycles/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  return { title: `${p.name} | WEDISON`, description: p.positioning[locale] };
}

const GROUP_LABEL: Record<SpecGroup, string> = {
  performance: "Performance and range",
  battery: "Battery",
  charging: "Charging",
  dimensions: "Dimensions and weight",
  safety: "Safety",
  technology: "Technology",
  warranty: "Warranty",
};

export default async function ProductPage(props: PageProps<"/motorcycles/[slug]">) {
  const { slug } = await props.params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const groups = (Object.keys(GROUP_LABEL) as SpecGroup[]).map((g) => ({
    key: g,
    rows: specDefinitions.filter((s) => s.group === g),
  }));
  const stories = getStoriesByProduct(p.slug);
  const faqs = getFaqsByIds(p.faqIds);

  return (
    <>
      <PageHero
        eyebrow={p.category}
        title={p.name}
        intro={p.positioning[locale]}
        visual="motorcycle"
        primary={{ label: "Book a Test Ride", href: `/test-ride?model=${p.slug}` }}
        secondary={{ label: "Compare Models", href: `/compare?models=${p.slug}` }}
        crumbs={[{ label: "Motorcycles", href: "/motorcycles" }, { label: p.name }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <Visual
              kind="motorcycle"
              src={p.heroImage.src}
              alt={p.heroImage.alt[locale]}
              className="aspect-[16/10] rounded-3xl"
              priority
            />
            {p.gallery.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-4">
                {p.gallery.map((g) => (
                  <li key={g.src}>
                    <Visual kind="motorcycle" src={g.src} alt={g.alt[locale]} className="aspect-[16/10] rounded-2xl" caption={false} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-widest text-foreground/50">Price</p>
            <p className="mt-1 text-3xl font-extrabold">
              <PriceValue point={p.price} />
            </p>

            <p className="mt-8 text-xs uppercase tracking-widest text-foreground/50">Highlights</p>
            <ul className="mt-3 space-y-2">
              {p.highlights[locale].map((h) => (
                <li key={h} className="flex gap-2 text-sm">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-wedison-green" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs uppercase tracking-widest text-foreground/50">Colors</p>
            <ul className="mt-3 flex flex-wrap gap-4">
              {p.colors.map((c) => (
                <li key={c.hex} className="flex items-center gap-2 text-sm">
                  <span className="h-6 w-6 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                  {c.name[locale]}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaButton href={`/test-ride?model=${p.slug}`}>Test Ride</CtaButton>
              <Link href="/dealer" className="text-sm font-semibold underline-offset-4 hover:underline">
                Find a Dealer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground/[0.03] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Specifications" title="Full specification" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.key} className="rounded-2xl border border-black/10 bg-background p-6 dark:border-white/10">
                <h3 className="font-bold">{GROUP_LABEL[g.key]}</h3>
                <dl className="mt-4 divide-y divide-black/10 text-sm dark:divide-white/10">
                  {g.rows.map((s) => (
                    <div key={s.key} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-foreground/60">{s.label[locale]}</dt>
                      <dd className="text-right font-medium">
                        <DataValue point={p.specs[s.key]} unit={s.unit} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-foreground/50">
            Sample values are placeholders for the local prototype. [DATA REQUIRED] means the specification has not been
            verified by WEDISON and is not shown.
          </p>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Riders" title={`Riding the ${p.name.replace("WEDISON ", "")}`} />
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {stories.map((s) => (
                <li key={s.id}>
                  <StoryCard story={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <ul className="mt-8 divide-y divide-black/10 dark:divide-white/10">
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
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={`/test-ride?model=${p.slug}`}>Book a Test Ride</CtaButton>
            <Link href="/motorcycles" className="inline-flex items-center text-sm font-semibold underline-offset-4 hover:underline">
              All motorcycles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
