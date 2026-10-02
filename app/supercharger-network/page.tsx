import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StationBrowser from "@/components/StationBrowser";
import { CtaButton, SectionHeading } from "@/components/ui/common";

export const metadata: Metadata = {
  title: "Supercharger network | WEDISON",
  description: "Explore WEDISON's network of more than 100 strategic SuperCharge locations across Indonesia.",
};

export default function SuperchargerNetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Why WEDISON"
        title="Supercharger network"
        intro="WEDISON states that SuperCharge is available at more than 100 strategic locations across Indonesia, supported by app-based station discovery and live availability."
        visual="map"
        primary={{ label: "Find a Supercharger", href: "/supercharger" }}
        secondary={{ label: "Become a Charging Partner", href: "/charging-partnership" }}
        crumbs={[{ label: "Supercharger network" }]}
        image={{ src: "/images/wedison/supercharge/supercharge-station-hero.webp", alt: "WEDISON SuperCharge station" }}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Across Indonesia"
            title="More than 100 strategic locations"
            body="Use the WEDISON app to find nearby stations, check availability, review queue status and see estimated wait times."
          />
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
