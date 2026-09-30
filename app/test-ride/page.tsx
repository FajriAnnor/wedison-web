import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TestRideForm from "@/components/TestRideForm";

export const metadata: Metadata = {
  title: "Book a test ride | WEDISON",
  description: "Choose a model, a city and a time to test ride a WEDISON electric motorcycle.",
};

export default function TestRidePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Book a test ride"
        intro="Choose your model, city and a time that suits you. Ten quick fields, no account needed."
        visual="motorcycle"
        secondary={{ label: "Find a Dealer", href: "/dealer" }}
        crumbs={[{ label: "Test ride" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <TestRideForm />
        </div>
      </section>
    </>
  );
}
