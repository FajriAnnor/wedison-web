import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StationBrowser from "@/components/StationBrowser";

export const metadata: Metadata = {
  title: "Find a Supercharger | WEDISON",
  description: "Find WEDISON SuperCharge stations and check real-time availability through the WEDISON app.",
};

export default function FindSuperchargerPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Find a Supercharger"
        intro="The WEDISON app helps riders find nearby SuperCharge stations, check real-time availability and review queue status before setting off."
        visual="charger"
        primary={{ label: "Discover Supercharge", href: "/supercharge" }}
        secondary={{ label: "Network overview", href: "/supercharger-network" }}
        crumbs={[{ label: "Find a Supercharger" }]}
        image={{ src: "/images/wedison/supercharge/supercharge-station-hero.webp", alt: "WEDISON SuperCharge station" }}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StationBrowser />
        </div>
      </section>
    </>
  );
}
