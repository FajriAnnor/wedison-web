import type { Metadata } from "next";
import CompareTool from "@/components/CompareTool";
import PageHero from "@/components/PageHero";
import { products } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Compare models | WEDISON",
  description: "Compare WEDISON electric motorcycles side by side.",
};

export default async function ComparePage(props: PageProps<"/compare">) {
  const sp = await props.searchParams;
  const raw = Array.isArray(sp.models) ? sp.models.join(",") : (sp.models ?? "");
  const requested = raw.split(",").filter((s) => products.some((p) => p.slug === s));
  // A single model from a product card: pad with the first other model so the table has 2 columns.
  const initial =
    requested.length === 1 ? [requested[0], products.find((p) => p.slug !== requested[0])!.slug] : requested;

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Compare models"
        intro="Pick two to four motorcycles and see them side by side. Missing specifications stay marked as [DATA REQUIRED]."
        visual="motorcycle"
        primary={{ label: "Book a Test Ride", href: "/test-ride" }}
        crumbs={[{ label: "Motorcycles", href: "/motorcycles" }, { label: "Compare" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CompareTool initial={initial} />
        </div>
      </section>
    </>
  );
}
