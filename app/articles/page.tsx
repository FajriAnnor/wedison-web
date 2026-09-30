import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ArticleCard } from "@/components/cards";
import { articles, type ArticleCategory } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Articles | WEDISON",
  description: "Guides and news about electric motorcycles, batteries and charging.",
};

const CATEGORIES: { key: ArticleCategory; label: string }[] = [
  { key: "electric-mobility", label: "Electric mobility" },
  { key: "technology", label: "Technology" },
  { key: "battery", label: "Battery" },
  { key: "charging", label: "Charging" },
  { key: "supercharging", label: "Supercharging" },
  { key: "maintenance", label: "Maintenance" },
  { key: "buying-guide", label: "Buying guide" },
  { key: "sustainability", label: "Sustainability" },
  { key: "industry", label: "Industry" },
  { key: "wedison-news", label: "WEDISON news" },
  { key: "customer-stories", label: "Customer stories" },
];

export default async function ArticlesPage(props: PageProps<"/articles">) {
  const sp = await props.searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  const active = CATEGORIES.find((c) => c.key === raw)?.key;
  const list = active ? articles.filter((a) => a.category === active) : articles;

  return (
    <>
      <PageHero
        eyebrow="Discover"
        title="Articles"
        intro="Clear answers about electric motorcycles, batteries, charging and ownership."
        visual="article"
        primary={{ label: "Book a Test Ride", href: "/test-ride" }}
        crumbs={[{ label: "Articles" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Link
              href="/articles"
              aria-current={!active ? "true" : undefined}
              className={`rounded-full border px-4 py-2 text-sm ${!active ? "border-wedison-green bg-wedison-green/10 font-semibold" : "border-black/15 dark:border-white/20"}`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/articles?category=${c.key}`}
                aria-current={active === c.key ? "true" : undefined}
                className={`rounded-full border px-4 py-2 text-sm ${active === c.key ? "border-wedison-green bg-wedison-green/10 font-semibold" : "border-black/15 dark:border-white/20"}`}
              >
                {c.label}
              </Link>
            ))}
          </nav>

          {list.length ? (
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-foreground/60">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
