"use client";

import { useMemo, useState } from "react";
import {
  DATA_REQUIRED_LABEL,
  DEFAULT_LOCALE,
  cities,
  hasValue,
  products,
  superchargerStations,
  type StationStatus,
  type SuperchargerStation,
} from "../lib/mockData";
import PlaceholderArt from "./ui/PlaceholderArt";
import { CtaButton } from "./ui/common";

const locale = DEFAULT_LOCALE;

const STATUS_LABEL: Record<StationStatus, string> = {
  operational: "Operational",
  coming_soon: "Coming soon",
  maintenance: "Maintenance",
};

const STATUS_DOT: Record<StationStatus, string> = {
  operational: "bg-wedison-green",
  coming_soon: "bg-foreground/40",
  maintenance: "bg-wedison-orange",
};

function num(dp: SuperchargerStation["chargingPowerKw"], unit: string) {
  return hasValue(dp) ? `${dp.value} ${unit} (sample)` : DATA_REQUIRED_LABEL;
}

export default function StationBrowser() {
  const [city, setCity] = useState<string>("all");
  const [status, setStatus] = useState<"all" | StationStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const list = useMemo(
    () =>
      superchargerStations.filter(
        (s) => (city === "all" || s.citySlug === city) && (status === "all" || s.status === status),
      ),
    [city, status],
  );
  const selected = list.find((s) => s.id === selectedId) ?? list[0] ?? null;

  const cityName = (slug: string) => cities.find((c) => c.slug === slug)?.name[locale] ?? slug;
  const modelNames = (slugs: string[]) =>
    slugs.map((slug) => products.find((p) => p.slug === slug)?.name ?? slug);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-sm">
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
        <label className="flex-1 text-sm">
          <span className="mb-1 block font-medium">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "all" | StationStatus)}
            className="w-full rounded-xl border border-black/15 bg-background px-3 py-3 dark:border-white/20"
          >
            <option value="all">All</option>
            <option value="operational">Operational</option>
            <option value="coming_soon">Coming soon</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <ul className="space-y-3 lg:col-span-2" aria-label="Supercharger locations">
          {list.length === 0 && <li className="text-sm text-foreground/60">No locations match this filter.</li>}
          {list.map((s) => {
            const active = selected?.id === s.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(s.id)}
                  aria-pressed={active}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-wedison-green bg-wedison-green/5"
                      : "border-black/10 hover:border-foreground/30 dark:border-white/10"
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    <span aria-hidden className={`h-2 w-2 rounded-full ${STATUS_DOT[s.status]}`} />
                    {STATUS_LABEL[s.status]} · {cityName(s.citySlug)}
                  </span>
                  <span className="mt-1 block font-semibold">{s.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-3">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl">
            <PlaceholderArt kind="map" caption={false} />
          </div>
          {selected && (
            <div className="mt-4 rounded-3xl border border-black/10 p-6 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-wedison-green">
                {STATUS_LABEL[selected.status]}
              </p>
              <h3 className="mt-1 text-xl font-bold">{selected.name}</h3>
              <p className="mt-1 text-sm text-foreground/70">{selected.address}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Charging power</dt>
                  <dd className="mt-0.5 font-semibold">{num(selected.chargingPowerKw, "kW")}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Connectors</dt>
                  <dd className="mt-0.5 font-semibold">{num(selected.connectorCount, "")}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Hours</dt>
                  <dd className="mt-0.5 font-semibold">{selected.operatingHours}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Cost</dt>
                  <dd className="mt-0.5 font-semibold">
                    {hasValue(selected.cost) ? selected.cost.value : DATA_REQUIRED_LABEL}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] uppercase tracking-wider text-foreground/50">Supported models</dt>
                  <dd className="mt-0.5 font-semibold">
                    {selected.supportedModelSlugs.length ? modelNames(selected.supportedModelSlugs).join(", ") : DATA_REQUIRED_LABEL}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-foreground/50">
                Sample location for the local prototype. Not a confirmed WEDISON Supercharger.
              </p>
              <div className="mt-5">
                <CtaButton href="/test-ride">Book a Test Ride</CtaButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
