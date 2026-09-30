import type { Metadata } from "next";
import DealerBrowser from "@/components/DealerBrowser";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Find a dealer | WEDISON",
  description: "Find a WEDISON dealer for sales, test rides and service.",
};

export default function DealerPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Find a dealer"
        intro="Browse WEDISON locations by city, then book a test ride at the one nearest you."
        visual="business"
        primary={{ label: "Book a Test Ride", href: "/test-ride" }}
        secondary={{ label: "Become a Dealer", href: "/dealer-partnership" }}
        crumbs={[{ label: "Find a dealer" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DealerBrowser />
        </div>
      </section>
    </>
  );
}
