import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StationBrowser from "@/components/StationBrowser";

export const metadata: Metadata = {
  title: "Find a Supercharger | WEDISON",
  description: "Search WEDISON Supercharger locations by city and status.",
};

export default function FindSuperchargerPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Find a Supercharger"
        intro="Filter by city and status, then open a location for power, hours and compatible models."
        visual="charger"
        primary={{ label: "Discover Supercharge", href: "/supercharge" }}
        secondary={{ label: "Network overview", href: "/supercharger-network" }}
        crumbs={[{ label: "Find a Supercharger" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StationBrowser />
        </div>
      </section>
    </>
  );
}
