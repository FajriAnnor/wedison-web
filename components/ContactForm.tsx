"use client";

import { useState } from "react";
import { ctaClass } from "./ui/common";

const field =
  "w-full rounded-xl border border-black/15 bg-background px-3 py-3 text-base focus-visible:outline-2 focus-visible:outline-wedison-green dark:border-white/20";

export default function ContactForm({
  kind = "contact",
  topics,
}: {
  kind?: "contact" | "business";
  topics?: string[];
}) {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Prototype only: a real CRM / email integration replaces this.
    console.log(`[WEDISON prototype] ${kind} inquiry`, { ...data, landingPage: window.location.pathname });
    setSent(String(data.name ?? ""));
  }

  if (sent !== null) {
    return (
      <div role="status" className="rounded-3xl border border-wedison-green/40 bg-wedison-green/5 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wedison-green">Message received</p>
        <h2 className="mt-3 text-2xl font-extrabold uppercase leading-none">Thanks, {sent}.</h2>
        <p className="mt-3 text-foreground/70">
          Local prototype: your message was not sent anywhere. It is printed to the browser console in a CRM-ready shape.
        </p>
        <button type="button" onClick={() => setSent(null)} className={`${ctaClass} mt-6`}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label={kind === "business" ? "Business inquiry" : "Contact"}>
      <label className="text-sm">
        <span className="mb-1 block font-medium">Name</span>
        <input required name="name" type="text" autoComplete="name" className={field} />
      </label>
      <label className="text-sm">
        <span className="mb-1 block font-medium">Email</span>
        <input required name="email" type="email" autoComplete="email" className={field} />
      </label>
      {kind === "business" && (
        <label className="text-sm">
          <span className="mb-1 block font-medium">Company</span>
          <input required name="company" type="text" autoComplete="organization" className={field} />
        </label>
      )}
      <label className="text-sm">
        <span className="mb-1 block font-medium">Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      {topics && (
        <label className="text-sm sm:col-span-2">
          <span className="mb-1 block font-medium">Topic</span>
          <select name="topic" defaultValue={topics[0]} className={field}>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="text-sm sm:col-span-2">
        <span className="mb-1 block font-medium">Message</span>
        <textarea required name="message" rows={5} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className={ctaClass}>
          {kind === "business" ? "Send Business Inquiry" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
