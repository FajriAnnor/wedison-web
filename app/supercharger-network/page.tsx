import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StationBrowser from "@/components/StationBrowser";
import { CtaButton, SectionHeading } from "@/components/ui/common";

export const metadata: Metadata = {
  title: "Supercharger network | WEDISON",
  description: "Charging is infrastructure. See where the WEDISON Supercharger network is and where it is going.",
};

export default function SuperchargerNetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Why WEDISON"
        title="Supercharger network"
        intro="Our motorcycles are only one part of the experience. Our charging infrastructure completes the ecosystem."
        visual="map"
        primary={{ label: "Find a Supercharger", href: "/supercharger" }}
        secondary={{ label: "Become a Charging Partner", href: "/charging-partnership" }}
        crumbs={[{ label: "Supercharger network" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Locations" title="Current and coming soon" />
          <div className="mt-10">
            <StationBrowser />
          </div>
          <div className="mt-12">
            <CtaButton href="/charging-partnership">Become a Charging Partner</CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
