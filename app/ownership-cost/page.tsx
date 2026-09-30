import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TcoCalculator from "@/components/TcoCalculator";
import { CtaButton } from "@/components/ui/common";

export const metadata: Metadata = {
  title: "Ownership cost calculator | WEDISON",
  description: "Compare the running cost of an electric motorcycle with a petrol motorcycle.",
};

export default function OwnershipCostPage() {
  return (
    <>
      <PageHero
        eyebrow="Why WEDISON"
        title="How much could you save?"
        intro="Adjust your daily distance and energy prices. The calculator compares a WEDISON with a petrol motorcycle."
        visual="battery"
        primary={{ label: "Book a Test Ride", href: "/test-ride" }}
        crumbs={[{ label: "Ownership cost" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TcoCalculator />
          <div className="mt-10">
            <CtaButton href="/motorcycles">Explore Models</CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
