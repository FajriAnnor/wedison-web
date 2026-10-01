"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DEFAULT_LOCALE, cities, dealers, products, type DealerService } from "../lib/mockData";
import PlaceholderArt from "./ui/PlaceholderArt";
import { CtaButton } from "./ui/common";

const locale = DEFAULT_LOCALE;

const SERVICE_LABEL: Record<DealerService, string> = {
  sales: "Sales",
  test_ride: "Test ride",
  service: "Service",
  spare_parts: "Spare parts",
  battery_check: "Battery check",
};

export default function DealerBrowser() {
  const [city, setCity] = useState("all");
  const list = useMemo(() => dealers.filter((d) => city === "all" || d.citySlug === city), [city]);
  const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name[locale] ?? slug;

  return (
    <div>
      <label className="block max-w-xs text-sm">
        <span className="mb-1 block font-medium">City</span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border border-black/15 bg-background px-3 py-3 dark:border-white/20"
        >
          <option value="all">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name[locale]}
            </option>
          ))}
        </select>
      </label>

      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.length === 0 && <li className="text-sm text-foreground/60">No dealer in this city yet.</li>}
        {list.map((d) => (
          <li key={d.id} className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
            <div className="aspect-[16/9]">
              <PlaceholderArt kind="business" caption={false} />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">{cityName(d.citySlug)}</p>
              <h3 className="mt-1 text-lg font-bold">{d.name}</h3>
              <p className="mt-1 text-sm text-foreground/70">{d.address}</p>
              <dl className="mt-4 space-y-2 text-sm">
                {d.openingHours.map((h) => (
                  <div key={h.days.en} className="flex justify-between gap-4">
                    <dt className="text-foreground/60">{h.days[locale]}</dt>
                    <dd className="font-medium tabular-nums">{h.hours}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/60">Models</dt>
                  <dd className="text-right font-medium">
                    {d.availableModelSlugs.map((s) => products.find((p) => p.slug === s)?.name.replace("WEDISON ", "") ?? s).join(", ")}
                  </dd>
                </div>
              </dl>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.services.map((s) => (
                  <li key={s} className="rounded-full bg-foreground/5 px-3 py-1 text-xs">
                    {SERVICE_LABEL[s]}
                  </li>
                ))}
                {d.hasSupercharger && (
                  <li className="rounded-full bg-wedison-green/10 px-3 py-1 text-xs font-medium text-wedison-green">
                    Charging on site
                  </li>
                )}
              </ul>
              <p className="mt-4 text-xs text-foreground/50">Sample location for the local prototype. Contact details pending.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {d.testRideAvailable && <CtaButton href={`/test-ride?dealer=${d.slug}&city=${d.citySlug}`} conversion>Book a Test Ride</CtaButton>}
                <Link href="/contact" className="text-sm font-semibold underline-offset-4 hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
