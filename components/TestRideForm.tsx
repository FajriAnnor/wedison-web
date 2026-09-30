"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_LOCALE,
  cities,
  dealers,
  products,
  testRideConfig,
  type ContactMethod,
  type TestRideLead,
  type UtmParams,
} from "../lib/mockData";
import { CtaButton, ctaClass } from "./ui/common";

const locale = DEFAULT_LOCALE;
const field =
  "w-full rounded-xl border border-black/15 bg-background px-3 py-3 text-base focus-visible:outline-2 focus-visible:outline-wedison-green dark:border-white/20";

const iso = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

function readUtm(): UtmParams {
  const q = new URLSearchParams(window.location.search);
  return {
    source: q.get("utm_source") ?? undefined,
    medium: q.get("utm_medium") ?? undefined,
    campaign: q.get("utm_campaign") ?? undefined,
    term: q.get("utm_term") ?? undefined,
    content: q.get("utm_content") ?? undefined,
  };
}

const noopSubscribe = () => () => {};

export default function TestRideForm() {
  // Browser-only values read through useSyncExternalStore so server and client renders agree.
  const search = useSyncExternalStore(noopSubscribe, () => window.location.search, () => "");
  const today = useSyncExternalStore(noopSubscribe, () => iso(new Date()), () => "");
  const range = useMemo(() => {
    if (!today) return { min: "", max: "" };
    const max = new Date(`${today}T00:00:00`);
    max.setDate(max.getDate() + testRideConfig.maxDaysAhead);
    return { min: today, max: iso(max) };
  }, [today]);

  // null = not touched by the user yet, so fall back to the ?model= / ?city= / ?dealer= preselection.
  const [pick, setPick] = useState<{ product: string | null; city: string | null; dealer: string | null }>({
    product: null,
    city: null,
    dealer: null,
  });
  const q = useMemo(() => new URLSearchParams(search), [search]);
  const fromQuery = (key: string, valid: string[]) => {
    const v = q.get(key);
    return v && valid.includes(v) ? v : "";
  };
  const productSlug = pick.product ?? fromQuery("model", products.map((p) => p.slug));
  const citySlug = pick.city ?? fromQuery("city", cities.map((c) => c.slug));
  const dealerSlug = pick.dealer ?? fromQuery("dealer", dealers.map((d) => d.slug));
  const setProductSlug = (v: string) => setPick((s) => ({ ...s, product: v }));
  const setCitySlug = (v: string) => setPick((s) => ({ ...s, city: v, dealer: "" }));
  const setDealerSlug = (v: string) => setPick((s) => ({ ...s, dealer: v }));
  const [lead, setLead] = useState<TestRideLead | null>(null);

  const cityDealers = useMemo(() => dealers.filter((d) => d.citySlug === citySlug && d.testRideAvailable), [citySlug]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload: TestRideLead = {
      productSlug,
      citySlug,
      dealerSlug,
      date: String(f.get("date")),
      time: String(f.get("time")),
      name: String(f.get("name")),
      phone: String(f.get("phone")),
      email: String(f.get("email")),
      preferredContact: String(f.get("contact")) as ContactMethod,
      locale,
      landingPage: window.location.pathname,
      utm: readUtm(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    // Prototype only: a real CRM / WhatsApp / calendar integration replaces this.
    console.log("[WEDISON prototype] test ride lead", payload);
    setLead(payload);
  }

  if (lead) {
    const model = products.find((p) => p.slug === lead.productSlug)?.name;
    const dealer = dealers.find((d) => d.slug === lead.dealerSlug)?.name;
    return (
      <div role="status" className="rounded-3xl border border-wedison-green/40 bg-wedison-green/5 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wedison-green">Request received</p>
        <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none">Thanks, {lead.name}.</h2>
        <p className="mt-4 max-w-xl text-foreground/70">
          Your test ride request for {model} at {dealer} on {lead.date} at {lead.time} is saved for the demo. The team would
          contact you by {lead.preferredContact}.
        </p>
        <p className="mt-3 text-xs text-foreground/50">
          Local prototype: nothing was sent. The lead payload is printed to the browser console in a CRM-ready shape.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button type="button" onClick={() => setLead(null)} className={ctaClass}>
            New request
          </button>
          <CtaButton href="/motorcycles">Explore Models</CtaButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Test ride booking">
      <label className="text-sm">
        <span className="mb-1 block font-medium">1. Model</span>
        <select required value={productSlug} onChange={(e) => setProductSlug(e.target.value)} className={field}>
          <option value="">Select a model</option>
          {products.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">2. City</span>
        <select
          required
          value={citySlug}
          onChange={(e) => setCitySlug(e.target.value)}
          className={field}
        >
          <option value="">Select a city</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name[locale]}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm sm:col-span-2">
        <span className="mb-1 block font-medium">3. Dealer / location</span>
        <select
          required
          value={dealerSlug}
          onChange={(e) => setDealerSlug(e.target.value)}
          disabled={!citySlug}
          className={`${field} disabled:opacity-50`}
        >
          <option value="">{citySlug ? (cityDealers.length ? "Select a location" : "No location in this city yet") : "Select a city first"}</option>
          {cityDealers.map((d) => (
            <option key={d.id} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">4. Date</span>
        <input required type="date" name="date" min={range.min} max={range.max} className={field} />
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">5. Time</span>
        <select required name="time" defaultValue="" className={field}>
          <option value="" disabled>
            Select a time
          </option>
          {testRideConfig.timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">6. Name</span>
        <input required type="text" name="name" autoComplete="name" className={field} />
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">7. Phone</span>
        <input required type="tel" name="phone" autoComplete="tel" className={field} />
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">8. Email</span>
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-medium">9. Preferred contact</span>
        <select required name="contact" defaultValue="whatsapp" className={field}>
          {testRideConfig.contactMethods.map((m) => (
            <option key={m} value={m}>
              {m === "whatsapp" ? "WhatsApp" : m === "phone" ? "Phone call" : "Email"}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-2">
        <button type="submit" className={ctaClass}>
          10. Book a Test Ride
        </button>
        <p className="mt-3 text-xs text-foreground/50">Local prototype: no data leaves your browser.</p>
      </div>
    </form>
  );
}
