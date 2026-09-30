import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ProductCard } from "@/components/cards";
import { products } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Electric motorcycles | WEDISON",
  description: "Explore the WEDISON electric motorcycle lineup.",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "urban", label: "Urban" },
  { key: "performance", label: "Performance" },
  { key: "commuter", label: "Commuter" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "new", label: "New" },
] as const;

export default async function MotorcyclesPage(props: PageProps<"/motorcycles">) {
  const sp = await props.searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  const active = FILTERS.some((f) => f.key === raw) ? (raw as string) : "all";

  const list = products.filter((p) => (active === "all" ? true : active === "new" ? p.isNew : p.category === active));

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Electric motorcycles"
        intro="Four models, one ecosystem. Compare them side by side or book a test ride."
        visual="motorcycle"
        primary={{ label: "Book a Test Ride", href: "/test-ride" }}
        secondary={{ label: "Compare Models", href: "/compare" }}
        crumbs={[{ label: "Motorcycles" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <Link
                key={f.key}
                href={f.key === "all" ? "/motorcycles" : `/motorcycles?category=${f.key}`}
                aria-current={active === f.key ? "true" : undefined}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active === f.key
                    ? "border-wedison-green bg-wedison-green/10 font-semibold"
                    : "border-black/15 hover:border-foreground/40 dark:border-white/20"
                }`}
              >
                {f.label}
              </Link>
            ))}
          </nav>

          {list.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-foreground/60">No models in this category yet.</p>
          )}

          <p className="mt-10 text-xs text-foreground/50">
            Values tagged Sample are placeholders for the local prototype. Values shown as [DATA REQUIRED] are waiting on
            verified information from WEDISON.
          </p>
        </div>
      </section>
    </>
  );
}
